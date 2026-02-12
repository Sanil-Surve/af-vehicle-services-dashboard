export default function Page() {
    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-4">
                        About <span className="text-primary italic">AF Vehicle Services</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We provide the best Rental Services in Navi Mumbai
                    </p>
                </div>

                {/* Our Story Section */}
                <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-border/50">
                    <div className="flex items-center mb-6">
                        <div className="h-1 w-12 bg-primary mr-4"></div>
                        <h2 className="text-3xl font-bold tracking-tight">Our Story</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        Established on <span className="font-semibold text-primary">19th November 2022</span>,
                        AF Vehicle Services was born with a dream to <span className="font-semibold text-foreground">Centralise All Motor Vehicle Services Over One Seat</span>.
                        What started from Belapur, Navi Mumbai with just one scooter and a beautiful dream of getting rich,
                        has now grown into a thriving business with over <span className="font-semibold text-primary">30 vehicles running daily</span> —
                        including scooters and bikes.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        We are slowly spreading our wings across the world, making quality vehicle rental services
                        accessible to everyone who needs them.
                    </p>
                </div>

                {/* Journey Milestones */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition hover:scale-105 hover:shadow-xl border border-border/50">
                        <div className="text-primary mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">The Beginning</h3>
                        <p className="text-muted-foreground">Started with 1 scooter in Belapur, Navi Mumbai</p>
                        <p className="text-sm text-primary font-semibold mt-2">November 2022</p>
                    </div>

                    <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition hover:scale-105 hover:shadow-xl border border-border/50">
                        <div className="text-primary mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Current Success</h3>
                        <p className="text-muted-foreground">30+ vehicles serving Mumbai and Pune daily</p>
                        <p className="text-sm text-primary font-semibold mt-2">Present Day</p>
                    </div>

                    <div className="bg-card rounded-xl shadow-lg p-8 text-center transform transition hover:scale-105 hover:shadow-xl border border-border/50">
                        <div className="text-primary mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Future Vision</h3>
                        <p className="text-muted-foreground">Expanding to Nashik and beyond</p>
                        <p className="text-sm text-primary font-semibold mt-2">Coming Soon</p>
                    </div>
                </div>

                {/* Our Presence */}
                <div className="bg-primary rounded-2xl shadow-xl p-8 md:p-12 mb-12 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6 text-center text-primary-foreground">Our Presence</h2>
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                <svg className="w-12 h-12 mx-auto mb-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2 text-primary-foreground">Mumbai</h3>
                                <p className="text-primary-foreground/80">Currently Operating</p>
                            </div>
                            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                <svg className="w-12 h-12 mx-auto mb-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2 text-primary-foreground">Pune</h3>
                                <p className="text-primary-foreground/80">Currently Operating</p>
                            </div>
                            <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
                                <svg className="w-12 h-12 mx-auto mb-3 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="text-xl font-bold mb-2 text-primary-foreground">Nashik</h3>
                                <p className="text-primary-foreground/80">Opening Soon</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founders Section */}
                <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 mb-12 border border-border/50">
                    <div className="flex items-center mb-8">
                        <div className="h-1 w-12 bg-primary mr-4"></div>
                        <h2 className="text-3xl font-bold tracking-tight">Our Founders</h2>
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        Founded by <span className="font-semibold text-primary">Akshay Jagadale</span> and{' '}
                        <span className="font-semibold text-primary">Fardeen Khan</span>, two passionate entrepreneurs
                        working tirelessly towards making it possible to provide not just rental bikes, but all motor vehicle-related services.
                        Their vision is to convert our tiny, unknown company into a <span className="font-semibold text-foreground">huge, famous, and differentiated Brand</span>.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold mb-2">Akshay Jagadale</h3>
                            <p className="text-muted-foreground">Co-Founder</p>
                        </div>
                        <div className="bg-primary/5 rounded-xl p-6 border-l-4 border-primary hover:shadow-lg transition-shadow">
                            <h3 className="text-2xl font-bold mb-2">Fardeen Khan</h3>
                            <p className="text-muted-foreground">Co-Founder</p>
                        </div>
                    </div>
                </div>

                {/* Vision Section */}
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8 md:p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        To centralize all motor vehicle services under one roof and become the most trusted,
                        famous, and differentiated brand in the industry — spreading our services all over the world.
                    </p>
                    <div className="mt-8 inline-block">
                        <div className="flex items-center justify-center space-x-2 text-primary">
                            <span className="text-lg font-semibold">From Belapur to the World</span>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}