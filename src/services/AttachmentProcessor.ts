import { Attachment } from '@/types/attachment';
import { TextChunk } from '@/types/rag';
import { extractText, chunkText } from '@/utils/text';
import { vectorStore } from './VectorStoreService';

export class AttachmentProcessor {
  // Process a single attachment
  async processAttachment(attachment: Attachment): Promise<void> {
    // Extract text from the attachment
    const text = extractText(attachment);

    // Split into chunks
    const chunks = chunkText(text);

    // Add each chunk to the vector store
    chunks.forEach((chunk, index) => {
      const textChunk: TextChunk = {
        ...chunk,
        metadata: {
          attachmentId: attachment.id,
          objectType: attachment.objectType,
          objectId: attachment.objectId,
          startIndex: index * 500, // Approximate character position
          endIndex: (index + 1) * 500
        }
      };
      vectorStore.addChunk(textChunk);
    });
  }

  // Process multiple attachments
  async processAttachments(attachments: Attachment[]): Promise<void> {
    for (const attachment of attachments) {
      await this.processAttachment(attachment);
    }
  }

  // Clear all processed data
  clear(): void {
    vectorStore.clear();
  }
}

// Singleton instance
export const attachmentProcessor = new AttachmentProcessor();