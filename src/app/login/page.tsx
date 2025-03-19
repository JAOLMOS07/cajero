// app/login/page.tsx
import { LoginForm } from "@/components/auth/loginform";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <LoginForm />
        </div>
    );
}