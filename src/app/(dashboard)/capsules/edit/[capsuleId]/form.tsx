"use client";

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ICapsule } from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { fr } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const FormSchema = z.object({
    title: z
        .string()
        .min(3, {
            message: "Le titre de votre capsule doit faire 3 caractères minimum."
        }),
    content: z.string().nullable().optional(),
    unlockDate: z.date().nullable().optional(),
    isClosed: z.boolean().optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function EditCapsuleForm({ capsuleId, capsule }: { capsuleId: string, capsule: ICapsule }) {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState<FormData | null>(null);
    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: capsule,
    });

    const router = useRouter();

    const onSubmit = async (data: FormData) => {
        if (data.isClosed) {
            setFormData(data);
            setShowModal(true);
        } else {
            await submitForm(data);
        }
    };

    const submitForm = async (data: FormData) => {
        const { title, content, unlockDate, isClosed } = data;

        try {
            const response = await fetch(`/api/capsules/edit/${capsuleId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, content, unlockDate, isClosed }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Une erreur inconnue s'est produite.");
            }

            toast({ title: "Modification de capsule réussie !", description: "Vous avez modifié votre capsule avec succès." });
            router.push("/capsules");
            router.refresh();
        } catch (error: any) {
            toast({ title: "Modification de capsule échouée !", description: error.message || "Une erreur s'est produite." });
        }
    }

    const handleConfirm = async () => {
        if (formData) {
            await submitForm(formData);
            setShowModal(false);
        }
    };

    return (
        <>
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
                                    <Textarea placeholder="Entrez le contenu de votre capsule..." {...field} value={field.value ?? ""} />
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
                                            selected={field.value || undefined}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date < new Date()
                                            }
                                            initialFocus
                                        />
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                form.setValue("unlockDate", null);
                                            }}
                                            className="mt-2"
                                        >
                                            Effacer la date
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isClosed"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3">
                                <FormLabel>Verrouiller la capsule</FormLabel>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={(checked) => field.onChange(checked)}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">Modifier votre capsule</Button>
                </form>
            </Form>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la modification et le verrouillage</DialogTitle>
                    </DialogHeader>
                    <p>Êtes-vous sûr de vouloir verrouiller cette capsule ? Une fois verrouillée, elle ne pourra plus être modifiée.</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button onClick={handleConfirm}>Confirmer</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}