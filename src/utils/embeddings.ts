import { TextChunk } from '@/types/rag';

// Mock embedding generation (in reality, you'd call an API like OpenAI)
export function generateEmbedding(text: string): number[] {
  const dimension = 384; // Common embedding dimension
  return Array.from(
    { length: dimension }, 
    () => (Math.random() * 2 - 1) // Random values between -1 and 1
  );
}

// Cosine similarity between two vectors
export function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}