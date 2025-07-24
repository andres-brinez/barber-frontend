import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Scissors, TrendingUp } from "lucide-react"

export function StatsCards() {
  const stats = [
    {
      title: "Total Clientes",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Citas Hoy",
      value: "23",
      change: "+5%",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Servicios Realizados",
      value: "89",
      change: "+18%",
      icon: Scissors,
      color: "text-amber-600",
    },
    {
      title: "Ingresos del Mes",
      value: "$12,450",
      change: "+25%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{stat.change}</span> desde el mes pasado
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
