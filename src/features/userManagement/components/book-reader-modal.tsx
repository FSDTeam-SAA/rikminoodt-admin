"use client"

import * as React from "react"
import Image from "next/image"
import HTMLFlipBook, { usePageFlip } from "@gullabs/react-flipbook"
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Minimize2,
  Minus,
  Plus,
  X,
  BookOpen,
  User,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"
import { GeneratedBook, UserOrder } from "../types"
import { getBookFontFamily } from "@/lib/book-font"
import { BookPageDecorations } from "./book-page-decorations"
import api from "@/lib/api"
import { getAccessToken } from "@/lib/auth-storage"

export interface BookReaderModalProps {
  isOpen: boolean
  onClose: () => void
  book: (GeneratedBook & {
    foreword?: string
    backCoverText?: string
    titlePosition?: string
    font?: string
    creatorName?: string
    coverImageUrl?: string
    pdfUrl?: string
    language?: string
  }) | null
  orders?: UserOrder[]
  initialPageNumber?: number
}

const PAGE_RATIO = 397 / 459

type PageProps = {
  children: React.ReactNode
}

const ReaderPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children }, ref) => (
    <div ref={ref} className="h-full w-full select-none">
      <div className="h-full w-full overflow-hidden bg-[#FFFEFC]">
        {children}
      </div>
    </div>
  )
)
ReaderPage.displayName = "ReaderPage"

const defaultStoryPages = [
  {
    imageUrl: "/books/noah.jpg",
    alt: "Noah exploring the ocean with friendly sea animals",
    text: "The ocean sparkled softly as Noah and his new friends swam through the colourful coral reef. Every splash brought a new discovery, and Noah knew this was only the beginning of a magical adventure.",
  },
  {
    imageUrl: "/books/ben.jpg",
    alt: "A page from Noah's magical ocean adventure",
    text: "With a brave little smile, Noah followed the dolphins toward a secret cove. There, the friends found a treasure more wonderful than gold: helping every creature feel safe and happy at home.",
  },
]

type ReaderBookPage = {
  kind: "cover" | "welcome" | "storyImage" | "storyText" | "finalMessage" | "backCover"
  image: string
  alt: string
  text: string
  title?: string
  storyIndex?: number
  sourcePageNumber?: number
}

export function BookReaderModal({
  isOpen,
  onClose,
  book,
  orders = [],
  initialPageNumber,
}: BookReaderModalProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [pageSize, setPageSize] = React.useState({ width: 360, height: 416 })
  const [isCompact, setIsCompact] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [isDownloading, setIsDownloading] = React.useState(false)
  const [liveBook, setLiveBook] = React.useState<any>(null)
  const [isLoadingBook, setIsLoadingBook] = React.useState(false)

  // Fetch live book from API: GET /api/v1/books/:id whenever modal opens
  React.useEffect(() => {
    if (!isOpen || !book) {
      setLiveBook(null)
      return
    }
    const targetId = book.id || book._id
    if (!targetId || !/^[0-9a-fA-F]{24}$/.test(targetId)) return

    let isMounted = true
    const fetchLiveBook = async () => {
      try {
        setIsLoadingBook(true)
        const res = await api.get(`/books/${targetId}`)
        if (isMounted && res.data?.data) {
          setLiveBook(res.data.data)
        }
      } catch (err) {
        console.warn("Could not fetch live book from /books/:id:", err)
      } finally {
        if (isMounted) setIsLoadingBook(false)
      }
    }

    fetchLiveBook()
    return () => {
      isMounted = false
    }
  }, [isOpen, book?.id, book?._id])

  // Merge live book data with fallback prop data
  const effectiveBook = liveBook || book
  const displayTitle = effectiveBook?.title || "Personalized Storybook"
  const bookFontFamily = getBookFontFamily(effectiveBook?.font)

  const coverTitlePosition =
    effectiveBook?.titlePosition === "Middle"
      ? "top-1/2 -translate-y-1/2"
      : effectiveBook?.titlePosition === "Bottom"
        ? "bottom-16"
        : "top-7"

  // Prepare reader pages matching the generated PDF & website book design
  const { activePages, storyPages, coverImg, welcomeText, finalText, readerContentKey } =
    React.useMemo(() => {
      const suppliedPages = (effectiveBook?.pages || []) as any[]
      const hasSpecialPages = suppliedPages.some((p) => p.kind)
      const filteredStoryPages = (
        hasSpecialPages
          ? suppliedPages.filter((p) => p.kind === "story")
          : suppliedPages.length > 0
            ? suppliedPages
            : defaultStoryPages
      ).map((p, index) => ({
        kind: "storyImage" as const,
        image: p.imageUrl || p.illustrationUrl || p.image || "/books/noah.jpg",
        alt: p.alt || `Illustration for story page ${p.storyPageNumber || p.pageNumber || index + 1}`,
        text: p.text || "",
        storyIndex: index,
        sourcePageNumber: p.pageNumber || p.storyPageNumber || index + 1,
      }))

      const coverPage = suppliedPages.find((p) => p.kind === "cover")
      const welcomePage = suppliedPages.find((p) => p.kind === "welcome")
      const finalPage = suppliedPages.find((p) => p.kind === "finalMessage")

      const resolvedCoverImg =
        coverPage?.imageUrl ||
        coverPage?.illustrationUrl ||
        coverPage?.image ||
        effectiveBook?.coverImageUrl ||
        effectiveBook?.cover ||
        filteredStoryPages[0]?.image ||
        "/books/ben.jpg"

      const resolvedWelcomeText =
        welcomePage?.text ||
        effectiveBook?.foreword ||
        `Welcome to ${displayTitle}. This magical adventure was created especially for you.`

      const resolvedFinalText =
        finalPage?.text ||
        effectiveBook?.backCoverText ||
        "Thank you for sharing this magical adventure. May the story stay with you for years to come."

      const pagesList: ReaderBookPage[] = [
        {
          kind: "cover",
          image: resolvedCoverImg,
          alt: `Cover of ${displayTitle}`,
          text: "",
          title: displayTitle,
          sourcePageNumber: hasSpecialPages ? (coverPage?.pageNumber || 1) : 1,
        },
        {
          kind: "welcome",
          image: "",
          alt: "",
          text: resolvedWelcomeText,
          sourcePageNumber: hasSpecialPages ? welcomePage?.pageNumber : 2,
        },
        ...filteredStoryPages.flatMap((storyPage) => [
          storyPage,
          { ...storyPage, kind: "storyText" as const },
        ]),
        {
          kind: "finalMessage",
          image: "",
          alt: "",
          text: resolvedFinalText,
          title: finalPage?.title || displayTitle,
          sourcePageNumber: hasSpecialPages ? finalPage?.pageNumber : undefined,
        },
      ]

      // Keep spreads balanced in 2-page mode
      if (pagesList.length % 2 !== 0) {
        pagesList.push({
          kind: "backCover",
          image: resolvedCoverImg,
          alt: `Back cover of ${displayTitle}`,
          text: "",
          title: displayTitle,
        })
      }

      const key = pagesList
        .map((p) => `${p.sourcePageNumber}-${p.title || ""}-${p.text}-${p.image}`)
        .join("|")

      return {
        activePages: pagesList,
        storyPages: filteredStoryPages,
        coverImg: resolvedCoverImg,
        welcomeText: resolvedWelcomeText,
        finalText: resolvedFinalText,
        readerContentKey: key,
      }
    }, [effectiveBook, displayTitle])

  const initialReaderPage = React.useMemo(() => {
    if (!initialPageNumber) return 0
    const idx = activePages.findIndex(
      (p) => p.sourcePageNumber === initialPageNumber
    )
    return idx >= 0 ? idx : 0
  }, [activePages, initialPageNumber])

  const {
    ref,
    bookProps,
    canGoNext,
    canGoPrev,
    flipNext,
    flipPrev,
    goToPage,
    page,
  } = usePageFlip(initialReaderPage)

  // Find if this book was ordered for print
  const relatedOrders = React.useMemo(() => {
    if (!effectiveBook) return []
    return orders.filter(
      (o) =>
        o.bookId === effectiveBook.id ||
        o.bookId === effectiveBook._id ||
        o.bookTitle?.toLowerCase().trim() === effectiveBook.title?.toLowerCase().trim()
    )
  }, [effectiveBook, orders])

  const totalCopiesOrdered = React.useMemo(
    () => relatedOrders.reduce((sum, o) => sum + (o.copies || 0), 0),
    [relatedOrders]
  )

  // Total pages and current page computation
  const totalBookPages = activePages.length
  const currentBookPage = activePages[page]?.sourcePageNumber || page + 1

  // Total spreads for quick jump
  const totalSpreads = Math.ceil(activePages.length / 2)
  const activeSpread = Math.min(Math.floor(page / 2) + 1, totalSpreads)

  // Resize calculation matching Gullabs Flipbook specs & website ratio
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage || !isOpen) return

    const updatePageSize = () => {
      const { width, height } = stage.getBoundingClientRect()
      const compact = width < 720
      const availableWidth = Math.max(width - 32, 240)
      const availableHeight = Math.max(height - 12, 300)
      const pageWidth = Math.floor(
        Math.min(
          compact ? availableWidth : availableWidth / 2,
          availableHeight * PAGE_RATIO
        )
      )

      setIsCompact(compact)
      setPageSize({
        width: Math.max(pageWidth, 200),
        height: Math.floor(Math.max(pageWidth, 200) / PAGE_RATIO),
      })
    }

    updatePageSize()
    const observer = new ResizeObserver(updatePageSize)
    observer.observe(stage)

    return () => observer.disconnect()
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen) setZoom(1)
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
      if (event.key === "ArrowLeft" && canGoPrev) flipPrev()
      if (event.key === "ArrowRight" && canGoNext) flipNext()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, canGoPrev, canGoNext, flipPrev, flipNext])

  // Download PDF Handler: Calls backend API GET /api/v1/books/:id/download (matching website behavior)
  const handleDownloadPdf = async () => {
    if (isDownloading) return
    setIsDownloading(true)
    toast.info("Preparing your PDF...", {
      description: "Calling backend PDF generation API...",
    })

    try {
      const targetBookId = effectiveBook?.id || effectiveBook?._id
      const token = getAccessToken()
      const apiBase =
        process.env.NEXT_PUBLIC_BACKEND_API_URL ||
        process.env.NEXT_PUBLIC_API_URL ||
        "https://api.boekerello.com/api/v1"

      // 1. Direct call to backend PDF download endpoint: GET /books/:id/download
      if (targetBookId && /^[0-9a-fA-F]{24}$/.test(targetBookId)) {
        try {
          const headers: Record<string, string> = {}
          if (token) headers["Authorization"] = `Bearer ${token}`

          const res = await fetch(
            `${apiBase.replace(/\/+$/, "")}/books/${encodeURIComponent(targetBookId)}/download?refresh=${Date.now()}`,
            {
              headers,
              cache: "no-store",
            }
          )

          if (res.ok) {
            const blob = await res.blob()
            const objectUrl = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = objectUrl
            const safeName = displayTitle.replace(/[^a-zA-Z0-9_-]/g, "_") || "storybook"
            link.download = `${safeName}.pdf`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(objectUrl)
            toast.success("PDF Downloaded successfully!")
            return
          } else {
            const errJson = await res.json().catch(() => null)
            console.warn("Backend PDF download returned non-ok:", errJson)
          }
        } catch (apiErr) {
          console.warn("Backend PDF download fetch error:", apiErr)
        }
      }

      // 2. Direct Cloudinary PDF URL if available
      if (effectiveBook?.pdfUrl) {
        const link = document.createElement("a")
        link.href = effectiveBook.pdfUrl
        link.target = "_blank"
        link.download = `${displayTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("PDF Downloaded successfully!")
        return
      }

      // 3. Fallback client-side generation if server API is unreachable or offline mock
      const loadImageDataUrl = async (url: string): Promise<string | null> => {
        if (!url) return null
        try {
          const res = await fetch(url, { mode: "cors" })
          if (res.ok) {
            const blob = await res.blob()
            return new Promise((resolve) => {
              const reader = new FileReader()
              reader.onloadend = () => resolve(reader.result as string)
              reader.onerror = () => resolve(null)
              reader.readAsDataURL(blob)
            })
          }
        } catch {}

        return new Promise((resolve) => {
          const img = new window.Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            try {
              const canvas = document.createElement("canvas")
              canvas.width = img.naturalWidth || img.width || 800
              canvas.height = img.naturalHeight || img.height || 1000
              const ctx = canvas.getContext("2d")
              if (!ctx) return resolve(null)
              ctx.drawImage(img, 0, 0)
              resolve(canvas.toDataURL("image/jpeg", 0.92))
            } catch {
              resolve(null)
            }
          }
          img.onerror = () => resolve(null)
          img.src = url
        })
      }

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      // Cover Page
      doc.setFillColor(48, 39, 53)
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      const coverData = await loadImageDataUrl(coverImg)
      if (coverData) {
        doc.addImage(coverData, "JPEG", 0, 0, pageWidth, pageHeight)
      }
      doc.setFont("times", "bold")
      doc.setFontSize(26)
      doc.setTextColor(255, 255, 255)
      const splitTitle = doc.splitTextToSize(displayTitle, pageWidth - 40)
      doc.text(splitTitle, pageWidth / 2, 45, { align: "center" })

      // Welcome Page
      doc.addPage()
      doc.setFillColor(255, 252, 246)
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      doc.setFont("times", "normal")
      doc.setFontSize(16)
      doc.setTextColor(48, 39, 53)
      const splitWelcome = doc.splitTextToSize(welcomeText, pageWidth - 50)
      doc.text(splitWelcome, pageWidth / 2, pageHeight / 2 - 20, { align: "center" })

      if (effectiveBook?.creatorName) {
        doc.setFontSize(11)
        doc.setTextColor(81, 66, 86)
        doc.text("This magical children's book was made by:", 25, pageHeight - 50)
        doc.setFont("times", "bold")
        doc.setFontSize(13)
        doc.text(effectiveBook.creatorName, 25, pageHeight - 42)
        doc.setDrawColor(81, 66, 86)
        doc.setLineWidth(0.3)
        doc.line(25, pageHeight - 40, 80, pageHeight - 40)
      }

      // Story Spreads: Illustration Page + Story Text Page
      for (let i = 0; i < storyPages.length; i++) {
        const sp = storyPages[i]
        // Art page
        doc.addPage()
        doc.setFillColor(48, 39, 53)
        doc.rect(0, 0, pageWidth, pageHeight, "F")
        if (sp.image) {
          const imgData = await loadImageDataUrl(sp.image)
          if (imgData) {
            doc.addImage(imgData, "JPEG", 0, 0, pageWidth, pageHeight)
          }
        }

        // Text page
        doc.addPage()
        doc.setFillColor(255, 252, 248)
        doc.rect(0, 0, pageWidth, pageHeight, "F")
        doc.setFont("times", "normal")
        doc.setFontSize(15)
        doc.setTextColor(48, 39, 53)
        const splitText = doc.splitTextToSize(sp.text || "", pageWidth - 50)
        doc.text(splitText, pageWidth / 2, pageHeight / 2 - 10, { align: "center" })

        // Page number circle badge
        doc.setDrawColor(233, 223, 214)
        doc.setFillColor(255, 255, 255)
        doc.circle(pageWidth - 20, pageHeight - 16, 5, "FD")
        doc.setFontSize(10)
        doc.setTextColor(48, 39, 53)
        doc.text(String(i + 1), pageWidth - 20, pageHeight - 14, { align: "center" })
      }

      // Final page
      doc.addPage()
      doc.setFillColor(255, 252, 246)
      doc.rect(0, 0, pageWidth, pageHeight, "F")
      doc.setFont("times", "bold")
      doc.setFontSize(22)
      doc.setTextColor(48, 39, 53)
      doc.text(displayTitle, pageWidth / 2, 80, { align: "center" })
      doc.setFont("times", "normal")
      doc.setFontSize(15)
      const splitFinal = doc.splitTextToSize(finalText, pageWidth - 50)
      doc.text(splitFinal, pageWidth / 2, 115, { align: "center" })

      const safeName = displayTitle.replace(/[^a-zA-Z0-9_-]/g, "_")
      doc.save(`${safeName}.pdf`)
      toast.success("PDF generated & downloaded!", {
        description: `Saved as ${safeName}.pdf`,
      })
    } catch (err: any) {
      console.error("PDF generation failed:", err)
      toast.error("Failed to generate PDF", {
        description: err?.message || "Please try again later.",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  if (!isOpen || !book) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-[#1E1E1E]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-reader-title"
    >
      <div className="relative h-full w-full overflow-hidden bg-[#FFF8F0]">
        {/* Top Header Bar */}
        <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#EADFD4] bg-[#FFF8F0]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#E0A94C]/15 border border-[#E0A94C]/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4 text-[#C88A2D]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2
                  id="book-reader-title"
                  className="font-serif text-lg sm:text-xl font-bold text-[#514256] truncate"
                >
                  {displayTitle}
                </h2>
                {effectiveBook.status && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    {effectiveBook.status}
                  </span>
                )}
                {isLoadingBook && (
                  <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
                    Syncing...
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500 font-medium flex-wrap mt-0.5">
                {effectiveBook.creatorName && (
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    By {effectiveBook.creatorName}
                  </span>
                )}
                {effectiveBook.ageCategory && <span>Age: {effectiveBook.ageCategory}</span>}
                {effectiveBook.language && <span>Lang: {effectiveBook.language}</span>}
                {totalCopiesOrdered > 0 && (
                  <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                    <ShoppingBag className="w-3 h-3 text-amber-600" />
                    {totalCopiesOrdered} Copies Ordered
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: Download PDF & Close */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#DE778C] hover:bg-[#CF6277] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download full book as PDF"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span className="hidden sm:inline">Download PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex size-9 cursor-pointer items-center justify-center rounded-xl border border-stone-300 bg-white text-stone-700 transition-colors hover:bg-stone-100"
              aria-label="Close reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Main Flipbook Stage */}
        <div
          ref={stageRef}
          className="absolute inset-x-0 top-[56px] bottom-[76px] flex items-center justify-center overflow-hidden px-4 py-1.5 sm:bottom-[84px] sm:px-7"
        >
          {isLoadingBook && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#FFF8F0]/85 backdrop-blur-xs gap-2">
              <Loader2 className="w-8 h-8 animate-spin text-[#DE778C]" />
              <span className="font-serif text-sm font-semibold text-[#514256]">
                Syncing live book pages...
              </span>
            </div>
          )}

          <div
            className="origin-center transition-transform duration-200"
            style={{ transform: `scale(${zoom})` }}
          >
            <HTMLFlipBook
              key={readerContentKey}
              ref={ref}
              {...bookProps}
              width={pageSize.width}
              height={pageSize.height}
              sizing="fixed"
              autoSize={false}
              usePortrait={isCompact}
              drawShadow
              maxShadowOpacity={0.65}
              flippingTime={950}
              allowTouchScroll={false}
              useKeyboard
              controls="none"
              lazyRadius={2}
              aria-label={`${displayTitle} book reader`}
            >
              {activePages.map((bookPage, index) => (
                <ReaderPage key={`${bookPage.kind}-${index}`}>
                  {/* 1. Cover Page */}
                  {bookPage.kind === "cover" ? (
                    <div className="relative h-full w-full overflow-hidden bg-[#302735]">
                      <Image
                        src={bookPage.image}
                        alt={bookPage.alt}
                        fill
                        sizes="(max-width: 720px) 90vw, 45vw"
                        className="object-cover object-center"
                        priority
                        unoptimized
                      />
                      <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-black/40 to-transparent" />
                      <h2
                        style={{ fontFamily: bookFontFamily }}
                        className={`absolute inset-x-6 ${coverTitlePosition} text-center text-[clamp(1.5rem,4vw,2.65rem)] font-bold leading-tight text-white [text-shadow:0_2px_3px_rgba(31,25,28,0.8)]`}
                      >
                        {bookPage.title}
                      </h2>
                      <Image
                        src="/images/rikLogo-transparent.png"
                        alt="Boekerello"
                        width={2170}
                        height={725}
                        className="absolute bottom-4 left-1/2 h-auto w-28 -translate-x-1/2 drop-shadow-md sm:w-36"
                        unoptimized
                      />
                    </div>
                  ) : bookPage.kind === "welcome" ? (
                    /* 2. Welcome Page */
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FFFCF6] px-[13%] text-center">
                      <BookPageDecorations />
                      <p
                        style={{ fontFamily: bookFontFamily }}
                        className="relative text-[clamp(0.9rem,2vw,1.45rem)] font-semibold leading-relaxed text-[#302735]"
                      >
                        {bookPage.text}
                      </p>
                      <div className="absolute bottom-[11%] left-[12%] text-left">
                        <p
                          style={{ fontFamily: bookFontFamily }}
                          className="text-[clamp(0.55rem,1.1vw,0.8rem)] text-[#302735]"
                        >
                          {effectiveBook?.language?.toLowerCase().includes("nl") ||
                          effectiveBook?.language?.toLowerCase().includes("dutch")
                            ? "Dit magische kinderboek is gemaakt door:"
                            : effectiveBook?.language?.toLowerCase().includes("fr") ||
                                effectiveBook?.language?.toLowerCase().includes("french")
                              ? "Ce merveilleux livre pour enfants a été créé par :"
                              : "This magical children's book was made by:"}
                        </p>
                        <span
                          style={{ fontFamily: bookFontFamily }}
                          className="mt-3 block border-b border-dashed border-[#514256] pb-1 text-[clamp(0.7rem,1.35vw,1rem)] font-semibold text-[#302735]"
                        >
                          {effectiveBook?.creatorName || " "}
                        </span>
                      </div>
                    </div>
                  ) : bookPage.kind === "storyImage" ? (
                    /* 3. Story Art Image Page */
                    <div className="relative h-full w-full overflow-hidden bg-[#302735]">
                      <Image
                        src={bookPage.image}
                        alt={bookPage.alt}
                        fill
                        sizes="(max-width: 720px) 90vw, 45vw"
                        className="object-cover object-center"
                        priority={index < 4}
                        unoptimized
                      />
                    </div>
                  ) : bookPage.kind === "storyText" ? (
                    /* 4. Story Text Page with decorations and circular page number */
                    <div className="relative flex h-full w-full items-center overflow-hidden bg-[#FFFCF8] px-[12%] py-10">
                      <BookPageDecorations
                        pageNumber={(bookPage.storyIndex ?? 0) + 1}
                      />
                      <div className="relative w-full">
                        {bookPage.text
                          .split(/\n\s*\n/)
                          .filter(Boolean)
                          .map((paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              style={{ fontFamily: bookFontFamily }}
                              className={`mb-4 font-semibold leading-[1.62] text-[#302735] last:mb-0 ${
                                bookPage.text.length > 900
                                  ? "text-[clamp(0.78rem,1.15vw,1.05rem)]"
                                  : "text-[clamp(0.85rem,1.7vw,1.25rem)]"
                              }`}
                            >
                              {paragraph}
                            </p>
                          ))}
                      </div>
                    </div>
                  ) : bookPage.kind === "finalMessage" ? (
                    /* 5. Final Message Page */
                    <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#FFFCF6] px-[13%] text-center">
                      <BookPageDecorations />
                      <div className="relative">
                        <h2
                          style={{ fontFamily: bookFontFamily }}
                          className="mb-5 text-[clamp(1.2rem,2.7vw,2rem)] font-bold text-[#302735]"
                        >
                          {bookPage.title}
                        </h2>
                        <p
                          style={{ fontFamily: bookFontFamily }}
                          className="text-[clamp(0.9rem,2vw,1.35rem)] font-semibold leading-relaxed text-[#302735]"
                        >
                          {bookPage.text}
                        </p>
                      </div>
                      <div className="absolute inset-x-0 bottom-[14%]">
                        <p className="font-sans text-[clamp(0.5rem,1vw,0.7rem)] text-[#514256]">
                          Created with love using Boekerello
                        </p>
                        <Image
                          src="/images/rikLogo-transparent.png"
                          alt="Boekerello"
                          width={2170}
                          height={725}
                          className="mx-auto mt-1 h-auto w-24 sm:w-28"
                          unoptimized
                        />
                      </div>
                    </div>
                  ) : (
                    /* 6. Back Cover Leaf */
                    <div className="relative h-full w-full overflow-hidden bg-[#302735] flex flex-col items-center justify-center text-center p-8">
                      <Image
                        src={bookPage.image}
                        alt="Back cover"
                        fill
                        sizes="(max-width: 720px) 90vw, 45vw"
                        className="object-cover object-center opacity-25"
                        unoptimized
                      />
                      <div className="relative z-10 flex flex-col items-center">
                        <Image
                          src="/images/rikLogo-transparent.png"
                          alt="Boekerello"
                          width={2170}
                          height={725}
                          className="h-auto w-32 drop-shadow-md sm:w-40 mb-4"
                          unoptimized
                        />
                        <p
                          style={{ fontFamily: bookFontFamily }}
                          className="text-white/90 text-sm font-semibold max-w-xs"
                        >
                          {displayTitle}
                        </p>
                      </div>
                    </div>
                  )}
                </ReaderPage>
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        {/* Bottom Floating Navigation Toolbar */}
        <nav
          className="absolute inset-x-0 bottom-0 z-30 flex flex-wrap items-center justify-center gap-1.5 border-t border-[#EADFD4] bg-[#FFF8F0]/95 px-4 py-3 backdrop-blur-sm sm:gap-2 sm:py-4"
          aria-label="Book page navigation"
        >
          {/* Zoom In */}
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoom((value) => Math.min(value + 0.05, 1.25))}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] sm:size-10"
            title="Zoom in"
          >
            <Plus size={17} strokeWidth={2.5} aria-hidden="true" />
          </button>

          {/* Zoom Out */}
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoom((value) => Math.max(value - 0.05, 0.75))}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] sm:size-10"
            title="Zoom out"
          >
            <Minus size={17} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <div className="h-5 w-px bg-stone-300 mx-1 hidden sm:block" />

          {/* Previous Page */}
          <button
            type="button"
            aria-label="Previous pages"
            disabled={!canGoPrev}
            onClick={() => flipPrev()}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] disabled:cursor-not-allowed disabled:opacity-35 sm:size-10"
            title="Previous page (Left arrow)"
          >
            <ChevronLeft size={21} strokeWidth={2.5} aria-hidden="true" />
          </button>

          {/* Spread / Page Quick-Jump Pills */}
          <div className="flex items-center gap-1 max-w-[220px] sm:max-w-md overflow-x-auto py-1 px-1">
            {Array.from({ length: totalSpreads }).map((_, index) => {
              const spreadPage = index * 2
              const spreadNumber = index + 1
              const isCurrent = activeSpread === spreadNumber
              const label =
                index === 0
                  ? "Cover"
                  : index === totalSpreads - 1
                    ? "End"
                    : `${spreadNumber - 1}`

              return (
                <button
                  key={spreadNumber}
                  type="button"
                  onClick={() => goToPage(spreadPage, "animate")}
                  className={`flex h-8 px-2.5 cursor-pointer items-center justify-center rounded-md font-sans text-xs font-semibold transition-colors shrink-0 ${
                    isCurrent
                      ? "border border-[#E0A94C] bg-[#E0A94C] text-white shadow-xs"
                      : "border border-[#E8AA46]/80 bg-white text-[#B37A20] hover:bg-[#FFF5E2]"
                  }`}
                  title={`Go to spread ${spreadNumber}`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          {/* Next Page */}
          <button
            type="button"
            aria-label="Next pages"
            disabled={!canGoNext}
            onClick={() => flipNext()}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] disabled:cursor-not-allowed disabled:opacity-35 sm:size-10"
            title="Next page (Right arrow)"
          >
            <ChevronRight size={21} strokeWidth={2.5} aria-hidden="true" />
          </button>

          <span
            className="min-w-16 text-center font-sans text-xs sm:text-sm font-semibold text-[#514256] px-1"
            aria-live="polite"
          >
            {currentBookPage} / {totalBookPages}
          </span>

          <div className="h-5 w-px bg-stone-300 mx-1 hidden sm:block" />

          {/* Close Reader */}
          <button
            type="button"
            aria-label="Close reader"
            onClick={onClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-600 transition-colors hover:bg-stone-100 sm:size-10"
            title="Exit reader (Esc)"
          >
            <Minimize2 size={17} strokeWidth={2.5} aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  )
}

export default BookReaderModal
