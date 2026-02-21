import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 bg-card rounded-xl shadow-lg border border-border">
                <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
                <LoginForm />
            </div>
        </div>
    );
}
