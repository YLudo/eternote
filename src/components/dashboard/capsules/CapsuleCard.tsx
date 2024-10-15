"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IPartialCapsule } from "@/types/interfaces";
import { Calendar, MoreVertical, Pencil, Trash, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DialogHeader, DialogFooter, DialogContent, Dialog, DialogTitle } from "@/components/ui/dialog";

export default function CapsuleCard({ id, title, unlockDate, username, isClosed }: IPartialCapsule) {
    const isDateDefined = unlockDate !== null;
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        await deleteCapsule();
        setShowModal(false);
    };

    const deleteCapsule = async () => {
        try {
            const response = await fetch(`/api/capsules/delete/${id}`, { method: "DELETE" });
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Une erreur est survenue.");
            }

            toast({ title: "Suppression de capsule réussie !", description: "Vous avez supprimé votre capsule avec succès." });
            router.refresh();
        } catch (error: any) {
            toast({ title: "Suppression de capsule échouée !", description: error.message || "Une erreur est survenue." });
        }
    }

    return (
        <>
            <Card className="w-full h-fit">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle> 
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Ouvrir le menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                { !isClosed && 
                                <DropdownMenuItem asChild>
                                    <Link href={`/capsules/edit/${id}`}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Modifier</span>
                                    </Link>
                                </DropdownMenuItem>
                                }
                                <DropdownMenuItem className="text-red-500 focus:bg-red-500 focus:text-white hover:cursor-pointer" onClick={handleDeleteClick}>
                                    <Trash className="mr-2 h-4 w-4" />
                                    <span>Supprimer</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-2 pt-4">
                    <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{username}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                            {isDateDefined ? new Date(unlockDate!).toLocaleDateString() : "Date non défini"}
                        </span>
                    </div>
                </CardContent>
                <CardFooter>
                    <Badge variant={isClosed ? "default" : "secondary"}>
                        {isClosed ? "Verrouillée" : "Modifiable"}
                    </Badge>
                </CardFooter>
            </Card>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmer la suppression</DialogTitle>
                    </DialogHeader>
                    <p>
                        Êtes-vous sûr de vouloir supprimer cette capsule ? Cette action est
                        irréversible.
                    </p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Supprimer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}