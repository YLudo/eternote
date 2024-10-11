"use client";

import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const FormSchema = z.object({
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
    password: z
        .string()
        .min(6, {
            message: "Votre mot de passe doit faire 6 caractères minimum."
        }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        const { email, password } = data;

        try {
            const response: any = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (response?.error) {
                throw new Error(response.error);
            }

            toast({ title: "Connexion réussié !", description: "Vous vous êtes connecté avec succès." });

            router.push("/");
            router.refresh();
        } catch (error: any) {
            toast({ title: "Connexion échouée !", description: error.message || "Une erreur s'est produite." })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Adresse e-mail</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre adresse e-mail" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mot de passe</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Entrez votre adresse e-mail" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Se connecter</Button>
                <p className="text-sm text-center">Vous n'avez pas de compte ? <Link href="/register" className="text-primary">S'inscrire</Link></p>
            </form>
        </Form> 
    )
}