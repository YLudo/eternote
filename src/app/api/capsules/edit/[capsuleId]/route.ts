import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, params: any) {
  try {
    const capsuleId = params.params.capsuleId as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Vous devez vous authentifier."}, { status: 401 });
    }

    const { title, content, unlockDate } = await request.json();

    const capsuleData: any = {
      title,
      content,
      userId: session.user.id,
    };

    if (unlockDate !== undefined) {
      if (unlockDate === null) {
        capsuleData.unlockDate = null;
      } else {
        const unlockDateObj = new Date(unlockDate);
        if (isNaN(unlockDateObj.getTime())) {
          return NextResponse.json(
            { message: "La date d'ouverture n'est pas valide." },
            { status: 400 }
          );
        }
        if (unlockDateObj <= new Date()) {
          return NextResponse.json(
            { message: "Vous devez spécifier une date dans le futur." },
            { status: 400 }
          );
        }
        capsuleData.unlockDate = unlockDateObj;
      }
    }

    const capsule = await prisma.capsule.update({
      where: {
        id: capsuleId,
      },
      data: capsuleData,
    });

    return NextResponse.json({ message: "Votre capsule a été modifiée avec succès." }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 });
  }
}