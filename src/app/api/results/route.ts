import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// POST: Save a new typing result
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { language, wpm, accuracy, errors, duration } = await req.json();

    const student = await prisma.student.findUnique({
      where: { email: session.user.email }
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const result = await prisma.typingResult.create({
      data: {
        studentId: student.id,
        language,
        wpm: parseFloat(wpm),
        accuracy: parseFloat(accuracy),
        errors: parseInt(errors),
        duration: parseInt(duration),
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Save result error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Fetch top results for leaderboard
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language") || "English";

  try {
    const leaderboard = await prisma.typingResult.findMany({
      where: { language },
      orderBy: { wpm: "desc" },
      take: 10,
      include: {
        student: {
          select: { name: true }
        }
      }
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Leaderboard fetch error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
