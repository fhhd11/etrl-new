"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  FileText,
  GitMerge,
  Library,
  MessageSquare,
  Mic,
  Search,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const APP_URL = "https://app.etrl.chat";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55 },
};

type Feature = {
  id: string;
  label: string;
  title: string;
  description: string;
  note: string;
  icon: LucideIcon;
  tone: string;
  badge: string;
  items: string[];
};

type UseCase = {
  title: string;
  description: string;
  icon: LucideIcon;
  tone: string;
  items: string[];
};

const heroSignals = ["Логика", "Код", "Документы", "Web Search", "Артефакты", "Агенты"];

const features: Feature[] = [
  {
    id: "chat",
    label: "Умный чат",
    title: "Единая AI-среда вместо набора разрозненных нейросетей",
    description: "ETRL AI ведёт длинные рабочие диалоги, держит контекст и помогает быстро двигаться от идеи к результату.",
    note: "Подходит для задач, где важны логика, качество формулировок и сохранение контекста.",
    icon: MessageSquare,
    tone: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20",
    badge: "border-blue-500/20 bg-blue-500/10 text-blue-300",
    items: ["ETRL AI", "Форки диалогов", "Редактирование и перегенерация", "Markdown и код"],
  },
  {
    id: "docs",
    label: "Документы и RAG",
    title: "Анализ файлов, цитат и визуальных данных в одном потоке",
    description: "Платформа читает PDF, DOCX, CSV, изображения и скриншоты, извлекая факты и отвечая по содержимому.",
    note: "Полезно для summary, поиска конкретных фрагментов и работы с большими файлами.",
    icon: FileText,
    tone: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
    items: ["PDF, DOCX, CSV, XLSX", "Chat with Documents", "Цитирование и summary", "OCR и vision"],
  },
  {
    id: "artifacts",
    label: "ETRL Artifacts",
    title: "Чат, который умеет открывать рабочий результат рядом с диалогом",
    description: "Когда задача требует интерфейса, кода или схемы, ETRL Chat показывает результат в отдельном артефакте с превью.",
    note: "Это превращает чат в среду прототипирования, разработки и визуализации.",
    icon: Code2,
    tone: "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20",
    badge: "border-purple-500/20 bg-purple-500/10 text-purple-300",
    items: ["React и Tailwind", "Live preview", "Диаграммы и схемы", "Редактирование кода"],
  },
  {
    id: "agents",
    label: "Агенты",
    title: "Цифровые сотрудники с ролью, знаниями и инструментами",
    description: "Можно выбирать готовых агентов или собирать своих — с инструкциями, файлами, web search и API.",
    note: "Хорошо работает для повторяемых процессов и специализированных задач.",
    icon: BrainCircuit,
    tone: "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20",
    badge: "border-orange-500/20 bg-orange-500/10 text-orange-300",
    items: ["Каталог агентов", "Agent Builder", "База знаний", "Инструменты и API"],
  },
  {
    id: "knowledge",
    label: "Навигация",
    title: "Организация диалогов и знаний без хаоса",
    description: "ETRL Chat рассчитан на ежедневную работу: папки, поиск, шаблоны, закладки и share-ссылки встроены в поток.",
    note: "Особенно важно, если вы работаете с множеством тем, проектов и историй диалогов.",
    icon: Library,
    tone: "bg-cyan-500/10 text-cyan-400 ring-1 ring-cyan-500/20",
    badge: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
    items: ["Папки и категории", "Глобальный поиск", "Bookmarks", "Prompt library"],
  },
  {
    id: "voice",
    label: "Голос и зрение",
    title: "Мультимодальная работа без ограничений по формату",
    description: "Платформа понимает голос, озвучивает ответы и анализирует изображения, фото и графики.",
    note: "Удобно для mobile-first сценариев, hands-free работы и визуального разбора материалов.",
    icon: Mic,
    tone: "bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20",
    badge: "border-rose-500/20 bg-rose-500/10 text-rose-300",
    items: ["Speech-to-Text", "Text-to-Speech", "Hands-free", "Vision-анализ"],
  },
  {
    id: "security",
    label: "Безопасность",
    title: "Память, персонализация и контроль над данными",
    description: "ETRL Chat адаптируется под пользователя и при этом оставляет ему контроль над приватностью, экспортом и безопасностью.",
    note: "Система рассчитана на регулярную работу, а не на разовый запрос в чат.",
    icon: ShieldCheck,
    tone: "bg-zinc-500/10 text-zinc-300 ring-1 ring-white/10",
    badge: "border-white/10 bg-white/5 text-zinc-300",
    items: ["Контролируемая память", "Web/PWA", "Настройка интерфейса", "2FA и экспорт"],
  },
];

const useCases: UseCase[] = [
  {
    title: "Разработка и отладка",
    description: "Логика, код, рефакторинг и UI-итерации в одном рабочем пространстве.",
    icon: Code2,
    tone: "bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20",
    items: ["Архитектура и stack trace", "Компоненты и экраны", "Быстрое улучшение UX"],
  },
  {
    title: "Документы и аналитика",
    description: "Большие файлы превращаются в summary, ответы и конкретные выводы.",
    icon: Search,
    tone: "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20",
    items: ["Поиск по документам", "Цитаты и факты", "Ответы по нескольким файлам"],
  },
  {
    title: "Прототипы и артефакты",
    description: "Создавайте интерфейсы, схемы и внутренние инструменты рядом с чатом.",
    icon: GitMerge,
    tone: "bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20",
    items: ["Лендинги и панели", "Диаграммы процессов", "Живое превью"],
  },
  {
    title: "Агентные workflows",
    description: "Подключайте знания и инструменты к агентам под конкретные роли и процессы.",
    icon: BrainCircuit,
    tone: "bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20",
    items: ["Ролевые агенты", "Web Search и API", "Переиспользуемые шаблоны"],
  },
];

const plans = [
  {
    name: "Бесплатный",
    description: "Для старта и ежедневной базовой работы.",
    tone: "border-white/5 bg-zinc-900/30",
    items: ["Ежедневное пополнение токенов", "Базовые лимиты", "Ключевые сценарии ETRL Chat"],
  },
  {
    name: "PRO",
    description: "Для интенсивной работы с максимальным приоритетом.",
    tone: "border-emerald-500/20 bg-zinc-900/40 shadow-[0_0_30px_-20px_rgba(16,185,129,0.35)]",
    items: ["Безлимитные токены", "Высокий приоритет", "До 100 сообщений в час"],
  },
];

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);
  const currentFeature = features.find((feature) => feature.id === activeFeature) ?? features[0];
  const CurrentIcon = currentFeature.icon;

  return (
    <div className="flex min-h-[100dvh] flex-col bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
      <header className="sticky top-0 z-50 flex h-16 items-center border-b border-white/10 bg-zinc-950/70 px-6 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center">
          <Link className="group flex items-center gap-2" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
              <Image src="/logo.svg" alt="ETRL Logo" width={20} height={20} className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-zinc-100">ETRL Chat</span>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden py-20 md:py-28">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/20 blur-[140px]" />
          <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[120px]" />

          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <motion.div {...fadeIn} className="mx-auto max-w-5xl text-center">
              <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300 backdrop-blur-sm">
                <Sparkles className="mr-2 h-4 w-4" />
                AI Workspace нового поколения
              </Badge>

              <h1 className="mt-8 bg-gradient-to-br from-white via-zinc-100 to-zinc-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
                ETRL Chat — AI Workspace для логики, кода и рабочих задач
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-zinc-400 md:text-xl">
                Платформа на базе ETRL AI объединяет умный чат, анализ документов, web search, артефакты и агентные сценарии в единой среде — с фокусом на скорость, глубину и качество результата.
              </p>

              <div className="mt-8">
                <Button asChild size="lg" className="h-14 rounded-full bg-emerald-600 px-8 text-lg text-white shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] hover:bg-emerald-500">
                  <Link href={APP_URL}>
                    Запустить чат
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2.5">
                {heroSignals.map((signal) => (
                  <span key={signal} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 backdrop-blur-sm">
                    {signal}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeIn} className="mx-auto mt-14 max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900/50 shadow-[0_25px_120px_-50px_rgba(16,185,129,0.45)] backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/5 bg-zinc-950/60 px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-green-500/80" />
              </div>

              <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
                <div className="space-y-4 text-left">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-sm font-medium text-zinc-100">ETRL AI</span>
                        <span className="text-xs text-zinc-500">logic • code • research</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-zinc-300">
                        Соберу интерфейс, проанализирую документы, найду актуальный контекст и открою артефакт с превью прямо рядом с чатом.
                      </p>
                    </div>
                  </div>

                  <div className="ml-auto max-w-[92%] rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm leading-6 text-emerald-50">
                    Нужен premium-лендинг: сильный hero, карта возможностей, сценарии применения и спокойный pricing без перегруза.
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      { icon: Search, title: "Поиск", text: "Актуальная информация из сети" },
                      { icon: FileText, title: "Документы", text: "Файлы, цитаты и summary" },
                      { icon: Code2, title: "Артефакты", text: "Код, UI и live preview" },
                    ].map((item) => {
                      const Icon = item.icon;

                      return (
                        <div key={item.title} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
                          <div className="flex items-center gap-2 text-zinc-200">
                            <Icon className="h-4 w-4 text-emerald-400" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-zinc-500">{item.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-zinc-950/70 p-4 text-left">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-zinc-100">Artifact Preview</p>
                      <p className="text-xs text-zinc-500">React • Tailwind • Live</p>
                    </div>
                    <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">live</span>
                  </div>
                  <div className="mt-4 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-4">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="h-3 w-24 rounded bg-zinc-700" />
                      <div className="mt-3 grid gap-2">
                        <div className="h-2 rounded bg-zinc-800" />
                        <div className="h-2 w-11/12 rounded bg-zinc-800" />
                        <div className="h-2 w-9/12 rounded bg-zinc-800" />
                      </div>
                      <div className="mt-4 flex gap-2">
                        <div className="h-8 w-24 rounded-lg bg-emerald-500/20" />
                        <div className="h-8 w-20 rounded-lg bg-zinc-800" />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
                        <div className="space-y-2">
                          <div className="h-2 w-16 rounded bg-zinc-700" />
                          <div className="h-2 rounded bg-zinc-800" />
                          <div className="h-2 w-10/12 rounded bg-zinc-800" />
                        </div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-zinc-950/80 p-4">
                        <div className="flex flex-wrap gap-2">
                          {["Vision", "OCR", "TTS", "Agents"].map((tool) => (
                            <span key={tool} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <div className="mt-4 h-20 rounded-xl bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fadeIn} className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Экосистема возможностей для ежедневной работы</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                ETRL Chat соединяет ключевые модули в один продуктовый слой: от диалога и документов до артефактов, агентов и безопасного хранения контекста.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.05 }}
                    whileHover={{ y: -4, scale: 1.01 }}
                  >
                    <Card className="h-full border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                      <CardHeader>
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tone}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className={`w-fit px-2.5 py-1 text-xs ${feature.badge}`}>{feature.label}</Badge>
                        <CardTitle className="pt-1 text-xl text-zinc-100">{feature.title}</CardTitle>
                        <CardDescription className="text-sm leading-6 text-zinc-400">{feature.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-2 pt-0">
                        {feature.items.slice(0, 2).map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">{item}</span>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950/70 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fadeIn} className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Подробный разбор модулей</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                На десктопе — быстрый переключатель. На мобильных — последовательный стек без лишней сложности.
              </p>
            </motion.div>

            <div className="grid gap-4 lg:hidden">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <Card key={feature.id} className="border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                    <CardHeader>
                      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${feature.tone}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="outline" className={`w-fit px-2.5 py-1 text-xs ${feature.badge}`}>{feature.label}</Badge>
                      <CardTitle className="pt-1 text-xl text-zinc-100">{feature.title}</CardTitle>
                      <CardDescription className="text-sm leading-6 text-zinc-400">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-0">
                      <p className="text-sm leading-6 text-zinc-300">{feature.note}</p>
                      {feature.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-zinc-950/50 p-3">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                          <span className="text-sm leading-6 text-zinc-300">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="hidden gap-8 lg:grid lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="space-y-2">
                {features.map((feature) => {
                  const Icon = feature.icon;
                  const isActive = feature.id === activeFeature;

                  return (
                    <button
                      key={feature.id}
                      type="button"
                      onClick={() => setActiveFeature(feature.id)}
                      className={`w-full rounded-2xl border px-4 py-4 text-left transition-all ${
                        isActive
                          ? "border-emerald-500/25 bg-white/5 shadow-[0_0_30px_-20px_rgba(16,185,129,0.35)]"
                          : "border-white/5 bg-zinc-900/30 hover:border-white/10 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${feature.tone}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-100">{feature.label}</p>
                          <p className="mt-1 text-sm leading-5 text-zinc-500">{feature.title}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <motion.div key={currentFeature.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Card className="border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                  <CardHeader className="border-b border-white/5">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                      <div className="max-w-3xl">
                        <Badge variant="outline" className={`w-fit px-2.5 py-1 text-xs ${currentFeature.badge}`}>{currentFeature.label}</Badge>
                        <CardTitle className="pt-3 text-3xl leading-tight text-zinc-100">{currentFeature.title}</CardTitle>
                        <CardDescription className="pt-3 text-base leading-7 text-zinc-400">{currentFeature.description}</CardDescription>
                      </div>
                      <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${currentFeature.tone}`}>
                        <CurrentIcon className="h-8 w-8" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6 pt-6 xl:grid-cols-[1.2fr_0.8fr]">
                    <div className="grid gap-4 md:grid-cols-2">
                      {currentFeature.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/5 bg-zinc-950/50 p-4">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                          <span className="text-sm leading-6 text-zinc-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-5">
                      <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">Что это даёт</p>
                      <p className="mt-4 text-sm leading-7 text-zinc-300">{currentFeature.note}</p>
                      <div className="mt-6 grid gap-3">
                        {["Единая среда", "Высокая скорость", "Контекст без переключений"].map((value) => (
                          <div key={value} className="rounded-2xl border border-white/5 bg-zinc-950/60 px-4 py-3 text-sm text-zinc-200">{value}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fadeIn} className="mx-auto mb-12 max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Сценарии, в которых ETRL Chat особенно силён</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                Не просто список фич, а реальные рабочие ситуации, где платформа даёт выигрыш по скорости, качеству и концентрации.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 xl:grid-cols-4">
              {useCases.map((useCase, index) => {
                const Icon = useCase.icon;

                return (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <Card className="h-full border-white/5 bg-zinc-900/40 backdrop-blur-sm">
                      <CardHeader>
                        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${useCase.tone}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <CardTitle className="text-xl text-zinc-100">{useCase.title}</CardTitle>
                        <CardDescription className="text-sm leading-6 text-zinc-400">{useCase.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="grid gap-3 pt-0">
                        {useCase.items.map((item) => (
                          <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                            <span className="leading-6">{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950/60 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fadeIn} className="mx-auto mb-10 max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">Режимы работы</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
                Тарифы остаются частью продукта, но не спорят с главным: ценность ETRL Chat раскрывается внутри реальных задач.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              {plans.map((plan) => (
                <motion.div key={plan.name} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                  <Card className={`h-full backdrop-blur-sm ${plan.tone}`}>
                    <CardHeader>
                      <CardTitle className="text-2xl text-zinc-100">{plan.name}</CardTitle>
                      <CardDescription className="text-sm leading-6 text-zinc-400">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      {plan.items.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                          <span className="leading-6">{item}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-center text-sm leading-6 text-zinc-500">
              Активация и управление тарифом происходят внутри приложения после входа в чат.
            </p>
          </div>
        </section>

        <section className="border-t border-white/5 bg-zinc-950 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <motion.div {...fadeIn}>
              <Card className="mx-auto max-w-5xl border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900/70 to-zinc-950 shadow-[0_0_60px_-30px_rgba(16,185,129,0.35)] backdrop-blur-sm">
                <CardContent className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                      ETRL AI Workspace
                    </Badge>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                      Откройте рабочую среду, где чат превращается в инструмент результата
                    </h2>
                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
                      Если вам нужен не просто чат-бот, а интеллектуальное пространство для анализа, кода, документов, артефактов и агентных сценариев — ETRL Chat уже готов к работе.
                    </p>
                  </div>
                  <div>
                    <Button asChild size="lg" className="h-14 rounded-full bg-emerald-600 px-8 text-lg text-white hover:bg-emerald-500">
                      <Link href={APP_URL}>
                        Перейти в приложение
                        <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-zinc-950 px-6 py-6">
        <p className="text-center text-xs text-zinc-500">{new Date().getFullYear()} ETRL Chat. Все права защищены.</p>
      </footer>
    </div>
  );
}
