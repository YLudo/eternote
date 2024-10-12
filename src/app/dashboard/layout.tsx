import Navbar from "@/components/dashboard/navigation/Navbar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col bg-zinc-50 dark:bg-zinc-900 gap-4 p-4 md:gap-8 md:p-10">
                {children}
            </main>
        </div>
    )
}