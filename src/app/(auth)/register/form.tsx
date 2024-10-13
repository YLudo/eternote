"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

const FormSchema = z.object({
    username: z
        .string()
        .min(3, {
            message: "Votre nom d'utilisateur doit faire 3 caractères minimum."
        }),
    email: z
        .string()
        .email({
            message: "Vous devez renseigner une adresse e-mail valide."
        }),
    password: z
        .string()
        .min(6, {
            message: "Votre mot de passe doit faire 6 caractères minimum."
        })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*.?&])[A-Za-z\d@$!%*.?&]{6,}$/, {
            message: "Votre mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial."
        }),
});

type FormData = z.infer<typeof FormSchema>;

export default function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        const { username, email, password } = data;

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Une erreur inconnue s'est produite.");
            }

            toast({ title: "Inscription réussie !", description: "Un lien d'activation a été envoyé à votre adresse e-mail." });
        } catch (error: any) {
            toast({ title: "Inscription échouée !", description: error.message || "Une erreur s'est produite." });
        }
    };

    return (
       <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom d'utilisateur</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez votre nom d'utilisateur" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                                <Input type="password" placeholder="Entrez votre mot de passe" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">S'inscrire</Button>
                <p className="text-sm text-center">Vous avez déjà un compte ? <Link href="/login" className="text-primary">Se connecter</Link></p>
            </form>
       </Form> 
    )
}