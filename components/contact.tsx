"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  return (
    <section className="py-20 px-6 md:px-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Find Your Next Engineer?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our team of technical recruiters to discuss your hiring needs.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Us</h3>
            <form className="space-y-6">
              <div className="space-y-4">
                <Input placeholder="Your Name" className="border-gray-300 focus:border-blue-500" />
                <Input placeholder="Your Email" type="email" className="border-gray-300 focus:border-blue-500" />
                <Input placeholder="Company" className="border-gray-300 focus:border-blue-500" />
                <Textarea
                  placeholder="Tell us about your hiring needs"
                  className="border-gray-300 focus:border-blue-500 min-h-[120px]"
                />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">Submit Request</Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-start space-x-4">
              <Mail className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-1">Email Us</h4>
                <p className="text-gray-600">contact@skillsjump.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-1">Call Us</h4>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-1">Visit Us</h4>
                <p className="text-gray-600">
                  123 Tech Avenue, Suite 400
                  <br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
