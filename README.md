
# AI Health Assistant - Medical Report Analysis and Query System

AI Health Assistant is an advanced project leveraging Artificial Intelligence (AI) to process and analyze medical reports. This project is designed to assist healthcare professionals and patients by answering queries, retrieving relevant information, and generating insights from clinical reports. It uses **Gemini AI**, **LangChain**, **Retrieval-Augmented Generation (RAG)**, and other technologies to enhance the analysis process and provide accurate, contextually relevant answers based on historical data.

## Features

- **Medical Report Analysis**: Extracts key insights from clinical reports and allows users to query them.
- **AI-Powered Query Response**: Uses Gemini AI to analyze medical reports and answer user queries.
- **Data Retrieval**: Retrieves relevant clinical data from Pinecone for more detailed insights.
- **Real-Time Response**: Streamed AI responses for real-time feedback.

## Technologies Used

- **Gemini AI**: For analyzing and processing medical reports and user queries.
- **LangChain**: To handle document retrieval, contextual querying, and provide a seamless integration of external data sources.
- **Retrieval-Augmented Generation (RAG)**: Enhances the responses generated by combining both the context of the query and retrieved external data from Pinecone to generate accurate answers.
- **Pinecone**: A vector database for fast and relevant data retrieval, integrated for search and context enrichment.
- **Vercel**: Hosting platform for API deployment.



## How It Works

- **Input**: The system receives a clinical report and a user query through a POST request.
- **Data Retrieval**: It queries Pinecone for relevant data and combines it with the provided report.
- **AI Analysis**: The system uses Gemini AI to analyze the report, augmenting it with relevant clinical findings.
- **Output**: The AI responds with an answer to the user's query, based on both the clinical report and additional data retrieved.

## Example Request

```bash
POST /api/medichatgemini
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "What are the potential risks associated with the patient's condition?"
    }
  ],
  "data": {
    "reportData": "The patient presented with a history of left knee pain, swelling, and elevated blood pressure (130/90). Further assessment is ongoing."
  }


```

## License

This project is currently not licensed. Please contact the author for permissions.
