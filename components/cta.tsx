"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Next Engineer?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Get in touch with our team of technical recruiters to discuss your hiring needs.
          </p>
          <Link href="/candidate-form">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">Find Your Candidate</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
