import React from "react";
import prisma from "@/lib/utils/prisma";
export default async function TopBar() {
  const user = await prisma?.user.findFirst({});
  const unreadMails = await prisma.mail.findMany({
    where: {
      isRead: false,
    },
  });

  const totalMails = await prisma.mail.findMany({});

  return (
    <div className="border w-full">
      <div className="h-24 container flex items-center w-full">
        <h3 className="text-2xl">
          Hello, {user?.name}. You currently have {unreadMails?.length} unread
          messages out of {totalMails.length}
        </h3>
      </div>
    </div>
  );
}
