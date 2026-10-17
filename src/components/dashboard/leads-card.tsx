"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, ExternalLink, Check, UserCheck } from "lucide-react"
import { toast } from "sonner"

interface LeadItem {
  id: string
  name: string
  email: string
  phone: string
  property: string
  budget: string
  status: "VIP" | "New" | "Hot Lead" | "Contacted"
  time: string
  avatar: string
}

const initialLeads: LeadItem[] = [
  {
    id: "LD-101",
    name: "Alexander Wright",
    email: "a.wright@vancecapital.com",
    phone: "+1 (305) 555-0192",
    property: "Marina Bay Horizon Penthouse",
    budget: "$4.5M - $5.0M",
    status: "VIP",
    time: "12m ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "LD-102",
    name: "Sophia Sterling",
    email: "s.sterling@privateoffices.ch",
    phone: "+41 22 819 4400",
    property: "Villa Bel-Air Sovereign",
    budget: "$8.2M Cash",
    status: "Hot Lead",
    time: "45m ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "LD-103",
    name: "Marcus Aurelius Chen",
    email: "mchen@pacificfoundry.sg",
    phone: "+65 6789 0123",
    property: "One Island Bay Horizon",
    budget: "$6.0M+",
    status: "New",
    time: "2h ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "LD-104",
    name: "Elena Rostova",
    email: "elena.r@monacofamily.mc",
    phone: "+377 98 98 00 11",
    property: "Azure Coast Waterfront",
    budget: "$3.8M",
    status: "Contacted",
    time: "5h ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
]

export function LeadsCard() {
  const [leads, setLeads] = React.useState<LeadItem[]>(initialLeads)

  const handleContact = (lead: LeadItem, channel: "email" | "phone") => {
    if (channel === "email") {
      toast.success(`Drafted email to ${lead.name}`, {
        description: `Subject: Private Dossier for ${lead.property}`,
      })
    } else {
      toast.info(`Connecting direct line to ${lead.name}`, {
        description: `Calling ${lead.phone}...`,
      })
    }
  }

  const markQualified = (id: string, name: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: "Contacted" } : l))
    )
    toast.success(`${name} verified as Qualified Buyer`, {
      description: "Client manager assigned & CRM notification sent.",
    })
  }

  const getStatusBadge = (status: LeadItem["status"]) => {
    switch (status) {
      case "VIP":
        return <Badge className="bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30">VIP Investor</Badge>
      case "Hot Lead":
        return <Badge className="bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30">Hot Lead</Badge>
      case "New":
        return <Badge className="bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30">New</Badge>
      case "Contacted":
        return <Badge variant="secondary">Contacted</Badge>
    }
  }

  return (
    <Card className="border-border/80 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-foreground">
              Recent VIP Inquiries
            </CardTitle>
            <CardDescription className="text-xs">
              Direct inquiries from high-net-worth buyers & family offices.
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs font-semibold">
            {leads.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start sm:items-center gap-3">
              <Avatar className="h-10 w-10 border border-border shrink-0">
                <AvatarImage src={lead.avatar} />
                <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                  {lead.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-foreground">
                    {lead.name}
                  </span>
                  {getStatusBadge(lead.status)}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Interested in:{" "}
                  <span className="font-medium text-foreground">
                    {lead.property}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <span className="font-semibold text-primary">{lead.budget}</span>
                  <span>•</span>
                  <span>{lead.time}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg"
                title="Send email"
                onClick={() => handleContact(lead, "email")}
              >
                <Mail className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-lg"
                title="Call client"
                onClick={() => handleContact(lead, "phone")}
              >
                <Phone className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="default"
                size="sm"
                className="h-8 text-xs rounded-lg gap-1 font-medium"
                onClick={() => markQualified(lead.id, lead.name)}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Qualify</span>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
