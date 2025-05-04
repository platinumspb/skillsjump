"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="pt-32 pb-20 px-6 md:px-12 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            We Are Engineers Who <span className="text-blue-500">Recruit for Engineers</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Dedicated engineering managers and tech leads help you find the best candidate for your software engineering
            needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/candidate-form">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg">
                Find Your Candidate
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" className="border-blue-200 text-blue-500 hover:bg-blue-50 px-8 py-6 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[400px] w-full flex justify-center items-center"
        >
          <div className="relative w-full h-full max-w-[400px]">
            <Image src="/images/cubes.png" alt="Skillsjump" fill className="object-contain" priority />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
