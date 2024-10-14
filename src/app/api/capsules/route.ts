import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Vous devez vous authentifier. "}, { status: 401 });
        }

        const { title, content, unlockDate } = await request.json();

        if (new Date(unlockDate) <= new Date()) {
            return NextResponse.json({ message: "Vous devez spécifier une date dans le futur." }, { status: 400 });
        }

        const capsule = await prisma.capsule.create({
            data: {
                title,
                content,
                unlockDate: new Date(unlockDate),
                userId: session.user.id,
            },
        });

        return NextResponse.json({ message: "Votre capsule a été créé avec succès." }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
}