import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2, Coffee, BookOpen, CheckCircle, ArrowRight } from "lucide-react"
import { TabNavigation } from "@/components/tab-navigation"

export default function LearningPath() {
  const modules = [
    {
      id: 1,
      title: "Perussanasto",
      description: "Opi tärkeimmät taukohuoneen esineet äänen, kuvien ja tekstin avulla",
      icon: Volume2,
      objectives: [
        "Kuuntele suomenkielisiä sanoja äänellä",
        "Yhdistä ääniä oikeisiin kuviin",
        "Opi 9 tärkeintä taukohuoneen sanastoa",
        "Harjoittele ääntämistä toiston avulla",
      ],
    },
    {
      id: 2,
      title: "Kuullun ymmärtäminen",
      description: "Ymmärrä puhuttua suomea ja tunnista esineitä kuvasta",
      icon: Coffee,
      objectives: [
        "Kuuntele suomenkielisiä ohjeita",
        "Tunnista esineitä taukohuoneen kuvista",
        "Ymmärrä työpaikan keskustelukontekstia",
        "Harjoittele tosielämän kuuntelutaitoja",
      ],
    },
    {
      id: 3,
      title: "Lauseet ja verbit",
      description: "Harjoittele sanastoa ja suomen kielen verbirakenteita lauseiden ja kysymysten avulla",
      icon: BookOpen,
      objectives: [
        "Yhdistä lauseiden alkuja ja loppuja",
        "Opi suomen kielen kysymysrakenteita",
        "Harjoittele yleisiä verbejä kontekstissa",
        "Ymmärrä työpaikan fraaseja",
      ],
    },
    {
      id: 4,
      title: "Kuuntelutesti",
      description: "Testaa kuullun ymmärtämistä vahvistamalla väittämiä visuaalisten kohtausten perusteella",
      icon: CheckCircle,
      objectives: [
        "Testaa kokonaisymmärrystä",
        "Vahvista väittämiä kuvien perusteella",
        "Harjoittele oikein/väärin -päätöksentekoa",
        "Sovella opittua sanastoa kontekstissa",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <TabNavigation currentModule="learning-path" />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Oppimispolun Yleiskatsaus</h1>
          <p className="text-xl text-gray-600">
            Täydellinen yleiskatsaus kaikista oppimismoduuleista ja niiden tavoitteista
          </p>
        </div>

        {/* Module Details */}
        <div className="max-w-4xl mx-auto space-y-8">
          {modules.map((module, index) => {
            const Icon = module.icon
            return (
              <Card key={module.id} className="border-yellow-200 bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        Moduuli {module.id}: {module.title}
                      </CardTitle>
                      <CardDescription className="text-lg mt-1">{module.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Objectives */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      Oppimistavoitteet:
                    </h3>
                    <div className="grid gap-3">
                      {module.objectives.map((objective, idx) => (
                        <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700">{objective}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Start Module Button */}
                  <div className="pt-4">
                    <Link href={`/module${module.id}`}>
                      <Button
                        className={`w-full bg-gradient-to-r ${
                          index === 0
                            ? "from-blue-500 to-blue-600"
                            : index === 1
                              ? "from-green-500 to-green-600"
                              : index === 2
                                ? "from-purple-500 to-purple-600"
                                : "from-orange-500 to-orange-600"
                        } hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                      >
                        Aloita moduuli {module.id}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" size="lg">
              Palaa kotiin
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
