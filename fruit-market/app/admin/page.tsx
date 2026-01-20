import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card"; // Note: Use your actual Shadcn Card paths

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle2, 
  Users, 
  Apple 
} from "lucide-react";

// This mimics what you'll get from your database later
const STATS = [
  {
    title: "Нийт орлого",
    value: "₮4,500,200",
    description: "Өнгөрсөн сараас +20.1%",
    icon: TrendingUp,
    color: "text-emerald-600",
  },
  {
    title: "Хүргэгдсэн",
    value: "124",
    description: "Өнөөдөр",
    icon: CheckCircle2,
    color: "text-blue-600",
  },
  {
    title: "Хүлээгдэж буй",
    value: "12",
    description: "Бэлтгэгдэж байгаа",
    icon: Clock,
    color: "text-amber-600",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">
      {/* 1 & 2: Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {STATS.map((stat) => (
          <Card key={stat.title} className="rounded-2xl border-none shadow-sm bg-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* 3: Preview of Fruits & Bundles */}
        <Card className="lg:col-span-4 rounded-2xl border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Бараа бүтээгдэхүүн</CardTitle>
                <CardDescription>Хамгийн их борлуулалттай жимснүүд</CardDescription>
              </div>
              <Apple className="text-green-600 h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Нэр</TableHead>
                  <TableHead>Төрөл</TableHead>
                  <TableHead>Үлдэгдэл</TableHead>
                  <TableHead className="text-right">Үнэ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Real data map would go here */}
                <TableRow>
                  <TableCell className="font-medium">Алим (Red Gala)</TableCell>
                  <TableCell><Badge variant="outline">Жимс</Badge></TableCell>
                  <TableCell>45 кг</TableCell>
                  <TableCell className="text-right">₮8,500</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Витамин багц</TableCell>
                  <TableCell><Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Багц</Badge></TableCell>
                  <TableCell>12 ш</TableCell>
                  <TableCell className="text-right">₮45,000</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 4: Preview of Workers */}
        <Card className="lg:col-span-3 rounded-2xl border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Ажилчид</CardTitle>
                <CardDescription>Идэвхтэй ажиллаж буй</CardDescription>
              </div>
              <Users className="text-slate-400 h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Отонжаргал", role: "Админ", status: "Online" },
                { name: "Зулаа", role: "Савлагч", status: "Busy" },
                { name: "Дорж", role: "Жолооч", status: "On Way" },
              ].map((worker, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs">
                      {worker.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{worker.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{worker.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 w-2 rounded-full ${worker.status === 'Online' ? 'bg-green-500' : 'bg-slate-300'}`} />
                    <span className="text-xs text-muted-foreground">{worker.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}