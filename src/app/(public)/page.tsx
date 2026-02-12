"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Search, Star, Shield, Clock, Award, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { vehicleService } from "@/services/vehicle.service"
import { Vehicle } from "@/types/vehicle"
import BookingModal from "@/components/booking/BookingModal"
import { useUser } from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import TestimonialsCarousel from "@/components/testimonials/TestimonialsMarquee"

export default function LandingPage() {
  const [vehicles, setVehicles] = React.useState<Vehicle[]>([])
  const [loading, setLoading] = React.useState(true)
  const [selectedVehicle, setSelectedVehicle] = React.useState<Vehicle | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = React.useState(false)
  const [showAuthAlert, setShowAuthAlert] = React.useState(false)
  const { user } = useUser()
  const router = useRouter()

  React.useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehicleService.getVehicles({ available: true })
        setVehicles(data)
      } catch (error) {
        console.error('Error fetching vehicles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [])

  const handleBookNow = (vehicle: Vehicle) => {
    // Check if user is authenticated
    if (!user) {
      setShowAuthAlert(true)
      return
    }

    setSelectedVehicle(vehicle)
    setIsBookingModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBookingModalOpen(false)
    setSelectedVehicle(null)
  }

  const handleSignIn = () => {
    setShowAuthAlert(false)
    router.push('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
          {/* Placeholder for real image - using a nice dark geometric background or gradient if external image not allowed, but here I'll try to simulate an image feel with css or just a solid color for now if I can't guarantee an asset. I'll use a premium gradient. */}
          <Image
            src="/car2.jpg"
            alt="Luxury Car Background"
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="container relative z-20 px-4 mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm md:text-base border-white/20 bg-white/10 backdrop-blur-md text-white">
              Premium Vehicle Services
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Experience the Art of <br />
              <span className="text-primary italic">Driving</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Choose from our curated fleet of luxury and performance vehicles for your next journey. Unmatched comfort, style, and service.
            </p>
          </motion.div>

          {/* Booking Widget */}
          {/* <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pick-up Location"
                  className="pl-9 bg-white text-black border-transparent h-12"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Pick-up Date"
                  className="pl-9 bg-white text-black border-transparent h-12"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Return Date"
                  className="pl-9 bg-white text-black border-transparent h-12"
                />
              </div>
              <Button size="lg" className="w-full h-12 text-base font-semibold">
                Search Cars
                <Search className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Featured Fleet Section - Marquee */}
      <section className="py-20 bg-muted/30 overflow-hidden">
        <div className="container px-4 mx-auto mb-12">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Premium Fleet</h2>
              <p className="text-muted-foreground">Select from our top-rated vehicles for every occasion</p>
            </div>
            <Link href="/fleet">
              <Button variant="link" className="hidden md:flex">
                View All Vehicles <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative">
          {loading ? (
            <div className="flex justify-center py-12">
              <p className="text-muted-foreground">Loading vehicles...</p>
            </div>
          ) : vehicles.length > 0 ? (
            <div className="flex animate-marquee">
              {/* First set of vehicles */}
              <div className="flex gap-8 pr-8">
                {vehicles.map((vehicle) => (
                  <div key={`first-${vehicle.id}`} className="w-[350px] flex-shrink-0">
                    <FleetCard
                      vehicle={vehicle}
                      onBookNow={() => handleBookNow(vehicle)}
                    />
                  </div>
                ))}
              </div>

              {/* Duplicate set for seamless loop */}
              <div className="flex gap-8 pr-8">
                {vehicles.map((vehicle) => (
                  <div key={`second-${vehicle.id}`} className="w-[350px] flex-shrink-0">
                    <FleetCard
                      vehicle={vehicle}
                      onBookNow={() => handleBookNow(vehicle)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-muted-foreground">No vehicles available at the moment.</p>
            </div>
          )}
        </div>

        <div className="container px-4 mx-auto mt-8 text-center md:hidden">
          <Link href="/fleet">
            <Button variant="outline" className="w-full">
              View All Vehicles
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-16">Why Choose AF Rentals?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-primary" />}
              title="Fully Insured"
              description="Drive with peace of mind knowing all our vehicles come with comprehensive insurance coverage."
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="24/7 Support"
              description="Our dedicated support team is available around the clock to assist you with any inquiries."
            />
            <FeatureCard
              icon={<Award className="h-10 w-10 text-primary" />}
              title="Best Rates Guaranteed"
              description="We adhere to a strict price match policy to ensure you get the best deal on the market."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center md:text-left relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground mb-4">Ready to hit the road?</h2>
                <p className="text-primary-foreground/90 text-lg">
                  Join thousands of satisfied customers today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                  Book Online
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedVehicle && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={handleCloseModal}
          vehicle={selectedVehicle}
        />
      )}

      {/* Authentication Alert */}
      {showAuthAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowAuthAlert(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Sign In Required</h3>
              <p className="text-sm text-muted-foreground mb-6">
                You need to be signed in to book a vehicle. Please sign in or create an account to continue.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAuthAlert(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FleetCard({ vehicle, onBookNow }: { vehicle: Vehicle, onBookNow: () => void }) {
  return (
    <Card className="overflow-hidden border-none shadow-lg group">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 text-xs font-bold shadow-sm">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          4.8
        </div>
        <Image
          src={vehicle.image_url || "/car2.jpg"}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-5">
        <Badge variant="outline" className="mb-2 font-normal text-muted-foreground border-muted-foreground/30">
          {vehicle.type}
        </Badge>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold">{vehicle.make} {vehicle.model}</h3>
          <div className="text-right">
            <span className="text-lg font-bold text-primary">₹{vehicle.price_per_day}</span>
            <span className="text-xs text-muted-foreground">/day</span>
          </div>
        </div>
        <Button
          onClick={onBookNow}
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Book Now
        </Button>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center p-6 rounded-2xl bg-card hover:shadow-xl transition-shadow duration-300 border border-border/50">
      <div className="mb-4 p-4 rounded-full bg-primary/10">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  )
}
