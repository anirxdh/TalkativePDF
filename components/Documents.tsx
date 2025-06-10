import { adminDb } from "@/firebaseAdmin";
import PlaceholderDocument from "./PlaceholderDocuments";
import { auth } from "@clerk/nextjs/server";
import Document from "./Document";

async function Documents() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const documentsSnapshot = await adminDb
    .collection("users")
    .doc(userId)
    .collection("files")
    .get();

  return (
    <div className="flex flex-wrap p-5 bg-gray-100 justify-center lg:justify-start rounded-sm gap-5 max-w-7xl mx-auto">
      {/* Map through the documents */}
      {documentsSnapshot.docs.map((doc) => {
        const { name, downloadUrl, size } = doc.data();

        return (
          <Document
            key={doc.id}
            id={doc.id}
            name={name}
            size={size}
            downloadUrl={downloadUrl}
          />
        );
      })}

      <PlaceholderDocument />
    </div>
  );
}
export default Documents;