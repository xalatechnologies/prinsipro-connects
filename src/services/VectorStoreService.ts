import { VectorStore, TextChunk, VectorSearchResult, SearchOptions } from '@/types/rag';
import { generateEmbedding, cosineSimilarity } from '@/utils/embeddings';
import { mockAttachments } from '@/data/attachments/mockAttachments';

export class InMemoryVectorStore implements VectorStore {
  private chunks: TextChunk[] = [];

  addChunk(chunk: TextChunk): void {
    // Generate embedding if not provided
    if (!chunk.embedding) {
      chunk.embedding = generateEmbedding(chunk.content);
    }
    this.chunks.push(chunk);
  }

  async search(
    query: string,
    options: SearchOptions = {}
  ): Promise<VectorSearchResult[]> {
    const {
      limit = 5,
      minScore = 0.7,
      objectType,
      objectId
    } = options;

    // Generate query embedding
    const queryEmbedding = generateEmbedding(query);

    // Calculate similarities and filter results
    const results = this.chunks
      .filter(chunk => {
        if (objectType && chunk.metadata.objectType !== objectType) return false;
        if (objectId && chunk.metadata.objectId !== objectId) return false;
        return true;
      })
      .map(chunk => {
        const score = cosineSimilarity(queryEmbedding, chunk.embedding!);
        const attachment = mockAttachments.find(
          att => att.id === chunk.metadata.attachmentId
        )!;
        return { chunk, score, attachment };
      })
      .filter(result => result.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    return results;
  }

  clear(): void {
    this.chunks = [];
  }
}

// Singleton instance for the application
export const vectorStore = new InMemoryVectorStore();