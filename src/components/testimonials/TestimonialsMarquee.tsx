'use client'

import * as React from "react"
import Image from "next/image"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Testimonial {
    id: number
    name: string
    image: string
    rating: number
    review: string
    location?: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Rajesh Kumar",
        image: "/avatars/man.webp",
        rating: 5,
        review: "Excellent service! The car was in perfect condition and the booking process was seamless. Highly recommend AF Rentals for anyone looking for reliable vehicle rentals.",
        location: "Mumbai"
    },
    {
        id: 2,
        name: "Priya Sharma",
        image: "/avatars/woman.jpg",
        rating: 5,
        review: "Very professional and courteous staff. The bike I rented was well-maintained and fuel-efficient. Will definitely use their services again!",
        location: "Delhi"
    },
    {
        id: 3,
        name: "Amit Patel",
        image: "/avatars/man.webp",
        rating: 4,
        review: "Great experience overall. The vehicle was clean and the rates were very competitive. Minor delay in pickup but otherwise fantastic service.",
        location: "Bangalore"
    },
    {
        id: 4,
        name: "Sneha Reddy",
        image: "/avatars/woman.jpg",
        rating: 5,
        review: "Best rental service in the city! Booked a scooter for a week and it was absolutely worth it. Easy booking, transparent pricing, and excellent customer support.",
        location: "Hyderabad"
    },
    {
        id: 5,
        name: "Vikram Singh",
        image: "/avatars/man.webp",
        rating: 5,
        review: "I've been using AF Rentals for the past year and they never disappoint. Always have a wide variety of vehicles to choose from. Truly the best!",
        location: "Pune"
    },
    {
        id: 6,
        name: "Anjali Mehta",
        image: "/avatars/woman.jpg",
        rating: 4,
        review: "Smooth and hassle-free rental experience. The app is user-friendly and the vehicles are always in top condition. Highly satisfied customer here!",
        location: "Chennai"
    }
]

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [cardsToShow, setCardsToShow] = React.useState(3)

    // Responsive cards per view
    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setCardsToShow(1)
            } else if (window.innerWidth < 1024) {
                setCardsToShow(2)
            } else {
                setCardsToShow(3)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Auto-play
    React.useEffect(() => {
        const interval = setInterval(() => {
            handleNext()
        }, 5000) // Change slide every 5 seconds

        return () => clearInterval(interval)
    }, [currentIndex, cardsToShow])

    const maxIndex = Math.max(0, testimonials.length - cardsToShow)

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1))
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    return (
        <section className="py-20 bg-background">
            <div className="container px-4 mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-3">What Our Customers Say</h2>
                    <p className="text-muted-foreground">
                        Don't just take our word for it - hear from our satisfied customers
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full shadow-lg hidden md:flex"
                        onClick={handlePrev}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full shadow-lg hidden md:flex"
                        onClick={handleNext}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>

                    {/* Cards Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-6"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0"
                                    style={{ width: `calc(${100 / cardsToShow}% - ${(cardsToShow - 1) * 24 / cardsToShow}px)` }}
                                >
                                    <TestimonialCard testimonial={testimonial} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Navigation Buttons */}
                    <div className="flex md:hidden justify-center gap-4 mt-6">
                        <Button variant="outline" size="icon" onClick={handlePrev}>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={handleNext}>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                ? 'w-8 bg-primary'
                                : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6">
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < testimonial.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'fill-gray-200 text-gray-200'
                                }`}
                        />
                    ))}
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4">
                    "{testimonial.review}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                        <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            onError={(e) => {
                                // Fallback to placeholder if image fails to load
                                const target = e.target as HTMLImageElement
                                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=random`
                            }}
                        />
                    </div>
                    <div>
                        <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                        {testimonial.location && (
                            <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
