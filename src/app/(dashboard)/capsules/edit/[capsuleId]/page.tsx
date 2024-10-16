import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICapsule } from "@/types/interfaces";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import EditCapsuleForm from "./form";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function CapsulteEditPage({ params }: { params: any}) {
    const capsuleId = params.capsuleId as string;

    const capsule = await getCapsule(capsuleId);
    if (!capsule) {
        redirect("/capsules");
    }

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold">Modifier une capsule</h1>
                <Link href="/capsules" className={buttonVariants({ variant: "default" })}>Retour à la liste</Link>
            </div>
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
    try {
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
    } catch (error) {
        redirect("/capsules");
    }
}