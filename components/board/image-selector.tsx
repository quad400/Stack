"use client";

import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface ImageSelectorProps {
  onSelect: (image: string) => void;
  selected: string;
}

const ImageSelector = ({onSelect,selected}:ImageSelectorProps) => {
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const images = result.response as Array<Record<string, any>>;
          setImages(images);
        } else {
          console.log("Failed to get images from Unsplash");
        }
      } catch (e: any) {
        console.log(e.message);
        setImages([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="text-neutral-800 h-5 w-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      {images.map((image) => {
        return (
          <button
          type="button"
            onClick={() => onSelect(image?.urls?.full)}
            className="h-[100px] w-[150px] group relative rounded-lg"
          >
            {selected === image?.urls?.full && (
              <div className="absolute flex top-0 left-0 w-full h-full justify-center items-center bg-neutral-900 opacity-50 z-10">
                <Check className="text-white h-6 w-6" />
              </div>
            )}
            <Image
              fill
              alt={image?.alt_description}
              src={image?.urls?.thumb}
              className="w-full h-full object-cover"
            />
            <div className="absolute h-8 justify-center items-start w-full bg-blend-lighten bottom-0 px-2 py-1 left-0 group-hover:bg-gradient-to-b from-neutral-900 to-neutral-800 transition-all opacity-30">
              <Link
                href={image?.user?.links?.portfolio}
                className="group-hover:text-white text-transparent text-xs font-normal text-center truncate underline"
              >
                {image?.user?.first_name} {image?.user?.last_name}
              </Link>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ImageSelector;
