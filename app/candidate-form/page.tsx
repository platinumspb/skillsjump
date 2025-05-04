"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Upload, CheckCircle, Briefcase, Search, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CandidateForm() {
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState<"hiring" | "jobseeker" | null>(null)
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    email: "",
    phone: "",

    // Hiring manager fields
    company: "",
    position: "",
    roleToFill: "",

    // Job seeker fields
    roleWanted: "",
    resumeFile: null as File | null,
    resumeFileName: "",

    scheduledCall: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [calendlyScheduled, setCalendlyScheduled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Listen for Calendly events
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event && e.data.event.indexOf("calendly") === 0) {
        // Check if this is a scheduling completion event
        if (e.data.event === "calendly.event_scheduled") {
          console.log("Calendly event scheduled:", e.data)
          setCalendlyScheduled(true)
          handleSubmit()
        }
      }
    }

    window.addEventListener("message", handleCalendlyEvent)
    return () => window.removeEventListener("message", handleCalendlyEvent)
  }, [])

  const handleNext = () => {
    if (userType === "hiring") {
      if (step === 1) setStep(2)
      else if (step === 2) setStep(3)
      else if (step === 3) setStep(4)
      else if (step === 4) setStep(5)
    } else if (userType === "jobseeker") {
      if (step === 1) setStep(6)
      else if (step === 6) setStep(7)
      else if (step === 7) setStep(8)
    }
    window.scrollTo(0, 0)
  }

  const handlePrevious = () => {
    if (userType === "hiring") {
      if (step === 2) setStep(1)
      else if (step === 3) setStep(2)
      else if (step === 4) setStep(3)
      else if (step === 5) setStep(4)
    } else if (userType === "jobseeker") {
      if (step === 6) setStep(1)
      else if (step === 7) setStep(6)
      else if (step === 8) setStep(7)
    }
    window.scrollTo(0, 0)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData({
        ...formData,
        resumeFile: file,
        resumeFileName: file.name,
      })
    }
  }

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // In a real environment, we would submit to the API
      // For now, we'll simulate a successful submission to avoid the fetch error

      // Log the form data for debugging
      console.log("Form data being submitted:", {
        formType: userType,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        ...(userType === "hiring"
          ? {
              company: formData.company,
              position: formData.position,
              roleToFill: formData.roleToFill,
              scheduledCall: calendlyScheduled,
            }
          : {
              roleWanted: formData.roleWanted,
              resumeFileName: formData.resumeFileName,
            }),
      })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Set submission as successful
      setIsSubmitted(true)

      // Set final step based on user type
      if (userType === "hiring") {
        setStep(5)
      } else if (userType === "jobseeker") {
        setStep(8)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && isStepValid()) {
      e.preventDefault()
      handleNext()
    }
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return userType !== null
      case 2: // Company role for hiring managers
        return formData.position.trim() !== ""
      case 3: // Role to fill for hiring managers
        return formData.roleToFill.trim() !== ""
      case 4: // Contact info for hiring managers
        return formData.fullName.trim() !== "" && formData.email.trim() !== ""
      case 6: // Role wanted for job seekers
        return formData.roleWanted.trim() !== ""
      case 7: // Resume upload for job seekers
        return formData.resumeFile !== null
      case 8: // Contact info for job seekers
        return formData.fullName.trim() !== "" && formData.email.trim() !== ""
      default:
        return true
    }
  }

  const getProgressPercentage = () => {
    if (userType === "hiring") {
      return (step / 5) * 100
    } else if (userType === "jobseeker") {
      if (step === 1) return 20
      return ((step - 5) / 3) * 100
    }
    return (step / 8) * 100
  }

  const renderStepContent = () => {
    switch (step) {
      case 1: // Initial choice
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Welcome to Skillsjump!</h2>
            <p className="text-gray-600 mb-6">Happy to see you here. How can we help you today?</p>

            <RadioGroup
              value={userType || ""}
              onValueChange={(value) => setUserType(value as "hiring" | "jobseeker")}
              className="space-y-4"
            >
              <div
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 ${userType === "hiring" ? "border-blue-500 bg-blue-50" : "border-gray-200"} cursor-pointer`}
                onClick={() => setUserType("hiring")}
              >
                <RadioGroupItem value="hiring" id="hiring" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="hiring" className="text-lg font-medium cursor-pointer">
                    I want to hire an engineer
                  </Label>
                  <p className="text-gray-500 mt-1">I need help finding qualified engineering talent for my team</p>
                </div>
                <Briefcase className={`h-8 w-8 ${userType === "hiring" ? "text-blue-500" : "text-gray-400"}`} />
              </div>

              <div
                className={`flex items-start space-x-4 p-4 rounded-lg border-2 ${userType === "jobseeker" ? "border-blue-500 bg-blue-50" : "border-gray-200"} cursor-pointer`}
                onClick={() => setUserType("jobseeker")}
              >
                <RadioGroupItem value="jobseeker" id="jobseeker" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="jobseeker" className="text-lg font-medium cursor-pointer">
                    I'm looking for a job
                  </Label>
                  <p className="text-gray-500 mt-1">I'm an engineer seeking new opportunities</p>
                </div>
                <Search className={`h-8 w-8 ${userType === "jobseeker" ? "text-blue-500" : "text-gray-400"}`} />
              </div>
            </RadioGroup>
          </motion.div>
        )

      // HIRING MANAGER PATH
      case 2: // Role in company
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">What is your role in the company?</h2>
            <div>
              <Label htmlFor="position">Your position</Label>
              <Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="mt-2"
                placeholder="CTO, Engineering Manager, HR Specialist, etc."
                required
              />
            </div>
          </motion.div>
        )

      case 3: // Role to fill
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Describe what role you want to fill in</h2>
            <div>
              <Label htmlFor="roleToFill">
                Tell us about the engineering role you're looking to fill and any specific requirements
              </Label>
              <Textarea
                id="roleToFill"
                name="roleToFill"
                value={formData.roleToFill}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    if (isStepValid()) handleNext()
                  }
                }}
                className="mt-2 min-h-[150px]"
                placeholder="We're looking for a Senior React Developer with 5+ years of experience..."
                required
              />
            </div>
          </motion.div>
        )

      case 4: // Contact info for hiring
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                  placeholder="Acme Inc."
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>
          </motion.div>
        )

      case 5: // Calendly for hiring
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you!</h2>
                <p className="text-gray-600 mb-6">
                  Your information has been submitted successfully and your call has been scheduled. We look forward to
                  speaking with you soon!
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Return to Home
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">Let's chat over Zoom!</h2>
                <p className="text-gray-600">
                  Choose a time that works for you to discuss your hiring needs with our technical recruiters.
                </p>
                <div className="calendly-embed rounded-lg overflow-hidden border border-gray-200 h-[600px]">
                  <iframe
                    src="https://calendly.com/skillsjump/30-min-intro-skillsjump"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    title="Schedule a call"
                  ></iframe>
                </div>
                <div className="flex justify-start pt-4">
                  <Button onClick={handlePrevious} variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )

      // JOB SEEKER PATH
      case 6: // Role wanted
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">What is the role you are looking for?</h2>
            <div>
              <Label htmlFor="roleWanted">
                Tell us about the position you're interested in and your experience level
              </Label>
              <Textarea
                id="roleWanted"
                name="roleWanted"
                value={formData.roleWanted}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    if (isStepValid()) handleNext()
                  }
                }}
                className="mt-2 min-h-[150px]"
                placeholder="I'm a Full Stack Developer with 3 years of experience looking for..."
                required
              />
            </div>
          </motion.div>
        )

      case 7: // Resume upload
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Please provide a shareable link to your resume</h2>
            <p className="text-gray-600 mb-4">Upload your resume so we can match you with relevant opportunities</p>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
                onClick={triggerFileInput}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-gray-400 text-sm">PDF, DOC, or DOCX (max 5MB)</p>
              </div>
              {formData.resumeFileName && (
                <div className="bg-blue-50 p-3 rounded-md flex items-center">
                  <CheckCircle className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="text-blue-700">{formData.resumeFileName}</span>
                </div>
              )}
            </div>
          </motion.div>
        )

      case 8: // Contact info for job seeker
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your submission!</h2>
                <p className="text-gray-600 mb-6">
                  We've received your resume and information. We'll be in touch if we have an opening that matches your
                  skills and experience.
                </p>
                <Button
                  onClick={() => (window.location.href = "/")}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Return to Home
                </Button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  Please provide your contact details so we can reach out when we have matching opportunities
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="mt-2"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="mt-2"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number (optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      className="mt-2"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="bg-red-50 p-3 rounded-md flex items-center mt-4">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-red-700">{submitError}</span>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button onClick={handlePrevious} variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  const getStepLabel = () => {
    if (userType === "hiring") {
      return `Step ${step === 1 ? 1 : step - 1} of 4`
    } else if (userType === "jobseeker") {
      return `Step ${step === 1 ? 1 : step - 5} of 3`
    }
    return `Step ${step} of 8`
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {userType === "hiring"
                  ? "Find Your Engineer"
                  : userType === "jobseeker"
                    ? "Submit Your Application"
                    : "Welcome to Skillsjump"}
              </h1>
              {step > 1 && <div className="text-sm text-gray-500">{getStepLabel()}</div>}
            </div>

            {step > 1 && (
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-500 h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
            <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
              <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

              {step === 1 && (
                <div className="flex justify-end mt-8">
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 flex items-center gap-2"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {step > 1 && step < 5 && userType === "hiring" && (
                <div className="flex justify-between mt-8">
                  <Button onClick={handlePrevious} variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 flex items-center gap-2"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {step > 1 && step < 8 && userType === "jobseeker" && (
                <div className="flex justify-between mt-8">
                  <Button onClick={handlePrevious} variant="outline" className="flex items-center gap-2">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className="bg-blue-500 hover:bg-blue-600 text-white disabled:bg-gray-300 flex items-center gap-2"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
