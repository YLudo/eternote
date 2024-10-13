import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-background">
            <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                    <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl text-primary">
                        404
                    </h1>
                    <p>
                        Vous semblez avoir pris un chemin hors du temps. Revenez dans le présent et explorez nos contenus.
                    </p>
                </div>
                <Link
                    href="/dashboard"
                    className="inline-flex h-10 items-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-foreground disabled:pointer-events-none disabled:opacity-50 dark:bg-primary dark:hover:bg-primary/90 dark:focus-visible:ring-muted-foreground"
                    prefetch={false}
                >
                Retour à la page d'accueil
                </Link>
            </div>
        </div>
    );
}