import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, whatsapp, email } = body;

    // Validate required fields — only name & mobile are required
    if (!name || !contact) {
      return NextResponse.json(
        { message: 'Name aur Mobile Number zaroori hai.' },
        { status: 400 }
      );
    }

    // Mobile number must be 10 digits
    const cleanContact = contact.trim().replace(/\D/g, '');
    if (cleanContact.length < 10) {
      return NextResponse.json(
        { message: 'Sahi Mobile Number daalo (10 digit).' },
        { status: 400 }
      );
    }

    // Check if mobile number already registered
    const existingByContact = await prisma.student.findUnique({
      where: { contact: cleanContact },
    });
    if (existingByContact) {
      return NextResponse.json(
        { message: 'Yeh Mobile Number pehle se register hai. Sign In karein.' },
        { status: 400 }
      );
    }

    // Check email uniqueness only if email is provided
    if (email && email.trim() !== '') {
      const existingByEmail = await prisma.student.findUnique({
        where: { email: email.trim().toLowerCase() },
      });
      if (existingByEmail) {
        return NextResponse.json(
          { message: 'Yeh Email pehle se register hai.' },
          { status: 400 }
        );
      }
    }

    // Create user — no password needed
    const newUser = await prisma.student.create({
      data: {
        name: name.trim(),
        contact: cleanContact,
        whatsapp: whatsapp?.trim() || null,
        email: email?.trim().toLowerCase() || null,
        password: null,
      },
    });

    return NextResponse.json(
      { message: 'Registration successful', userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'Registration mein kuch problem aai. Dobara try karein.' },
      { status: 500 }
    );
  }
}
