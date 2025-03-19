// components/navigation/Navbar.tsx
import Link from "next/link";

export const Navbar = () => (
    <nav className="bg-blue-500 p-4 text-white">
        <div className="container mx-auto flex justify-between">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Cerrar Sesión</Link>
        </div>
    </nav>
);