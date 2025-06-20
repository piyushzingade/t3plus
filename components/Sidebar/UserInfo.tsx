import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {  useSession } from "next-auth/react";
import {  LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  if (status === "authenticated" && session?.user) {
    return (
      <div 
      onClick={() => router.push("/settings/account")}
      className="p-4 border-[#e6c4de] mb-3">
        <div className="flex items-center space-x-3 hover:bg-white dark:hover:bg-[#261922] px-2 py-3 rounded-lg cursor-pointer">
          <Avatar>
            <AvatarFallback className="bg-blue-600 text-white">
              {session.user.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <span className="text-xs text-[#a74576] block truncate">
              {session.user.email}
            </span>
            <p className="text-xs text-[#a74576]">Free</p>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated
  return (
    <div
      onClick={() => router.push("/auth")}
      className="p-4 border-[#e6c4de] hover:bg-white dark:hover:bg-[#261922] m-3 rounded-lg cursor-pointer"
    >
      <button className="flex items-center text-[#a74576] text-md font-medium gap-2 cursor-pointer ml-2">
        <LogOut className="w-4 h-4 text-[#a74576]" />
        <span className="pl-4">Login</span>
      </button>
    </div>
  );
}
