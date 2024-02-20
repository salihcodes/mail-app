import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import prisma from "@/lib/utils/prisma";

export default async function Home() {
  const user = await prisma?.user.findFirst({});
  const unreadMails = await prisma.mail.findMany({
    where: {
      isRead: false,
    },
  });

  const totalMails = await prisma.mail.findMany({});
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Hello {user?.name}</CardTitle>
          <CardDescription>
            You have {unreadMails.length} unread messages out of{" "}
            {totalMails.length} unread messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/messages">Read Messages</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
