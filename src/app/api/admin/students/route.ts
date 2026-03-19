import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { message: 'Unauthorized access.' },
        { status: 401 }
      );
    }

    const students = await prisma.student.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        contact: true,
        whatsapp: true,
        createdAt: true,
      }
    });

    return NextResponse.json(students);
  } catch (error) {
    console.error('Fetch Students Error:', error);
    return NextResponse.json(
      { message: 'An error occurred while fetching students.' },
      { status: 500 }
    );
  }
}
