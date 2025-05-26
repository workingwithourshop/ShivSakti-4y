import { GoogleGenAI } from "@google/genai"
import mime from "mime"

// Voice mapping for different countries/regions
const VOICE_CONFIG = {
  US: { voiceName: "Zephyr", language: "en-US" },
  GB: { voiceName: "Puck", language: "en-GB" },
  AU: { voiceName: "Charon", language: "en-AU" },
  CA: { voiceName: "Zephyr", language: "en-CA" },
  IN: { voiceName: "Kore", language: "en-IN" },
  FR: { voiceName: "Aoede", language: "fr-FR" },
  DE: { voiceName: "Fenrir", language: "de-DE" },
  ES: { voiceName: "Aoede", language: "es-ES" },
  IT: { voiceName: "Puck", language: "it-IT" },
  JP: { voiceName: "Charon", language: "ja-JP" },
  KR: { voiceName: "Kore", language: "ko-KR" },
  CN: { voiceName: "Fenrir", language: "zh-CN" },
  BR: { voiceName: "Aoede", language: "pt-BR" },
  MX: { voiceName: "Zephyr", language: "es-MX" },
  default: { voiceName: "Zephyr", language: "en-US" }
}

export async function POST(req: Request) {
  try {
    const { text, countryCode } = await req.json()

    if (!text || typeof text !== "string") {
      return Response.json({ error: "Invalid text input" }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      console.error("GOOGLE_GENERATIVE_AI_API_KEY environment variable is not set")
      return Response.json({ error: "TTS service unavailable" }, { status: 503 })
    }

    // Get voice configuration based on country
    const voiceConfig = VOICE_CONFIG[countryCode as keyof typeof VOICE_CONFIG] || VOICE_CONFIG.default
    
    console.log(`Generating TTS for country: ${countryCode}, voice: ${voiceConfig.voiceName}, language: ${voiceConfig.language}`)

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    })

    const config = {
      temperature: 1,
      responseModalities: ["audio"],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: {
            voiceName: voiceConfig.voiceName,
          },
        },
      },
    }

    const model = "gemini-2.5-flash-preview-tts"
    const contents = [
      {
        role: "user",
        parts: [
          {
            text: `Please speak this in ${voiceConfig.language} accent and style: ${text}`,
          },
        ],
      },
    ]

    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    })

    const audioChunks: Buffer[] = []

    for await (const chunk of response) {
      if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
        continue
      }

      if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
        const inlineData = chunk.candidates[0].content.parts[0].inlineData
        let fileExtension = mime.getExtension(inlineData.mimeType || "")
        let buffer = Buffer.from(inlineData.data || "", "base64")

        if (!fileExtension) {
          fileExtension = "wav"
          buffer = convertToWav(inlineData.data || "", inlineData.mimeType || "")
        }

        audioChunks.push(buffer)
      }
    }

    if (audioChunks.length === 0) {
      return Response.json({ error: "No audio generated" }, { status: 500 })
    }

    const finalAudio = Buffer.concat(audioChunks)

    return new Response(finalAudio, {
      headers: {
        "Content-Type": "audio/wav",
        "Content-Length": finalAudio.length.toString(),
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error("TTS Error:", error)
    return Response.json({ error: "Failed to generate audio" }, { status: 500 })
  }
}

interface WavConversionOptions {
  numChannels: number
  sampleRate: number
  bitsPerSample: number
}

function convertToWav(rawData: string, mimeType: string) {
  const options = parseMimeType(mimeType)
  const wavHeader = createWavHeader(rawData.length, options)
  const buffer = Buffer.from(rawData, "base64")

  return Buffer.concat([wavHeader, buffer])
}

function parseMimeType(mimeType: string) {
  const [fileType, ...params] = mimeType.split(";").map((s) => s.trim())
  const [_, format] = fileType.split("/")

  const options: Partial<WavConversionOptions> = {
    numChannels: 1,
  }

  if (format && format.startsWith("L")) {
    const bits = Number.parseInt(format.slice(1), 10)
    if (!isNaN(bits)) {
      options.bitsPerSample = bits
    }
  }

  for (const param of params) {
    const [key, value] = param.split("=").map((s) => s.trim())
    if (key === "rate") {
      options.sampleRate = Number.parseInt(value, 10)
    }
  }

  return options as WavConversionOptions
}

function createWavHeader(dataLength: number, options: WavConversionOptions) {
  const { numChannels, sampleRate, bitsPerSample } = options

  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8
  const blockAlign = (numChannels * bitsPerSample) / 8
  const buffer = Buffer.alloc(44)

  buffer.write("RIFF", 0)
  buffer.writeUInt32LE(36 + dataLength, 4)
  buffer.write("WAVE", 8)
  buffer.write("fmt ", 12)
  buffer.writeUInt32LE(16, 16)
  buffer.writeUInt16LE(1, 20)
  buffer.writeUInt16LE(numChannels, 22)
  buffer.writeUInt32LE(sampleRate, 24)
  buffer.writeUInt32LE(byteRate, 28)
  buffer.writeUInt16LE(blockAlign, 32)
  buffer.writeUInt16LE(bitsPerSample, 34)
  buffer.write("data", 36)
  buffer.writeUInt32LE(dataLength, 40)

  return buffer
}
