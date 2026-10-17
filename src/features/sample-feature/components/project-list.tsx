"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreVertical,
  Building,
  MapPin,
  Eye,
  Trash2,
  Copy,
  Loader2,
} from "lucide-react"
import { useProjects, useDeleteProjectMutation } from "../hooks"
import { ProjectItem, ProjectStatus } from "../types"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"

export function ProjectList() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<string>("All")

  const debouncedSearch = useDebounce(searchTerm, 250)

  const { data: projects = [], isLoading } = useProjects({
    search: debouncedSearch,
    status: statusFilter,
  })

  const deleteMutation = useDeleteProjectMutation()

  const copyListingUrl = (proj: ProjectItem) => {
    navigator.clipboard?.writeText?.(`https://rikminoodt.com/projects/${proj.id}`)
    toast.success("Listing link copied!", {
      description: `URL for "${proj.name}" is now in your clipboard.`,
    })
  }

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
            Active
          </Badge>
        )
      case "Under Contract":
        return (
          <Badge className="bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30">
            Under Contract
          </Badge>
        )
      case "Upcoming":
        return (
          <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30">
            Upcoming
          </Badge>
        )
      case "Sold Out":
        return (
          <Badge className="bg-muted text-muted-foreground border-border">
            Sold Out
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-4">
      {/* Table Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter projects by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-9 text-xs"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {["All", "Active", "Under Contract", "Upcoming", "Sold Out"].map((st) => (
            <Button
              key={st}
              variant={statusFilter === st ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(st)}
              className="h-8 text-xs rounded-lg px-2.5 font-medium whitespace-nowrap cursor-pointer"
            >
              {st}
            </Button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="text-xs font-semibold">Project & Location</TableHead>
              <TableHead className="text-xs font-semibold">Category</TableHead>
              <TableHead className="text-xs font-semibold">Asking Price</TableHead>
              <TableHead className="text-xs font-semibold">Units</TableHead>
              <TableHead className="text-xs font-semibold">Inquiries</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
              <TableHead className="text-right text-xs font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span>Loading projects...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-sm text-muted-foreground">
                  No projects match your filter query.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((proj) => (
                <TableRow key={proj.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-semibold text-xs">
                        <Building className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-1.5">
                          {proj.name}
                          <span className="text-[10px] text-muted-foreground font-mono">
                            ({proj.id})
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                          <MapPin className="h-3 w-3 text-muted-foreground/70" />
                          <span>{proj.location}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground font-medium">
                    {proj.category}
                  </TableCell>

                  <TableCell className="font-bold text-xs text-foreground">
                    {proj.price}
                  </TableCell>

                  <TableCell className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{proj.units}</span> units
                  </TableCell>

                  <TableCell className="text-xs">
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 font-semibold text-primary text-xs">
                      {proj.inquiries} leads
                    </span>
                  </TableCell>

                  <TableCell>{getStatusBadge(proj.status)}</TableCell>

                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                          />
                        }
                      >
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            toast.info(`Viewing details for ${proj.name}`, {
                              description: `Status: ${proj.status} | Price: ${proj.price}`,
                            })
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View Overview</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => copyListingUrl(proj)}>
                          <Copy className="mr-2 h-4 w-4" />
                          <span>Copy Listing URL</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive"
                          onClick={() => deleteMutation.mutate(proj.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Project</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
        <span>
          Showing <strong>{projects.length}</strong> Rikminoodt developments
        </span>
        <span className="text-[11px]">Synced via TanStack Query</span>
      </div>
    </div>
  )
}
