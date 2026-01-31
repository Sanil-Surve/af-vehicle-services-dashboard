import SignUpForm from "@/components/auth/SignUpForm";
import { Suspense } from "react";

export default function SignUpPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <SignUpForm />
                </Suspense>
            </div>
        </div>
    );
}
