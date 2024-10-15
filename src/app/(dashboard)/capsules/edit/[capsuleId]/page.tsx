import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICapsule } from "@/types/interfaces";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import EditCapsuleForm from "./form";

export default async function CapsulteEditPage({ params }: { params: any}) {
    const capsuleId = params.capsuleId as string;

    const capsule = await getCapsule(capsuleId);
    if (!capsule) {
        redirect("/capsules");
    }

    return (
        <>
            <h1 className="text-2xl font-semibold">Modifier une capsule</h1>
            <Card className="max-w-lg">
                <CardHeader>
                    Informations de base
                </CardHeader>
                <CardContent>
                    <EditCapsuleForm capsuleId={capsuleId} capsule={capsule} />
                </CardContent>
            </Card>
        </>
    )
}

async function getCapsule(capsuleId: string): Promise<ICapsule | null> {
    const capsule = await prisma.capsule.findUnique({
        where: {
            id: capsuleId,
        },
        select: {
            title: true,
            content: true,
            unlockDate: true,
            isClosed: true,
        }
    });

    return capsule;
}