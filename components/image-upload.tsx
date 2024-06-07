import { UploadButton } from "@/lib/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url?: string) => void;
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const fileType = value?.split(".").pop();

  return (
    <div className="flex flex-row justify-start items-center space-x-3">
      {value && fileType !== "pdf" && (
        <div className="relative h-20 w-32">
          <Image
            fill
            src={value}
            alt="Upload"
            className="rounded-xl h-full w-full"
          />
          <button
            onClick={() => onChange("")}
            type="button"
            className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          >
            <X className="h-4 w-4 " />
          </button>
        </div>
      )}

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
};

export default ImageUpload;
