'use client'

import { useState } from 'react'
import { Star, Send, Phone, Mail, MapPin, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { feedbackService } from '@/services/feedback.service'

export default function ContactPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [rating, setRating] = useState(0)
    const [hoverRating, setHoverRating] = useState(0)
    const [review, setReview] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!name.trim()) {
            setError('Please enter your name')
            return
        }
        if (rating === 0) {
            setError('Please select a rating')
            return
        }
        if (!review.trim()) {
            setError('Please write your review')
            return
        }

        try {
            setLoading(true)
            await feedbackService.submitFeedback({
                name: name.trim(),
                email: email.trim() || undefined,
                rating,
                review: review.trim(),
                location: location.trim() || undefined,
            })
            setSuccess(true)
        } catch (err) {
            console.error('Feedback submission error:', err)
            setError('Failed to submit feedback. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const resetForm = () => {
        setName('')
        setEmail('')
        setLocation('')
        setRating(0)
        setReview('')
        setError('')
        setSuccess(false)
    }

    return (
        <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold tracking-tight mb-4">
                        Contact <span className="text-primary italic">Us</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We'd love to hear from you! Share your experience or get in touch with our team.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Feedback Form */}
                    <div className="lg:col-span-3 bg-card rounded-2xl shadow-xl p-8 md:p-10 border border-border/50">
                        <div className="flex items-center mb-8">
                            <div className="h-1 w-12 bg-primary mr-4"></div>
                            <h2 className="text-2xl font-bold tracking-tight">Share Your Feedback</h2>
                        </div>

                        {success ? (
                            <div className="py-16 text-center">
                                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-green-400 mb-3">Thank You!</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Your feedback has been submitted successfully. It will appear on our home page shortly.
                                </p>
                                <Button onClick={resetForm} variant="outline">
                                    Submit Another Review
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Your Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        disabled={loading}
                                        className="w-full border border-border bg-background text-foreground rounded-lg p-3 disabled:opacity-50 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                    />
                                </div>

                                {/* Email & Location */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                            disabled={loading}
                                            className="w-full border border-border bg-background text-foreground rounded-lg p-3 disabled:opacity-50 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5">Location</label>
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            placeholder="e.g. Mumbai"
                                            disabled={loading}
                                            className="w-full border border-border bg-background text-foreground rounded-lg p-3 disabled:opacity-50 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
                                        />
                                    </div>
                                </div>

                                {/* Star Rating */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Rating <span className="text-destructive">*</span>
                                    </label>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                disabled={loading}
                                                className="p-1 transition-transform hover:scale-110 disabled:opacity-50"
                                            >
                                                <Star
                                                    className={`h-8 w-8 transition-colors ${star <= (hoverRating || rating)
                                                        ? 'fill-yellow-400 text-yellow-400'
                                                        : 'fill-muted text-muted-foreground/30'
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                        {rating > 0 && (
                                            <span className="ml-3 text-sm text-muted-foreground">
                                                {rating === 1 && 'Poor'}
                                                {rating === 2 && 'Fair'}
                                                {rating === 3 && 'Good'}
                                                {rating === 4 && 'Very Good'}
                                                {rating === 5 && 'Excellent'}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Review */}
                                <div>
                                    <label className="block text-sm font-medium mb-1.5">
                                        Your Review <span className="text-destructive">*</span>
                                    </label>
                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Tell us about your experience with AF Vehicle Services..."
                                        rows={4}
                                        disabled={loading}
                                        className="w-full border border-border bg-background text-foreground rounded-lg p-3 disabled:opacity-50 [color-scheme:dark] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none"
                                    />
                                </div>

                                {/* Error */}
                                {error && (
                                    <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3">
                                        <p className="text-sm text-destructive">{error}</p>
                                    </div>
                                )}

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-base font-semibold"
                                    size="lg"
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : (
                                        <Send className="h-5 w-5 mr-2" />
                                    )}
                                    {loading ? 'Submitting...' : 'Submit Feedback'}
                                </Button>
                            </form>
                        )}
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Get in Touch Card */}
                        <div className="bg-primary rounded-2xl shadow-xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-48 h-48 bg-black/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <h3 className="text-xl font-bold text-primary-foreground mb-6">Get in Touch</h3>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                                            <Phone className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-primary-foreground/70">Phone</p>
                                            <p className="font-medium text-primary-foreground">+91 9326743938</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                                            <Mail className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-primary-foreground/70">Email</p>
                                            <p className="font-medium text-primary-foreground"> afbikerentals@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                                            <MapPin className="h-5 w-5 text-primary-foreground" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-primary-foreground/70">Address</p>
                                            <p className="font-medium text-primary-foreground">Belapur, Navi Mumbai</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Operating Hours Card */}
                        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/50">
                            <h3 className="text-xl font-bold mb-4">Operating Hours</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Monday – Saturday</span>
                                    <span className="font-medium">9:00 AM – 9:00 PM</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Sunday</span>
                                    <span className="font-medium">10:00 AM – 6:00 PM</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-card rounded-2xl shadow-xl p-8 border border-border/50">
                            <h3 className="text-xl font-bold mb-4">Why Customers Love Us</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3 bg-primary/5 rounded-lg">
                                    <p className="text-2xl font-bold text-primary">30+</p>
                                    <p className="text-xs text-muted-foreground">Vehicles</p>
                                </div>
                                <div className="text-center p-3 bg-primary/5 rounded-lg">
                                    <p className="text-2xl font-bold text-primary">500+</p>
                                    <p className="text-xs text-muted-foreground">Happy Riders</p>
                                </div>
                                <div className="text-center p-3 bg-primary/5 rounded-lg">
                                    <p className="text-2xl font-bold text-primary">4.8</p>
                                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                                </div>
                                <div className="text-center p-3 bg-primary/5 rounded-lg">
                                    <p className="text-2xl font-bold text-primary">24/7</p>
                                    <p className="text-xs text-muted-foreground">Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
