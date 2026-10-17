"use client"

import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { Building2, Sparkles } from "lucide-react"
import { useCreateProjectMutation } from "../hooks"
import { ProjectStatus } from "../types"

interface NewProjectDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NewProjectDialog({ open, onOpenChange }: NewProjectDialogProps) {
  const [name, setName] = React.useState("")
  const [category, setCategory] = React.useState("Waterfront Estate")
  const [location, setLocation] = React.useState("")
  const [price, setPrice] = React.useState("")
  const [units, setUnits] = React.useState(12)
  const [status, setStatus] = React.useState<ProjectStatus>("Active")

  const createMutation = useCreateProjectMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !location.trim() || !price.trim()) {
      toast.error("Please fill all required fields", {
        description: "Project title, location, and price are required.",
      })
      return
    }

    createMutation.mutate(
      {
        name,
        category,
        location,
        price,
        units: Number(units) || 1,
        status,
      },
      {
        onSuccess: () => {
          onOpenChange(false)
          setName("")
          setLocation("")
          setPrice("")
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Building2 className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg">Add New Rikminoodt Project</DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            Create and publish a new development or luxury property listing to the portfolio.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid gap-2">
            <Label htmlFor="proj-name" className="text-xs font-semibold">
              Project / Property Title *
            </Label>
            <Input
              id="proj-name"
              placeholder="e.g. Marina Bay Horizon Penthouse"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-9 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label className="text-xs font-semibold">Category</Label>
              <Select
                value={category}
                onValueChange={(val) => {
                  if (val) setCategory(val)
                }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Waterfront Estate">Waterfront Estate</SelectItem>
                  <SelectItem value="Sky Penthouse">Sky Penthouse</SelectItem>
                  <SelectItem value="Luxury Villa">Luxury Villa</SelectItem>
                  <SelectItem value="Commercial Tower">Commercial Tower</SelectItem>
                  <SelectItem value="Private Island">Private Island</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-semibold">Initial Status</Label>
              <Select
                value={status}
                onValueChange={(val) => {
                  if (val) setStatus(val as ProjectStatus)
                }}
              >
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Under Contract">Under Contract</SelectItem>
                  <SelectItem value="Sold Out">Sold Out</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="proj-loc" className="text-xs font-semibold">
                Location / City *
              </Label>
              <Input
                id="proj-loc"
                placeholder="e.g. Biscayne Bay, Miami FL"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 text-xs"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="proj-price" className="text-xs font-semibold">
                Asking Price *
              </Label>
              <Input
                id="proj-price"
                placeholder="e.g. $4,250,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-9 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="proj-units" className="text-xs font-semibold">
                Available Units
              </Label>
              <Input
                id="proj-units"
                type="number"
                min={1}
                value={units}
                onChange={(e) => setUnits(Number(e.target.value))}
                className="h-9 text-xs"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-xs font-semibold">Projected ROI</Label>
              <Input
                value="12.5% p.a."
                disabled
                className="h-9 text-xs bg-muted text-muted-foreground"
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={createMutation.isPending}
              className="gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {createMutation.isPending ? "Publishing..." : "Publish Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
