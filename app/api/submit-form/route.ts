import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const formType = formData.get("formType") as string

    // Create a data object with form fields
    const data = {
      formType,
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      timestamp: new Date().toISOString(),
    }

    // Add form-specific fields
    if (formType === "hiring") {
      Object.assign(data, {
        company: formData.get("company"),
        position: formData.get("position"),
        roleToFill: formData.get("roleToFill"),
        scheduledCall: formData.get("scheduledCall") === "true",
      })
    } else if (formType === "jobseeker") {
      Object.assign(data, {
        roleWanted: formData.get("roleWanted"),
        // Note: We're not handling the actual file here, just recording the filename
        resumeFileName: formData.get("resumeFileName"),
      })
    }

    // In a production environment, you would:
    // 1. Save to a database (MongoDB, PostgreSQL, etc.)
    // 2. Store files in a service like AWS S3 or Vercel Blob
    // 3. Send notification emails
    // 4. Integrate with CRM systems

    console.log("Form submission received:", data)

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      data,
    })
  } catch (error) {
    console.error("Error processing form submission:", error)
    return NextResponse.json({ success: false, message: "Failed to process form submission" }, { status: 500 })
  }
}
