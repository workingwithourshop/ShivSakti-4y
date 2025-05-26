"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { JSX } from "react/jsx-runtime"

interface MarkdownRendererProps {
  content: string
  className?: string
}

// Emoji mapping for common shortcodes
const emojiMap: Record<string, string> = {
  ":smile:": "😊",
  ":grin:": "😁",
  ":joy:": "😂",
  ":heart:": "❤️",
  ":thumbsup:": "👍",
  ":thumbsdown:": "👎",
  ":fire:": "🔥",
  ":star:": "⭐",
  ":rocket:": "🚀",
  ":check:": "✅",
  ":x:": "❌",
  ":warning:": "⚠️",
  ":info:": "ℹ️",
  ":bulb:": "💡",
  ":gear:": "⚙️",
  ":book:": "📚",
  ":computer:": "💻",
  ":phone:": "📱",
  ":email:": "📧",
  ":calendar:": "📅",
  ":clock:": "🕐",
  ":world:": "🌍",
  ":sun:": "☀️",
  ":moon:": "🌙",
  ":cloud:": "☁️",
  ":rain:": "🌧️",
  ":snow:": "❄️",
  ":party:": "🎉",
  ":gift:": "🎁",
  ":cake:": "🎂",
  ":coffee:": "☕",
  ":pizza:": "🍕",
  ":beer:": "🍺",
  ":wine:": "🍷",
  ":car:": "🚗",
  ":plane:": "✈️",
  ":house:": "🏠",
  ":office:": "🏢",
  ":money:": "💰",
  ":gem:": "💎",
  ":key:": "🔑",
  ":lock:": "🔒",
  ":unlock:": "🔓",
}

// LaTeX math rendering (simplified - you can integrate KaTeX for full support)
const renderMath = (expression: string, isBlock = false): string => {
  // This is a simplified math renderer. For production, use KaTeX or MathJax
  const mathHtml = expression
    .replace(/\^(\w+|\{[^}]+\})/g, "<sup>$1</sup>")
    .replace(/_(\w+|\{[^}]+\})/g, "<sub>$1</sub>")
    .replace(
      /\\frac\{([^}]+)\}\{([^}]+)\}/g,
      '<span class="fraction"><span class="numerator">$1</span><span class="denominator">$2</span></span>',
    )
    .replace(/\\sqrt\{([^}]+)\}/g, "√($1)")
    .replace(/\\sum/g, "∑")
    .replace(/\\int/g, "∫")
    .replace(/\\infty/g, "∞")
    .replace(/\\alpha/g, "α")
    .replace(/\\beta/g, "β")
    .replace(/\\gamma/g, "γ")
    .replace(/\\delta/g, "δ")
    .replace(/\\pi/g, "π")
    .replace(/\\theta/g, "θ")
    .replace(/\\lambda/g, "λ")
    .replace(/\\mu/g, "μ")
    .replace(/\\sigma/g, "σ")
    .replace(/\\phi/g, "φ")
    .replace(/\\omega/g, "ω")

  return isBlock ? `<div class="math-block">${mathHtml}</div>` : `<span class="math-inline">${mathHtml}</span>`
}

// Copy button component
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleCopy}
      className="absolute top-2 right-2 h-8 w-8 p-0 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white"
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
    </Button>
  )
}

// Syntax highlighting for code blocks
const highlightCode = (code: string, language?: string): string => {
  const keywords = [
    "function",
    "const",
    "let",
    "var",
    "if",
    "else",
    "for",
    "while",
    "return",
    "import",
    "export",
    "class",
    "interface",
    "type",
    "async",
    "await",
    "try",
    "catch",
    "throw",
    "new",
    "this",
    "public",
    "private",
    "protected",
    "static",
    "readonly",
    "extends",
    "implements",
    "from",
    "def",
    "print",
    "True",
    "False",
    "None",
    "and",
    "or",
    "not",
    "in",
    "is",
    "lambda",
  ]

  let highlightedCode = code

  // Highlight keywords
  keywords.forEach((keyword) => {
    const regex = new RegExp(`\\b${keyword}\\b`, "g")
    highlightedCode = highlightedCode.replace(regex, `<span class="text-blue-400 font-semibold">${keyword}</span>`)
  })

  // Highlight strings
  highlightedCode = highlightedCode.replace(
    /(["'`])((?:(?!\1)[^\\]|\\.)*)(\1)/g,
    '<span class="text-green-400">$1$2$3</span>',
  )

  // Highlight comments
  highlightedCode = highlightedCode.replace(
    /(\/\/.*$|\/\*[\s\S]*?\*\/|#.*$)/gm,
    '<span class="text-gray-500 italic">$1</span>',
  )

  // Highlight numbers
  highlightedCode = highlightedCode.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-purple-400">$1</span>')

  return highlightedCode
}

const parseMarkdown = (content: string): React.ReactNode[] => {
  const lines = content.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (!line.trim()) {
      i++
      continue
    }

    // Block math ($$...$$)
    if (line.trim().startsWith("$$") && line.trim().endsWith("$$")) {
      const mathExpression = line.trim().slice(2, -2)
      elements.push(
        <div
          key={`math-block-${i}`}
          className="my-4 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center"
          dangerouslySetInnerHTML={{ __html: renderMath(mathExpression, true) }}
        />,
      )
      i++
      continue
    }

    // Code blocks
    if (line.startsWith("```")) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      i++

      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }

      const codeContent = codeLines.join("\n")
      const highlightedCode = highlightCode(codeContent, language)

      elements.push(
        <div key={`code-${i}`} className="my-4 relative group">
          {language && (
            <div className="bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono rounded-t-lg border-b border-gray-700 flex justify-between items-center">
              <span>{language}</span>
            </div>
          )}
          <div className="relative">
            <pre
              className={cn(
                "bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono",
                language ? "rounded-t-none" : "",
              )}
            >
              <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            </pre>
            <CopyButton text={codeContent} />
          </div>
        </div>,
      )
      i++
      continue
    }

    // Headers
    if (line.startsWith("#")) {
      const level = line.match(/^#+/)?.[0].length || 1
      const text = line.replace(/^#+\s*/, "")
      const HeaderTag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements

      const headerClasses = {
        1: "text-2xl font-bold text-gray-900 mt-6 mb-4 border-b border-gray-200 pb-2",
        2: "text-xl font-bold text-gray-900 mt-5 mb-3",
        3: "text-lg font-semibold text-gray-900 mt-4 mb-2",
        4: "text-base font-semibold text-gray-900 mt-3 mb-2",
        5: "text-sm font-semibold text-gray-900 mt-2 mb-1",
        6: "text-xs font-semibold text-gray-900 mt-2 mb-1",
      }

      elements.push(
        <HeaderTag key={`header-${i}`} className={headerClasses[level as keyof typeof headerClasses]}>
          {parseInlineMarkdown(text)}
        </HeaderTag>,
      )
      i++
      continue
    }

    // Blockquotes
    if (line.startsWith(">")) {
      const quoteLines: string[] = []
      while (i < lines.length && (lines[i].startsWith(">") || lines[i].trim() === "")) {
        if (lines[i].startsWith(">")) {
          quoteLines.push(lines[i].slice(1).trim())
        } else if (lines[i].trim() === "" && quoteLines.length > 0) {
          quoteLines.push("")
        }
        i++
      }

      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="border-l-4 border-blue-500 pl-4 py-3 my-4 bg-gradient-to-r from-blue-50 to-transparent italic text-gray-700 rounded-r-lg"
        >
          {parseInlineMarkdown(quoteLines.join(" "))}
        </blockquote>,
      )
      continue
    }

    // Unordered lists
    if (line.match(/^[\s]*[-*+]\s/)) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].match(/^[\s]*[-*+]\s/)) {
        listItems.push(lines[i].replace(/^[\s]*[-*+]\s/, ""))
        i++
      }

      elements.push(
        <ul key={`ul-${i}`} className="list-none my-3 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-gray-700 flex items-start">
              <span className="text-blue-500 mr-2 mt-1">•</span>
              <span>{parseInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>,
      )
      continue
    }

    // Ordered lists
    if (line.match(/^[\s]*\d+\.\s/)) {
      const listItems: string[] = []
      let startNum = 1
      while (i < lines.length && lines[i].match(/^[\s]*\d+\.\s/)) {
        if (listItems.length === 0) {
          const match = lines[i].match(/^[\s]*(\d+)\.\s/)
          startNum = match ? Number.parseInt(match[1]) : 1
        }
        listItems.push(lines[i].replace(/^[\s]*\d+\.\s/, ""))
        i++
      }

      elements.push(
        <ol key={`ol-${i}`} start={startNum} className="list-none my-3 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-gray-700 flex items-start">
              <span className="text-blue-500 mr-2 mt-1 font-semibold min-w-[1.5rem]">{startNum + idx}.</span>
              <span>{parseInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>,
      )
      continue
    }

    // Tables
    if (line.includes("|") && lines[i + 1]?.includes("|") && lines[i + 1]?.includes("-")) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i])
        i++
      }

      if (tableLines.length >= 2) {
        const headers = tableLines[0]
          .split("|")
          .map((h) => h.trim())
          .filter((h) => h)
        const rows = tableLines.slice(2).map((row) =>
          row
            .split("|")
            .map((cell) => cell.trim())
            .filter((cell) => cell),
        )

        elements.push(
          <div key={`table-${i}`} className="my-6 overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  {headers.map((header, idx) => (
                    <th key={idx} className="px-6 py-3 text-left font-semibold text-gray-900 border-b border-gray-200">
                      {parseInlineMarkdown(header)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {rows.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
                    {row.map((cell, cellIdx) => (
                      <td key={cellIdx} className="px-6 py-4 text-gray-700 border-b border-gray-100">
                        {parseInlineMarkdown(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>,
        )
        continue
      }
    }

    // Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(<hr key={`hr-${i}`} className="my-8 border-gray-300" />)
      i++
      continue
    }

    // Regular paragraphs
    const paragraphLines: string[] = []
    while (i < lines.length && lines[i].trim() && !isSpecialLine(lines[i])) {
      paragraphLines.push(lines[i])
      i++
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={`p-${i}`} className="text-gray-700 leading-relaxed my-3">
          {parseInlineMarkdown(paragraphLines.join(" "))}
        </p>,
      )
    }
  }

  return elements
}

const isSpecialLine = (line: string): boolean => {
  return (
    line.startsWith("#") ||
    line.startsWith(">") ||
    line.startsWith("```") ||
    line.trim().startsWith("$$") ||
    line.match(/^[\s]*[-*+]\s/) !== null ||
    line.match(/^[\s]*\d+\.\s/) !== null ||
    line.includes("|") ||
    line.match(/^[-*_]{3,}$/) !== null
  )
}

const parseInlineMarkdown = (text: string): React.ReactNode => {
  let result: React.ReactNode = text

  // Emoji support
  Object.entries(emojiMap).forEach(([shortcode, emoji]) => {
    result = replaceWithComponent(result, new RegExp(escapeRegex(shortcode), "g"), () => (
      <span key={Math.random()}>{emoji}</span>
    ))
  })

  // Inline math ($...$)
  result = replaceWithComponent(result, /\$([^$]+)\$/g, (match, content) => (
    <span
      key={Math.random()}
      className="math-inline bg-blue-50 px-1 py-0.5 rounded text-blue-800"
      dangerouslySetInnerHTML={{ __html: renderMath(content, false) }}
    />
  ))

  // Bold
  result = replaceWithComponent(result, /\*\*(.*?)\*\*/g, (match, content) => (
    <strong key={Math.random()} className="font-semibold text-gray-900">
      {content}
    </strong>
  ))

  // Italic
  result = replaceWithComponent(result, /\*(.*?)\*/g, (match, content) => (
    <em key={Math.random()} className="italic">
      {content}
    </em>
  ))

  // Strikethrough
  result = replaceWithComponent(result, /~~(.*?)~~/g, (match, content) => (
    <del key={Math.random()} className="line-through text-gray-500">
      {content}
    </del>
  ))

  // Inline code
  result = replaceWithComponent(result, /`(.*?)`/g, (match, content) => (
    <code key={Math.random()} className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono border">
      {content}
    </code>
  ))

  // Links
  result = replaceWithComponent(result, /\[([^\]]+)\]$$([^)]+)$$/g, (match, text, url) => (
    <a
      key={Math.random()}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-500 transition-colors"
    >
      {text}
    </a>
  ))

  return result
}

const escapeRegex = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const replaceWithComponent = (
  text: React.ReactNode,
  regex: RegExp,
  replacer: (match: string, ...groups: string[]) => React.ReactNode,
): React.ReactNode => {
  if (typeof text !== "string") return text

  const parts: React.ReactNode[] = []
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    // Add replaced component
    parts.push(replacer(match[0], ...match.slice(1)))

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length === 1 ? parts[0] : parts
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const elements = parseMarkdown(content)

  return (
    <div className={cn("markdown-content", className)}>
      {elements}
      <style jsx>{`
        .math-block {
          font-size: 1.2em;
          font-family: 'Times New Roman', serif;
          color: #1e40af;
        }
        .math-inline {
          font-family: 'Times New Roman', serif;
        }
        .fraction {
          display: inline-block;
          vertical-align: middle;
          text-align: center;
        }
        .numerator {
          display: block;
          border-bottom: 1px solid currentColor;
          padding-bottom: 2px;
        }
        .denominator {
          display: block;
          padding-top: 2px;
        }
      `}</style>
    </div>
  )
}
