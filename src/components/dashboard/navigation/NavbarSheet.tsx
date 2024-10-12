import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Timer } from "lucide-react";
import Link from "next/link";

export default function NavbarSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Basculer le menu de navigation</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-lg font-semibold"
                    >
                        <Timer className="h-6 w-6" />
                        <span className="sr-only">Eternote</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-muted-foreground hover:text-foreground"
                    >
                        Tableau de bord
                    </Link>
                </nav>
            </SheetContent>
        </Sheet>
    );
}