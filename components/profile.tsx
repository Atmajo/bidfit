import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";

const Profile = () => {
  const { user } = useUser();

  return (
    <Avatar className="">
      <AvatarImage src={user?.image!} className="bg-white" />
      <AvatarFallback>
        <User2 className="text-black" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Profile;
