"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as  z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { fr } from "date-fns/locale";

const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
};

const FormSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Le titre de votre capsule doit faire 3 caractères minimum."
        }),
    content: z
        .nullable(
            z.string()
        ),
    unlockDate: z.date({
        required_error: "Vous devez spécifier une date d'ouverture.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function CreateCapsuleForm() {
    const router = useRouter();
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
            unlockDate: getTomorrowDate(),
        },
    });

    const onSubmit = async (data: FormData) => {
        const { title, content, unlockDate } = data;

        try {
            const response = await fetch("/api/capsules", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content, unlockDate }),
            });
    
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Une erreur inconnu s'est produite.");
            }
    
            toast({ title: "Création de capsule réussie !", description: "Vous avez créé votre capsule avec succès."});

            router.push("/dashboard");
            router.refresh();
        } catch (error: any) {
            toast({ title: "Création de capsule échouée !", description: error.message || "Une erreur s'est produite." });
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre de la capsule</FormLabel>
                            <FormControl>
                                <Input placeholder="Entrez le titre de votre capsule" {...field} />         
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contenu de la capsule</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Entrez le contenu de votre capsule..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="unlockDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date d'ouverture</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal w-full",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP", { locale: fr })
                                            ) : (
                                                <span>Choisissez une date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date < new Date()
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">Créer votre capsule</Button>
            </form>
        </Form>
    )
}