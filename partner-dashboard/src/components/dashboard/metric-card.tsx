import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MetricCardProps = {
  title: string;
  value: string;
  hint: string;
};

export function MetricCard({ title, value, hint }: MetricCardProps) {
  return (
    <Card className="h-full border-white/8 bg-zinc-900/50">
      <CardHeader className="space-y-3">
        <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="bg-gradient-to-br from-white via-zinc-100 to-zinc-500 bg-clip-text text-3xl font-semibold tracking-tight text-transparent sm:text-4xl">
          {value}
        </p>
        <p className="text-sm text-zinc-500">{hint}</p>
      </CardContent>
    </Card>
  );
}
