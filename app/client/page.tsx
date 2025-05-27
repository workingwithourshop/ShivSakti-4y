import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, MapPin, Users, Award, CheckCircle, Star } from "lucide-react"
import Link from "next/link"

export default function ClientsPage() {
  const clients = [
    {
      name: "TATA MOTORS LTD.",
      location: "PIMPRI PUNE MAHARASHTRA",
      category: "Automotive Manufacturing",
    },
    {
      name: "TATA MOTORS LTD",
      location: "SANAND AHMEDABAD GUJARAT",
      category: "Automotive Manufacturing",
    },
    {
      name: "TATA MOTORS LTD",
      location: "PANTNAGAR UTTARAKHAND",
      category: "Automotive Manufacturing",
    },
    {
      name: "TATA MOTORS LTD",
      location: "LUCKNOW U.P",
      category: "Automotive Manufacturing",
    },
    {
      name: "SUN PHARMACEUTICAL LIMITED",
      location: "DEWAS MP",
      category: "Pharmaceutical",
    },
    {
      name: "ASHOK LEYLAND",
      location: "PANTNAGAR",
      category: "Commercial Vehicles",
    },
    {
      name: "MAHINDRA LOGISTICS LTD",
      location: "LALPUR",
      category: "Logistics & Supply Chain",
    },
    {
      name: "MAHINDRA LOGISTICS LTD",
      location: "ASHOK LEYLAND SITE",
      category: "Logistics & Supply Chain",
    },
    {
      name: "AUTOMOTIVE AXLES LIMITED",
      location: "PANTNAGAR",
      category: "Automotive Components",
    },
    {
      name: "TONGLIT AUTOGISTIC PVT LTD",
      location: "PANTNAGAR",
      category: "Automotive Logistics",
    },
    {
      name: "MANJUSHREE TECHNOPACKS LTD",
      location: "PANTNAGAR",
      category: "Packaging Solutions",
    },
    {
      name: "SEA-BIRD LOGISTICS",
      location: "PUNE, LUCKNOW, GURGAON, HARYANA",
      category: "Logistics & Transportation",
    },
    {
      name: "HYDRAULIC INTERPUMP",
      location: "PANTNAGAR",
      category: "Hydraulic Systems",
    },
    {
      name: "MAHINDRA LOGISTICS LTD",
      location: "PITHAMPUR, INDORE, MP",
      category: "Logistics & Supply Chain",
    },
    {
      name: "TVS Supply Chain",
      location: "Neemrana Rajasthan Hero Plant",
    category: "Logistics & Supply Chain",
    },
  ]

  const stats = [
    {
      icon: Building2,
      number: "15+",
      label: "Major Clients",
      description: "Leading companies across industries",
    },
    {
      icon: MapPin,
      number: "9+",
      label: "States Covered",
      description: "Pan-India presence and operations",
    },
    {
      icon: Users,
      number: "1000+",
      label: "Workers Deployed",
      description: "Skilled workforce across all sites",
    },
    {
      icon: Award,
      number: "5+",
      label: "Years Experience",
      description: "Proven track record of excellence",
    },
  ]

  const testimonials = [
    {
      company: "TATA MOTORS",
      text: "Shivshakti has been instrumental in providing reliable workforce solutions across our multiple manufacturing facilities. Their commitment to quality and timely delivery is commendable.",
      rating: 5,
    },
    {
      company: "MAHINDRA LOGISTICS",
      text: "The team at Shivshakti understands our logistics requirements perfectly. They consistently provide skilled workers who integrate seamlessly with our operations.",
      rating: 5,
    },
    {
      company: "SUN PHARMACEUTICAL",
      text: "Professional service and attention to detail. Shivshakti's workers are well-trained and maintain the high standards required in pharmaceutical manufacturing.",
      rating: 5,
    },
  ]

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Valued Clients</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by leading companies across India. We take pride in serving some of the most prestigious
              organizations in automotive, pharmaceutical, and logistics industries.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-lg font-semibold text-gray-900 mb-1">{stat.label}</div>
                  <p className="text-gray-600 text-sm">{stat.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Companies We Serve</h2>
            <p className="text-lg text-gray-600">Our diverse client portfolio spans across major industrial sectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{client.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span className="text-sm">{client.location}</span>
                      </div>
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {client.category}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Focus */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600">Specialized workforce solutions across key industrial sectors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Automotive</h3>
              <p className="text-sm text-gray-600">Manufacturing, assembly, and component production</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pharmaceutical</h3>
              <p className="text-sm text-gray-600">Quality-controlled manufacturing environments</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Logistics</h3>
              <p className="text-sm text-gray-600">Warehousing, distribution, and supply chain</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manufacturing</h3>
              <p className="text-sm text-gray-600">Industrial production and processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from the companies that trust us with their workforce needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div className="font-semibold text-gray-900">- {testimonial.company}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Geographic Presence */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Geographic Reach</h2>
            <p className="text-lg text-gray-600">Serving clients across multiple states with consistent quality</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Maharashtra",
              "Gujarat",
              "Uttarakhand",
              "Uttar Pradesh",
              "Madhya Pradesh",
              "Haryana",
              "Delhi NCR",
              "Punjab",
              "Rajasthan",
            ].map((state, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                <span className="font-medium text-gray-900">{state}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Client Family</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Experience the same level of service and reliability that our prestigious clients trust. Let us help you
            build your workforce today.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Link href="/contact">Partner With Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
