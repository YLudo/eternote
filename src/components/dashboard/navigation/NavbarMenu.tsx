import Link from "next/link";
import { Timer } from "lucide-react";

export default function NavbarMenu() {
    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Timer className="h-6 w-6" />
                <span className="sr-only">Eternote</span>
            </Link>
            <Link
                href="/dashboard"
                className="text-muted-foreground transition-colors hover:text-foreground"
            >
                Tableau de bord
            </Link>
        </nav>
    );
}