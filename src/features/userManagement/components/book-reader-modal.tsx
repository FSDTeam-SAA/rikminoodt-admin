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
  Calendar,
  User,
  Sparkles,
  ShoppingBag,
} from "lucide-react"
import { toast } from "sonner"
import jsPDF from "jspdf"
import { GeneratedBook, UserOrder } from "../types"

interface BookReaderModalProps {
  isOpen: boolean
  onClose: () => void
  book: GeneratedBook | null
  orders?: UserOrder[]
}

const PAGE_RATIO = 397 / 459

type PageProps = {
  children: React.ReactNode
}

const ReaderPage = React.forwardRef<HTMLDivElement, PageProps>(
  ({ children }, ref) => (
    <div ref={ref} className="h-full w-full select-none">
      <div className="h-full w-full overflow-hidden bg-[#FFFEFC] shadow-inner">
        {children}
      </div>
    </div>
  )
)
ReaderPage.displayName = "ReaderPage"

export function BookReaderModal({
  isOpen,
  onClose,
  book,
  orders = [],
}: BookReaderModalProps) {
  const stageRef = React.useRef<HTMLDivElement>(null)
  const [pageSize, setPageSize] = React.useState({ width: 360, height: 416 })
  const [isCompact, setIsCompact] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [isDownloading, setIsDownloading] = React.useState(false)

  const {
    ref,
    bookProps,
    canGoNext,
    canGoPrev,
    flipNext,
    flipPrev,
    goToPage,
    page,
  } = usePageFlip(0)

  // Find if this book was ordered for print
  const relatedOrders = React.useMemo(() => {
    if (!book) return []
    return orders.filter(
      (o) =>
        o.bookId === book.id ||
        o.bookTitle?.toLowerCase().trim() === book.title?.toLowerCase().trim()
    )
  }, [book, orders])

  const totalCopiesOrdered = React.useMemo(
    () => relatedOrders.reduce((sum, o) => sum + (o.copies || 0), 0),
    [relatedOrders]
  )

  // Resize calculation matching Gullabs Flipbook specs
  React.useEffect(() => {
    const stage = stageRef.current
    if (!stage || !isOpen) return

    const updatePageSize = () => {
      const { width, height } = stage.getBoundingClientRect()
      const compact = width < 768
      const availableWidth = Math.max(width - 32, 260)
      const availableHeight = Math.max(height - 140, 320)
      const pageWidth = Math.floor(
        Math.min(
          compact ? availableWidth : availableWidth / 2,
          availableHeight * PAGE_RATIO
        )
      )

      setIsCompact(compact)
      setPageSize({
        width: Math.max(pageWidth, 240),
        height: Math.floor(Math.max(pageWidth, 240) / PAGE_RATIO),
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

  if (!isOpen || !book) return null

  const displayTitle = book.title || "Storybook"
  const pages = book.pages && book.pages.length > 0 ? book.pages : []

  // Fallback if no pages provided
  const activePages =
    pages.length > 0
      ? pages
      : [
          {
            pageNumber: 1,
            text:
              book.foreword ||
              "Once upon a time in a wonderful land filled with adventure and smiles...",
            imageUrl: book.cover || "",
          },
        ]

  // Total flipbook spreads (each spread has 2 pages: art + text)
  const totalSpreads = activePages.length
  const activeSpread = Math.min(Math.floor(page / 2) + 1, totalSpreads)

  // Download PDF Handler
  const handleDownloadPdf = async () => {
    if (isDownloading) return
    setIsDownloading(true)
    toast.info("Preparing your PDF...", {
      description: "Generating high-resolution storybook pages.",
    })

    try {
      if (book.pdfUrl) {
        const link = document.createElement("a")
        link.href = book.pdfUrl
        link.target = "_blank"
        link.download = `${displayTitle.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success("PDF Downloaded successfully!")
        return
      }

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
        } catch {
          // Fallback
        }

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
              resolve(canvas.toDataURL("image/jpeg", 0.9))
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

      // 1. Cover Page
      doc.setFillColor(255, 248, 240)
      doc.rect(0, 0, pageWidth, pageHeight, "F")

      // Elegant border
      doc.setDrawColor(224, 169, 76)
      doc.setLineWidth(1)
      doc.rect(10, 10, pageWidth - 20, pageHeight - 20)

      doc.setFont("helvetica", "bold")
      doc.setFontSize(24)
      doc.setTextColor(50, 40, 55)
      const splitTitle = doc.splitTextToSize(displayTitle, pageWidth - 40)
      doc.text(splitTitle, pageWidth / 2, 35, { align: "center" })

      if (book.theme || book.subject) {
        doc.setFont("helvetica", "italic")
        doc.setFontSize(12)
        doc.setTextColor(180, 120, 60)
        doc.text(
          `${book.theme?.replace(/_/g, " ") || ""} • ${book.subject?.replace(/_/g, " ") || ""}`,
          pageWidth / 2,
          48,
          { align: "center" }
        )
      }

      const coverSrc = book.cover || activePages[0]?.imageUrl
      if (coverSrc) {
        const coverData = await loadImageDataUrl(coverSrc)
        if (coverData) {
          doc.addImage(coverData, "JPEG", 25, 58, pageWidth - 50, 140)
        }
      }

      if (book.creatorName) {
        doc.setFont("helvetica", "normal")
        doc.setFontSize(13)
        doc.setTextColor(100, 90, 100)
        doc.text(`Created by ${book.creatorName}`, pageWidth / 2, 220, {
          align: "center",
        })
      }

      if (book.foreword) {
        doc.setFont("helvetica", "italic")
        doc.setFontSize(11)
        doc.setTextColor(120, 110, 120)
        const splitForeword = doc.splitTextToSize(
          `"${book.foreword}"`,
          pageWidth - 50
        )
        doc.text(splitForeword, pageWidth / 2, 235, { align: "center" })
      }

      // 2. Story Pages
      for (let i = 0; i < activePages.length; i++) {
        const p = activePages[i]
        doc.addPage()
        doc.setFillColor(255, 255, 255)
        doc.rect(0, 0, pageWidth, pageHeight, "F")

        // Page Illustration
        if (p.imageUrl) {
          const imgData = await loadImageDataUrl(p.imageUrl)
          if (imgData) {
            doc.addImage(imgData, "JPEG", 25, 22, pageWidth - 50, 135)
          }
        }

        // Story Text
        if (p.text) {
          doc.setFont("helvetica", "normal")
          doc.setFontSize(14)
          doc.setTextColor(45, 35, 50)
          const splitText = doc.splitTextToSize(p.text, pageWidth - 50)
          doc.text(splitText, pageWidth / 2, 185, { align: "center" })
        }

        // Page Number footer
        doc.setFontSize(10)
        doc.setTextColor(160, 150, 160)
        doc.text(
          `— ${p.pageNumber || i + 1} —`,
          pageWidth / 2,
          pageHeight - 14,
          { align: "center" }
        )
      }

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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-reader-title"
    >
      {/* Top Header Bar */}
      <header className="relative z-30 flex items-center justify-between border-b border-[#EADFD4] bg-[#FFF8F0]/95 px-4 py-3 sm:px-6 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-[#E0A94C]/15 border border-[#E0A94C]/30 flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5 text-[#C88A2D]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2
                id="book-reader-title"
                className="font-serif text-lg sm:text-xl font-bold text-[#423246] truncate"
              >
                {displayTitle}
              </h2>
              {book.status && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {book.status}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs text-stone-500 font-medium flex-wrap mt-0.5">
              {book.creatorName && (
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  By {book.creatorName}
                </span>
              )}
              {book.ageCategory && <span>Age: {book.ageCategory}</span>}
              {book.theme && (
                <span>Theme: {book.theme.replace(/_/g, " ")}</span>
              )}
              {book.language && <span>Lang: {book.language}</span>}
              {totalCopiesOrdered > 0 && (
                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-semibold border border-amber-200">
                  <ShoppingBag className="w-3 h-3 text-amber-600" />
                  {totalCopiesOrdered} Copies Ordered
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#DE778C] hover:bg-[#CF6277] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="p-2 rounded-lg border border-stone-300/80 bg-white hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
            aria-label="Close reader"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Flipbook Stage */}
      <div
        ref={stageRef}
        className="relative flex-1 flex items-center justify-center overflow-hidden bg-[#241F28]/90 px-3 py-4 sm:px-8 sm:py-6"
      >
        <div
          className="origin-center transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          <HTMLFlipBook
            ref={ref}
            {...bookProps}
            width={pageSize.width}
            height={pageSize.height}
            sizing="fixed"
            autoSize={false}
            usePortrait={isCompact}
            drawShadow
            maxShadowOpacity={0.65}
            flippingTime={850}
            allowTouchScroll={false}
            useKeyboard
            controls="none"
            lazyRadius={2}
            aria-label={`${displayTitle} book reader`}
          >
            {activePages.flatMap((bookPage, index) => [
              // Page Left: Illustration Art
              <ReaderPage key={`${index}-art`}>
                <div className="relative h-full w-full bg-[#F5EFE6] p-3 sm:p-5 flex flex-col justify-between border-r border-[#E8DDD1]/60">
                  <div className="relative flex-1 w-full rounded-md overflow-hidden bg-white shadow-md border border-stone-200">
                    {bookPage.imageUrl ? (
                      <Image
                        src={bookPage.imageUrl}
                        alt={`Page ${bookPage.pageNumber || index + 1} Illustration`}
                        fill
                        sizes="(max-width: 768px) 90vw, 45vw"
                        className="object-contain p-1"
                        priority={index === 0}
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center text-stone-400 gap-2">
                        <BookOpen className="w-10 h-10 opacity-40" />
                        <span className="text-xs">No image available</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between pt-2 px-1 text-[11px] font-semibold text-stone-400">
                    <span>{displayTitle}</span>
                    <span>Page {(bookPage.pageNumber || index + 1) * 2 - 1}</span>
                  </div>
                </div>
              </ReaderPage>,

              // Page Right: Story Text
              <ReaderPage key={`${index}-text`}>
                <div className="relative flex h-full w-full flex-col justify-between bg-[#FFFDF9] p-6 sm:p-10 border-l border-[#F0E6D8]">
                  {/* Decorative Header Ornament */}
                  <div className="flex justify-between items-center text-[#E0A94C] text-sm">
                    <span className="text-xl">✦</span>
                    <span className="text-xs tracking-widest uppercase font-serif text-[#C88A2D]/80">
                      Chapter {bookPage.pageNumber || index + 1}
                    </span>
                    <span className="text-xl">✦</span>
                  </div>

                  {/* Centered Story Text */}
                  <div className="my-auto flex flex-col items-center justify-center text-center px-2 sm:px-6">
                    <p className="font-serif text-lg sm:text-xl lg:text-2xl font-medium leading-relaxed sm:leading-loose text-[#322438]">
                      {bookPage.text || "..."}
                    </p>
                  </div>

                  {/* Bottom Ornament and Page Number */}
                  <div className="flex items-center justify-between text-stone-400 text-xs pt-4 border-t border-[#F2E8DC]">
                    <span className="text-lg text-[#CF9139]" aria-hidden="true">
                      ❧
                    </span>
                    <span className="font-serif font-bold text-stone-600">
                      {bookPage.pageNumber || index + 1}
                    </span>
                    <span className="text-lg text-[#CF9139]" aria-hidden="true">
                      ❧
                    </span>
                  </div>
                </div>
              </ReaderPage>,
            ])}
          </HTMLFlipBook>
        </div>
      </div>

      {/* Bottom Floating Navigation Toolbar */}
      <nav
        className="relative z-30 flex flex-wrap items-center justify-center gap-2 border-t border-[#EADFD4] bg-[#FFF8F0]/95 px-4 py-3 sm:py-4 backdrop-blur-sm"
        aria-label="Book page navigation"
      >
        {/* Zoom Controls */}
        <button
          type="button"
          aria-label="Zoom in"
          onClick={() => setZoom((v) => Math.min(v + 0.05, 1.25))}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2]"
          title="Zoom in"
        >
          <Plus size={16} strokeWidth={2.5} />
        </button>
        <button
          type="button"
          aria-label="Zoom out"
          onClick={() => setZoom((v) => Math.max(v - 0.05, 0.75))}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2]"
          title="Zoom out"
        >
          <Minus size={16} strokeWidth={2.5} />
        </button>

        <div className="h-5 w-px bg-stone-300 mx-1" />

        {/* Previous Page */}
        <button
          type="button"
          aria-label="Previous pages"
          disabled={!canGoPrev}
          onClick={() => flipPrev()}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] disabled:cursor-not-allowed disabled:opacity-35"
          title="Previous page (Left arrow)"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>

        {/* Spread Navigation Numbers */}
        <div className="flex items-center gap-1 max-w-[280px] sm:max-w-md overflow-x-auto py-1">
          {activePages.map((_, index) => {
            const spreadPage = index * 2
            const spreadNumber = index + 1
            const isCurrent = activeSpread === spreadNumber
            return (
              <button
                key={spreadNumber}
                type="button"
                onClick={() => goToPage(spreadPage, "animate")}
                className={`flex size-8 cursor-pointer items-center justify-center rounded-md font-sans text-xs font-semibold transition-colors shrink-0 ${
                  isCurrent
                    ? "border border-[#E0A94C] bg-[#E0A94C] text-white shadow-xs"
                    : "border border-[#E8AA46]/80 bg-white text-[#B37A20] hover:bg-[#FFF5E2]"
                }`}
                title={`Go to page ${spreadNumber}`}
              >
                {spreadNumber}
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
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-[#E8AA46] bg-white text-[#D89A38] transition-colors hover:bg-[#FFF5E2] disabled:cursor-not-allowed disabled:opacity-35"
          title="Next page (Right arrow)"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </button>

        <div className="h-5 w-px bg-stone-300 mx-1" />

        {/* Close Button */}
        <button
          type="button"
          aria-label="Exit reader"
          onClick={onClose}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-stone-300 bg-white text-stone-600 transition-colors hover:bg-stone-100"
          title="Exit reader"
        >
          <Minimize2 size={16} strokeWidth={2.5} />
        </button>
      </nav>
    </div>
  )
}

export default BookReaderModal
