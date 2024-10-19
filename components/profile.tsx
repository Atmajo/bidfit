import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User2 } from "lucide-react";

const Profile = () => {
  return (
    <Avatar className="">
      <AvatarImage />
      <AvatarFallback>
        <User2 className="text-black" />
      </AvatarFallback>
    </Avatar>
  );
};

export default Profile;
