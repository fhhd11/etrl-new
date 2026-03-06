import React, { useState } from 'react';
import { 
  MessageSquare, 
  Image as ImageIcon, 
  Code2, 
  Bot, 
  Library, 
  Mic, 
  ShieldCheck,
  ChevronRight,
  Sparkles,
  GitMerge,
  FileText,
  Search,
  CheckCircle2,
  MonitorSmartphone,
  BrainCircuit
} from 'lucide-react';

// --- Data based on etrl_chat_features_overview.md ---
const features = [
  {
    id: 'core',
    title: 'Ядро взаимодействия',
    subtitle: 'Умный чат',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    description: 'Основной интерфейс платформы спроектирован для обеспечения максимально естественного и гибкого диалога с ИИ.',
    items: [
      'Единая интеллектуальная модель (ETRL AI)',
      'Ветвление диалогов (Forking)',
      'Редактирование и перегенерация',
      'Богатый текстовый редактор (Markdown)',
      'Копирование и экспорт в один клик'
    ]
  },
  {
    id: 'multimodal',
    title: 'Работа с документами',
    subtitle: 'Мультимодальность',
    icon: <ImageIcon className="w-6 h-6" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    description: 'Система стирает границы между текстовой и визуальной информацией, позволяя ИИ «видеть» и «читать» файлы.',
    items: [
      'Интеллектуальный анализ файлов (PDF, DOCX, CSV)',
      'Chat with Documents (RAG-технология)',
      'Компьютерное зрение (Vision) и OCR',
      'Групповая загрузка (Drag-and-Drop)'
    ]
  },
  {
    id: 'artifacts',
    title: 'Интерактивные Артефакты',
    subtitle: 'ETRL Artifacts',
    icon: <Code2 className="w-6 h-6" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100',
    description: 'Прорывной функционал, превращающий чат в полноценную среду разработки и визуализации.',
    items: [
      'Создание изолированных рабочих областей',
      'Рендеринг веб-интерфейсов (React/HTML/Tailwind)',
      'Генерация диаграмм и блок-схем (Mermaid)',
      'Изолированное редактирование кода с превью'
    ]
  },
  {
    id: 'agents',
    title: 'Специализированные Агенты',
    subtitle: 'Цифровые сотрудники',
    icon: <Bot className="w-6 h-6" />,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Инструмент для автоматизации специфических профессиональных задач с доступом к сети.',
    items: [
      'Каталог готовых Агентов (Юрист, Переводчик и др.)',
      'Конструктор персональных Агентов (Agent Builder)',
      'Персональная База знаний Агента',
      'Подключение инструментов (Web Search, API)'
    ]
  },
  {
    id: 'knowledge',
    title: 'Управление знаниями',
    subtitle: 'Навигация',
    icon: <Library className="w-6 h-6" />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    description: 'Организация рабочего пространства для тех, кто использует платформу ежедневно.',
    items: [
      'Папки и Категории для диалогов',
      'Глобальный интеллектуальный поиск',
      'Закладки (Bookmarks) и Избранное',
      'Библиотека Промптов (Шаблоны)',
      'Публичные ссылки (Share)'
    ]
  },
  {
    id: 'voice',
    title: 'Голосовое взаимодействие',
    subtitle: 'Аудио',
    icon: <Mic className="w-6 h-6" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100',
    description: 'Свобода от клавиатуры для работы на ходу за рулем или в движении.',
    items: [
      'Распознавание речи (Speech-to-Text)',
      'Синтез речи (Text-to-Speech)',
      'Естественные человеческие голоса',
      'Hands-free режим'
    ]
  },
  {
    id: 'security',
    title: 'Персонализация и Безопасность',
    subtitle: 'Enterprise-grade',
    icon: <ShieldCheck className="w-6 h-6" />,
    color: 'text-slate-700',
    bgColor: 'bg-slate-200',
    description: 'Безупречная работа на всех устройствах с максимальным уровнем защиты ваших данных.',
    items: [
      'Мультиплатформенность (Web/PWA)',
      'Долгосрочная память (Memory) с контролем',
      'Кастомизация интерфейса (Темы, Шрифты)',
      'Двухфакторная аутентификация (2FA)',
      'Полный экспорт данных в JSON'
    ]
  }
];

export default function FeaturesOverview() {
  const [activeFeature, setActiveFeature] = useState(features[0].id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight">etrl.chat</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#features" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">Возможности</a>
                <a href="#deepdive" className="text-sm font-medium text-slate-600 hover:text-black transition-colors">Детальный разбор</a>
                <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800 transition-all">
                  Попробовать бесплатно
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-8">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Workspace нового поколения
          </div>
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Ваш персональный <span className="text-blue-600">суперкомпьютер</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Передовая интеллектуальная рабочая среда. Полный арсенал возможностей для решения повседневных и профессиональных задач: от умного чата до создания интерактивных веб-приложений.
          </p>
        </div>
      </section>

      {/* Features Grid Section */}
      <section id="features" className="py-16 bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 md:text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Экосистема возможностей
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Всё необходимое для продуктивной работы в едином интерфейсе.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer"
                onClick={() => {
                  setActiveFeature(feature.id);
                  document.getElementById('deepdive')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <div>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${feature.bgColor} ${feature.color} mb-4`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-sm font-medium text-slate-500 mb-3">{feature.subtitle}</p>
                  <p className="text-sm text-slate-600 line-clamp-3">
                    {feature.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  Подробнее <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Deep Dive Section */}
      <section id="deepdive" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 flex flex-col space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 px-3">
                Модули системы
              </h3>
              {features.map((feature) => (
                <button
                  key={`nav-${feature.id}`}
                  onClick={() => setActiveFeature(feature.id)}
                  className={`flex items-center w-full rounded-xl px-4 py-3 text-left transition-all ${
                    activeFeature === feature.id
                      ? 'bg-white shadow-sm border border-slate-200 text-slate-900 font-medium'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className={`mr-3 flex h-8 w-8 items-center justify-center rounded-lg ${
                    activeFeature === feature.id ? `${feature.bgColor} ${feature.color}` : 'bg-slate-200 text-slate-500'
                  }`}>
                    {feature.icon}
                  </div>
                  {feature.title}
                </button>
              ))}
            </div>

            {/* Content Display */}
            <div className="lg:col-span-8">
              {features.map((feature) => (
                <div 
                  key={`content-${feature.id}`}
                  className={`rounded-3xl border border-slate-200 bg-white p-8 md:p-12 shadow-sm transition-opacity duration-500 ${
                    activeFeature === feature.id ? 'block animate-in fade-in zoom-in-95' : 'hidden'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                    <div>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${feature.bgColor} ${feature.color} mb-4`}>
                        {feature.subtitle}
                      </div>
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">{feature.title}</h2>
                      <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                    <div className={`hidden md:flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl ${feature.bgColor} ${feature.color}`}>
                      {React.cloneElement(feature.icon, { className: 'w-10 h-10' })}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-8">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
                      Ключевые возможности
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {feature.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className={`mr-3 h-5 w-5 shrink-0 ${feature.color}`} />
                          <span className="text-slate-700 leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contextual Illustration / Mockup Space */}
                  <div className="mt-12 rounded-xl bg-slate-50 border border-slate-100 p-6 flex items-center justify-center min-h-[200px]">
                     {feature.id === 'core' && <GitMerge className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'multimodal' && <FileText className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'artifacts' && <MonitorSmartphone className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'agents' && <BrainCircuit className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'knowledge' && <Search className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'voice' && <Mic className="w-16 h-16 text-slate-300" />}
                     {feature.id === 'security' && <ShieldCheck className="w-16 h-16 text-slate-300" />}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Sparkles className="h-5 w-5 text-slate-900" />
            <span className="text-lg font-bold text-slate-900">etrl.chat</span>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} etrl.chat. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}