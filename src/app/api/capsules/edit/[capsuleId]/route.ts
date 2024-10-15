import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request, params: any) {
  try {
    const capsuleId = params.params.capsuleId as string;

    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Vous devez vous authentifier."}, { status: 401 });
    }

    const { title, content, unlockDate, isClosed } = await request.json();

    const existingCapsule = await prisma.capsule.findUnique({
      where: { id: capsuleId },
    });

    if (!existingCapsule) {
      return NextResponse.json({ message: "La capsule spécifiée n'existe pas." }, { status: 404 });
    }

    if (existingCapsule.isClosed) {
      return NextResponse.json({ message: "La capsule est verrouillé et ne peut pas être modifiée." }, { status: 403 });
    }

    const capsuleData: any = { title, content };

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

    if (isClosed === true && !capsuleData.unlockDate) {
      return NextResponse.json(
        { message: "Vous devez spécifier une date d'ouverture lorsque la capsule est verrouillée." },
        { status: 400 }
      );
    }

    if (isClosed !== null) {
      capsuleData.isClosed = isClosed;
    }

    const updatedCapsule = await prisma.capsule.update({
      where: { id: capsuleId },
      data: capsuleData,
    });

    return NextResponse.json({ message: "Votre capsule a été modifiée avec succès." }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: "Erreur interne du serveur." }, { status: 500 });
  }
}