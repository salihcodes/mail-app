import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import React from "react";
import { truncate } from "lodash";
import { Mail } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mail`);
  const mail = await res.json();

  return (
    <div className="container pt-12 w-full h-screen">
      <h2 className="text-3xl font-semibold">Messages</h2>
      <p className="text-lg font-medium">Your list of messages</p>
      {mail?.length === 0 ? (
        <p className="text-xl pt-12">No messages were found</p>
      ) : (
        <div className="space-y-12 flex-1">
          <ScrollArea className="h-full pt-12">
            {mail?.map((message: Mail) => (
              <Link key={message.id} href={`/messages/${message?.id}`}>
                <Card className="h-24 w-[450px]">
                  <CardHeader>
                    <CardTitle className="flex items-center w-full justify-between">
                      <p>{message?.subject}</p>
                      {!message.isRead && <Badge>New</Badge>}
                    </CardTitle>
                    <CardDescription>
                      {truncate(message.content, { length: 100 })}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
