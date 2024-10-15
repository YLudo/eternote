import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreateCapsuleForm from "./form";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CapsuleCreatePage() {
    return (
        <>
            <div className="flex w-full items-center justify-between">
                <h1 className="text-2xl font-semibold">Créer une capsule</h1>
                <Link href="/capsules" className={buttonVariants({ variant: "default" })}>Retour à la liste</Link>
            </div>
            <Card className="max-w-lg">
                <CardHeader>
                    Informations de base
                </CardHeader>
                <CardContent>
                    <CreateCapsuleForm />
                </CardContent>
            </Card>
        </>
    )
}