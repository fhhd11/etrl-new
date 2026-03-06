"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartPoint } from "@/lib/types";

type LineChartCardProps = {
  title: string;
  description: string;
  color: string;
  data: ChartPoint[];
  formatMode?: "number" | "currency";
};

const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 2,
});

function formatValue(value: number, formatMode: "number" | "currency") {
  if (formatMode === "currency") {
    return currencyFormatter.format(value);
  }

  return value.toString();
}

export function LineChartCard({
  title,
  description,
  color,
  data,
  formatMode = "number",
}: LineChartCardProps) {
  const formatTick = (value: string | number) => formatValue(Number(value ?? 0), formatMode);

  return (
    <Card className="overflow-hidden border-white/8 bg-zinc-900/50">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center rounded-2xl border border-dashed border-white/10 bg-zinc-950/70 text-center text-sm text-zinc-500">
            Пока нет данных для отображения.
          </div>
        ) : (
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" vertical={false} />
                <XAxis
                  dataKey="date"
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  minTickGap={24}
                />
                <YAxis
                  tick={{ fill: "#71717a", fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  width={52}
                  tickFormatter={formatTick}
                />
                <Tooltip
                  formatter={(value) => formatValue(Number(value ?? 0), formatMode)}
                  labelStyle={{ color: "#fafafa" }}
                  contentStyle={{
                    borderRadius: 16,
                    borderColor: "rgba(255,255,255,0.08)",
                    backgroundColor: "rgba(24,24,27,0.92)",
                    color: "#fafafa",
                    boxShadow: "0 25px 120px -50px rgba(16,185,129,0.3)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={color}
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
