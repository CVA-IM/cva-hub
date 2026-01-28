"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Plus, Trash2, UserPlus } from "lucide-react"

interface HouseholdMember {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  nationalId: string
  isHead: boolean
  isProxy: boolean
}

export default function RegisterHouseholdPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("household")
  
  const [householdData, setHouseholdData] = useState({
    project: "",
    location: "",
    address: "",
    consentGiven: false,
  })

  const [members, setMembers] = useState<HouseholdMember[]>([
    {
      id: "1",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      nationalId: "",
      isHead: true,
      isProxy: false,
    },
  ])

  const addMember = () => {
    setMembers([
      ...members,
      {
        id: Date.now().toString(),
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        nationalId: "",
        isHead: false,
        isProxy: false,
      },
    ])
  }

  const removeMember = (id: string) => {
    if (members.length > 1) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  const updateMember = (id: string, field: keyof HouseholdMember, value: any) => {
    setMembers(
      members.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    console.log("Registering household:", { householdData, members })
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    setLoading(false)
    router.push("/dashboard/households")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/households">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Register Household</h1>
          <p className="text-gray-500">Add a new beneficiary household</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="household">Household Info</TabsTrigger>
            <TabsTrigger value="members">Members ({members.length})</TabsTrigger>
            <TabsTrigger value="consent">Consent</TabsTrigger>
          </TabsList>

          {/* Household Information */}
          <TabsContent value="household" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Household Information</CardTitle>
                <CardDescription>Basic household registration details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project">Project *</Label>
                  <Select
                    value={householdData.project}
                    onValueChange={(value) =>
                      setHouseholdData({ ...householdData, project: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="syria">Syria Emergency Response</SelectItem>
                      <SelectItem value="lebanon">Lebanon Cash Programme</SelectItem>
                      <SelectItem value="turkey">Turkey Earthquake Relief</SelectItem>
                      <SelectItem value="jordan">Jordan Refugee Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Select
                    value={householdData.location}
                    onValueChange={(value) =>
                      setHouseholdData({ ...householdData, location: value })
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aleppo">Aleppo</SelectItem>
                      <SelectItem value="damascus">Damascus</SelectItem>
                      <SelectItem value="beirut">Beirut</SelectItem>
                      <SelectItem value="tripoli">Tripoli</SelectItem>
                      <SelectItem value="gaziantep">Gaziantep</SelectItem>
                      <SelectItem value="amman">Amman</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <textarea
                    id="address"
                    className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="Full address..."
                    value={householdData.address}
                    onChange={(e) =>
                      setHouseholdData({ ...householdData, address: e.target.value })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="button" onClick={() => setActiveTab("members")}>
                Next: Add Members
              </Button>
            </div>
          </TabsContent>

          {/* Household Members */}
          <TabsContent value="members" className="space-y-6">
            {members.map((member, index) => (
              <Card key={member.id}>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {member.isHead ? "Head of Household" : `Member ${index + 1}`}
                    </CardTitle>
                    <CardDescription>
                      {member.isHead
                        ? "Primary contact and beneficiary representative"
                        : "Additional household member"}
                    </CardDescription>
                  </div>
                  {!member.isHead && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>First Name *</Label>
                      <Input
                        placeholder="First name"
                        value={member.firstName}
                        onChange={(e) =>
                          updateMember(member.id, "firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Last Name *</Label>
                      <Input
                        placeholder="Last name"
                        value={member.lastName}
                        onChange={(e) =>
                          updateMember(member.id, "lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input
                        type="date"
                        value={member.dateOfBirth}
                        onChange={(e) =>
                          updateMember(member.id, "dateOfBirth", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <Select
                        value={member.gender}
                        onValueChange={(value) =>
                          updateMember(member.id, "gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>National ID</Label>
                      <Input
                        placeholder="ID number"
                        value={member.nationalId}
                        onChange={(e) =>
                          updateMember(member.id, "nationalId", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {member.isHead && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Phone Number</Label>
                        <Input placeholder="+1 234 567 890" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input type="email" placeholder="email@example.com" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addMember}
              className="w-full"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add Household Member
            </Button>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("household")}
              >
                Back
              </Button>
              <Button type="button" onClick={() => setActiveTab("consent")}>
                Next: Consent
              </Button>
            </div>
          </TabsContent>

          {/* Consent */}
          <TabsContent value="consent" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Consent</CardTitle>
                <CardDescription>
                  Capture beneficiary consent for data collection and use
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-4 bg-slate-50">
                  <p className="text-sm text-gray-600">
                    By registering for this programme, the household agrees to:
                  </p>
                  <ul className="mt-2 list-disc list-inside text-sm text-gray-600 space-y-1">
                    <li>
                      Collection and processing of personal data for programme
                      administration
                    </li>
                    <li>
                      Sharing of data with authorized programme partners and
                      financial service providers
                    </li>
                    <li>
                      Use of data for monitoring, evaluation, and reporting
                      purposes
                    </li>
                    <li>
                      Storage of data in accordance with IFRC data protection
                      policies
                    </li>
                  </ul>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 h-4 w-4 rounded border-gray-300"
                    checked={householdData.consentGiven}
                    onChange={(e) =>
                      setHouseholdData({
                        ...householdData,
                        consentGiven: e.target.checked,
                      })
                    }
                    required
                  />
                  <Label htmlFor="consent" className="text-sm leading-relaxed">
                    The head of household has been informed of and consents to the
                    above data collection and use practices. This consent has been
                    given voluntarily and can be withdrawn at any time.
                  </Label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => setActiveTab("members")}
              >
                Back
              </Button>
              <div className="flex gap-2">
                <Link href="/dashboard/households">
                  <Button variant="outline">Cancel</Button>
                </Link>
                <Button type="submit" disabled={loading || !householdData.consentGiven}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Registering..." : "Register Household"}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  )
}
