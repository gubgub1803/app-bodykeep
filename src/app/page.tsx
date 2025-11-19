"use client"

import { useState } from "react"
import { Home, Dumbbell, UtensilsCrossed, Pill, Activity, User, Sparkles, TrendingUp, Calendar, Clock, Droplets, Moon, Heart, Zap, ChevronRight, Crown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Screen = "home" | "workout" | "nutrition" | "supplements" | "habits" | "profile" | "plans"

export default function BodyKeepApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [isPremium, setIsPremium] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-xl">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BodyKeep
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {!isPremium && (
                <Button 
                  onClick={() => setCurrentScreen("plans")}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setCurrentScreen("profile")}
                className="hover:bg-slate-100"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentScreen === "home" && <HomeScreen isPremium={isPremium} setScreen={setCurrentScreen} />}
        {currentScreen === "workout" && <WorkoutScreen isPremium={isPremium} />}
        {currentScreen === "nutrition" && <NutritionScreen isPremium={isPremium} />}
        {currentScreen === "supplements" && <SupplementsScreen isPremium={isPremium} />}
        {currentScreen === "habits" && <HabitsScreen />}
        {currentScreen === "profile" && <ProfileScreen />}
        {currentScreen === "plans" && <PlansScreen setIsPremium={setIsPremium} setScreen={setCurrentScreen} />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around h-20">
            <NavButton 
              icon={Home} 
              label="Início" 
              active={currentScreen === "home"}
              onClick={() => setCurrentScreen("home")}
            />
            <NavButton 
              icon={Dumbbell} 
              label="Treinos" 
              active={currentScreen === "workout"}
              onClick={() => setCurrentScreen("workout")}
            />
            <NavButton 
              icon={UtensilsCrossed} 
              label="Nutrição" 
              active={currentScreen === "nutrition"}
              onClick={() => setCurrentScreen("nutrition")}
            />
            <NavButton 
              icon={Pill} 
              label="Suplementos" 
              active={currentScreen === "supplements"}
              onClick={() => setCurrentScreen("supplements")}
            />
            <NavButton 
              icon={Activity} 
              label="Hábitos" 
              active={currentScreen === "habits"}
              onClick={() => setCurrentScreen("habits")}
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

function NavButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
        active 
          ? "text-blue-600 bg-blue-50" 
          : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
      }`}
    >
      <Icon className={`w-6 h-6 ${active ? "scale-110" : ""}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  )
}

function HomeScreen({ isPremium, setScreen }: { isPremium: boolean, setScreen: (screen: Screen) => void }) {
  return (
    <div className="space-y-6 pb-24">
      {/* SmartCoach+ Alert */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                SmartCoach+ 
                {isPremium && <Crown className="w-4 h-4 text-amber-300" />}
              </h3>
              <p className="text-white/90 text-sm mb-3">
                {isPremium 
                  ? "Você dormiu pouco hoje. Seu treino foi ajustado para ser mais leve e focado em recuperação."
                  : "Desbloqueie o SmartCoach+ para receber ajustes diários personalizados baseados em como você está se sentindo."
                }
              </p>
              {!isPremium && (
                <Button 
                  onClick={() => setScreen("plans")}
                  variant="secondary" 
                  size="sm"
                  className="bg-white text-purple-600 hover:bg-white/90"
                >
                  Ativar Premium
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={TrendingUp} label="Peso" value="72.5 kg" change="-0.5kg" positive />
        <StatCard icon={Zap} label="Calorias" value="1.850" change="350 rest." />
        <StatCard icon={Droplets} label="Água" value="2.1L" change="0.9L rest." />
        <StatCard icon={Moon} label="Sono" value="6.5h" change="Pouco" positive={false} />
      </div>

      {/* Today's Workout */}
      <Card className="border-2 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-blue-600" />
                Treino de Hoje
              </CardTitle>
              <CardDescription>Peito e Tríceps • 45 min</CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Pronto
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Progresso</span>
              <span className="font-semibold text-blue-600">0/8 exercícios</span>
            </div>
            <Progress value={0} className="h-2" />
            <Button 
              onClick={() => setScreen("workout")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              Iniciar Treino
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Today's Meals */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UtensilsCrossed className="w-5 h-5 text-orange-600" />
            Refeições de Hoje
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <MealItem time="08:00" name="Café da Manhã" calories="450 kcal" completed />
            <MealItem time="12:30" name="Almoço" calories="650 kcal" completed />
            <MealItem time="16:00" name="Lanche" calories="250 kcal" />
            <MealItem time="19:30" name="Jantar" calories="500 kcal" />
          </div>
          <Button 
            onClick={() => setScreen("nutrition")}
            variant="outline" 
            className="w-full mt-4"
          >
            Ver Cardápio Completo
          </Button>
        </CardContent>
      </Card>

      {/* Supplements */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-purple-600" />
            Suplementação
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <SupplementItem time="08:00" name="Whey Protein" dose="30g" completed />
            <SupplementItem time="14:00" name="Creatina" dose="5g" completed />
            <SupplementItem time="18:00" name="Pré-treino" dose="1 dose" />
            <SupplementItem time="20:00" name="Ômega 3" dose="2 cáps" />
          </div>
          <Button 
            onClick={() => setScreen("supplements")}
            variant="outline" 
            className="w-full mt-4"
          >
            Gerenciar Suplementos
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function WorkoutScreen({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-3xl font-bold mb-2">Treinos</h2>
        <p className="text-slate-600">Seu plano personalizado de exercícios</p>
      </div>

      {!isPremium && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-900">
                <strong>Premium:</strong> Desbloqueie treinos adaptativos e vídeos explicativos
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Hoje</TabsTrigger>
          <TabsTrigger value="week">Semana</TabsTrigger>
          <TabsTrigger value="library">Biblioteca</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 mt-6">
          <Card className="border-2 border-blue-200">
            <CardHeader>
              <CardTitle>Treino A - Peito e Tríceps</CardTitle>
              <CardDescription>45 minutos • Academia</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <ExerciseItem name="Supino Reto" sets="4x10" rest="90s" />
              <ExerciseItem name="Supino Inclinado" sets="3x12" rest="60s" />
              <ExerciseItem name="Crucifixo" sets="3x12" rest="60s" />
              <ExerciseItem name="Tríceps Testa" sets="3x12" rest="60s" />
              <ExerciseItem name="Tríceps Corda" sets="3x15" rest="45s" />
              
              <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4 mt-6">
          <WeekDayCard day="Segunda" workout="Peito e Tríceps" completed />
          <WeekDayCard day="Terça" workout="Costas e Bíceps" completed />
          <WeekDayCard day="Quarta" workout="Descanso" rest />
          <WeekDayCard day="Quinta" workout="Pernas" active />
          <WeekDayCard day="Sexta" workout="Ombros e Abdômen" />
          <WeekDayCard day="Sábado" workout="Cardio" />
          <WeekDayCard day="Domingo" workout="Descanso" rest />
        </TabsContent>

        <TabsContent value="library" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WorkoutCard title="Treino Rápido" duration="15 min" type="Casa" />
            <WorkoutCard title="Full Body" duration="45 min" type="Academia" />
            <WorkoutCard title="HIIT Cardio" duration="20 min" type="Casa" />
            <WorkoutCard title="Força" duration="60 min" type="Academia" />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function NutritionScreen({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-3xl font-bold mb-2">Nutrição</h2>
        <p className="text-slate-600">Seu cardápio personalizado</p>
      </div>

      {!isPremium && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-900">
                <strong>Premium:</strong> Receitas exclusivas e lista de compras automática
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Macros do Dia */}
      <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
        <CardHeader>
          <CardTitle>Macros de Hoje</CardTitle>
          <CardDescription>Meta: 2.200 kcal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MacroBar label="Proteínas" current={85} target={165} unit="g" color="blue" />
          <MacroBar label="Carboidratos" current={180} target={220} unit="g" color="orange" />
          <MacroBar label="Gorduras" current={45} target={60} unit="g" color="purple" />
        </CardContent>
      </Card>

      {/* Refeições */}
      <div className="space-y-4">
        <MealCard 
          time="08:00"
          name="Café da Manhã"
          items={["3 ovos mexidos", "2 fatias de pão integral", "1 banana", "Café"]}
          calories={450}
          completed
        />
        <MealCard 
          time="12:30"
          name="Almoço"
          items={["150g frango grelhado", "200g arroz integral", "Salada verde", "Azeite"]}
          calories={650}
          completed
        />
        <MealCard 
          time="16:00"
          name="Lanche"
          items={["Whey protein", "1 maçã", "10 castanhas"]}
          calories={250}
        />
        <MealCard 
          time="19:30"
          name="Jantar"
          items={["150g salmão", "200g batata doce", "Brócolis", "Azeite"]}
          calories={500}
        />
      </div>

      <Button className="w-full bg-orange-600 hover:bg-orange-700">
        Gerar Lista de Compras
      </Button>
    </div>
  )
}

function SupplementsScreen({ isPremium }: { isPremium: boolean }) {
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-3xl font-bold mb-2">Suplementação</h2>
        <p className="text-slate-600">Seu plano personalizado de suplementos</p>
      </div>

      {!isPremium && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-amber-600" />
              <p className="text-sm text-amber-900">
                <strong>Premium:</strong> Recomendações personalizadas por IA
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle>Seu Plano de Suplementação</CardTitle>
          <CardDescription>Baseado no seu objetivo: Hipertrofia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SupplementCard 
            name="Whey Protein"
            dose="30g"
            timing="Pós-treino"
            benefit="Recuperação muscular"
            essential
          />
          <SupplementCard 
            name="Creatina"
            dose="5g"
            timing="Qualquer horário"
            benefit="Força e performance"
            essential
          />
          <SupplementCard 
            name="Ômega 3"
            dose="2 cápsulas"
            timing="Com refeição"
            benefit="Saúde cardiovascular"
          />
          <SupplementCard 
            name="Vitamina D"
            dose="1 cápsula"
            timing="Manhã"
            benefit="Imunidade e ossos"
          />
          <SupplementCard 
            name="Pré-treino"
            dose="1 dose"
            timing="30min antes"
            benefit="Energia e foco"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Horários de Hoje</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <SupplementTimeItem time="08:00" name="Vitamina D" completed />
          <SupplementTimeItem time="14:00" name="Creatina" completed />
          <SupplementTimeItem time="18:00" name="Pré-treino" />
          <SupplementTimeItem time="19:30" name="Whey Protein" />
          <SupplementTimeItem time="20:00" name="Ômega 3" />
        </CardContent>
      </Card>
    </div>
  )
}

function HabitsScreen() {
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-3xl font-bold mb-2">Hábitos</h2>
        <p className="text-slate-600">Acompanhe sua saúde diária</p>
      </div>

      {/* Daily Check-in */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-green-600" />
            Check-in Diário
          </CardTitle>
          <CardDescription>Como você está hoje?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <span className="text-2xl">😊</span>
              <span className="text-xs">Ótimo</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <span className="text-2xl">😐</span>
              <span className="text-xs">Normal</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <span className="text-2xl">😫</span>
              <span className="text-xs">Cansado</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <span className="text-2xl">😴</span>
              <span className="text-xs">Exausto</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Hydration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-blue-600" />
            Hidratação
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">2.1L</span>
            <span className="text-slate-600">Meta: 3L</span>
          </div>
          <Progress value={70} className="h-3" />
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4,5,6,7,8].map((i) => (
              <Button 
                key={i}
                variant={i <= 5 ? "default" : "outline"}
                size="sm"
                className={i <= 5 ? "bg-blue-600" : ""}
              >
                {i <= 5 ? "✓" : "+"} 250ml
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-indigo-600" />
            Sono
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-indigo-600">6.5h</div>
              <div className="text-sm text-slate-600">Última noite</div>
            </div>
            <Badge variant="outline" className="text-orange-600 border-orange-600">
              Abaixo da meta
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Qualidade</span>
              <span className="font-semibold">Regular</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Passos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">8.542</span>
            <span className="text-slate-600">Meta: 10.000</span>
          </div>
          <Progress value={85} className="h-3" />
        </CardContent>
      </Card>

      {/* Mood Tracker */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-pink-600" />
            Humor da Semana
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-end h-32">
            {["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map((day, i) => (
              <div key={day} className="flex flex-col items-center gap-2">
                <div 
                  className="w-8 bg-gradient-to-t from-pink-600 to-purple-600 rounded-t"
                  style={{ height: `${[80, 90, 70, 85, 95, 75, 60][i]}%` }}
                />
                <span className="text-xs text-slate-600">{day}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfileScreen() {
  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-3xl font-bold mb-2">Perfil</h2>
        <p className="text-slate-600">Suas informações e progresso</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-xl font-bold">João da Silva</h3>
              <p className="text-slate-600">Membro desde Jan 2024</p>
              <Badge className="mt-2 bg-amber-100 text-amber-700 border-amber-200">
                Plano Básico
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <StatRow label="Peso Atual" value="72.5 kg" />
          <StatRow label="Altura" value="1.75 m" />
          <StatRow label="IMC" value="23.7" />
          <StatRow label="Objetivo" value="Hipertrofia" />
          <StatRow label="Treinos Completos" value="47" />
          <StatRow label="Sequência Atual" value="5 dias" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progresso</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600">Peso Inicial</span>
              <span className="text-sm font-semibold">75 kg</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-slate-600">Peso Atual</span>
              <span className="text-sm font-semibold">72.5 kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Meta</span>
              <span className="text-sm font-semibold">70 kg</span>
            </div>
            <Progress value={50} className="h-2 mt-3" />
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full">
        Editar Perfil
      </Button>
      <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
        Sair
      </Button>
    </div>
  )
}

function PlansScreen({ setIsPremium, setScreen }: { setIsPremium: (value: boolean) => void, setScreen: (screen: Screen) => void }) {
  return (
    <div className="space-y-6 pb-24">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Escolha seu Plano</h2>
        <p className="text-slate-600">Invista na sua saúde e bem-estar</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Plano Básico */}
        <Card className="border-2 hover:border-blue-300 transition-all">
          <CardHeader>
            <CardTitle className="text-2xl">Plano Básico</CardTitle>
            <CardDescription>Ideal para começar sua jornada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 23,90</span>
                <span className="text-slate-600">/mês</span>
              </div>
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm text-green-800 font-semibold">Plano Anual</div>
                <div className="text-2xl font-bold text-green-700">R$ 10,75/mês</div>
                <div className="text-xs text-green-600">R$ 129,06 por ano • Economize 55%</div>
              </div>
            </div>

            <div className="space-y-3">
              <FeatureItem text="Treinos básicos" />
              <FeatureItem text="Cardápios semanais" />
              <FeatureItem text="Contador de macros" />
              <FeatureItem text="Rastreamento de hábitos" />
              <FeatureItem text="Suporte por email" />
            </div>

            <Button variant="outline" className="w-full">
              Começar Básico
            </Button>
          </CardContent>
        </Card>

        {/* Plano Premium */}
        <Card className="border-4 border-gradient-to-r from-amber-400 to-orange-500 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-sm font-bold">
            RECOMENDADO
          </div>
          <CardHeader className="pt-8">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Crown className="w-6 h-6 text-amber-500" />
              Plano Premium
            </CardTitle>
            <CardDescription>Resultados reais com IA avançada</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold">R$ 37,90</span>
                <span className="text-slate-600">/mês</span>
              </div>
              <div className="mt-2 p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
                <div className="text-sm text-amber-800 font-semibold">Plano Anual</div>
                <div className="text-2xl font-bold text-amber-700">R$ 17,05/mês</div>
                <div className="text-xs text-amber-600">R$ 204,60 por ano • Economize 55%</div>
              </div>
            </div>

            <div className="space-y-3">
              <FeatureItem text="SmartCoach+ com IA" premium />
              <FeatureItem text="Treinos adaptativos diários" premium />
              <FeatureItem text="Receitas exclusivas" premium />
              <FeatureItem text="Suplementação personalizada" premium />
              <FeatureItem text="Vídeos explicativos" premium />
              <FeatureItem text="Lista de compras automática" premium />
              <FeatureItem text="Métricas avançadas" premium />
              <FeatureItem text="Suporte prioritário" premium />
            </div>

            <Button 
              onClick={() => {
                setIsPremium(true)
                setScreen("home")
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg text-lg h-12"
            >
              Ativar Premium
            </Button>

            <p className="text-xs text-center text-slate-600">
              Parcelamento em até 12x sem juros no plano anual
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-3 text-center">Por que escolher o Premium?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600">3x</div>
                <div className="text-sm text-slate-600">Mais resultados</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-slate-600">Personalizado</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-slate-600">Suporte IA</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ icon: Icon, label, value, change, positive }: any) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-slate-600" />
          <span className="text-xs text-slate-600">{label}</span>
        </div>
        <div className="text-xl font-bold">{value}</div>
        {change && (
          <div className={`text-xs ${positive ? "text-green-600" : "text-orange-600"}`}>
            {change}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function MealItem({ time, name, calories, completed }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${completed ? "bg-green-500" : "bg-slate-300"}`} />
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-slate-600">{time} • {calories}</div>
        </div>
      </div>
      {completed && <Check className="w-4 h-4 text-green-600" />}
    </div>
  )
}

function SupplementItem({ time, name, dose, completed }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${completed ? "bg-purple-500" : "bg-slate-300"}`} />
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-slate-600">{time} • {dose}</div>
        </div>
      </div>
      {completed && <Check className="w-4 h-4 text-purple-600" />}
    </div>
  )
}

function ExerciseItem({ name, sets, rest }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="font-semibold text-sm">{name}</div>
      <div className="text-xs text-slate-600">{sets} • {rest}</div>
    </div>
  )
}

function WeekDayCard({ day, workout, completed, active, rest }: any) {
  return (
    <Card className={`${active ? "border-2 border-blue-500" : ""} ${rest ? "bg-slate-50" : ""}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">{day}</div>
            <div className="text-sm text-slate-600">{workout}</div>
          </div>
          {completed && <Check className="w-5 h-5 text-green-600" />}
          {active && <Badge>Hoje</Badge>}
        </div>
      </CardContent>
    </Card>
  )
}

function WorkoutCard({ title, duration, type }: any) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="font-semibold mb-2">{title}</div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {duration}
          </span>
          <span>{type}</span>
        </div>
      </CardContent>
    </Card>
  )
}

function MacroBar({ label, current, target, unit, color }: any) {
  const percentage = (current / target) * 100
  const colorClasses = {
    blue: "bg-blue-600",
    orange: "bg-orange-600",
    purple: "bg-purple-600"
  }
  
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold">{label}</span>
        <span className="text-slate-600">{current}/{target}{unit}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  )
}

function MealCard({ time, name, items, calories, completed }: any) {
  return (
    <Card className={completed ? "bg-green-50 border-green-200" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{time} • {calories} kcal</CardDescription>
          </div>
          {completed && <Check className="w-5 h-5 text-green-600" />}
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1">
          {items.map((item: string, i: number) => (
            <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
              <span className="w-1 h-1 bg-slate-400 rounded-full" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function SupplementCard({ name, dose, timing, benefit, essential }: any) {
  return (
    <Card className={essential ? "border-2 border-purple-300 bg-purple-50" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="font-semibold">{name}</div>
          {essential && (
            <Badge className="bg-purple-600 text-white">Essencial</Badge>
          )}
        </div>
        <div className="space-y-1 text-sm text-slate-600">
          <div>💊 {dose}</div>
          <div>⏰ {timing}</div>
          <div>✨ {benefit}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function SupplementTimeItem({ time, name, completed }: any) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${completed ? "bg-purple-500" : "bg-slate-300"}`} />
        <div>
          <div className="font-semibold text-sm">{name}</div>
          <div className="text-xs text-slate-600">{time}</div>
        </div>
      </div>
      {completed ? (
        <Check className="w-4 h-4 text-purple-600" />
      ) : (
        <Button size="sm" variant="outline">Tomar</Button>
      )}
    </div>
  )
}

function StatRow({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  )
}

function FeatureItem({ text, premium }: any) {
  return (
    <div className="flex items-center gap-2">
      <Check className={`w-4 h-4 ${premium ? "text-amber-600" : "text-green-600"}`} />
      <span className="text-sm">{text}</span>
    </div>
  )
}
