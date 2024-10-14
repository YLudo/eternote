import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IPartialCapsule } from "@/types/interfaces";
import { Calendar, User } from "lucide-react";
import Link from "next/link";

export default function CapsuleCard({ id, title, unlockDate, username }: IPartialCapsule) {
    const isDateDefined = unlockDate !== null;
    const isCapsuleOpen = isDateDefined && new Date(unlockDate) <= new Date();

    return (
        <Link href={`/capsules/edit/${id}`}>
            <Card className="w-full h-fit">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-xl font-bold">{title}</CardTitle>
                    <Badge variant={isDateDefined ? (isCapsuleOpen ? "default" : "destructive") : "secondary"}>
                        {isDateDefined ? (isCapsuleOpen ? "Ouverte" : "Fermée") : "Non défini"}
                    </Badge>
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
            </Card>
        </Link>
    );
}