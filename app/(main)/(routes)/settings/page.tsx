"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Camera,
  CheckCircle2Icon,
  Instagram,
  Pen,
  TriangleAlertIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, PasswordInput } from "@/components/custom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageDropZone, { ImageFile } from "../../_components/image-dropzone";
import { Label } from "@/components/ui/label";
import { updateUser, User } from "@/actions/user.actions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { sendVerification } from "@/lib/auth/verification";
import { toast } from "sonner";

const Page = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, isLoading } = useUser();

  const [userData, setUserData] = useState<User | null>(user);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    image: "",
  });

  useEffect(() => {
    if (!isLoading) {
      setForm({
        name: user?.name!,
        phone: user?.phone!,
        image: user?.image!,
      });

      setUserData(user);
    }
  }, [user, isLoading]);

  const handleUploadComplete = useCallback((urls: string[]) => {
    setUploadedUrls(urls);
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoadingForm(true);

    try {
      const updatedUser = await updateUser({
        id: userData?.id!,
        ...form,
        image: uploadedUrls[0] ?? userData?.image ?? "",
      });

      setUserData(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoadingForm(false);
    }
  }

  async function handleVerification(event: any) {
    const res = await sendVerification(userData!);

    if (res.messageId) {
      toast.success("Verification email sent successfully");
    } else {
      toast.error("Error sending verification email");
    }
  }

  return (
    <section className="flex flex-col justify-center items-center px-4 py-8 ">
      <div className="max-w-5xl w-full">
        <div className="flex flex-col justify-normal w-full h-max bg-[#151515] px-10 py-5 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-7 w-2 bg-white rounded-lg"></div>
              <h1 className="text-xl font-semibold">Details</h1>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-sky-600 hover:bg-sky-800"
                  onClick={() => setOpen(true)}
                  disabled={isLoading}
                >
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-800 max-w-xl border-none">
                <DialogHeader>Edit Profile</DialogHeader>
                <ImageDropZone
                  images={images}
                  setImages={setImages}
                  onUploadComplete={handleUploadComplete}
                />
                <div className="flex flex-row justify-between my-5">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      type="text"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                    />
                  </div>
                </div>
                <div className="flex justify-end items-end">
                  <Button
                    type="submit"
                    className="bg-sky-600 hover:bg-sky-800"
                    onClick={onSubmit}
                    disabled={isLoadingForm}
                  >
                    {!isLoadingForm ? "Save" : "Saving"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="py-5 h-full">
            <div className="flex flex-row gap-14 h-full">
              {userData?.image ? (
                <div className="relative p-1">
                  <img
                    loading={"lazy"}
                    src={userData?.image!}
                    alt={userData?.name!}
                    width={150}
                    height={150}
                    className="bg-white rounded-full"
                  />
                </div>
              ) : (
                <Skeleton className="w-[150px] h-[130px] rounded-full" />
              )}
              <div className="flex flex-col justify-between w-full max-h-full">
                <div className="flex gap-2 items-center">
                  {!isLoading ? (
                    <h1 className="text-lg">{userData?.name!}</h1>
                  ) : (
                    <Skeleton className="w-[120px] h-5 rounded-lg" />
                  )}
                  <TooltipProvider>
                    {userData?.emailVerified ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CheckCircle2Icon className="text-green-500 w-5 h-5" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Email Verified</p>
                        </TooltipContent>
                      </Tooltip>
                    ) : (
                      !isLoading && (
                        <button onClick={handleVerification}>
                          <TriangleAlertIcon className="text-yellow-500 w-5 h-5" />
                        </button>
                      )
                    )}
                  </TooltipProvider>
                </div>
                <div className="flex gap-20 h-14">
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Role</p>
                    {!isLoading ? (
                      <h1>
                        {userData?.role.slice(0, 1)}
                        {userData?.role.slice(1).toLowerCase()}
                      </h1>
                    ) : (
                      <Skeleton className="w-[100px] h-5 rounded-lg" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Email Address</p>
                    {!isLoading ? (
                      <h1>{userData?.email}</h1>
                    ) : (
                      <Skeleton className="w-[120px] h-5 rounded-lg" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Phone Number</p>
                    {!isLoading ? (
                      <h1>{userData?.phone}</h1>
                    ) : (
                      <Skeleton className="w-[120px] h-5 rounded-lg" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
