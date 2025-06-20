"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Volume2, Coffee, BookOpen, Target, BarChart3 } from "lucide-react"

interface TabNavigationProps {
  currentModule: string
}

export function TabNavigation({ currentModule }: TabNavigationProps) {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedProgress = localStorage.getItem("finnish-learning-progress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const tabs = [
    {
      id: "home",
      label: "Koti",
      icon: Home,
      href: "/",
      color: "bg-blue-500",
    },
    {
      id: "learning-path",
      label: "Oppimispolku",
      icon: BarChart3,
      href: "/learning-path",
      color: "bg-purple-500",
    },
    {
      id: "module1",
      label: "Moduuli 1",
      icon: Volume2,
      href: "/module1",
      color: "bg-green-500",
    },
    {
      id: "module2",
      label: "Moduuli 2",
      icon: Coffee,
      href: "/module2",
      color: "bg-orange-500",
    },
    {
      id: "module3",
      label: "Moduuli 3",
      icon: BookOpen,
      href: "/module3",
      color: "bg-red-500",
    },
    {
      id: "module4",
      label: "Moduuli 4",
      icon: Target,
      href: "/module4",
      color: "bg-indigo-500",
    },
  ]

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg border-b-4 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-gray-800">Suomen Oppiminen</span>
          </div>

          {/* Navigation Tabs - Fixed width, no scrolling */}
          <div className="flex items-center space-x-4">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = currentModule === tab.id
              const isCompleted = progress[tab.id]
              const isLocked =
                tab.id.startsWith("module") &&
                Number.parseInt(tab.id.replace("module", "")) > 1 &&
                !progress[`module${Number.parseInt(tab.id.replace("module", "")) - 1}`]

              return (
                <Link key={tab.id} href={isLocked ? "#" : tab.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    disabled={isLocked}
                    className={`relative flex items-center space-x-2 px-4 py-2 ${
                      isActive
                        ? `${tab.color} text-white shadow-lg`
                        : isCompleted
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : isLocked
                            ? "bg-gray-100 text-gray-400"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                    {isCompleted && (
                      <CheckCircle className="h-3 w-3 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
