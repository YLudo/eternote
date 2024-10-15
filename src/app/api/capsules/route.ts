import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
      const session = await getServerSession(authOptions);

      if (!session) {
        return NextResponse.json({ message: "Vous devez vous authentifier."}, { status: 401 });
      }

      const { title, content, unlockDate, isClosed } = await request.json();

      if (unlockDate) {
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
      }

      const capsuleData: any = {
        title,
        content,
        isClosed,
        userId: session.user.id,
      };
      
      if (unlockDate) {
        capsuleData.unlockDate = new Date(unlockDate);
      }

      if (isClosed === true && !capsuleData.unlockDate) {
        return NextResponse.json(
          { message: "Vous devez spécifier une date d'ouverture lorsque la capsule est verrouillée." },
          { status: 400 }
        );
      }
      
      const capsule = await prisma.capsule.create({
        data: capsuleData,
      });

      return NextResponse.json({ message: "Votre capsule a été créé avec succès." }, { status: 201 });
    } catch (e) {
        return NextResponse.json({ message: "Erreur interne du serveur" }, { status: 500 });
    }
}