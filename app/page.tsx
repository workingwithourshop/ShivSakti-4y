import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Clock, DollarSign, Users, Hammer, Factory } from "lucide-react"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-blue-600 p-4 rounded-full">
                <Hammer className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Reliable Labor Services for Growing Businesses
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Shivshakti connects your business with skilled and reliable workers for construction, industrial, and
              logistics needs. Fast hiring, trusted workforce, competitive rates.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link href="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Trusted Labor Partner</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              At Shivshakti, we understand that finding reliable, skilled workers is crucial for your business success.
              With years of experience in the labor industry, we provide comprehensive workforce solutions that help
              businesses across construction, manufacturing, and logistics sectors achieve their goals efficiently and
              cost-effectively.
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Shivshakti?</h2>
            <p className="text-lg text-gray-600">Three key reasons businesses trust us with their workforce needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Trusted Labor */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Labor</h3>
                <p className="text-gray-600">
                  All our workers are thoroughly vetted, experienced, and reliable. We ensure quality and
                  professionalism in every assignment.
                </p>
              </CardContent>
            </Card>

            {/* Fast Hiring */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Hiring</h3>
                <p className="text-gray-600">
                  Quick turnaround times to meet your urgent staffing needs. Get the right workers when you need them
                  most.
                </p>
              </CardContent>
            </Card>

            {/* Affordable Rates */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Affordable Rates</h3>
                <p className="text-gray-600">
                  Competitive pricing without compromising on quality. Cost-effective solutions for businesses of all
                  sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive labor solutions for various industries</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Hammer className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Construction</h3>
              <p className="text-sm text-gray-600">Skilled construction workers for all project types</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Factory className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Industrial</h3>
              <p className="text-sm text-gray-600">Factory and manufacturing workforce solutions</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Loading Staff</h3>
              <p className="text-sm text-gray-600">Efficient loading and unloading teams</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Skilled Labor</h3>
              <p className="text-sm text-gray-600">Specialized workers for technical requirements</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Your Team?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your labor requirements and get a customized solution for your business.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Link href="/contact">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
