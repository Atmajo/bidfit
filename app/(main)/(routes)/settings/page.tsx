"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";
import React, { ChangeEvent, useEffect, useState } from "react";
import Loader from "../../_components/loading";
import { useLoading } from "@/provider/loading-provider";
import {
  Camera,
  CheckCircle2Icon,
  Instagram,
  Pen,
  TriangleAlertIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/custom";

const Page = () => {
  const [edit, setEdit] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const { user, isLoading } = useUser();
  const { setLoading } = useLoading();

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
    }
  }, [user, isLoading]);

  if (isLoading) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
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
            <Button
              className="bg-sky-600 hover:bg-sky-800"
              onClick={() => setEdit(!edit)}
              disabled={isLoadingForm}
            >
              {edit ? "Save" : "Edit"}
            </Button>
          </div>
          <div className="py-5 h-full">
            <div className="flex flex-row gap-14 h-full">
              {user?.image ? (
                <div className="relative p-1">
                  <img
                    src={user?.image!}
                    alt={user?.name!}
                    width={150}
                    height={150}
                    className="bg-white rounded-full"
                  />
                  {edit && (
                    <Camera className="w-4 h-4 absolute right-0 bottom-0" />
                  )}
                </div>
              ) : (
                <Skeleton className="w-[150px] h-[130px] rounded-full" />
              )}
              <div className="flex flex-col justify-between w-full max-h-full">
                <div className="flex gap-2 items-center">
                  {!edit ? (
                    !isLoading ? (
                      <h1 className="text-lg">{user?.name!}</h1>
                    ) : (
                      <Skeleton className="w-[120px] h-5 rounded-lg" />
                    )
                  ) : (
                    <Input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  )}
                  {user?.emailVerified ? (
                    <CheckCircle2Icon className="text-green-500 w-5 h-5" />
                  ) : (
                    !isLoading && (
                      <button>
                        <TriangleAlertIcon className="text-yellow-500 w-5 h-5" />
                      </button>
                    )
                  )}
                </div>
                <div className="flex gap-20 h-14">
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Role</p>
                    {!isLoading ? (
                      <h1>
                        {user?.role.slice(0, 1)}
                        {user?.role.slice(1).toLowerCase()}
                      </h1>
                    ) : (
                      <Skeleton className="w-[100px] h-5 rounded-lg" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Email Address</p>
                    {!isLoading ? (
                      <h1>{user?.email}</h1>
                    ) : (
                      <Skeleton className="w-[120px] h-5 rounded-lg" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-white/45">Phone Number</p>
                    {!edit ? (
                      !isLoading ? (
                        <h1>{user?.phone}</h1>
                      ) : (
                        <Skeleton className="w-[120px] h-5 rounded-lg" />
                      )
                    ) : (
                      <Input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                      />
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
