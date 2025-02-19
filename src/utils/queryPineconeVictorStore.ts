import { Pinecone } from "@pinecone-database/pinecone";
import { HfInference } from "@huggingface/inference";

// Custom type for Pinecone query response matches
interface PineconeMatch {
  id: string;
  score: number;
  metadata?: {
    chunk?: string;
    [key: string]: unknown;
  };
}

// Ensure Hugging Face API Key is available
if (!process.env.HUGGINGFACE_API_TOKEN) {
  throw new Error(
    "Hugging Face API Key is missing! Please check your .env file."
  );
}

// Initialize Hugging Face Inference with API Key from environment variables
const hf = new HfInference(process.env.HUGGINGFACE_API_TOKEN!);

export async function queryPineconeVictorStore(
  client: Pinecone,
  indexName: string,
  namespace: string,
  searchQuery: string
): Promise<string> {
  try {
    // Perform feature extraction using Hugging Face
    const hfOutput = await hf.featureExtraction({
      model: process.env.MODEL_NAME,
      inputs: searchQuery,
    });

    // Ensure hfOutput is of type array
    const queryEmbedding = Array.isArray(hfOutput) ? hfOutput : [hfOutput];

    // Query Pinecone with metadata included
    const index = client.Index(indexName);
    const queryResponse = await index.namespace(namespace).query({
      topK: 5,
      vector: queryEmbedding as number[], // Type assertion to number array
      includeValues: false,
      includeMetadata: true,
    });

    if (queryResponse.matches.length > 0) {
      // Combine matched data for response
      const concatRetrievals = (queryResponse.matches as PineconeMatch[])
        .map(
          (match, index) =>
            `\n Clinical Finding ${index + 1}: \n ${match.metadata?.chunk ?? "No data available"}`
        )
        .join(`\n\n`);

      return concatRetrievals;
    } else {
      return "<No_Match>";
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in queryPineconeVictorStore:", error.message);
      return JSON.stringify({
        error: "Error processing request.",
        message: error.message,
      });
    }
    // Handle unknown error types
    console.error("Unknown error in queryPineconeVictorStore");
    return JSON.stringify({
      error: "Error processing request.",
      message: "An unknown error occurred",
    });
  }
}