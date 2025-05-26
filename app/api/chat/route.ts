import { streamText, tool } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

// Company knowledge base (RAG simulation)
const companyKnowledge = `
Detailed Overview: AI-Relevant Customer Service Insights from Shiv Shakti Precision Works Pvt. Ltd.
1. Company Overview and Service Focus
Shiv Shakti Precision Works Pvt. Ltd. presents itself as a comprehensive service provider specializing in engineering job work, fabrication, construction services, and—most significantly—industrial manpower supply on a contractual basis. The company operates across multiple Indian states, including Uttarakhand, Maharashtra, Gujarat, Karnataka, Haryana, and Uttar Pradesh.

While the core business is not directly AI-related, the company's business structure, client interactions, and manpower logistics reflect service areas where AI customer support systems could be relevant and significantly beneficial.

2. Customer-Centric Vision and Mission
At the heart of Shiv Shakti’s operational ethos lies a customer satisfaction-driven mission statement:

"To be a leading Quality Service Provider in India and to deliver 100% Customer Satisfaction... to not just meet the customer expectations, but exceed them."

This vision indicates a deep-seated commitment to client relationships, efficient service delivery, and brand reputation—cornerstones of excellent customer service. In an AI context, these values can be supported through automated tools that monitor service quality, track satisfaction, and handle common inquiries.

3. Human-Centric Service Offerings Supporting Customer Operations
The company's manpower services encompass a broad range of staffing needs, which indirectly support customer-facing activities in industrial operations. These include:

Skilled, Semi-skilled, and Unskilled Manpower: These workers are deployed across functions that may influence client output or customer service indirectly (e.g., production floor, quality checks).

Official Staff Solutions: Shiv Shakti provides trained administrative and office support staff, who may be involved in front-desk operations, client coordination, and recordkeeping—roles that traditionally fall under the umbrella of customer service.

Factory Staffing with Linguistic Preference: This reveals a sensitivity to language and communication—an area where AI tools like multilingual chatbots or translation support can further enhance engagement.

Incorporating AI into the recruitment or scheduling of such staff could ensure faster placements, reduce downtime, and improve client response times.

4. Processes that Could Be Enhanced by AI Customer Service
Here are several internal and external service processes detailed in the document that could benefit from AI-enhanced systems:

Inquiry Handling: The company receives and responds to staffing inquiries. An AI chatbot or virtual assistant could provide 24/7 support for FAQs, documentation requests, and availability checks.

Staff Replacement Requests: The company promises immediate replacement of unfit personnel. Automating these processes via AI ticketing systems or request dashboards could streamline the response.

Billing and Payment: Monthly invoices are raised and expected to be cleared by the 5th of every month. A customer portal with AI-assisted invoice tracking, reminders, and queries would improve efficiency.

Labour Law Compliance and Documentation: AI tools could assist in the maintenance and automatic submission of compliance documents such as ESIC, EPF, and GST paperwork.

De-unionizing and Conduct Monitoring: While this is sensitive and largely human-driven, sentiment analysis tools or behavioural monitoring could be used to proactively detect workforce issues.

5. Billing Structure and Transparency
The company provides a detailed, compliance-aligned breakdown of charges, such as:

Minimum wages according to local labor departments

ESIC at 3.25% of gross wages

EPF including administrative charges at 13%

Service charges: 12% up to 50 workers, 10% beyond

GST at 18% on the billing amount

Incentives, food, uniform, and other personnel-related expenses

This transparency reflects a need for clear client communication, and can be supported via AI-driven dashboards that allow clients to view, query, and understand bills in real time, thus reducing dependency on human customer service representatives.

6. Client Relationship and Reputation Management
Shiv Shakti Precision Works is proud to be associated with several major industrial players, such as:

TATA Motors (locations in Pune, Sanand, Pantnagar, Lucknow)

Sun Pharmaceutical

Ashok Leyland

Mahindra Logistics

Seabird Logistics

Automotive Axles, among others

Maintaining such relationships involves responsive, reliable, and quality-focused service. AI tools like CRM (Customer Relationship Management) software enhanced with AI analytics could be leveraged to identify client needs, predict workforce demand, and personalize engagement.

7. Responsibilities Assumed by the Company
The company takes responsibility for:

Addressing medical, police verification, and documentation of manpower

Maintaining all labor law-related records

Replacing unsatisfactory manpower immediately

Promoting discipline and good conduct

Supporting management in sensitive HR activities (like de-unionizing)

These tasks indicate high-touch operations where AI can assist through workflow automation, case management systems, or compliance alerts, thereby minimizing delays in customer support and internal coordination.

Conclusion: Readiness for AI Customer Service Integration
While Shiv Shakti Precision Works Pvt. Ltd. is primarily a manpower supplier and job work contractor, the scope of their customer service responsibilities, including staff placement, compliance, billing, and client coordination, presents numerous opportunities for AI integration.

Areas such as automated helpdesks, AI-enabled CRM platforms, intelligent billing systems, and recruitment chatbots can significantly streamline their customer service operations and improve both client satisfaction and operational efficiency.
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
    system: `You are shivshakti' AI Assistant. You are specifically designed to help with company-related inquiries and provide information about shivshakti.

IMPORTANT GUIDELINES:
- You ONLY provide information about shivshakti
- You do NOT answer general questions unrelated to the company
- You do NOT provide information about other companies
- You do NOT act as a general-purpose AI assistant
- If asked about topics outside shivshakti, politely redirect to company-related topics
- Always maintain a professional, helpful tone
- Use the company knowledge tool to get accurate information
- If you don't have specific information, direct users to contact support

Your role is to:
- Answer questions about shivshakti services
- Provide company information and contact details
- Help with service inquiries
- Assist with general company-related questions
- Direct users to appropriate departments when needed

Always start responses by acknowledging you're shivshakti' AI Assistant.`,
    messages,
    tools: {
      getCompanyInfo: tool({
        description:
          "Search for information about shivshakti company details, services, team, or any company-related information",
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
