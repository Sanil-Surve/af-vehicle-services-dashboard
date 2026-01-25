"use client"

import Link from "next/link"
import { Car, Menu, Phone } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

// Wait, I haven't created Sheet. I'll use a simple state-based mobile menu for now to avoid dependency hell, or simpler: just use a responsive hidden menu.
// Actually, I can use a simple conditional render for mobile menu.

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center">
                            <Avatar>
                                <AvatarImage src="/logo3.jpeg" alt="AfLogo" />
                            </Avatar>
                        </div>
                        <span className="text-xl font-bold tracking-tight">AF Vehicle Services</span>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="/" className="transition-colors hover:text-primary">
                        Home
                    </Link>
                    <Link href="/services" className="transition-colors hover:text-primary">
                        Services
                    </Link>
                    <Link href="/fleet" className="transition-colors hover:text-primary">
                        Fleet
                    </Link>
                    <Link href="/about" className="transition-colors hover:text-primary">
                        About Us
                    </Link>
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
                        <Phone className="h-4 w-4" />
                        <span>+91 9326743938</span>
                    </div>
                    <Link href="/login">
                        <Button variant="ghost" size="sm">
                            Sign In
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button size="sm">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile Menu Button - simplified */}
                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t p-4 bg-background">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                        <Link href="/services" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Services
                        </Link>
                        <Link href="/fleet" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            Fleet
                        </Link>
                        <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                            About Us
                        </Link>
                        <div className="flex flex-col gap-2 pt-4 border-t">
                            <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                <Button variant="outline" className="w-full justify-start">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                <Button className="w-full justify-start">
                                    Get Started
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
