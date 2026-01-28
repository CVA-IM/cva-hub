"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Search, Filter, MoreHorizontal, Users, DollarSign, Calendar } from "lucide-react"

// Mock data
const projects = [
  {
    id: "1",
    name: "Syria Emergency Cash Response",
    country: "Syria",
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    totalHouseholds: 4500,
    totalBudget: 2500000,
    distributed: 1200000,
    currency: "USD",
  },
  {
    id: "2",
    name: "Lebanon Multi-Purpose Cash",
    country: "Lebanon",
    status: "active",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    totalHouseholds: 3200,
    totalBudget: 1800000,
    distributed: 1500000,
    currency: "USD",
  },
  {
    id: "3",
    name: "Turkey Earthquake Relief",
    country: "Turkey",
    status: "active",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
    totalHouseholds: 8900,
    totalBudget: 5000000,
    distributed: 4200000,
    currency: "USD",
  },
  {
    id: "4",
    name: "Jordan Refugee Support",
    country: "Jordan",
    status: "draft",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    totalHouseholds: 0,
    totalBudget: 1200000,
    distributed: 0,
    currency: "USD",
  },
]

const statusColors = {
  active: "success",
  draft: "secondary",
  closed: "outline",
} as const

export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase()) ||
                         project.country.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500">Manage CVA programmes and projects</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="transition-shadow hover:shadow-md cursor-pointer">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-gray-500">{project.country}</p>
                  </div>
                  <Badge variant={statusColors[project.status as keyof typeof statusColors]}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{project.totalHouseholds.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Households</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">
                        ${(project.totalBudget / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-xs text-gray-500">Budget</p>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Distributed</span>
                    <span className="font-medium">
                      {Math.round((project.distributed / project.totalBudget) * 100)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rcrc-red rounded-full transition-all"
                      style={{
                        width: `${(project.distributed / project.totalBudget) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="h-3 w-3" />
                  {project.startDate} — {project.endDate}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
