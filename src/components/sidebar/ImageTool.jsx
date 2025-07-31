export default function ImageTool({ onImageUpload }) {
  return (
    <div className="upload-sec-container space-y-2">
      <p className="font-semibold">Upload Image:</p>
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-orange-50 file:text-orange-700
                   hover:file:bg-orange-100"
      />
    </div>
  );
}