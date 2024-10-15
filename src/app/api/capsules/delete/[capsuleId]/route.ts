import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(request: Request, params: any) {
    try {
        const capsuleId = params.params.capsuleId as string;

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Vous devez vous authentifier." }, { status: 401 });
        }

        const capsule = await prisma.capsule.findUnique({
            where: { id: capsuleId },
        });

        if (!capsule) {
            return NextResponse.json({ message: "La capsule spécifiée n'existe pas." }, { status: 401 });
        }

        if (capsule.userId !== session.user.id) {
            return NextResponse.json({ message: "Vous n'êtes pas autorisé à supprimer cette capsule." }, { status: 403 });
        }

        const deletedCapsule = await prisma.capsule.delete({
            where: { id: capsuleId },
        });
        
        return NextResponse.json({ message: "Votre capsule a été supprimée avec succès." }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 });
    }
}