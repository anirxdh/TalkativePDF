"use client";

import { Message } from "./Chat";
import { User } from "@clerk/nextjs/server";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

function ChatMessage({ message }: { message: Message }) {
  const { user } = useUser();

  return (
    <div
      className={`flex items-start gap-5 pr-5 py-5 ${
        message.role === "ai" ? "bg-grey-100" : ""
      }`}
    >
      {message.role === "ai" ? (
        <Avatar className="w-8 h-8">
          <AvatarImage src="/ai-avatar.png" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      ) : (
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 space-y-2 overflow-x-hidden">
        <p className="text-sm text-grey-600">
          {message.role === "ai" ? "AI Assistant" : "You"}
        </p>

        <p className="text-sm">{message.message}</p>
      </div>
    </div>
  );
}

export default ChatMessage; 