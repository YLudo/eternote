import Navbar from "@/components/dashboard/navigation/Navbar";

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar />
            {children}
        </div>
    )
}