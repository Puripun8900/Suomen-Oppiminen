"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Coffee, Volume2, CheckCircle } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"

export default function HomePage() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const savedProgress = localStorage.getItem("finnish-learning-progress")
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [])

  const modules = [
    {
      id: "module1",
      title: "Moduuli 1: Perussanasto",
      description: "Opi tärkeimmät taukohuoneen esineet äänen, kuvien ja tekstin avulla",
      icon: Volume2,
      href: "/module1",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: "module2",
      title: "Moduuli 2: Kuullun ymmärtäminen",
      description: "Ymmärrä puhuttua suomea ja tunnista esineitä kuvasta",
      icon: Coffee,
      href: "/module2",
      color: "from-green-400 to-green-600",
    },
    {
      id: "module3",
      title: "Moduuli 3: Lauseet ja verbit",
      description: "Harjoittele sanastoa ja suomen kielen verbirakenteita",
      icon: BookOpen,
      href: "/module3",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: "module4",
      title: "Moduuli 4: Kuuntelutesti",
      description: "Testaa kuullun ymmärtämistä oikein/väärin -kysymyksillä",
      icon: CheckCircle,
      href: "/module4",
      color: "from-orange-400 to-orange-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <TabNavigation currentModule="home" />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-3xl blur-3xl animate-pulse"></div>
            <div className="relative group">
              <Image
                src="/images/break-room.png"
                alt="Taukohuone"
                width={800}
                height={400}
                className="relative rounded-2xl shadow-2xl mx-auto border-4 border-white transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 animate-pulse">Tervetuloa Suomen Kielen Maailmaan!</h1>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-5xl mx-auto border-4 border-yellow-200">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  🌟 Aloita Oppimisseikkailusi Tänään! 🌟
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  Hei! Kello on 14 ja on iltapäiväkahvin aika. Mennään tänään kahvilaan, tule mukaan!
                </p>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Opiskelemme samalla kahvilasanastoa suomeksi. Tässä materiaalissa on neljä erilaista tehtävää, jotka
                  vievät sinut suomen kielen saloihin hauska ja interaktiivinen tapa!
                </p>
                <div className="flex justify-center mt-6">
                  <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg">
                    🚀 Neljä Jännittävää Moduulia Odottaa! 🚀
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {modules.map((module, index) => {
            const Icon = module.icon
            const isCompleted = progress[module.id]
            const isLocked = index > 0 && !progress[modules[index - 1].id]

            return (
              <Card
                key={module.id}
                className={`group transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isCompleted
                    ? "bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-lg"
                    : isLocked
                      ? "bg-gray-50 border-gray-200 opacity-60"
                      : "bg-white border-yellow-200 shadow-lg hover:border-yellow-300"
                } border-2`}
              >
                <CardHeader className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-r ${module.color} opacity-5 rounded-t-lg`}></div>
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${module.color} text-white shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-800">{module.title}</CardTitle>
                      </div>
                    </div>
                    {isCompleted && (
                      <div className="bg-green-500 text-white rounded-full p-2 shadow-lg">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <CardDescription className="mt-3 text-gray-600 relative">{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={isLocked ? "#" : module.href}>
                    <Button
                      className={`w-full font-semibold ${
                        isCompleted
                          ? "bg-green-600 hover:bg-green-700"
                          : isLocked
                            ? "bg-gray-400"
                            : `bg-gradient-to-r ${module.color} hover:shadow-lg`
                      }`}
                      disabled={isLocked}
                    >
                      {isCompleted ? "Kertaa moduuli" : isLocked ? "Suorita edellinen moduuli" : "Aloita moduuli"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Learning Path Link */}
        <div className="text-center">
          <Link href="/learning-path">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-yellow-400 text-yellow-700 hover:bg-yellow-50"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Näytä koko oppimispolku
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
