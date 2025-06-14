import FileUploader from "@/components/FileUploader";

export const dynamic = "force-dynamic";

function UploadPage() {
  return (
    <div className="h-full max-w-7xl mx-auto">
      <h1 className="text-3xl p-5 bg-gray-100 font-extralight text-grey-600">
        Upload Document
      </h1>

      <FileUploader />
    </div>
  );
}
export default UploadPage;