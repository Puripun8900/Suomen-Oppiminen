"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, CheckCircle, X } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"
import { Fireworks } from "@/components/fireworks"

const vocabulary = [
  { word: "hunaja", image: "/images/honey.jpg", audio: "hunaja" },
  { word: "makeutusaine", image: "/images/sweetener.jpg", audio: "makeutusaine" },
  { word: "kakkupalat", image: "/images/cake.png", audio: "kakkupalat" },
  { word: "kahvitermos", image: "/images/coffee-thermos.jpg", audio: "kahvitermos" },
  { word: "kahviautomaatti", image: "/images/coffee-machine.jpg", audio: "kahviautomaatti" },
  { word: "vedenkeitin", image: "/images/kettle.jpg", audio: "vedenkeitin" },
  { word: "sokeri", image: "/images/sugar.jpg", audio: "sokeri" },
  { word: "juomalasit", image: "/images/glasses.jpg", audio: "juomalasit" },
  { word: "teepussit", image: "/images/tea.jpg", audio: "teepussit" },
]

export default function Module1() {
  const [matches, setMatches] = useState<Record<string, string>>({})
  const [selectedAudio, setSelectedAudio] = useState<string | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [correctMatches, setCorrectMatches] = useState<string[]>([])
  const [incorrectMatches, setIncorrectMatches] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [shuffledImages, setShuffledImages] = useState(vocabulary)

  useEffect(() => {
    // Randomize image order
    const shuffled = [...vocabulary].sort(() => Math.random() - 0.5)
    setShuffledImages(shuffled)
  }, [])

  const playAudio = (word: string) => {
    setSelectedAudio(word)
    // Simulate Finnish AI voice
    console.log(`🎵 Toistetaan suomalainen AI-ääni sanalle: ${word}`)
    // In real implementation, this would use Finnish TTS
  }

  const handleImageClick = (word: string, image: string) => {
    if (!selectedAudio) return

    setMatches((prev) => ({
      ...prev,
      [selectedAudio]: image,
    }))
    setSelectedAudio(null)
  }

  const checkAnswers = () => {
    const correct: string[] = []
    const incorrect: string[] = []

    vocabulary.forEach((item) => {
      if (matches[item.word] === item.image) {
        correct.push(item.word)
      } else if (matches[item.word]) {
        incorrect.push(item.word)
      }
    })

    setCorrectMatches(correct)
    setIncorrectMatches(incorrect)
    setShowResults(true)

    if (correct.length === vocabulary.length) {
      setIsCompleted(true)
      setShowFireworks(true)
      // Save progress
      const progress = JSON.parse(localStorage.getItem("finnish-learning-progress") || "{}")
      progress.module1 = true
      localStorage.setItem("finnish-learning-progress", JSON.stringify(progress))
    }
  }

  const tryAgain = () => {
    setShowResults(false)
    setMatches({})
    setCorrectMatches([])
    setIncorrectMatches([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <TabNavigation currentModule="module1" />
      <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 1: Perussanasto</h1>
          <p className="text-lg text-gray-600 mb-6">
            Klikkaa puhekuplaa ja kuuntele sana. Yhdistä sana oikeaan kuvaan.
          </p>
        </div>

        {/* Audio Buttons - No text underneath */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Klikkaa kuunnellaksesi:</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {vocabulary.map((item) => (
              <Button
                key={item.word}
                variant={selectedAudio === item.word ? "default" : "outline"}
                className="h-16 flex items-center justify-center"
                onClick={() => playAudio(item.word)}
              >
                <Volume2 className="h-6 w-6" />
              </Button>
            ))}
          </div>
        </div>

        {/* Selected Audio Indicator */}
        {selectedAudio && (
          <div className="text-center mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
              <Volume2 className="h-4 w-4 mr-2" />
              Valittu: {selectedAudio}
            </div>
          </div>
        )}

        {/* Randomized Images Grid */}
        <div className="max-w-6xl mx-auto mb-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Klikkaa vastaavaa kuvaa:</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {shuffledImages.map((item) => {
              const isMatched = Object.values(matches).includes(item.image)
              const matchedWord = Object.keys(matches).find((key) => matches[key] === item.image)
              const isCorrect = showResults && correctMatches.includes(matchedWord || "")
              const isIncorrect = showResults && incorrectMatches.includes(matchedWord || "")

              return (
                <Card
                  key={item.image}
                  className={`cursor-pointer transition-all duration-200 ${
                    isMatched ? "ring-2 ring-yellow-400" : "hover:shadow-lg"
                  } ${isCorrect ? "ring-green-400 bg-green-50" : ""} ${isIncorrect ? "ring-red-400 bg-red-50" : ""}`}
                  onClick={() => handleImageClick(item.word, item.image)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.word}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    {isMatched && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-2">
                          {isCorrect && <CheckCircle className="h-5 w-5 text-green-500 mr-2" />}
                          {isIncorrect && <X className="h-5 w-5 text-red-500 mr-2" />}
                          <span className="font-medium">{matchedWord}</span>
                        </div>
                        {isCorrect && <p className="text-sm text-green-600">Oikein!</p>}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-x-4">
          {!showResults ? (
            <Button onClick={checkAnswers} disabled={Object.keys(matches).length !== vocabulary.length} size="lg">
              Tarkista vastaukset
            </Button>
          ) : !isCompleted ? (
            <Button onClick={tryAgain} size="lg" variant="outline">
              Yritä uudelleen
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="text-green-600 font-semibold text-lg">🎉 Erinomaista! Kaikki vastaukset ovat oikein!</div>
              <Link href="/module2">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Seuraava oppitunti
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Results Summary */}
        {showResults && (
          <div className="max-w-md mx-auto mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Tulokset</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Oikein:</span>
                    <span className="text-green-600 font-semibold">
                      {correctMatches.length}/{vocabulary.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Väärin:</span>
                    <span className="text-red-600 font-semibold">{incorrectMatches.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
