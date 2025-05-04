import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import TeamMember from "@/components/team-member"
import { Briefcase, Users, Award, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Professionals from the inside, helping companies build their top-performing teams.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We are AI innovators helping companies to build their top-performing teams. Our mission is to connect
                exceptional engineering talent with companies that value technical excellence.
              </p>
              <p className="text-lg text-gray-600">
                Our team is our most valuable asset. With backgrounds in engineering and technical leadership, we
                understand the unique challenges of building high-performing engineering teams.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Briefcase className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Industry Experience</h3>
                <p className="text-gray-600">
                  Our recruiters have worked in the tech industry and understand your needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Users className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Expertise</h3>
                <p className="text-gray-600">We speak the language of engineers and can evaluate technical skills.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Award className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Focus</h3>
                <p className="text-gray-600">We prioritize quality matches over quantity of candidates.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <Lightbulb className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovative Approach</h3>
                <p className="text-gray-600">We use modern techniques to find the best engineering talent.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of experienced professionals is dedicated to connecting top engineering talent with innovative
              companies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember
              name="Evgeny"
              position="Founder - CEO"
              image="/images/evgeny.png"
              bio="Former software Engineer at Visa, Verifi, Cast & Crew, iCrossing, Age of Learning"
              linkedin="https://linkedin.com"
              facebook="https://facebook.com"
              website="https://skillsjump.com"
              hexagon={true}
            />

            <TeamMember
              name="Adeel"
              position="Engineering Manager"
              image="/images/adeel.png"
              bio="Experienced engineering leader specializing in building high-performance teams"
              linkedin="https://linkedin.com"
              hexagon={true}
            />

            <TeamMember
              name="Paul"
              position="Director Talent Acquisition"
              image="/images/paul.png"
              bio="15+ years of experience in technical recruiting for Fortune 500 companies"
              linkedin="https://linkedin.com"
              hexagon={true}
            />

            <TeamMember
              name="Stanley"
              position="Technical Recruiter"
              image="/images/stanley.png"
              bio="Former software developer with 8 years of recruiting experience"
              linkedin="https://linkedin.com"
              hexagon={true}
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at Skillsjump.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Technical Excellence</h3>
              <p className="text-gray-600">
                We believe in the power of technical excellence and strive to connect companies with engineers who share
                this value.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-6">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with complete transparency and honesty in all our interactions with clients and candidates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-500 mb-6">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously improve our processes and embrace new technologies to deliver better results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
