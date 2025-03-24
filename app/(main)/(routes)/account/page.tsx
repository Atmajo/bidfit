"use client";

import React, { useCallback, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import FileUploadDropzone from "@/components/shared/file-upload-dropzone";
import { toast } from "sonner";
import { LucideLoader } from "lucide-react";

const Page = () => {
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    image: null,
    role: "",
  });
  const [profileImage, setProfileImage] = useState<String | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getProfile = useCallback(async () => {
    setIsLoading(true);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users/profile";
    try {
      const response = await fetch(url, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  
  const handleProfileUpdate = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_URL + "/api/users/profile";
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          image: profileImage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setProfile(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row justify-center items-center min-h-screen p-4 gap-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile Image</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2">
          <Avatar className="h-24 w-24">
            {profile.image ? (
              <AvatarImage src={profile.image} alt={profile.name} />
            ) : (
              <AvatarFallback className="text-2xl">
                {profile.name?.charAt(0) || "U"}
              </AvatarFallback>
            )}
          </Avatar>

          <div className="w-full">
            <FileUploadDropzone
              onFileUpload={(file, imageUrl) => {
                if (imageUrl) {
                  setProfileImage(
                    process.env.NEXT_PUBLIC_BACKEND_URL + imageUrl
                  );
                }
              }}
              isLoading={isSubmitting}
              allowMultiple={false}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile.name || ""}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email || ""}
                  placeholder="Your email"
                />
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <Input
                  value={profile.role || ""}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LucideLoader className="w-5 h-5 animate-spin mr-2" />
                    Updating
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default Page;
