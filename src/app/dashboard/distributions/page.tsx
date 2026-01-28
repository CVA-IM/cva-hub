"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Calendar, MapPin, Users, Package } from "lucide-react"
import Link from "next/link"

// Mock data
const distributions = [
  {
    id: "1",
    name: "January 2024 Cash Distribution",
    project: "Syria Emergency Response",
    date: "2024-01-15",
    location: "Aleppo",
    households: 450,
    status: "completed",
    totalValue: 67500,
  },
  {
    id: "2",
    name: "February Voucher Distribution",
    project: "Lebanon Cash Programme",
    date: "2024-02-01",
    location: "Beirut",
    households: 320,
    status: "in_progress",
    totalValue: 48000,
  },
  {
    id: "3",
    name: "Emergency Relief Round 3",
    project: "Turkey Earthquake Relief",
    date: "2024-02-10",
    location: "Gaziantep",
    households: 890,
    status: "planned",
    totalValue: 133500,
  },
]

const statusColors = {
  planned: "secondary",
  in_progress: "warning",
  completed: "success",
  cancelled: "destructive",
} as const

export default function DistributionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Distributions</h1>
          <p className="text-gray-500">Plan and track cash/voucher distributions</p>
        </div>
        <Link href="/dashboard/distributions/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Plan Distribution
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Planned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.4M</div>
          </CardContent>
        </Card>
      </div>

      {/* Distribution List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Distributions</CardTitle>
          <CardDescription>Upcoming and recent distribution activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {distributions.map((dist) => (
              <div
                key={dist.id}
                className="flex items-center justify-between rounded-lg border p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{dist.name}</h3>
                    <Badge variant={statusColors[dist.status as keyof typeof statusColors]}>
                      {dist.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">{dist.project}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {dist.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {dist.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {dist.households} households
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">${dist.totalValue.toLocaleString()}</p>
                  <Link href={`/dashboard/distributions/${dist.id}`}>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
