// app/crear-cuenta/page.tsx
import { CreateAccountForm } from "@/components/auth/createaccountform";

export default function CreateAccountPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <CreateAccountForm />
        </div>
    );
}