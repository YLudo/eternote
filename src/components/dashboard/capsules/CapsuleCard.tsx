import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IPartialCapsule } from "@/types/interfaces";
import { Calendar, MoreVertical, Pencil, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CapsuleCard({ id, title, unlockDate, username, isClosed }: IPartialCapsule) {
    const isDateDefined = unlockDate !== null;

    return (
        <Card className="w-full h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">{title}</CardTitle>
                {!isClosed && 
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={`/capsules/edit/${id}`}>
                                    <Pencil className="mr-2 h-4 w-4" />
                                    <span>Modifier</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                }
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
    );
}