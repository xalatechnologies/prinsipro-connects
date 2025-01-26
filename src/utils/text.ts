import type { Attachment } from '@/types/attachment';
import type { TextChunk } from '@/types/rag';

// Split text into chunks of roughly equal size
export function chunkText(
  text: string,
  chunkSize: number = 500,
  overlap: number = 100
): Omit<TextChunk, 'embedding' | 'metadata'>[] {
  const chunks: Omit<TextChunk, 'embedding' | 'metadata'>[] = [];
  let start = 0;

  while (start < text.length) {
    // Find the end of the current chunk
    let end = start + chunkSize;
    if (end > text.length) end = text.length;
    
    // If we're not at the end, try to break at a sentence or paragraph
    if (end < text.length) {
      const breakPoints = [
        text.lastIndexOf('. ', end),
        text.lastIndexOf('.\n', end),
        text.lastIndexOf('\n\n', end),
        text.lastIndexOf('. ', end)
      ];
      
      const validBreakPoint = Math.max(...breakPoints.filter(p => p > start));
      if (validBreakPoint > start) {
        end = validBreakPoint + 1;
      }
    }

    chunks.push({
      id: `chunk-${start}-${end}`,
      content: text.slice(start, end).trim()
    });

    // Move start position, accounting for overlap
    start = end - overlap;
  }

  return chunks;
}

// Extract text from different file types (mock implementation)
export function extractText(attachment: Attachment): string {
  // In a real implementation, you'd use libraries like pdf-parse, docx2txt, etc.
  // For now, we'll return mock text based on the description
  return `${attachment.description || ''}\n\n` +
    `Dette er en simulert tekstutvinning fra filen ${attachment.fileName}.\n` +
    `Dokumentet inneholder viktig informasjon om ${attachment.objectType} ` +
    `med ID ${attachment.objectId}.\n\n` +
    `Lastet opp av ${attachment.uploadedBy} den ${new Date(attachment.uploadedAt).toLocaleDateString('nb-NO')}.`;
}