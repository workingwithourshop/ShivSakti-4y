import { streamText, tool } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

// Company knowledge base (RAG simulation)
const companyKnowledge = `
TechCorp Solutions - Company Information Database

COMPANY OVERVIEW:
TechCorp Solutions is a leading technology consulting firm founded in 2015, specializing in AI-powered business solutions and digital transformation services. We are headquartered in San Francisco, California, with additional offices in New York, Austin, and London.

SERVICES:
- AI & Machine Learning Consulting
- Custom Software Development
- Cloud Migration & Infrastructure
- Data Analytics & Business Intelligence
- Digital Transformation Strategy
- Cybersecurity Solutions
- Mobile App Development
- Web Development & E-commerce

TEAM & CULTURE:
- 250+ employees globally
- 50+ AI/ML specialists
- 30+ certified cloud architects
- Remote-first culture with flexible working arrangements
- Commitment to diversity and inclusion
- Continuous learning and development programs

CLIENTS:
We serve Fortune 500 companies across various industries including:
- Healthcare & Pharmaceuticals
- Financial Services
- Retail & E-commerce
- Manufacturing
- Education
- Government

ACHIEVEMENTS:
- AWS Advanced Consulting Partner
- Google Cloud Premier Partner
- Microsoft Gold Partner
- ISO 27001 Certified
- SOC 2 Type II Compliant
- Winner of "Best AI Consulting Firm 2023"

CONTACT INFORMATION:
- Main Office: 123 Innovation Drive, San Francisco, CA 94105
- Phone: +1 (555) 123-4567
- Email: info@techcorpsolutions.com
- Website: www.techcorpsolutions.com
- Support: support@techcorpsolutions.com

LEADERSHIP:
- CEO: Sarah Johnson (Former Google AI Director)
- CTO: Michael Chen (Ex-Microsoft Principal Engineer)
- VP of Sales: David Rodriguez
- VP of Operations: Emily Watson

RECENT NEWS:
- Launched new AI-powered customer service platform
- Expanded operations to European market
- Acquired DataInsights Inc. for enhanced analytics capabilities
- Partnered with leading universities for AI research initiatives
`

function searchCompanyKnowledge(query: string): string {
  const queryLower = query.toLowerCase()
  const lines = companyKnowledge.split("\n")

  // Simple keyword matching for RAG simulation
  const relevantLines = lines.filter((line) => {
    const lineLower = line.toLowerCase()
    return queryLower.split(" ").some((word) => word.length > 2 && lineLower.includes(word))
  })

  if (relevantLines.length === 0) {
    return "I don't have specific information about that topic in our company database. Please contact our support team for more details."
  }

  return relevantLines.join("\n").trim()
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: google("gemini-2.5-flash-preview-04-17"),
    system: `You are TechCorp Solutions' AI Assistant. You are specifically designed to help with company-related inquiries and provide information about TechCorp Solutions.

IMPORTANT GUIDELINES:
- You ONLY provide information about TechCorp Solutions
- You do NOT answer general questions unrelated to the company
- You do NOT provide information about other companies
- You do NOT act as a general-purpose AI assistant
- If asked about topics outside TechCorp Solutions, politely redirect to company-related topics
- Always maintain a professional, helpful tone
- Use the company knowledge tool to get accurate information
- If you don't have specific information, direct users to contact support

Your role is to:
- Answer questions about TechCorp Solutions services
- Provide company information and contact details
- Help with service inquiries
- Assist with general company-related questions
- Direct users to appropriate departments when needed

Always start responses by acknowledging you're TechCorp Solutions' AI Assistant.`,
    messages,
    tools: {
      getCompanyInfo: tool({
        description:
          "Search for information about TechCorp Solutions company details, services, team, or any company-related information",
        parameters: z.object({
          query: z.string().describe("The search query for company information"),
        }),
        execute: async ({ query }) => {
          return searchCompanyKnowledge(query)
        },
      }),
    },
    maxToolRoundtrips: 3,
  })

  return result.toDataStreamResponse()
}
