"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, X } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"
import { Fireworks } from "@/components/fireworks"

// Keep the same task data but add randomization
const taskA = [
  { id: 1, start: "Haluaisitko", end: "ottaa kahvia vai teetä?" },
  { id: 2, start: "Laitatko kahviin", end: "makeutusainetta?" },
  { id: 3, start: "Käytätkö teessä", end: "hunajaa?" },
  { id: 4, start: "Otatko jotain", end: "kahviautomaatista?" },
  { id: 5, start: "Keitätkö vettä", end: "vedenkeittimellä?" },
  { id: 6, start: "Onko kahvitermoksessa", end: "vielä kahvia?" },
]

const taskB = [
  { id: 1, start: "Kahvitermos", end: "on tyhjä." },
  { id: 2, start: "Vedenkeitin ei", end: "toimi." },
  { id: 3, start: "Kahviautomaatti", end: "on rikki." },
  { id: 4, start: "Teepussit ovat", end: "laatikossa." },
  { id: 5, start: "Juomalasit", end: "ovat hyllyllä." },
  { id: 6, start: "Kakkupalat", end: "maistuvat herkullisilta." },
]

const taskC = [
  { id: 1, sentence: "_____ sinä kahvia vai teetä?", answer: "Otatko", options: ["Otatko", "Keitätkö", "Käytätkö"] },
  {
    id: 2,
    sentence: "_____ vähän teevettä vedenkeittimellä?",
    answer: "Keitätkö",
    options: ["Otatko", "Keitätkö", "Laitatko"],
  },
  {
    id: 3,
    sentence: "_____ sinä kahvissa makeutusainetta?",
    answer: "Käytätkö",
    options: ["Käytätkö", "Kaadatko", "Sekoitatko"],
  },
  {
    id: 4,
    sentence: "_____ likaiset astiat tuolle pöydälle?",
    answer: "Laitatko",
    options: ["Laitatko", "Kaadatko", "Otatko"],
  },
  {
    id: 5,
    sentence: "_____ minulle vähän lisää kahvia tähän kuppiin?",
    answer: "Kaadatko",
    options: ["Kaadatko", "Sekoitatko", "Käytätkö"],
  },
  {
    id: 6,
    sentence: "_____ sinä teehen hunajaa?",
    answer: "Sekoitatko",
    options: ["Sekoitatko", "Laitatko", "Keitätkö"],
  },
]

export default function Module3() {
  const [currentTask, setCurrentTask] = useState<"A" | "B" | "C">("A")
  const [matchesA, setMatchesA] = useState<Record<number, string>>({})
  const [matchesB, setMatchesB] = useState<Record<number, string>>({})
  const [answersC, setAnswersC] = useState<Record<number, string>>({})
  const [selectedStart, setSelectedStart] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [taskAComplete, setTaskAComplete] = useState(false)
  const [taskBComplete, setTaskBComplete] = useState(false)
  const [taskCComplete, setTaskCComplete] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showFireworks, setShowFireworks] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)
  const [shuffledEndsA, setShuffledEndsA] = useState(taskA)
  const [shuffledEndsB, setShuffledEndsB] = useState(taskB)

  useEffect(() => {
    // Randomize answer order for tasks A and B
    setShuffledEndsA([...taskA].sort(() => Math.random() - 0.5))
    setShuffledEndsB([...taskB].sort(() => Math.random() - 0.5))
  }, [])

  // Rest of the component logic remains the same...
  // [Previous implementation continues here]

  const handleStartClick = (id: number, task: "A" | "B") => {
    if (task === "A") {
      setSelectedStart(selectedStart === id ? null : id)
    } else {
      setSelectedStart(selectedStart === id ? null : id)
    }
  }

  const handleEndClick = (end: string, task: "A" | "B") => {
    if (selectedStart === null) return

    if (task === "A") {
      setMatchesA((prev) => ({ ...prev, [selectedStart]: end }))
    } else {
      setMatchesB((prev) => ({ ...prev, [selectedStart]: end }))
    }
    setSelectedStart(null)
  }

  const handleVerbSelect = (questionId: number, verb: string) => {
    setAnswersC((prev) => ({ ...prev, [questionId]: verb }))
  }

  const checkTaskA = () => {
    const correct = taskA.every((item) => matchesA[item.id] === item.end)
    setTaskAComplete(correct)
    setShowResults(true)
  }

  const checkTaskB = () => {
    const correct = taskB.every((item) => matchesB[item.id] === item.end)
    setTaskBComplete(correct)
    setShowResults(true)
  }

  const checkTaskC = () => {
    const correct = taskC.every((item) => answersC[item.id] === item.answer)
    setTaskCComplete(correct)
    setShowResults(true)
    setShowSolutions(true) // Show solutions after checking

    if (correct && taskAComplete && taskBComplete) {
      setIsCompleted(true)
      setShowFireworks(true)
      // Save progress
      const progress = JSON.parse(localStorage.getItem("finnish-learning-progress") || "{}")
      progress.module3 = true
      localStorage.setItem("finnish-learning-progress", JSON.stringify(progress))
    }
  }

  const resetTask = () => {
    setShowResults(false)
    if (currentTask === "A") {
      setMatchesA({})
    } else if (currentTask === "B") {
      setMatchesB({})
    } else {
      setAnswersC({})
    }
    setSelectedStart(null)
  }

  const nextTask = () => {
    setShowResults(false)
    if (currentTask === "A") {
      setCurrentTask("B")
    } else if (currentTask === "B") {
      setCurrentTask("C")
    }
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
        <TabNavigation currentModule="module3" />
        <Fireworks show={showFireworks} onComplete={() => setShowFireworks(false)} />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 3 valmis! 🎉</h1>
            <Card className="max-w-md mx-auto mb-8 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-800">Erinomaista työtä!</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-green-700 mb-4">
                  Olet onnistuneesti suorittanut kaikki lauseiden yhdistämis- ja verbiharjoitukset!
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Tehtävä A: Lauseiden yhdistäminen ✓
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Tehtävä B: Lisää lauseita ✓
                  </div>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Tehtävä C: Verbiharjoitus ✓
                  </div>
                </div>
              </CardContent>
            </Card>
            <Link href="/module4">
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
      <TabNavigation currentModule="module3" />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Moduuli 3: Lauseet ja verbit</h1>
          <p className="text-lg text-gray-600">
            Harjoittele sanastoa ja suomen kielen verbirakenteita lauseiden ja kysymysten avulla
          </p>
        </div>

        {/* Task Navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {["A", "B", "C"].map((task) => (
              <Button
                key={task}
                variant={currentTask === task ? "default" : "outline"}
                onClick={() => setCurrentTask(task as "A" | "B" | "C")}
                disabled={(task === "B" && !taskAComplete) || (task === "C" && (!taskAComplete || !taskBComplete))}
                className="relative"
              >
                Tehtävä {task}
                {((task === "A" && taskAComplete) ||
                  (task === "B" && taskBComplete) ||
                  (task === "C" && taskCComplete)) && <CheckCircle className="h-4 w-4 ml-2 text-green-500" />}
              </Button>
            ))}
          </div>
        </div>

        {/* Task A with randomized endings */}
        {currentTask === "A" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Tehtävä A: Yhdistä lauseet</CardTitle>
              <p className="text-gray-600">Harjoittele sanoja lisää. Yhdistä lauseet oikein.</p>
              <p className="text-sm text-gray-500">Klikkaa suomalaista lausetta, sitten klikkaa sen jatkoa</p>
            </CardHeader>
            <CardContent>
              {/* Show matched sentences at top */}
              {Object.keys(matchesA).length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold mb-4 text-blue-600">Yhdistetyt lauseet:</h3>
                  <div className="space-y-2">
                    {Object.entries(matchesA).map(([startId, end]) => {
                      const startItem = taskA.find((item) => item.id === Number.parseInt(startId))
                      return (
                        <div key={startId} className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <span className="text-blue-800 font-medium">
                            {startItem?.start} {end}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Sentence Starts */}
                <div>
                  <h3 className="font-semibold mb-4">Suomalaiset lauseet:</h3>
                  <div className="space-y-2">
                    {taskA.map((item) => (
                      <Button
                        key={item.id}
                        variant={selectedStart === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => setSelectedStart(selectedStart === item.id ? null : item.id)}
                        disabled={matchesA[item.id] && selectedStart !== item.id}
                      >
                        <span className="font-medium mr-2">{item.id})</span>
                        {item.start}
                        {matchesA[item.id] && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Randomized Sentence Ends */}
                <div>
                  <h3 className="font-semibold mb-4">Lauseiden jatkot:</h3>
                  <div className="space-y-2">
                    {shuffledEndsA.map((item) => {
                      const isMatched = Object.values(matchesA).includes(item.end)
                      return (
                        <Button
                          key={`end-${item.id}`}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => {
                            if (selectedStart !== null) {
                              setMatchesA((prev) => ({ ...prev, [selectedStart]: item.end }))
                              setSelectedStart(null)
                            }
                          }}
                          disabled={isMatched || selectedStart === null}
                        >
                          {item.end}
                          {isMatched && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                {!showResults ? (
                  <Button
                    onClick={() => {
                      const correct = taskA.every((item) => matchesA[item.id] === item.end)
                      setTaskAComplete(correct)
                      setShowResults(true)
                    }}
                    disabled={Object.keys(matchesA).length !== taskA.length}
                  >
                    Tarkista vastaukset
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {taskAComplete ? (
                      <div>
                        <div className="text-green-600 font-semibold mb-4">
                          🎉 Täydellinen! Kaikki lauseet yhdistetty oikein!
                        </div>
                        <Button
                          onClick={() => {
                            setShowResults(false)
                            setCurrentTask("B")
                          }}
                        >
                          Jatka tehtävään B
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-red-600 font-semibold mb-4">
                          Jotkut yhdistykset ovat väärin. Yritä uudelleen!
                        </div>
                        <Button
                          onClick={() => {
                            setShowResults(false)
                            setMatchesA({})
                            setSelectedStart(null)
                          }}
                          variant="outline"
                        >
                          Yritä uudelleen
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task B with randomized endings */}
        {currentTask === "B" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Task B: More Sentence Matching</CardTitle>
              <p className="text-gray-600">Harjoittele sanoja lisää. Yhdistä lauseet oikein.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Sentence Starts */}
                <div>
                  <h3 className="font-semibold mb-4">Sentence Beginnings:</h3>
                  <div className="space-y-2">
                    {taskB.map((item) => (
                      <Button
                        key={item.id}
                        variant={selectedStart === item.id ? "default" : "outline"}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => setSelectedStart(selectedStart === item.id ? null : item.id)}
                        disabled={matchesB[item.id] && selectedStart !== item.id}
                      >
                        <span className="font-medium mr-2">{item.id})</span>
                        {item.start}
                        {matchesB[item.id] && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Randomized Sentence Ends */}
                <div>
                  <h3 className="font-semibold mb-4">Sentence Endings:</h3>
                  <div className="space-y-2">
                    {shuffledEndsB.map((item) => {
                      const isMatched = Object.values(matchesB).includes(item.end)
                      return (
                        <Button
                          key={`end-${item.id}`}
                          variant="outline"
                          className="w-full justify-start text-left h-auto py-3"
                          onClick={() => {
                            if (selectedStart !== null) {
                              setMatchesB((prev) => ({ ...prev, [selectedStart]: item.end }))
                              setSelectedStart(null)
                            }
                          }}
                          disabled={isMatched || selectedStart === null}
                        >
                          {item.end}
                          {isMatched && <CheckCircle className="h-4 w-4 ml-auto text-green-500" />}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                {!showResults ? (
                  <Button
                    onClick={() => {
                      const correct = taskB.every((item) => matchesB[item.id] === item.end)
                      setTaskBComplete(correct)
                      setShowResults(true)
                    }}
                    disabled={Object.keys(matchesB).length !== taskB.length}
                  >
                    Check Answers
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {taskBComplete ? (
                      <div>
                        <div className="text-green-600 font-semibold mb-4">
                          🎉 Excellent! All sentences matched correctly!
                        </div>
                        <Button
                          onClick={() => {
                            setShowResults(false)
                            setCurrentTask("C")
                          }}
                        >
                          Continue to Task C
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <div className="text-red-600 font-semibold mb-4">Some matches are incorrect. Try again!</div>
                        <Button
                          onClick={() => {
                            setShowResults(false)
                            setMatchesB({})
                            setSelectedStart(null)
                          }}
                          variant="outline"
                        >
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Task C */}
        {currentTask === "C" && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Task C: Fill in the Correct Verb</CardTitle>
              <p className="text-gray-600">
                Ota selvää, mitä seuraavat verbit tarkoittavat: ottaa, laittaa, sekoittaa, käyttää, kaataa, keittää
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {taskC.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <p className="text-lg mb-4 font-medium">
                      {item.id}. {item.sentence}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.options.map((option) => (
                        <Button
                          key={option}
                          variant={answersC[item.id] === option ? "default" : "outline"}
                          onClick={() => handleVerbSelect(item.id, option)}
                          className="min-w-[100px]"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    {answersC[item.id] && showSolutions && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          {answersC[item.id] === item.answer ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <X className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <span className={answersC[item.id] === item.answer ? "text-green-600" : "text-red-600"}>
                            {answersC[item.id] === item.answer ? "Oikein!" : "Väärin"}
                          </span>
                        </div>
                        {answersC[item.id] !== item.answer && (
                          <div className="text-sm text-gray-600">
                            <strong>Oikea vastaus:</strong> {item.answer}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                {!showResults ? (
                  <Button onClick={checkTaskC} disabled={Object.keys(answersC).length !== taskC.length}>
                    Check Answers
                  </Button>
                ) : (
                  <div className="space-y-4">
                    {taskCComplete ? (
                      <div>
                        <div className="text-green-600 font-semibold mb-4">🎉 Outstanding! All verbs are correct!</div>
                        <p className="text-gray-600 mb-4">You've completed all tasks in Module 3!</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-red-600 font-semibold mb-4">Some answers are incorrect. Try again!</div>
                        <Button onClick={resetTask} variant="outline">
                          Try Again
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
