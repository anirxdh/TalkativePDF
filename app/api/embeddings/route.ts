import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { adminDb } from "@/firebaseAdmin";

export async function POST(request: Request) {
  const session = await auth();

  if (!session.userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { docId } = await request.json();

    // Get the document from Firestore
    const docRef = adminDb.collection('documents').doc(docId);
    const doc = await docRef.get();

    if (!doc.exists) {
      return new NextResponse("Document not found", { status: 404 });
    }

    const data = doc.data();
    if (!data) {
      return new NextResponse("Document data not found", { status: 404 });
    }

    // TODO: Add your embedding logic here

    return new NextResponse("Embeddings generated successfully", { status: 200 });
  } catch (error) {
    console.error('Error generating embeddings:', error);
    return new NextResponse("Error generating embeddings", { status: 500 });
  }
}