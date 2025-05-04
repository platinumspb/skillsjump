"use client"

import { motion } from "framer-motion"
import { Users, Award, Search, Clock } from "lucide-react"

const features = [
  {
    icon: <Users className="h-10 w-10 text-blue-500" />,
    title: "Technical Expertise",
    description: "Our recruiters are experienced engineers who understand your technical requirements.",
  },
  {
    icon: <Award className="h-10 w-10 text-blue-500" />,
    title: "Quality Candidates",
    description: "We pre-screen candidates to ensure they meet your technical and cultural standards.",
  },
  {
    icon: <Search className="h-10 w-10 text-blue-500" />,
    title: "Specialized Focus",
    description: "We exclusively focus on software engineering roles across various technologies.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Time Efficiency",
    description: "Reduce your time-to-hire with our streamlined recruitment process.",
  },
]

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose Skillsjump
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            We combine technical expertise with recruitment excellence to find the perfect match for your team.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
