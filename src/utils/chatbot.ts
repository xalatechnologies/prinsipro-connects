import type { Area } from '@/types';
import type { VectorSearchResult } from '@/types/rag';
import { vectorStore } from '@/services/VectorStoreService';

export async function generateResponse(query: string, areas: Area[]): Promise<string> {
  try {
    // Search for relevant chunks in attachments
    const attachmentResults = await vectorStore.search(query);
    
    let response = `Her er hva jeg fant om "${query}":\n\n`;
    
    // Add area-specific information
    areas.forEach(area => {
      if (area.name.toLowerCase().includes(query.toLowerCase()) ||
          area.description.toLowerCase().includes(query.toLowerCase())) {
        response += `**${area.name}**: ${area.description}\n\n`;
      }
    });

    // If we found relevant attachments, add them to the response
    if (attachmentResults.length > 0) {
      response += await formatAttachmentResults(attachmentResults);
    }

    return response;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

async function formatAttachmentResults(results: VectorSearchResult[]): Promise<string> {
  let response = '\n\n**Relevante vedlegg:**\n\n';
  
  results.forEach(({ chunk, score, attachment }) => {
    response += `- Fra "${attachment.fileName}": ${chunk.content}\n`;
  });
  
  response += '\n<em class="text-gray-600">Klikk på vedleggene for mer informasjon.</em>';
  
  return response;
}