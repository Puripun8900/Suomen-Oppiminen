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
    audio: "Ensin helppo sana. Missä on kahviautomaatti?",
    correctAnswer: "coffee-machine",
    correctFeedback:
      "Joo, se on kahviautomaatti. Sinä voit valita, millaista kahvia haluat. Otatko maitokahvia, espressoa vai jotain muuta? Minä tykkään tavallisesta mustasta kahvista.",
    incorrectFeedback: "Se ei ole kahviautomaatti. Kahviautomaatti on iso ja musta kone.",
  },
  {
    id: 2,
    audio: "Tiedätkö, missä on vedenkeitin?",
    correctAnswer: "kettle",
    correctFeedback:
      "Kyllä, se on valkoinen vedenkeitin. Tämän vedenkeittimen merkki on Smeg. Vedenkeitin on tosi hyödyllinen, koska voit keittää sillä kuumaa vettä nopeasti.",
    incorrectFeedback: "Se ei ole vedenkeitin. Vedenkeitin on valkoinen.",
  },
  {
    id: 3,
    audio: "Missä on kahvitermos?",
    correctAnswer: "coffee-thermos",
    correctFeedback:
      "Juu, se on kahvitermoa. Tässä kahvilassa onkin kaksi kahvitermosta. Termoksessa on kuumaa kahvia.",
    incorrectFeedback: "Ei, se ei ole kahvitermos. Kuvassa on kaksi samanlaista kahvitermosta. Löydätkö ne?",
  },
  {
    id: 4,
    audio: "Missä ovat teepussit? Löydätkö ne?",
    correctAnswer: "tea",
    correctFeedback: "Kyllä, siinä ovat teepussit. Minä juon yleensä mustaherukkateetä. Mistä teestä sinä tykkäät?",
    incorrectFeedback: "Nyt meni väärin. Teepussit ovat vedenkeittimen lähellä.",
  },
  {
    id: 5,
    audio: "Missä on hunajaa?",
    correctAnswer: "honey",
    correctFeedback: "Hyvä, löysit hunajan! Tässä on kaksi pulloa hunajaa. Minä käytän hunajaa, kun juon teetä.",
    incorrectFeedback: "Se ei ole hunajaa. Kokeile uudelleen!",
  },
  {
    id: 6,
    audio: "Ja vielä lopuksi. Kuvassa on viisi purkkia makeutusainetta. Missä ne ovat?",
    correctAnswer: "sweetener",
    correctFeedback:
      "Hienoa, ne ovat makeutusainetta. Käytän makeutusainetta joskus kahvissa. Yleensä juon kahvia ilman makeutusainetta tai sokeria.",
    incorrectFeedback: "Se ei ole makeutusainetta. Makeutusaineet ovat teen vieressä.",
  },
]

const clickableItems = [
  { id: "coffee-machine", x: 4, y: 30, width: 18, height: 35, label: "Kahviautomaatti" },
  { id: "kettle", x: 26, y: 50, width: 12, height: 18, label: "Vedenkeitin" },
  { id: "coffee-thermos", x: 45, y: 50, width: 15, height: 20, label: "Kahvitermos" },
  { id: "tea", x: 35, y: 75, width: 10, height: 8, label: "Teepussit" },
  { id: "honey", x: 15, y: 75, width: 8, height: 10, label: "Hunaja" },
  { id: "sweetener", x: 25, y: 80, width: 10, height: 12, label: "Makeutusaine" },
]

export default function Module2() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showBoundaries, setShowBoundaries] = useState<string[]>([])

  const playIntroAudio = () => {
    console.log("Toistetaan johdantoääni: Tässä on kuva kahvilasta...")
  }

  const playQuestionAudio = () => {
    console.log(`Toistetaan kysymysääni: ${questions[currentQuestion].audio}`)
  }

  const handleItemClick = (itemId: string) => {
    const question = questions[currentQuestion]
    const correct = itemId === question.correctAnswer

    setIsCorrect(correct)
    setFeedbackMessage(correct ? question.correctFeedback : question.incorrectFeedback)
    setShowFeedback(true)

    if (correct) {
      setCorrectAnswers((prev) => prev + 1)
      setShowBoundaries([itemId]) // Show boundary for correct answer
    } else {
      setShowBoundaries([]) // Hide boundaries for incorrect
    }
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setShowFeedback(false)
      setIsCorrect(false)
    } else {
      setIsCompleted(true)
      setShowFireworks(true)
      // Save progress
      const progress = JSON.parse(localStorage.getItem("finnish-learning-progress") || "{}")
      progress.module2 = true
      localStorage.setItem("finnish-learning-progress", JSON.stringify(progress))
    }
  }

  const tryAgain = () => {
    setShowFeedback(false)
    setIsCorrect(false)
  }

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <TabNavigation currentModule="module2" />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 2: Kuullun ymmärtäminen</h1>
            <p className="text-lg text-gray-600 mb-6">Ymmärrä puhuttua suomea ja tunnista esineitä kuvasta</p>
          </div>

          <Card className="max-w-3xl mx-auto mb-8">
            <CardHeader>
              <CardTitle>Ohjeet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video relative mb-4">
                <Image src="/images/module2-scene.jpg" alt="Taukohuone" fill className="object-cover rounded-md" />
              </div>
              <p className="text-gray-700">
                Tässä on kuva kahvilasta. Kuuntele, mitä sinun työkaverisi sanoo, ja etsi kuvasta tavarat. Klikkaa tai
                näpäytä tavaraa.
              </p>
              <Button onClick={playIntroAudio} variant="outline" className="w-full">
                <Play className="mr-2 h-4 w-4" />
                Kuuntele johdanto
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={() => setHasStarted(true)} size="lg">
              Aloita kysymykset
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <TabNavigation currentModule="module2" />
        <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 2 valmis! 🎉</h1>
            <Card className="max-w-md mx-auto mb-8">
              <CardHeader>
                <CardTitle>Tuloksesi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  {correctAnswers}/{questions.length}
                </div>
                <p className="text-gray-600">Kysymykseen vastattiin oikein</p>
              </CardContent>
            </Card>
            <Link href="/module3">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Seuraava oppitunti
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <TabNavigation currentModule="module2" />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="text-sm text-gray-600">
            Kysymys {currentQuestion + 1} / {questions.length}
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 2: Kuullun ymmärtäminen</h1>
          <Button onClick={playQuestionAudio} variant="outline" className="mb-4">
            <Play className="mr-2 h-4 w-4" />
            Kuuntele kysymys
          </Button>
        </div>

        {/* Interactive Image */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Image
              src="/images/module2-scene.jpg"
              alt="Taukohuone"
              width={800}
              height={500}
              className="w-full rounded-lg shadow-lg"
            />
            {/* Clickable Areas */}
            {clickableItems.map((item) => (
              <div key={item.id}>
                <button
                  className="absolute bg-transparent hover:bg-yellow-300 hover:bg-opacity-30 border-2 border-transparent hover:border-yellow-400 rounded transition-all duration-200"
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                    width: `${item.width}%`,
                    height: `${item.height}%`,
                  }}
                  onClick={() => handleItemClick(item.id)}
                  disabled={showFeedback}
                />
                {/* Boundary solution */}
                {showBoundaries.includes(item.id) && (
                  <div
                    className="absolute border-4 border-green-500 bg-green-200 bg-opacity-30 rounded-lg flex items-center justify-center"
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: `${item.width}%`,
                      height: `${item.height}%`,
                    }}
                  >
                    <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">{item.label}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {showFeedback && (
          <Card
            className={`max-w-2xl mx-auto mb-8 ${
              isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
            }`}
          >
            <CardHeader>
              <div className="flex items-center">
                {isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                ) : (
                  <X className="h-6 w-6 text-red-500 mr-2" />
                )}
                <CardTitle className={isCorrect ? "text-green-800" : "text-red-800"}>
                  {isCorrect ? "Oikein!" : "Yritä uudelleen"}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`mb-4 ${isCorrect ? "text-green-700" : "text-red-700"}`}>{feedbackMessage}</p>
              <div className="flex justify-center space-x-4">
                {isCorrect ? (
                  <Button onClick={nextQuestion}>
                    {currentQuestion < questions.length - 1 ? "Seuraava kysymys" : "Suorita moduuli"}
                  </Button>
                ) : (
                  <Button onClick={tryAgain} variant="outline">
                    Yritä uudelleen
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
