'use client'

import { useState, type ComponentType } from 'react'
import { Check, Trash2, Bell, Send, Clock, Trophy, ShieldCheck, AlertTriangle, Info } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import notificationsData from '@/data/notifications.json'

type Notification = {
  id: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
  tenderId: string | null
}

const typeConfig: Record<string, { icon: ComponentType<{ className?: string }>; color: string; label: string }> = {
  tender_published: { icon: Bell, color: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300', label: 'Tender Published' },
  bid_confirmed: { icon: Send, color: 'bg-teal-100 text-teal-700 dark:bg-teal-900 dark:text-teal-300', label: 'Bid Confirmed' },
  deadline_reminder: { icon: Clock, color: 'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300', label: 'Deadline Reminder' },
  winner_declared: { icon: Trophy, color: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300', label: 'Winner Declared' },
  kyc_approved: { icon: ShieldCheck, color: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300', label: 'KYC Approved' },
  dispute_update: { icon: AlertTriangle, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', label: 'Dispute Update' },
  bid_submitted: { icon: Send, color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300', label: 'Bid Submitted' },
  kyc_pending: { icon: Clock, color: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300', label: 'KYC Pending' },
  dispute_raised: { icon: AlertTriangle, color: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300', label: 'Dispute Raised' },
  evaluation_due: { icon: Clock, color: 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300', label: 'Evaluation Due' },
  system_alert: { icon: Info, color: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300', label: 'System Alert' },
}

export default function NotificationsPage() {
  const allNotifs = (notificationsData as Notification[])
  const [notifications, setNotifications] = useState(allNotifs)
  const [filter, setFilter] = useState('all')
  const [unreadCount, setUnreadCount] = useState(notifications.filter((n) => !n.read).length)

  const typeFilters = ['all', 'tender_published', 'bid_confirmed', 'deadline_reminder', 'winner_declared', 'kyc_approved', 'dispute_update', 'system_alert']

  const filteredNotifs = filter === 'all' ? notifications : notifications.filter((n) => n.type === filter)

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      setUnreadCount(updated.filter((n) => !n.read).length)
      return updated
    })
  }

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }))
      setUnreadCount(0)
      return updated
    })
  }

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const handleNotificationClick = (notif: Notification) => {
    handleMarkAsRead(notif.id)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-IN')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">Stay updated on all your activities</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-teal-600">{unreadCount}</div>
          <p className="text-xs text-slate-600">Unread</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          {typeFilters.slice(0, 5).map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(type)}
              className={filter === type ? 'bg-teal-600 text-white' : ''}
            >
              {type === 'all' ? 'All' : typeConfig[type]?.label || type}
            </Button>
          ))}
        </div>
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="text-teal-600 hover:text-teal-700 gap-2"
          >
            <Check className="h-4 w-4" />
            Mark All Read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-8 text-center">
              <Bell className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300 mb-2">No notifications</h3>
              <p className="text-slate-500 dark:text-slate-400">You&apos;re all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifs.map((notif) => {
            const config = typeConfig[notif.type] || typeConfig.system_alert
            const IconComponent = config.icon

            return (
              <Card
                key={notif.id}
                className={`cursor-pointer transition-all hover:shadow-md border-l-4 ${
                  notif.read ? 'border-l-gray-300 bg-white dark:bg-slate-800' : 'border-l-teal-500 bg-teal-50 dark:bg-teal-900/20'
                }`}
                onClick={() => handleNotificationClick(notif)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-full p-3 ${config.color}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-semibold ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                              {notif.title}
                            </h3>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-teal-500" />}
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{notif.message}</p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                            {formatDate(notif.timestamp)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDelete(notif.id)
                            }}
                            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                          >
                            <Trash2 className="h-4 w-4 text-slate-400 hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <Badge variant="secondary" className="text-xs">
                          {notif.type}
                        </Badge>
                        {!notif.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleMarkAsRead(notif.id)
                            }}
                            className="text-teal-600 hover:text-teal-700 gap-1 h-auto p-1"
                          >
                            <Check className="h-3 w-3" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
