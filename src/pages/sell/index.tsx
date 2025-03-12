import { CircleX, Info } from "lucide-react";
import React, { useState, useRef } from "react";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select";
import { Textarea } from "src/components/ui/textarea";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/tooltip";

interface FormData {
  productName: string;
  productPrice: string;
  productCategory: string;
  productDescription: string;
  productFile: File;
}

const Sell = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false); // Track if the input is focused
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<FormData>();
  const productNameValue = watch("productName"); // Watch the product name value

  const handleClick = () => {
    fileInputRef.current?.click(); // Triggers file selection dialog
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Preview the selected image
    }
  };
  const onSubmit = async (data: FormData) => {
    // Trigger file validation manually

    // Log the form data
    console.log("Form Data submitted:", data);

    // You can now proceed with form submission, e.g., send to an API or update state
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null); // Clear the selected file
  };

  return (
    <div className="relative">
      <div className="mt-24 flex items-center justify-center w-1/2 mx-auto relative">
        <div className="flex w-full z-50">
          <div className="w-1/2">
            <form
              className="w-11/12 flex flex-col justify-between h-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Conditionally render product name input or display the product name */}
              {isFocused ||
              productNameValue == undefined ||
              productNameValue == "" ? (
                <>
                  <Input
                    placeholder="Enter product name..."
                    {...register("productName")}
                    autoFocus={isFocused} // Optional: Set autofocus based on the state
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="h-[68px] "
                    style={{ fontSize: "32px" }} // Inline style to apply font size
                    required
                  />
                </>
              ) : (
                <div className="flex items-center justify-between">
                  <h3 className="mt-4 font-bold text-2xl ms-5 text-gray-700 text-[32px] mb-5">
                    {productNameValue}
                  </h3>
                  <Button onClick={() => setIsFocused(true)}>Edit</Button>
                </div>
              )}

              <div className="flex items-center ">
                <div className="flex items-center ">
                  <Label className="me-3">Price </Label>
                  <Input
                    className="w-14 me-3 my-5 hide-number-input-buttons"
                    type="number"
                    {...register("productPrice")}
                    required
                  />
                  €
                </div>

                <div className="ms-8">
                  <Select {...register("productCategory")} required>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Product Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ui_kits">UI Kits</SelectItem>
                      <SelectItem value="icons">Icons</SelectItem>
                      <SelectItem value="images">Images</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {selectedFile ? (
                <div className="mt-1 mb-4 flex items-center">
                  <p className="text-lg">Selected File: {selectedFile.name}</p>
                  <Button
                    onClick={handleRemoveFile}
                    className="mt-2 ms-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                  >
                    Remove file
                  </Button>
                </div>
              ) : (
                <div className="flex items-center h-[56px] mt-1 mb-4">
                  <label
                    htmlFor="file-input"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-blue-600 w-32"
                  >
                    Upload a file
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        {" "}
                        <Info className="cursor-pointer ms-2" />
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Allowed formats: .jpg, .jpeg, .png, .txt</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <input
                    id="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .txt"
                    className="hidden"
                    {...register("productFile", {
                      required: "File is required",
                    })} // Add required validation here
                    onChange={handleFileChange}
                    required
                  />
                </div>
              )}

              <div>
                <Textarea
                  placeholder="Describe your product..."
                  className="h-40"
                  {...register("productDescription")}
                  required
                />
              </div>

              <div className="mt-auto">
                <Button
                  variant={"destructive"}
                  className="mt-8 w-full h-12"
                  type="submit"
                  //   disabled={!isValid} // Disable if form is invalid
                >
                  Upload Product
                </Button>
              </div>
            </form>
          </div>

          <div
            className="relative bg-zinc-100 w-1/2 overflow-hidden rounded-xl group hover:cursor-pointer flex flex-col items-center justify-center"
            onClick={handleClick}
          >
            {selectedImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={selectedImage}
                  alt="Product image"
                  fill
                  loading="eager"
                  className="cursor-pointer object-fit h-full w-full object-cover object-left "
                />
                <CircleX
                  className="z-50 text-gray-700 top-[14px] right-[14px] absolute animate-pulse hover:text-gray-500 transition-colors duration-1500"
                  size={42}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                />
              </div>
            ) : (
              <>
                <Image
                  src={"/websiteImages/filePlaceholder.png"}
                  alt="Product image"
                  width={150}
                  height={150}
                  loading="eager"
                  className="cursor-pointer"
                />
                <p className="text-center mt-2">Upload Your Preview Image</p>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden z-50"
              onChange={handleImageUpload}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;
