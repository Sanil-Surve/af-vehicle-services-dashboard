'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function SignUpForm() {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setLoading(false)
            return
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `https://af-rentals.vercel.app/auth/callback`,
                data: {
                    full_name: fullName,
                },
            },
        })

        if (error) {
            setError(error.message)
            setLoading(false)
        } else {
            setSuccess(true)
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center space-y-4">
                <div className="bg-green-50 p-4 rounded-md dark:bg-green-900/20">
                    <h3 className="text-green-800 font-medium dark:text-green-400">Registration Successful!</h3>
                    <p className="text-green-700 mt-2 text-sm dark:text-green-300">
                        Please check your email ({email}) for a confirmation link to activate your account.
                    </p>
                </div>
                <Link
                    href="/login"
                >
                    <Button className="w-full">
                        Return to Login
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="fullName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Full Name
                </label>
                <Input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Email Address
                </label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Password
                </label>
                <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    required
                />
            </div>
            <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Confirm Password
                </label>
                <Input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    minLength={6}
                    required
                />
            </div>
            {error && <p className="text-destructive text-sm font-medium">{error}</p>}
            <Button
                type="submit"
                className="w-full"
                disabled={loading}
            >
                {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-primary hover:underline">
                    Sign in
                </Link>
            </div>
        </form>
    )
}
