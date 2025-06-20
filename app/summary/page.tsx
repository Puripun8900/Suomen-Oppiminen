"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Star, Globe, Trophy } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"

export default function Summary() {
  const [progress, setProgress] = useState<Record<string, boolean>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [language, setLanguage] = useState<"en" | "fi">("en")
  const [feedbackData, setFeedbackData] = useState({
    name: "",
    email: "",
    satisfaction: "",
    comments: "",
  })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem("finnish-learning-progress") || "{}")
    setProgress(savedProgress)
  }, [])

  const modules = [
    { id: "module1", title: "Perussanasto", score: 85, color: "bg-blue-100 text-blue-800" },
    { id: "module2", title: "Kuuntelu", score: 90, color: "bg-green-100 text-green-800" },
    { id: "module3", title: "Harjoitukset", score: 80, color: "bg-purple-100 text-purple-800" },
    { id: "module4", title: "Testi", score: 117, color: "bg-orange-100 text-orange-800" },
  ]

  const completedModules = modules.filter((module) => progress[module.id])
  const averageScore =
    Math.round(completedModules.reduce((sum, module) => sum + module.score, 0) / completedModules.length) || 0

  const handleInputChange = (field: string, value: string) => {
    setFeedbackData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Feedback submitted:", feedbackData)
    setSubmitted(true)

    setTimeout(() => {
      window.location.href = "/"
    }, 3000)
  }

  const texts = {
    en: {
      title: "Learning Summary",
      subtitle: "Congratulations on completing your Finnish learning journey!",
      allCompleted: "All modules completed!",
      overallScore: "Overall score from all modules is",
      excellentWork: "Excellent work! You have completed all modules excellently and mastered the basics of Finnish!",
      backToLearningPath: "Back to Learning Path",
      feedbackTitle: "We Value Your Feedback",
      feedbackSubtitle: "Help us improve the learning experience",
      name: "Name",
      email: "Email",
      satisfaction: "Satisfaction Level",
      satisfactionOptions: {
        excellent: "Excellent",
        good: "Good",
        average: "Average",
        poor: "Poor",
      },
      comments: "Additional Comments",
      commentsPlaceholder: "Tell us about your learning experience...",
      submit: "Submit Feedback",
      thankYou: "Thank you! Your feedback has been submitted.",
      provideFeedback: "Provide Feedback",
    },
    fi: {
      title: "Oppimisen Yhteenveto",
      subtitle: "Onnittelut suomen kielen oppimismatkasi suorittamisesta!",
      allCompleted: "Kaikki moduulit suoritettu!",
      overallScore: "Kokonaispistämäärä kaikista moduuleista on",
      excellentWork:
        "Erinomaista työtä! Olet suorittanut kaikki moduulit erinomaisesti ja hallitset suomen kielen perusteet!",
      backToLearningPath: "Takaisin oppimispolkuun",
      feedbackTitle: "Arvostamme Palautettasi",
      feedbackSubtitle: "Auta meitä parantamaan oppimiskokemusta",
      name: "Nimi",
      email: "Sähköposti",
      satisfaction: "Tyytyväisyystaso",
      satisfactionOptions: {
        excellent: "Erinomainen",
        good: "Hyvä",
        average: "Keskiverto",
        poor: "Huono",
      },
      comments: "Lisäkommentit",
      commentsPlaceholder: "Kerro meille oppimiskokemuksestasi...",
      submit: "Lähetä Palaute",
      thankYou: "Kiitos! Palautteesi on lähetetty.",
      provideFeedback: "Anna Palautetta",
    },
  }

  const t = texts[language]

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-green-800 text-2xl">{t.thankYou}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-700 mb-4">
              {language === "en" ? "Redirecting to home page..." : "Ohjataan etusivulle..."}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <TabNavigation currentModule="summary" />

      <div className="container mx-auto px-4 py-8">
        {/* Summary Card matching the uploaded design */}
        <Card className="max-w-2xl mx-auto mb-12 bg-white shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Fireworks decoration */}
            <div className="flex justify-between items-start mb-6">
              <div className="text-yellow-400 text-2xl">✨</div>
              <div className="text-center">
                <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              </div>
              <div className="text-yellow-400 text-2xl">✨</div>
            </div>

            {/* Score circle */}
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">{averageScore}%</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-blue-600 text-center mb-2">Kaikki moduulit suoritettu!</h1>
            <p className="text-gray-600 text-center mb-8">Kokonaispistämäärä kaikista moduuleista on {averageScore}%</p>

            {/* Module scores */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {modules.map((module, index) => (
                <Card key={module.id} className={`${module.color} border-0`}>
                  <CardContent className="p-4 text-center">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-sm">{index + 1}</span>
                    </div>
                    <div className="font-bold text-sm mb-1">Moduuli {index + 1}</div>
                    <div className="text-2xl font-bold mb-1">{module.score}%</div>
                    <div className="text-xs">{module.title}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Congratulations message */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center text-green-600 mb-2">
                <Star className="h-5 w-5 mr-2" />
                <span className="font-semibold">
                  Erinomaista työtä! Olet suorittanut kaikki moduulit erinomaisesti ja hallitset suomen kielen
                  perusteet!
                </span>
              </div>
            </div>

            {/* Back to learning path button */}
            <div className="text-center">
              <Link href="/learning-path">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">Takaisin oppimispolkuun</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Section */}
        {!showFeedback ? (
          <div className="text-center">
            <Button onClick={() => setShowFeedback(true)} size="lg" className="bg-blue-600 hover:bg-blue-700">
              {t.provideFeedback}
            </Button>
          </div>
        ) : (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t.feedbackTitle}</CardTitle>
                  <p className="text-gray-600 mt-1">{t.feedbackSubtitle}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setLanguage(language === "en" ? "fi" : "en")}>
                  <Globe className="mr-2 h-4 w-4" />
                  {language === "en" ? "FI" : "EN"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t.name}</Label>
                    <Input
                      id="name"
                      value={feedbackData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t.email}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={feedbackData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="satisfaction">{t.satisfaction}</Label>
                  <Select onValueChange={(value) => handleInputChange("satisfaction", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${t.satisfaction.toLowerCase()}`} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">{t.satisfactionOptions.excellent}</SelectItem>
                      <SelectItem value="good">{t.satisfactionOptions.good}</SelectItem>
                      <SelectItem value="average">{t.satisfactionOptions.average}</SelectItem>
                      <SelectItem value="poor">{t.satisfactionOptions.poor}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="comments">{t.comments}</Label>
                  <Textarea
                    id="comments"
                    placeholder={t.commentsPlaceholder}
                    value={feedbackData.comments}
                    onChange={(e) => handleInputChange("comments", e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!feedbackData.name || !feedbackData.email || !feedbackData.satisfaction}
                >
                  {t.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
