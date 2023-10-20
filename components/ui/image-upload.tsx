"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import * as cocoSsd from "@tensorflow-models/coco-ssd";




type ImageUploadProps = {
    disabled?: boolean;
    onChange: (value: String) => void;
    onRemove: (value: String) => void;
    onUpload?: (value: any) => void;
    value: string[];
    model: cocoSsd.ObjectDetection | null;
}




const ImageUpload = ({ disabled, onChange, onRemove, onUpload, value, model }: ImageUploadProps) => {

    const detectedWords: string[] = [];

    const handleImageUpload = (result: any) => {

        onChange(result.info.secure_url);

        if (model) {
            const image = document.createElement('img');
            image.crossOrigin = "anonymous";
            image.src = result.info.secure_url;


            image.onload = async () => {
                const predictions = await model.detect(image);

                if (onUpload) {
                    onUpload(predictions);
                }
            }
        }

    };

    const extractCommonWords = (detectedWords: string[]) => {

        if (detectedWords.length === 0) {
            return "";
        }

        const wordCounts: any = {};
        let CommonWord = detectedWords[0].toLowerCase();


        for (const word of detectedWords) {
            const foundWord = word.toLowerCase();

            if (wordCounts[foundWord]) {
                wordCounts[foundWord] += 1;
            } else {
                wordCounts[foundWord] = 1;
            }

            if (wordCounts[foundWord] > wordCounts[CommonWord]) {
                CommonWord = foundWord;
            }
        }

        return CommonWord;

    };


    useEffect(() => {

        if (model && value.length > 0) {
            value.forEach((imageUrl) => {
                const image = document.createElement('img');
                image.crossOrigin = "anonymous";
                image.src = imageUrl;

                image.onload = async () => {
                    const predictions = await model.detect(image);


                    const detectedClasses = predictions.map((prediction) => prediction.class);
                    detectedWords.push(...detectedClasses);
                    console.log('array', detectedWords)
                    const commonWord = extractCommonWords(detectedWords)
                    if (onUpload) {
                        onUpload({ predictions, commonWord });
                    }
                };
            });
        }



    }, [model, value]);



    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
                        <div className="z-10 absolute top-2 right-1">
                            <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={url}
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={handleImageUpload} uploadPreset="jbkophcf">
                {({ open }) => {
                    const onClick = () => {
                        open();
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 mr-2" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
};

export default ImageUpload;