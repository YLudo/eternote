import Link from "next/link";
import { Timer } from "lucide-react";

export default function NavbarMenu() {
    const links = [
        { href: "/dashboard", label: "Tableau de bord", },
        { href: "/capsules/create", label: "Créer une capsule", },
    ];

    return (
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
                href="/dashboard"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
                <Timer className="h-6 w-6" />
                <span className="sr-only">Eternote</span>
            </Link>
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    {link.label}
                </Link>
            ))}
        </nav>
    );
}