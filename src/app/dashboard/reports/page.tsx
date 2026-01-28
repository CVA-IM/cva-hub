"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Download, 
  Users, 
  DollarSign, 
  Package, 
  BarChart3,
  PieChart,
  TrendingUp
} from "lucide-react"

const reports = [
  {
    id: "beneficiary-list",
    name: "Beneficiary List Report",
    description: "Complete list of registered beneficiaries with demographic data",
    icon: Users,
    category: "Registration",
  },
  {
    id: "distribution-summary",
    name: "Distribution Summary",
    description: "Summary of all distributions by project, date, and location",
    icon: Package,
    category: "Distribution",
  },
  {
    id: "financial-summary",
    name: "Financial Summary",
    description: "Budget utilization, disbursements, and remaining funds",
    icon: DollarSign,
    category: "Finance",
  },
  {
    id: "reconciliation",
    name: "Reconciliation Report",
    description: "Compare planned vs actual distributions with variances",
    icon: BarChart3,
    category: "Distribution",
  },
  {
    id: "audit-trail",
    name: "Audit Trail Report",
    description: "User actions and data changes for audit purposes",
    icon: FileText,
    category: "Compliance",
  },
  {
    id: "programme-kpis",
    name: "Programme KPIs",
    description: "Key performance indicators and programme metrics",
    icon: TrendingUp,
    category: "Analytics",
  },
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-500">Generate and export programme reports</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">38,456</div>
            <p className="text-blue-100 text-sm">Across all projects</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Distributed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$5.2M</div>
            <p className="text-green-100 text-sm">Year to date</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-purple-100 text-sm">In 6 countries</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Select a report to generate and download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col rounded-lg border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <report.icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                    <span className="inline-block mt-2 text-xs bg-slate-100 px-2 py-0.5 rounded">
                      {report.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    Excel
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Download className="mr-2 h-3 w-3" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Analytics</CardTitle>
          <CardDescription>Visual overview of programme performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed">
              <div className="text-center">
                <BarChart3 className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">Distribution by Month</p>
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-lg border-2 border-dashed">
              <div className="text-center">
                <PieChart className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm text-gray-500">Distribution by Type</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
