import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const dynamic = "force-dynamic";

export default async function MessageDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/mail/${id}`);

  const mail = await res.json();
  return (
    <div className="container w-full h-screen">
      <Button variant="link" className="text-primary" asChild>
        <Link href="./">
          <ArrowLeft />
          Back to messages
        </Link>
      </Button>

      <h2 className="text-3xl font-semibold">{mail?.subject}</h2>
      <p className="text-lg font-medium max-w-3xl">{mail?.content}</p>
    </div>
  );
}
