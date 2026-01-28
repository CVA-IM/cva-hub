"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, AlertCircle, Clock, CheckCircle, User } from "lucide-react"

// Mock data
const cases = [
  {
    id: "CASE-001",
    household: "HH-001234",
    householdName: "Ahmad Hassan",
    status: "open",
    triage: "high",
    assignedTo: "Sarah Johnson",
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-14",
    summary: "Payment not received - needs investigation",
  },
  {
    id: "CASE-002",
    household: "HH-001235",
    householdName: "Fatima Al-Ahmad",
    status: "in_progress",
    triage: "medium",
    assignedTo: "John Smith",
    createdAt: "2024-01-12",
    lastUpdate: "2024-01-15",
    summary: "Address verification required",
  },
  {
    id: "CASE-003",
    household: "HH-001240",
    householdName: "Omar Khalil",
    status: "open",
    triage: "critical",
    assignedTo: null,
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-15",
    summary: "Urgent: Family size discrepancy reported",
  },
]

const triageColors = {
  low: "secondary",
  medium: "warning",
  high: "destructive",
  critical: "destructive",
} as const

const statusIcons = {
  open: AlertCircle,
  in_progress: Clock,
  resolved: CheckCircle,
  closed: CheckCircle,
}

export default function CasesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
          <p className="text-gray-500">Track and resolve beneficiary issues</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Open Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Critical</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Unassigned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Resolved (This Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">45</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input placeholder="Search cases..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Cases</CardTitle>
          <CardDescription>Cases requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cases.map((caseItem) => {
              const StatusIcon = statusIcons[caseItem.status as keyof typeof statusIcons]
              return (
                <div
                  key={caseItem.id}
                  className="flex items-start justify-between rounded-lg border p-4 hover:bg-slate-50"
                >
                  <div className="flex gap-4">
                    <div className={`mt-1 p-2 rounded-full ${
                      caseItem.triage === 'critical' ? 'bg-red-100' :
                      caseItem.triage === 'high' ? 'bg-orange-100' :
                      caseItem.triage === 'medium' ? 'bg-amber-100' : 'bg-gray-100'
                    }`}>
                      <StatusIcon className={`h-4 w-4 ${
                        caseItem.triage === 'critical' ? 'text-red-600' :
                        caseItem.triage === 'high' ? 'text-orange-600' :
                        caseItem.triage === 'medium' ? 'text-amber-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{caseItem.id}</span>
                        <Badge variant={triageColors[caseItem.triage as keyof typeof triageColors]}>
                          {caseItem.triage}
                        </Badge>
                      </div>
                      <p className="font-medium">{caseItem.summary}</p>
                      <p className="text-sm text-gray-500">
                        {caseItem.householdName} ({caseItem.household})
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Created: {caseItem.createdAt}</span>
                        <span>Updated: {caseItem.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    {caseItem.assignedTo ? (
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-gray-400" />
                        {caseItem.assignedTo}
                      </div>
                    ) : (
                      <Badge variant="outline">Unassigned</Badge>
                    )}
                    <Button variant="outline" size="sm" className="mt-2">
                      View Case
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
