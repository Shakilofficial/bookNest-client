/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUploadProps } from "@/types";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

export function FileUpload({
  name,
  label,
  icon: Icon,
  description,
  acceptedFileTypes,
  maxFileSize,
}: FileUploadProps) {
  const { control } = useFormContext();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {label}
          </FormLabel>
          <FormControl>
            <div
              className={`relative flex items-center justify-center w-full ${
                dragActive ? "border-primary" : "border-input"
              } border-2 border-dashed rounded-lg p-6`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={(e) => {
                handleDrag(e);
                const file = e.dataTransfer.files[0];
                if (file && (!maxFileSize || file.size <= maxFileSize)) {
                  onChange(file);
                }
              }}
            >
              <FormLabel htmlFor={name} className="sr-only">
                {label}
              </FormLabel>
              <Input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file && (!maxFileSize || file.size <= maxFileSize)) {
                    onChange(file);
                  }
                }}
                accept={acceptedFileTypes?.join(",")}
                {...rest}
              />
              <div className="text-center">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                {acceptedFileTypes && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Accepted file types: {acceptedFileTypes.join(", ")}
                  </p>
                )}
                {maxFileSize && (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Max file size: {maxFileSize / 1000000}MB
                  </p>
                )}
              </div>
            </div>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
