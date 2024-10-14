import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import prisma from "@/lib/prisma";
import CapsuleList from "@/components/dashboard/capsules/CapsuleList";
import { ICapsule } from "@/types/interfaces";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function CapsuleListPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
        redirect("/login");
    }

    const capsules = await getCapsules(session.user.id);

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold">Liste de mes capsules</h1>
                <Link href="/capsules/create" className={buttonVariants({ variant: "default" })}>Créer une capsule</Link>
            </div>
            <CapsuleList capsules={capsules} />
        </>
    )
}

async function getCapsules(userId: string): Promise<ICapsule[]> {
    const capsules =  await prisma.capsule.findMany({
        where: {
            userId: userId,
        },
        select: {
            title: true,
            unlockDate: true,
            user: {
                select: {
                    username: true,
                }
            }
        }
    });

    return capsules.map(capsule => ({
        title: capsule.title,
        unlockDate: capsule.unlockDate,
        username: capsule.user.username,
    }));
}