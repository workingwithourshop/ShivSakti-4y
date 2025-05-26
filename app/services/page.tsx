import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Hammer, Factory, Truck, Wrench, Users, Shield, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Hammer,
      title: "Construction Labor",
      description:
        "Skilled construction workers for residential, commercial, and infrastructure projects. Our team includes experienced masons, carpenters, electricians, and general laborers.",
      features: ["Experienced craftsmen", "Safety-trained workers", "Project-specific teams", "Flexible scheduling"],
    },
    {
      icon: Factory,
      title: "Factory/Industrial Workers",
      description:
        "Reliable workforce for manufacturing and industrial operations. From assembly line workers to machine operators, we provide skilled personnel for your production needs.",
      features: [
        "Machine operation expertise",
        "Quality control specialists",
        "Shift-based availability",
        "Industry compliance",
      ],
    },
    {
      icon: Truck,
      title: "Loading & Unloading Staff",
      description:
        "Efficient teams for warehouse operations, logistics, and material handling. Our workers are trained in safe handling practices and equipment operation.",
      features: ["Warehouse operations", "Material handling", "Equipment operation", "Inventory management"],
    },
    {
      icon: Wrench,
      title: "Skilled & Unskilled Labor",
      description:
        "Comprehensive workforce solutions ranging from specialized technicians to general laborers. We match the right skill level to your specific requirements.",
      features: ["Technical specialists", "General laborers", "Maintenance staff", "Support personnel"],
    },
  ]

  const benefits = [
    {
      icon: Shield,
      title: "Verified Workers",
      description: "All workers undergo thorough background checks and skill verification",
    },
    {
      icon: Clock,
      title: "Quick Deployment",
      description: "Fast turnaround times to meet your urgent staffing requirements",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Continuous monitoring and performance evaluation of all workers",
    },
    {
      icon: Users,
      title: "Flexible Teams",
      description: "Scalable workforce solutions that adapt to your project needs",
    },
  ]

  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive labor solutions tailored to meet the diverse needs of modern businesses. From construction
              to manufacturing, we provide the skilled workforce you need.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Service Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Services?</h2>
            <p className="text-lg text-gray-600">
              We go beyond just providing workers - we deliver complete workforce solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-md">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">Simple steps to get the workforce you need</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Share your requirements and project details</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Assessment</h3>
              <p className="text-gray-600 text-sm">We analyze your needs and recommend solutions</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Deployment</h3>
              <p className="text-gray-600 text-sm">Qualified workers are assigned to your project</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center font-bold text-lg">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Ongoing monitoring and support throughout</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your specific labor requirements and get a customized quote.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-3">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
