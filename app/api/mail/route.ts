import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/mails:
 *   get:
 *     summary: Return all mails in database
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal Server Error
 */
export async function GET(request: NextRequest) {
  try {
    const mail = await prisma?.mail.findMany();
    return NextResponse.json(mail, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error getting mail", { status: 500 });
  }
}
