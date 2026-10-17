import Link from "next/link"
import { Building2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm">
        <Building2 className="h-8 w-8" />
      </div>
      <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive mb-3">
        404 — Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground max-w-md">
        The requested resource does not exist
      </h1>
      <p className="mt-3 text-sm text-muted-foreground max-w-md leading-relaxed">
        The dashboard view or asset you are attempting to access has been moved, archived, or you may lack sufficient clearance.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Link href="/">
          <Button variant="default" className="gap-2 cursor-pointer">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
