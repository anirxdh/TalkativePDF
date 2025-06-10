import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { getEmbeddings } from "@/lib/langchain";

export async function generateEmbeddings(docId: string) {
  const session = await auth();
  
  if (!session.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Get the document from Firestore
    const docRef = db.collection('documents').doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return new NextResponse("Document not found", { status: 404 });
    }

    const data = doc.data();
    if (!data) {
      return new NextResponse("Document data not found", { status: 404 });
    }

    // Generate embeddings for the document content
    const embeddings = await getEmbeddings(data.content);

    // Update the document with embeddings
    await docRef.update({
      embeddings,
      status: 'processed'
    });

    return new NextResponse("Embeddings generated successfully", { status: 200 });
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return new NextResponse("Error generating embeddings", { status: 500 });
  }
} 