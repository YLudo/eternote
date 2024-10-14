import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CreateCapsuleForm from "./form";

export default function CapsuleCreatePage() {
    return (
        <>
            <h1 className="text-2xl font-semibold">Créer une capsule</h1>
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