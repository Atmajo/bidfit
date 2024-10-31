"use client";

import React, { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import ImageDropZone from "../../_components/image-dropzone";
import type { ImageFile } from "../../_components/image-dropzone";
import { useAuth } from "@/hooks/use-auth";
import { addSell } from "@/actions/sell.actions";
import { toast } from "sonner";

const SellPage = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    condition: "",
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback((value: string, field: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleUploadComplete = useCallback((urls: string[]) => {
    setUploadedUrls(urls);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (images.length === 0) {
        alert("Please upload at least one image");
        return;
      }

      const allImagesUploaded = images.every((img) => img.uploadedUrl);
      if (!allImagesUploaded) {
        alert("Please wait for all images to finish uploading");
        return;
      }

      const submissionData = {
        ...formData,
        images: images
          .map((img) => img.uploadedUrl)
          .filter((img) => img !== undefined),
        userId: userId!,
      };

      // Here you would typically send the data to your backend
      await addSell(submissionData)
        .then((data) => {
          if (data.success) {
            toast.success("Item listed successfully");
            setFormData({
              title: "",
              category: "",
              description: "",
              price: "",
              condition: "",
            });
            setUploadedUrls([]);
          } else {
            toast.error("Error listing item");
          }
        })
        .catch((err) => console.error(err));
    },
    [images, formData]
  );

  return (
    <div className="min-h-screen text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-white hover:text-blue-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Link>
        </div>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              List an Item for Sale
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <ImageDropZone
                images={images}
                setImages={setImages}
                onUploadComplete={handleUploadComplete}
              />

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="What are you selling?"
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-white">
                  Category
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "category")
                  }
                >
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="art" className="text-white">
                      Art
                    </SelectItem>
                    <SelectItem value="fashion" className="text-white">
                      Fashion
                    </SelectItem>
                    <SelectItem value="jewelry" className="text-white">
                      Jewelry
                    </SelectItem>
                    <SelectItem value="clothing" className="text-white">
                      Clothing
                    </SelectItem>
                    <SelectItem value="collectibles" className="text-white">
                      Collectibles
                    </SelectItem>
                    <SelectItem value="others" className="text-white">
                      Others
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item in detail..."
                  className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 min-h-[150px]"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price" className="text-white">
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400 pl-8"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Condition */}
              <div className="space-y-2">
                <Label htmlFor="condition" className="text-white">
                  Condition
                </Label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange(value, "condition")
                  }
                >
                  <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="new" className="text-white">
                      New
                    </SelectItem>
                    <SelectItem value="like-new" className="text-white">
                      Like New
                    </SelectItem>
                    <SelectItem value="good" className="text-white">
                      Good
                    </SelectItem>
                    <SelectItem value="fair" className="text-white">
                      Fair
                    </SelectItem>
                    <SelectItem value="poor" className="text-white">
                      Poor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <div>
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  disabled={
                    images.length > 0 && !images.every((img) => img.uploadedUrl)
                  }
                >
                  List Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellPage;
