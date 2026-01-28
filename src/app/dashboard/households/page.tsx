"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  Upload,
  MoreHorizontal,
  Eye,
  Edit,
  Users
} from "lucide-react"

// Mock data
const households = [
  {
    id: "HH-001234",
    headOfHousehold: "Ahmad Hassan",
    location: "Aleppo, Syria",
    members: 5,
    status: "active",
    project: "Syria Emergency Response",
    phone: "+963 912 345 678",
    entitlementBalance: 450,
    currency: "USD",
  },
  {
    id: "HH-001235",
    headOfHousehold: "Fatima Al-Ahmad",
    location: "Beirut, Lebanon",
    members: 3,
    status: "active",
    project: "Lebanon Cash Programme",
    phone: "+961 71 234 567",
    entitlementBalance: 200,
    currency: "USD",
  },
  {
    id: "HH-001236",
    headOfHousehold: "Mohammed Yilmaz",
    location: "Gaziantep, Turkey",
    members: 7,
    status: "enrolled",
    project: "Turkey Earthquake Relief",
    phone: "+90 532 123 4567",
    entitlementBalance: 800,
    currency: "USD",
  },
  {
    id: "HH-001237",
    headOfHousehold: "Sara Ibrahim",
    location: "Amman, Jordan",
    members: 4,
    status: "inactive",
    project: "Jordan Refugee Support",
    phone: "+962 79 123 4567",
    entitlementBalance: 0,
    currency: "USD",
  },
  {
    id: "HH-001238",
    headOfHousehold: "Omar Khalil",
    location: "Aleppo, Syria",
    members: 6,
    status: "active",
    project: "Syria Emergency Response",
    phone: "+963 933 456 789",
    entitlementBalance: 300,
    currency: "USD",
  },
]

const statusColors = {
  active: "success",
  enrolled: "warning",
  inactive: "secondary",
  registered: "outline",
} as const

export default function HouseholdsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredHouseholds = households.filter((hh) => {
    const matchesSearch =
      hh.id.toLowerCase().includes(search.toLowerCase()) ||
      hh.headOfHousehold.toLowerCase().includes(search.toLowerCase()) ||
      hh.location.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || hh.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Households</h1>
          <p className="text-gray-500">Manage beneficiary households</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Link href="/dashboard/households/register">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Register Household
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by ID, name, or location..."
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
                <SelectItem value="enrolled">Enrolled</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                <SelectItem value="syria">Syria Emergency Response</SelectItem>
                <SelectItem value="lebanon">Lebanon Cash Programme</SelectItem>
                <SelectItem value="turkey">Turkey Earthquake Relief</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Household ID
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Head of Household
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Members
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Entitlement Balance
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredHouseholds.map((hh) => (
                <tr key={hh.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm">{hh.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{hh.headOfHousehold}</p>
                      <p className="text-sm text-gray-500">{hh.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{hh.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{hh.members}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusColors[hh.status as keyof typeof statusColors]}>
                      {hh.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-medium">
                      ${hh.entitlementBalance.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Link href={`/dashboard/households/${hh.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3">
          <p className="text-sm text-gray-500">
            Showing {filteredHouseholds.length} of {households.length} households
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
