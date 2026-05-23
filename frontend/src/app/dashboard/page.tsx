"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts"
import { LayoutDashboard, FileText, CheckCircle2, AlertCircle, TrendingUp, Settings, LogOut, Wallet, ShieldCheck, Download, ExternalLink, Bell, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/AuthProvider"

const monthlyData = [
  { name: 'Jan', bids: 4 }, { name: 'Feb', bids: 3 }, { name: 'Mar', bids: 7 },
  { name: 'Apr', bids: 5 }, { name: 'May', bids: 8 }, { name: 'Jun', bids: 12 }
]

const statusData = [
  { name: 'Won', value: 4, color: '#138808' },
  { name: 'Lost', value: 12, color: '#DC2626' },
  { name: 'Pending', value: 3, color: '#FF9933' }
]

const OverviewTab = () => (
  <>
    {/* Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-l-4 border-l-[#0B3D91]">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-gray-500">Total Bids Submitted</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">19</h3>
          <p className="text-xs text-green-600 mt-2 flex items-center">+3 this month</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-[#138808]">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-gray-500">Contracts Won</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">4</h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center">Value: ₹ 24.5 Cr</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-[#FF9933]">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-gray-500">Pending Evaluation</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center">Under Smart Contract Lock</p>
        </CardContent>
      </Card>
      <Card className="border-l-4 border-l-gray-400">
        <CardContent className="p-6">
          <p className="text-sm font-medium text-gray-500">EMD Locked</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">₹ 15L</h3>
          <p className="text-xs text-gray-500 mt-2 flex items-center">Across 3 active bids</p>
        </CardContent>
      </Card>
    </div>

    {/* Charts Row */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Bidding Activity (2024)</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <RechartsTooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="bids" fill="#0B3D91" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Bid Success Rate</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-bold text-gray-900">21%</span>
            <span className="text-xs text-gray-500">Win Rate</span>
          </div>
          <div className="flex justify-center gap-4 mt-2 w-full">
            {statusData.map(item => (
              <div key={item.name} className="flex items-center text-xs">
                <span className="w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Recent Activity Table */}
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Bids</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Tender ID</th>
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Submission Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Tx Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                  <Link href="/tenders/TC-MH-883">TC-MH-883</Link>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">Construction of 4-Lane Highway...</td>
                <td className="px-4 py-4 text-gray-600">24 Oct 2024</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium flex items-center w-max">
                    <AlertCircle className="w-3 h-3 mr-1" /> Pending Reveal
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-gray-500 text-xs">0x4a3f...82bc</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                  <Link href="/tenders/TC-RJ-405">TC-RJ-405</Link>
                </td>
                <td className="px-4 py-4 font-medium text-gray-900">Installation of 500MW Solar Park...</td>
                <td className="px-4 py-4 text-gray-600">15 Sep 2024</td>
                <td className="px-4 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium flex items-center w-max">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Awarded
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-gray-500 text-xs">0x1b9f...7d4e</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </>
)

const MyBidsTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-xl">My Submitted Bids</CardTitle>
      <CardDescription>Track all your encrypted bids and their evaluation status on the blockchain.</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Tender ID</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Bid Amount</th>
              <th className="px-4 py-3">Date Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                <Link href="/tenders/TC-MH-883">TC-MH-883</Link>
              </td>
              <td className="px-4 py-4 font-medium text-gray-900 max-w-[200px] truncate">Construction of 4-Lane Highway...</td>
              <td className="px-4 py-4 font-mono text-gray-500">Encrypted 🔒</td>
              <td className="px-4 py-4 text-gray-600">24 Oct 2024</td>
              <td className="px-4 py-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending Reveal</Badge>
              </td>
              <td className="px-4 py-4">
                <Button variant="outline" size="sm" className="h-8 text-xs">Reveal Bid</Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                <Link href="/tenders/TC-DL-912">TC-DL-912</Link>
              </td>
              <td className="px-4 py-4 font-medium text-gray-900 max-w-[200px] truncate">IT Infrastructure Upgrade 2024</td>
              <td className="px-4 py-4 font-mono text-gray-900">₹ 4,50,00,000</td>
              <td className="px-4 py-4 text-gray-600">12 Oct 2024</td>
              <td className="px-4 py-4">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Lost</Badge>
              </td>
              <td className="px-4 py-4">
                <Button variant="ghost" size="sm" className="h-8 text-xs">View Result</Button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                <Link href="/tenders/TC-RJ-405">TC-RJ-405</Link>
              </td>
              <td className="px-4 py-4 font-medium text-gray-900 max-w-[200px] truncate">Installation of 500MW Solar Park...</td>
              <td className="px-4 py-4 font-mono text-gray-900">₹ 12,40,00,000</td>
              <td className="px-4 py-4 text-gray-600">15 Sep 2024</td>
              <td className="px-4 py-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Awarded</Badge>
              </td>
              <td className="px-4 py-4">
                <Button variant="ghost" size="sm" className="h-8 text-xs text-[#0B3D91]">View Contract</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
)

const WonContractsTab = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Won Contracts & Work Orders</CardTitle>
        <CardDescription>Digitally signed contracts and milestone tracking for awarded tenders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[
            { id: "TC-RJ-405", title: "Installation of 500MW Solar Park, Jodhpur", value: "₹ 12,40,00,000", date: "15 Sep 2024", progress: 60 },
            { id: "TC-KA-112", title: "Smart City Traffic Management System", value: "₹ 8,25,00,000", date: "02 Jun 2024", progress: 100 }
          ].map((contract, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between bg-white hover:border-[#0B3D91]/30 transition-colors">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Link href={`/tenders/${contract.id}`} className="hover:underline">
                    <span className="font-mono text-[#0B3D91] font-semibold">{contract.id}</span>
                  </Link>
                  <Badge className="bg-[#138808] hover:bg-[#138808]">Active Contract</Badge>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{contract.title}</h3>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>Award Value: {contract.value}</span>
                  <span>•</span>
                  <span>Award Date: {contract.date}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Project Progress:</span>
                  <span className="text-sm font-bold text-[#0B3D91]">{contract.progress}%</span>
                </div>
                <div className="w-full md:w-32 h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#138808]" style={{ width: `${contract.progress}%` }}></div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-8"><ExternalLink className="w-4 h-4 mr-1" /> View Updates</Button>
                  <Button size="sm" className="h-8 bg-[#0B3D91]"><Download className="w-4 h-4 mr-1" /> Download Agreement</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
)

const WalletTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="bg-[#0B3D91] text-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-200 text-sm mb-1">Available EMD Balance</p>
              <h2 className="text-3xl font-bold font-mono">₹ 25,00,000</h2>
            </div>
            <Wallet className="w-8 h-8 text-blue-300 opacity-50" />
          </div>
          <div className="flex space-x-3">
            <Button className="bg-white text-[#0B3D91] hover:bg-gray-100 flex-1">Add Funds</Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700 border-none flex-1">Withdraw</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Locked EMDs (Smart Contracts)</CardTitle>
          <CardDescription>Funds currently locked in active bids. Automatically refunded upon tender conclusion if not awarded.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <Lock className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">TC-MH-883</p>
                  <p className="text-xs text-gray-500">Locked on 24 Oct 2024</p>
                </div>
              </div>
              <span className="font-mono font-medium text-gray-900">₹ 5,00,000</span>
            </div>
            <div className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-center">
                <Lock className="w-4 h-4 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">TC-UP-211</p>
                  <p className="text-xs text-gray-500">Locked on 28 Oct 2024</p>
                </div>
              </div>
              <span className="font-mono font-medium text-gray-900">₹ 10,00,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Tx Hash</th>
              <th className="px-4 py-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="px-4 py-3 text-gray-600">28 Oct 2024</td>
              <td className="px-4 py-3 font-medium">EMD Lock (TC-UP-211)</td>
              <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x88c2...3a1f</td>
              <td className="px-4 py-3 text-right text-red-600 font-mono">- ₹ 10,00,000</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-600">18 Oct 2024</td>
              <td className="px-4 py-3 font-medium">EMD Refund (TC-DL-912)</td>
              <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x4b7f...9e22</td>
              <td className="px-4 py-3 text-right text-green-600 font-mono">+ ₹ 4,50,000</td>
            </tr>
            <tr>
              <td className="px-4 py-3 text-gray-600">10 Oct 2024</td>
              <td className="px-4 py-3 font-medium">Wallet Deposit (NEFT)</td>
              <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x221a...c7b4</td>
              <td className="px-4 py-3 text-right text-green-600 font-mono">+ ₹ 20,00,000</td>
            </tr>
          </tbody>
        </table>
      </CardContent>
    </Card>
  </div>
)

const AnalyticsTab = () => {
  const performanceData = [
    { name: 'Jan', winRate: 15, avgBidDifference: -5 },
    { name: 'Feb', winRate: 18, avgBidDifference: -3 },
    { name: 'Mar', winRate: 25, avgBidDifference: 2 },
    { name: 'Apr', winRate: 22, avgBidDifference: 1 },
    { name: 'May', winRate: 30, avgBidDifference: 4 },
    { name: 'Jun', winRate: 21, avgBidDifference: 0 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Competitor Analysis</p>
            <h3 className="text-2xl font-bold text-gray-900">Top 15%</h3>
            <p className="text-xs text-gray-500 mt-1">In Infrastructure category</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Avg. Bid Deviation</p>
            <h3 className="text-2xl font-bold text-[#138808]">-4.2%</h3>
            <p className="text-xs text-gray-500 mt-1">Below L1 winning bids</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Profile Trust Score</p>
            <h3 className="text-2xl font-bold text-gray-900">98/100</h3>
            <p className="text-xs text-gray-500 mt-1">Based on on-chain history</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Trends</CardTitle>
          <CardDescription>Win rate vs Bid difference relative to L1 over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
              <RechartsTooltip cursor={{ stroke: '#E5E7EB', strokeWidth: 2 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Line type="monotone" dataKey="winRate" name="Win Rate (%)" stroke="#0B3D91" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="avgBidDifference" name="Avg Bid Diff (%)" stroke="#FF9933" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

const SettingsTab = () => (
  <div className="max-w-4xl space-y-8">
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Organization Profile</CardTitle>
        <CardDescription>Manage your registered company details on the blockchain.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Company Name</label>
            <Input defaultValue="Demo Infra Pvt Ltd" readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">PAN Number</label>
            <Input defaultValue="ABCDE1234F" readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">GSTIN</label>
            <Input defaultValue="27ABCDE1234F1Z5" readOnly className="bg-gray-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Registered Email</label>
            <Input defaultValue="contact@demoinfra.in" />
          </div>
        </div>
        <div className="flex justify-end pt-4">
          <Button className="bg-[#0B3D91]">Save Changes</Button>
        </div>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Security & Authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">DigiLocker Integration</p>
            <p className="text-sm text-gray-500">Linked for automated e-KYC</p>
          </div>
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
        </div>
        <div className="flex items-center justify-between py-3 border-b border-gray-100">
          <div>
            <p className="font-medium text-gray-900">Digital Signature Certificate (DSC)</p>
            <p className="text-sm text-gray-500">Class 3 DSC required for bid submission</p>
          </div>
          <Button variant="outline" size="sm">Update DSC</Button>
        </div>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
            <p className="text-sm text-gray-500">App-based authenticator</p>
          </div>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Disable</Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.replace("/login")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab />
      case "bids": return <MyBidsTab />
      case "won": return <WonContractsTab />
      case "wallet": return <WalletTab />
      case "analytics": return <AnalyticsTab />
      case "settings": return <SettingsTab />
      default: return <OverviewTab />
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case "overview": return { title: "Welcome back, Demo Infra Pvt Ltd", subtitle: "Here's what's happening with your tender applications today." }
      case "bids": return { title: "My Bids", subtitle: "Manage and track all your active and past bid submissions." }
      case "won": return { title: "Won Contracts", subtitle: "Track progress and milestones of your awarded projects." }
      case "wallet": return { title: "Wallet & EMD", subtitle: "Manage your Earnest Money Deposits and transaction history." }
      case "analytics": return { title: "Performance Analytics", subtitle: "Analyze your bidding success rates and market position." }
      case "settings": return { title: "Account Settings", subtitle: "Manage your profile, security, and preferences." }
      default: return { title: "Dashboard", subtitle: "" }
    }
  }

  const headerInfo = getTabTitle()

  return (
    <div className="flex min-h-[calc(100vh-64px)] bg-[#F8F9FC]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-[calc(100vh-64px)] sticky top-16">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-poppins font-bold text-[#0B3D91] text-lg">Vendor Portal</h2>
          <p className="text-xs text-gray-500 mt-1">ID: 0x7F8E...2C3d</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: "overview", icon: LayoutDashboard, label: "Overview" },
            { id: "bids", icon: FileText, label: "My Bids" },
            { id: "won", icon: CheckCircle2, label: "Won Contracts" },
            { id: "wallet", icon: Wallet, label: "Wallet & EMD" },
            { id: "analytics", icon: TrendingUp, label: "Analytics" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === item.id ? "bg-[#0B3D91]/10 text-[#0B3D91]" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? "text-[#0B3D91]" : "text-gray-400"}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100 space-y-1">
          <button 
            onClick={() => setActiveTab("settings")}
            className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium transition-colors rounded-md ${
              activeTab === "settings" ? "bg-[#0B3D91]/10 text-[#0B3D91]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className={`h-5 w-5 ${activeTab === "settings" ? "text-[#0B3D91]" : "text-gray-400"}`} />
            <span>Settings</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
          >
            <LogOut className="h-5 w-5 text-red-400" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto h-[calc(100vh-64px)]">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-poppins text-2xl font-bold text-gray-900">{headerInfo.title}</h1>
            <p className="text-gray-600 text-sm mt-1">{headerInfo.subtitle}</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FC]"></span>
            </button>
            <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#138808]" />
              <span className="text-gray-500">Network:</span> <span className="text-[#138808] font-bold">Synced</span>
            </div>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {renderContent()}
      </main>
    </div>
  )
}
