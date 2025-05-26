import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend("re_JiD9sB8m_2k4JrAU4P2A2aimTEDgHU4o1")

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message } = body

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate phone number (basic validation for Indian numbers)
    const phoneRegex = /^(\+91|91)?[6-9]\d{9}$/
    const cleanPhone = phone.replace(/\s+/g, "").replace(/[-()]/g, "")
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
    }

    // Send email using Resend
    try {
      const emailData = await resend.emails.send({
        from: "ShivShakti Contact Form <noreply@shivshakti.com>",
        to: ["workingwithourshop@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb;">
                <h1 style="color: #1f2937; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
                <p style="color: #6b7280; margin: 5px 0 0 0;">ShivShakti Labor Services</p>
              </div>

              <!-- Contact Details -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-left: 4px solid #3b82f6; padding-left: 10px;">Contact Information</h2>
                
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600; width: 100px;">Name:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Email:</td>
                    <td style="padding: 8px 0; color: #1f2937;">
                      <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Phone:</td>
                    <td style="padding: 8px 0; color: #1f2937;">
                      <a href="tel:${phone}" style="color: #3b82f6; text-decoration: none;">${phone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: 600;">Submitted:</td>
                    <td style="padding: 8px 0; color: #1f2937;">${new Date().toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</td>
                  </tr>
                </table>
              </div>

              <!-- Message -->
              <div style="margin-bottom: 25px;">
                <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px; border-left: 4px solid #10b981; padding-left: 10px;">Message</h2>
                <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                  <p style="color: #374151; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
                </div>
              </div>

              <!-- Quick Actions -->
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center;">
                <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">Quick Actions</h3>
                <div style="display: inline-block; margin: 0 10px;">
                  <a href="mailto:${email}" style="background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">Reply via Email</a>
                </div>
                <div style="display: inline-block; margin: 0 10px;">
                  <a href="tel:${phone}" style="background-color: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">Call Now</a>
                </div>
                <div style="display: inline-block; margin: 0 10px;">
                  <a href="https://wa.me/${cleanPhone.replace(/^\+?91/, "91")}" style="background-color: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: 600; display: inline-block;">WhatsApp</a>
                </div>
              </div>

              <!-- Footer -->
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                  This email was sent from the ShivShakti website contact form.<br>
                  Please respond promptly to maintain our excellent customer service standards.
                </p>
              </div>
            </div>
          </div>
        `,
        text: `
New Contact Form Submission - ShivShakti Labor Services

Contact Information:
Name: ${name}
Email: ${email}
Phone: ${phone}
Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}

Message:
${message}

Quick Actions:
- Reply: ${email}
- Call: ${phone}
- WhatsApp: https://wa.me/${cleanPhone.replace(/^\+?91/, "91")}
        `,
      })

      console.log("Email sent successfully:", emailData)
    } catch (emailError) {
      console.error("Failed to send email:", emailError)
      // Continue with success response even if email fails
      // You might want to log this to a monitoring service
    }

    // Log the submission for backup
    console.log("Contact form submission:", {
      name,
      email,
      phone: cleanPhone,
      message,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
    })

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We have received your inquiry and will get back to you within 24 hours.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      {
        error: "We're experiencing technical difficulties. Please try again later or contact us directly.",
        details: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 },
    )
  }
}
