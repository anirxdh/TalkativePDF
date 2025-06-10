import Chat from "@/components/Chat";
import PdfView from "@/components/PdfView";
import { adminDb } from "@/firebaseAdmin";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

export default async function ChatToFilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const ref = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .doc(id)
    .get();

  if (!ref.exists) {
    notFound();
  }

  const url = ref.data()?.downloadUrl;
  if (!url) {
    throw new Error("File URL not found");
  }

  console.log("Fetching PDF from URL:", url);

  return (
    <div className="grid lg:grid-cols-5 h-full overflow-hidden">
      {/* Right */}
      <div className="col-span-5 lg:col-span-2 overflow-y-auto">
        {/* Chat */}
        <Chat id={id} />
      </div>

      {/* Left */}
      <div className="col-span-5 lg:col-span-3 bg-gray-100 border-r-2 lg:border-grey-600 lg:-order-1 overflow-auto">
        {/* PDFView */}
        <PdfView url={url} />
      </div>
    </div>
  );
}