"use client";

import ChatCard from "@/components/ChatCard/ChatCard";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const threadId = params?.threadId as string | undefined;
  
  const [isCollapsed] = useState(false);
  return (
    <div className="flex-1 transition-all duration-300 h-screen">
      <ChatCard
        threadId={threadId}
        isCollapsed={isCollapsed}
      />
    </div>
  );
}
