import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./form";

export default async function LoginPage() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Se connecter</CardTitle>
                <CardDescription>Remplissez les champs ci-dessous pour vous connecter à votre compte.</CardDescription>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
        </Card>
    );
}