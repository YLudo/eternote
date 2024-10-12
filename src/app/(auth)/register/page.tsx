import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./form";

export default async function RegisterPage() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>S'inscrire</CardTitle>
                <CardDescription>Remplissez les champs ci-dessous pour vous créer un compte.</CardDescription>
            </CardHeader>
            <CardContent>
                <RegisterForm />
            </CardContent>
        </Card>
    );
}