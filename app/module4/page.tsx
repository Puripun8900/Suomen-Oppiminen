"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, CheckCircle, X } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"
import { Fireworks } from "@/components/fireworks"

const questions = [
  {
    id: 1,
    statement: "Kahvilan seinä on vihreä.",
    correct: false,
    audio: "Kahvilan seinä on vihreä.",
    feedback: "Kahvilan seinä ei ole vihreä, vaan keltainen.",
  },
  {
    id: 2,
    statement: "Pöydällä on keltaista mehua.",
    correct: true,
    audio: "Pöydällä on keltaista mehua.",
    feedback: "Pöydällä on keltaista mehua. Se on ehkä appelsiinimehua.",
  },
  {
    id: 3,
    statement: "Asiakas voi ottaa kahvia kahviautomaatista.",
    correct: false,
    audio: "Asiakas voi ottaa kahvia kahviautomaatista.",
    feedback: "Kahvi on pöydällä kahvitermoksessa, ei automaatissa.",
  },
  {
    id: 4,
    statement: "Asiakas voi saada kakkua ja keksejä.",
    correct: true,
    audio: "Asiakas voi saada kakkua ja keksejä.",
    feedback: "Pöydällä on vaaleita keksejä ja tummaa kakkua. Se on ehkä suklaakakkua.",
  },
  {
    id: 5,
    statement: "Kaikki lasit ovat pöydällä.",
    correct: false,
    audio: "Kaikki lasit ovat pöydällä.",
    feedback: "Lasit ovat hyllyllä, pöydän yläpuolella.",
  },
  {
    id: 6,
    statement: "Kahvitermoksen takana on koriste-esine.",
    correct: true,
    audio: "Kahvitermoksen takana on koriste-esine.",
    feedback: "Kahvitermoksen takana on kaunis patsas.",
  },
]

export default function Module4() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, boolean>>({})
  const [showFeedback, setShowFeedback] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [showFireworks, setShowFireworks] = useState(false)

  const playAudio = () => {
    console.log(`🎵 Toistetaan suomalainen AI-ääni: ${questions[currentQuestion].audio}`)
  }

  const handleAnswer = (answer: boolean) => {
    const question = questions[currentQuestion]
    const isCorrect = answer === question.correct

    setAnswers((prev) => ({ ...prev, [question.id]: answer }))
    setShowFeedback(true)

    if (isCorrect) {
      setScore((prev) => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setShowFeedback(false)
    } else {
      setIsCompleted(true)
      setShowFireworks(true)
      // Save progress
      const progress = JSON.parse(localStorage.getItem("finnish-learning-progress") || "{}")
      progress.module4 = true
      localStorage.setItem("finnish-learning-progress", JSON.stringify(progress))
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <TabNavigation currentModule="module4" />
        <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 4 valmis! 🎉</h1>
            <Card className="max-w-md mx-auto mb-8">
              <CardHeader>
                <CardTitle>Lopputulokset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {score}/{questions.length}
                </div>
                <p className="text-gray-600 mb-4">Kysymykseen vastattiin oikein</p>
                <div className="text-lg font-semibold">
                  {score === questions.length
                    ? "Täydellinen tulos! 🌟"
                    : score >= questions.length * 0.8
                      ? "Erinomaista työtä! 👏"
                      : score >= questions.length * 0.6
                        ? "Hyvää työtä! 👍"
                        : "Jatka harjoittelua! 💪"}
                </div>
              </CardContent>
            </Card>
            <p className="text-gray-600 mb-8">
              Onnittelut! Olet suorittanut kaikki 4 moduulia Suomen kielen oppimisalustalla.
            </p>
            <Link href="/summary">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Näytä yhteenveto ja anna palautetta
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const userAnswer = answers[question.id]
  const isCorrect = userAnswer === question.correct

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <TabNavigation currentModule="module4" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-600">
            Kysymys {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 4: Kuuntelutesti – Tosi vai epätosi</h1>
          <p className="text-lg text-gray-600 mb-6">Katso kuvaa, kuuntele ja klikkaa, onko lause oikein vai väärin.</p>
        </div>

        {/* Image */}
        <div className="max-w-4xl mx-auto mb-8">
          <Image
            src="/images/module4-scene.jpg"
            alt="Taukohuone"
            width={800}
            height={500}
            className="w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Question Card */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="text-center">Kysymys {currentQuestion + 1}</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <Button onClick={playAudio} variant="outline" size="lg">
              <Play className="mr-2 h-4 w-4" />
              Kuuntele väittämä
            </Button>

            <div className="text-lg font-medium p-4 bg-gray-50 rounded-lg">{question.statement}</div>

            {!showFeedback ? (
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={() => handleAnswer(true)}
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 min-w-[120px]"
                >
                  Tosi
                </Button>
                <Button onClick={() => handleAnswer(false)} size="lg" variant="destructive" className="min-w-[120px]">
                  Epätosi
                </Button>
              </div>
            ) : (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center justify-center mb-3">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                  ) : (
                    <X className="h-6 w-6 text-red-500 mr-2" />
                  )}
                  <span className={`font-semibold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "Oikein!" : "Väärin"}
                  </span>
                </div>
                <p className={`mb-4 ${isCorrect ? "text-green-700" : "text-red-700"}`}>{question.feedback}</p>
                <Button onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? "Seuraava kysymys" : "Suorita moduuli"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Edistyminen</span>
            <span>
              {currentQuestion + (showFeedback ? 1 : 0)}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
