import { Attachment } from './attachment';

export interface TextChunk {
  id: string;
  content: string;
  embedding?: number[];
  metadata: {
    attachmentId: string;
    objectType: string;
    objectId: string;
    startIndex: number;
    endIndex: number;
  };
}

export interface VectorSearchResult {
  chunk: TextChunk;
  score: number;
  attachment: Attachment;
}

export interface SearchOptions {
  limit?: number;
  minScore?: number;
  objectType?: string;
  objectId?: string;
}

export interface VectorStore {
  addChunk: (chunk: TextChunk) => void;
  search: (query: string, options?: SearchOptions) => Promise<VectorSearchResult[]>;
  clear: () => void;
}