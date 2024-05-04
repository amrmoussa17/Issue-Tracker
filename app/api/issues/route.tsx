import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const issueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
  });

  const result = issueSchema.safeParse(body);
  if (!result.success)
    return NextResponse.json(result.error.issues, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}

export async function GET(request: NextRequest) {
  return NextResponse.json("hello world");
}
