import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/utils/prisma";

export const dynamic = "force-dynamic";

/**
 * @swagger
 * /api/mails/{id}:
 *   get:
 *     summary: Update the read status of a mail by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *       '500':
 *         description: Internal Server Error
 */

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const mail = await prisma?.mail.update({
      where: { id: id },
      data: { isRead: true },
    });

    return NextResponse.json(mail, { status: 200 });
  } catch (error) {
    return NextResponse.json("Error updating mail status", { status: 500 });
  }
}
