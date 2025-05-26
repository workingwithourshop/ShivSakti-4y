import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock, Hammer, Factory, Truck, Wrench } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="py-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Shivshakti</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Building trust through reliable workforce solutions since our inception. We are your dedicated partner in
              connecting businesses with skilled professionals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & History */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Shivshakti, our mission is to bridge the gap between businesses seeking reliable workforce and skilled
                workers looking for meaningful employment opportunities. We believe in creating sustainable partnerships
                that benefit both employers and employees.
              </p>
        
              <p className="text-lg text-gray-600 mb-6">
                Founded with the vision of transforming the labor industry, we have grown from a small local operation
                to a trusted name in workforce solutions. Our commitment to quality, reliability, and professionalism
                has earned us the trust of numerous businesses across various sectors.
              </p>
              <p className="text-lg text-gray-600">
                We understand that every business has unique requirements, and we pride ourselves on providing
                customized solutions that meet specific needs while maintaining the highest standards of service.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Why We're Different</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Rigorous Screening</h4>
                    <p className="text-gray-600">
                      Every worker undergoes thorough background checks and skill assessments
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Personal Approach</h4>
                    <p className="text-gray-600">We build lasting relationships with both clients and workers</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Award className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Assurance</h4>
                    <p className="text-gray-600">Continuous monitoring and feedback to ensure service excellence</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-gray-600">Round-the-clock assistance for urgent staffing needs</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
      </section>

      {/* Types of Labor */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Labor We Provide</h2>
            <p className="text-lg text-gray-600">
              Comprehensive workforce solutions across multiple industries and skill levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Construction Workers */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Hammer className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Construction Workers</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Masons & Carpenters</li>
                  <li>Electricians & Plumbers</li>
                  <li>General Laborers</li>
                  <li>Site Supervisors</li>
                </ul>
              </CardContent>
            </Card>

            {/* Industrial Workers */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Factory className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Industrial Workers</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Factory Operators</li>
                  <li>Machine Operators</li>
                  <li>Quality Control Staff</li>
                  <li>Assembly Line Workers</li>
                </ul>
              </CardContent>
            </Card>

            {/* Logistics Staff */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Truck className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Logistics Staff</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Loading Teams</li>
                  <li>Warehouse Workers</li>
                  <li>Packers & Sorters</li>
                  <li>Delivery Assistants</li>
                </ul>
              </CardContent>
            </Card>

            {/* Skilled Technicians */}
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Wrench className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skilled Technicians</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Welders & Fitters</li>
                  <li>Maintenance Staff</li>
                  <li>Equipment Operators</li>
                  <li>Technical Assistants</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">
                We deliver on our promises and ensure consistent, dependable service that you can count on.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest standards in everything we do, from worker selection to customer service.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Partnership</h3>
              <p className="text-gray-600">
                We build long-term relationships based on trust, transparency, and mutual success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
