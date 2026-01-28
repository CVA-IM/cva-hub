import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  DollarSign, 
  Package, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock
} from "lucide-react"

// Mock data for the prototype
const stats = [
  {
    title: "Total Households",
    value: "12,847",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Active in current projects"
  },
  {
    title: "Cash Distributed",
    value: "$2.4M",
    change: "+8%",
    trend: "up",
    icon: DollarSign,
    description: "This month"
  },
  {
    title: "Distributions",
    value: "156",
    change: "+23",
    trend: "up",
    icon: Package,
    description: "Completed this month"
  },
  {
    title: "Pending Cases",
    value: "89",
    change: "-15%",
    trend: "down",
    icon: Clock,
    description: "Requiring attention"
  },
]

const recentDistributions = [
  { id: 1, project: "Syria Emergency Response", location: "Aleppo", households: 450, status: "completed", date: "2024-01-15" },
  { id: 2, project: "Lebanon Cash Programme", location: "Beirut", households: 320, status: "in_progress", date: "2024-01-14" },
  { id: 3, project: "Turkey Earthquake Relief", location: "Gaziantep", households: 890, status: "planned", date: "2024-01-16" },
  { id: 4, project: "Jordan Refugee Support", location: "Amman", households: 210, status: "completed", date: "2024-01-13" },
]

const statusColors = {
  completed: "success",
  in_progress: "warning",
  planned: "secondary",
} as const

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Overview of CVA programme activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-green-600" />
                )}
                <span className="text-green-600">{stat.change}</span>
                <span className="text-gray-500">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Distributions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Distributions</CardTitle>
            <CardDescription>Latest distribution activities across projects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDistributions.map((dist) => (
                <div
                  key={dist.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{dist.project}</p>
                    <p className="text-sm text-gray-500">{dist.location}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusColors[dist.status as keyof typeof statusColors]}>
                      {dist.status.replace("_", " ")}
                    </Badge>
                    <p className="mt-1 text-sm text-gray-500">
                      {dist.households} households
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <a
                href="/dashboard/projects/new"
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Create New Project</p>
                  <p className="text-sm text-gray-500">Set up a new CVA programme</p>
                </div>
              </a>
              <a
                href="/dashboard/households/register"
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Register Household</p>
                  <p className="text-sm text-gray-500">Add new beneficiaries</p>
                </div>
              </a>
              <a
                href="/dashboard/distributions/new"
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Package className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Plan Distribution</p>
                  <p className="text-sm text-gray-500">Schedule new distribution</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Programme Overview Chart Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Trends</CardTitle>
          <CardDescription>Cash and voucher distributions over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
              <TrendingUp className="mx-auto h-12 w-12 text-gray-300" />
              <p className="mt-2 text-sm text-gray-500">
                Charts will be rendered here with Recharts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
