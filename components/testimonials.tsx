"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "SkillsJump helped us find a senior engineer who perfectly matched our tech stack and company culture. Their technical screening process saved us countless hours.",
    author: "Sarah Johnson",
    position: "CTO, TechStart Inc.",
  },
  {
    quote:
      "The difference with SkillsJump is that their recruiters actually understand the technical requirements. They found us three excellent candidates within two weeks.",
    author: "Michael Chen",
    position: "Engineering Manager, DataFlow Systems",
  },
  {
    quote:
      "Working with SkillsJump transformed our hiring process. Their technical expertise and attention to detail helped us build a world-class engineering team.",
    author: "Alex Rodriguez",
    position: "VP of Engineering, CloudScale",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from companies who have found their perfect engineering match through SkillsJump.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-sm text-center"
          >
            <Quote className="h-12 w-12 text-blue-100 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-700 italic mb-8">"{testimonials[currentIndex].quote}"</p>
            <div>
              <p className="font-semibold text-gray-900">{testimonials[currentIndex].author}</p>
              <p className="text-gray-500">{testimonials[currentIndex].position}</p>
            </div>
          </motion.div>

          <div className="flex justify-center mt-8 space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-gray-200 hover:bg-blue-50 hover:border-blue-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
