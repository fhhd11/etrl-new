"use client";

import Link from "next/link";
import { Bot, ArrowRight, Search, FileText, Code2, Mic, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-zinc-950 text-zinc-50 selection:bg-emerald-500/30">
      {/* Header */}
      <header className="px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-md bg-zinc-950/50 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 group" href="/">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
            <img src="/logo.svg" alt="ETRL Logo" className="h-5 w-5" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-zinc-100">ETRL Chat</span>
        </Link>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 flex flex-col items-center justify-center overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10 text-center">
            <motion.div {...fadeIn} className="flex flex-col items-center space-y-8">
              <Badge variant="outline" className="border-emerald-500/30 bg-emerald-500/10 text-emerald-300 py-1.5 px-4 text-sm font-medium backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Мощнейшая модель для логики и программирования
              </Badge>
              
              <div className="space-y-4 max-w-3xl">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500">
                  ETRL Chat: Ваш интеллект на максимум
                </h1>
                <p className="mx-auto max-w-[700px] text-zinc-400 md:text-xl leading-relaxed font-light">
                  Персональная платформа на базе etrl ai с поддержкой анализа документов, веб-поиска и генерации артефактов.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="https://app.etrl.chat" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 px-8 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-lg font-medium shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)] transition-all">
                    Запустить чат
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Glass Panel Visual Element */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-16 mx-auto max-w-4xl w-full"
            >
              <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-zinc-950/50">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="p-6 sm:p-8 space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <Bot className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="space-y-3 flex-1">
                      <div className="h-4 bg-zinc-800 rounded w-1/4" />
                      <div className="h-4 bg-zinc-800 rounded w-full" />
                      <div className="h-4 bg-zinc-800 rounded w-5/6" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="w-full py-20 bg-zinc-950 border-t border-white/5 relative">
          <div className="container px-4 md:px-6">
            <motion.div {...fadeIn} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-100">
                Возможности платформы
              </h2>
              <p className="max-w-[700px] text-zinc-400 md:text-lg">
                Все необходимые инструменты для работы, программирования и творчества в одном месте.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
                <Card className="bg-zinc-900/40 border-white/5 hover:border-emerald-500/30 transition-colors h-full backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    <CardTitle className="text-zinc-100">Умный поиск (Web Search)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-zinc-400">
                    Доступ к актуальной информации в реальном времени. ИИ анализирует интернет для предоставления точных ответов.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <Card className="bg-zinc-900/40 border-white/5 hover:border-emerald-500/30 transition-colors h-full backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-zinc-100">Работа с файлами (RAG)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-zinc-400">
                    Загружайте PDF и документы. ИИ проанализирует их содержимое и точно ответит на любые вопросы по тексту.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
                <Card className="bg-zinc-900/40 border-white/5 hover:border-emerald-500/30 transition-colors h-full backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                      <Code2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <CardTitle className="text-zinc-100">Артефакты (Artifacts)</CardTitle>
                  </CardHeader>
                  <CardContent className="text-zinc-400">
                    Создавайте код, сайты и графику, просматривая и редактируя результат в реальном времени прямо в чате.
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div {...fadeIn} transition={{ delay: 0.4 }}>
                <Card className="bg-zinc-900/40 border-white/5 hover:border-emerald-500/30 transition-colors h-full backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                      <Mic className="w-6 h-6 text-orange-400" />
                    </div>
                    <CardTitle className="text-zinc-100">Зрение и Голос</CardTitle>
                  </CardHeader>
                  <CardContent className="text-zinc-400">
                    Анализируйте изображения и свободно общайтесь с ассистентом с помощью встроенных функций TTS/STT.
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="w-full py-20 bg-zinc-950/50 border-t border-white/5">
          <div className="container px-4 md:px-6">
            <motion.div {...fadeIn} className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-zinc-100">
                Тарифы
              </h2>
              <p className="max-w-[600px] text-zinc-400 md:text-lg">
                Выберите план, который подходит именно вам.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <motion.div 
                {...fadeIn} 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="bg-zinc-900/30 border-white/5 h-full flex flex-col backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-zinc-100">Бесплатный</CardTitle>
                    <CardDescription className="text-zinc-400">Для старта и знакомства с ИИ</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>Базовые лимиты использования</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>Ежедневное пополнение токенов</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>Стандартный приоритет</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pro Plan */}
              <motion.div 
                {...fadeIn} 
                whileHover={{ scale: 1.02 }} 
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <Card className="bg-gradient-to-b from-emerald-900/20 to-zinc-900/40 border-emerald-500/30 h-full flex flex-col relative overflow-hidden backdrop-blur-sm shadow-[0_0_30px_-15px_rgba(16,185,129,0.3)]">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-emerald-500 text-xs font-bold text-white rounded-bl-lg">
                    РЕКОМЕНДУЕМ
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-zinc-100">PRO</CardTitle>
                    <CardDescription className="text-zinc-400">Максимум возможностей для профи</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <ul className="space-y-3 text-zinc-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="font-medium text-white">Безлимитные токены</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>Высокий приоритет обработки</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span>До 100 сообщений в час</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link href="https://app.etrl.chat" className="w-full">
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white">
                        Перейти в приложение
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 w-full shrink-0 items-center px-6 border-t border-white/5 bg-zinc-950">
        <p className="text-xs text-zinc-500 text-center">
          {new Date().getFullYear()} ETRL Chat. Все права защищены.
        </p>
      </footer>
    </div>
  );
}
