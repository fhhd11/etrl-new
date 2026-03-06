from pathlib import Path

LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAA+CAYAAABzwahEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAOdEVYdFNvZnR3YXJlAEZpZ21hnrGWYwAABSlJREFUeAHlW+1x4zYQXdry19g/3EF4FSTpgKkgdgVRKog7OKeC81VgpYJzKrCuAssVWKnAyoxn/G3lPQbQURQIAiRBwcmboSmDILAPu1gsFpJIh3h4eDh5enqa39/fZ/J/wvPz8yWJ47qUiABFpJDtI+8SAiB8q4hHofX5fH74+Ph4WpDrXLoGO9GkeaHDG1kTDITz6+7u7gfpGjClrNiJun6RnoE+h7huyrJgID5KCKDx3wyd9aZ1DnzBx9TKsSEdIUmS1FQWWuuaMMybV2aq8/b29lO5bAOjcdSRcMb5A2FOJQDooSH7Fxth3f/e3t505UHRHF5eXn6Whig7klBzveC45nWXbarR1Mf8QLOESVzQ5fuudxQGt0PL81NpCU0YZn0DWV0c1cxk4hobwFmpbIiyS0Zh4ghYinWZaDvX6akLhA9d3gFps4lrmTiSbNTUIJ5N8ez44OBgIhaA+BE6+mKrw7Z2dnY+6P/1mmprm44L732SCv9hwWh7e/tXW4UNjOIM18j0kJpCA1d15g/hvpcaFLXOttDuJdtW02QJRU8tnqQ5wK+vr7/X1cuXM2jsz5p6uflbzNVJOM51riKbm5sklBOGkAuH6uqpbcAAW018UU9/AKkrcSDAEaXTKDYO7VBzjcJBvHdBs0T/J45Oy4ZaE9dYEOfuxdP7jmhSHAAuHbJmmBRiQ1J4kU7uVjzAzugjxN/5dA7IcgzneeFafxGyKgJj8YAKU9dOGjjzIU0sxeqGNT160Oq2trZqvXgZS8Thbb/iNpN3BM5rZa1eWCJuW9NjROUGxAFJuYApI7XORo1yJOiLlf04RnCM20Qih20D4gJjIgLm7uUh+0YbE9dIKhr2XtN7xBjRWSttE1Ua917T+0JXS25S9YDZGCYmJDLQqYE8fdAE8l1DSVNYgLdPSiwdVO7TI8VEWeoEsucDMhgMJlVrfGJrCcQ/oRHnTEykYGySW4jaW1wj0htbiVvW9JlUR3i2/NtUqpFKTwDxNKmrZNin13pVdUY1LJZhPp7s7u5+rnqHSQgMMvsKPbVy+WsPFLpa0znvbM8xKKH3CGNwybTSrMTp4KCp8rYzs52EqtzcsFwObVqzK8zASBhtLwjDxL/qQiPxUg77qPwcy8m5iTwzp5Y4P2M+zZS0ZF8dpJ2WQEeG27BMWGNljjOfDmJO+WsIO5ZvgU7mkiBUnpVamLIP/D+UDjWt2j8F4T9s9RbEmf3EC8xhp/IO4UpYIyfeINEYE2aQ/QyEP/skJAb8g2zp3zBveWdoRFhjaY6joe8Qo6doiN48v6MsxaNM4pkCrQhr1AYwBL/tgFsUiUjI8mPdWZ4LXO07mngdmu7krL2WOI9oJS5Pf8J1X1qibpOSqoAklcjge3JShlXjIE0TTyVCwLGdt/neWqXGlbbX9iU9F/geFBZRqfG6TUUM4Nkd5Gz0Nc2BqRAOjSY0lPVjorfFKp5IVXnx81QawGjq/EqkRDC3EVF+aJs/r8KKqUe0fI1DkSZMpt50bk/lWy4uk/YY+4gczvbtKH8AAAAASUVORK5CYII="

def page_class(index: int) -> str:
    mapping = {
        1: "page-intro",
        6: "page-partner",
    }
    return mapping.get(index, "")

STYLE = """
:root{--bg:#09090b;--panel:#151518;--panel2:#18181c;--line:rgba(255,255,255,.08);--text:#f4f4f5;--muted:#a1a1aa;--muted2:#71717a}
*{box-sizing:border-box}html,body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,Arial,Helvetica,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}.deck{width:297mm;margin:0 auto;background:var(--bg)}
.page{position:relative;width:297mm;height:210mm;overflow:hidden;page-break-after:always;break-after:page;background:radial-gradient(circle at 12% 12%, rgba(16,185,129,.12), transparent 22%),radial-gradient(circle at 88% 10%, rgba(59,130,246,.12), transparent 22%),linear-gradient(180deg,#09090b 0%,#0d0d11 100%)}.page:last-child{page-break-after:auto;break-after:auto}
.inner{width:100%;height:100%;padding:14mm 15mm 20mm;position:relative}.content{padding-bottom:12mm}.chrome{display:flex;justify-content:space-between;align-items:center;gap:12mm;margin-bottom:10mm}.brand{display:flex;align-items:center;gap:4mm}.brand-mark{width:11mm;height:11mm;border-radius:3.5mm;display:flex;align-items:center;justify-content:center;overflow:visible;background:rgba(16,185,129,.12);border:.3mm solid rgba(16,185,129,.28)}.brand-mark img{width:6.5mm;height:6.5mm;display:block;object-fit:contain}.brand-copy h1{margin:0;font-size:5.2mm;line-height:1.05;letter-spacing:-.03em}.brand-copy p,.page-note,.eyebrow,.body,.caption,.bullet-list,.mini{color:var(--muted)}.brand-copy p,.page-note{margin:.8mm 0 0;font-size:2.8mm}.page-note{max-width:78mm;text-align:right;line-height:1.45}
.index{display:inline-block;padding:2.1mm 3.6mm;border-radius:999px;border:.3mm solid rgba(16,185,129,.32);background:rgba(16,185,129,.1);color:#bbf7d0;font-size:2.8mm;font-weight:700;letter-spacing:.08em;text-transform:uppercase}.eyebrow{margin:5mm 0 0;font-size:2.9mm;letter-spacing:.14em;text-transform:uppercase}.hero-title,.title{margin:5mm 0 0;letter-spacing:-.05em;line-height:.95}.hero-title{max-width:240mm;font-size:18.5mm;color:#f7f7f8}.title{max-width:220mm;font-size:12.6mm;color:#f7f7f8}.hero-subtitle,.subtitle{margin:5mm 0 0;max-width:220mm;font-size:4.6mm;line-height:1.5;color:#c9c9cf}
.grid-2,.grid-3,.grid-4,.metrics,.timeline,.footer-grid{display:grid;gap:4mm}.grid-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-4{grid-template-columns:repeat(4,minmax(0,1fr))}.metrics{grid-template-columns:repeat(4,minmax(0,1fr))}.timeline{grid-template-columns:repeat(4,minmax(0,1fr))}.footer-grid{grid-template-columns:1.25fr .75fr}.mt-8{margin-top:8mm}.mt-10{margin-top:10mm}
.card,.metric,.quote,.matrix,.footer-card{background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.01));border:.3mm solid var(--line);border-radius:5mm}.card,.quote,.footer-card{padding:5mm}.metric{padding:4.5mm}.badge{display:inline-block;padding:1.6mm 2.8mm;border-radius:999px;font-size:2.7mm;font-weight:700}.green{background:rgba(16,185,129,.14);color:#bbf7d0;border:.3mm solid rgba(16,185,129,.22)}.blue{background:rgba(59,130,246,.14);color:#bfdbfe;border:.3mm solid rgba(59,130,246,.22)}.violet{background:rgba(139,92,246,.14);color:#ddd6fe;border:.3mm solid rgba(139,92,246,.22)}.orange{background:rgba(245,158,11,.14);color:#fde68a;border:.3mm solid rgba(245,158,11,.22)}.cyan{background:rgba(6,182,212,.14);color:#a5f3fc;border:.3mm solid rgba(6,182,212,.22)}
.card h3,.footer-card h3{margin:3.2mm 0 0;font-size:5.7mm;line-height:1.18;letter-spacing:-.03em}.body,.bullet-list,.mini{font-size:3.4mm;line-height:1.5}.body{margin:3mm 0 0}.metric-value{display:block;font-size:8.5mm;font-weight:700;letter-spacing:-.05em;color:#fafafa}.caption{display:block;margin-top:1.8mm;font-size:3mm;line-height:1.45}.bullet-list{margin:3mm 0 0;padding-left:4.6mm}.bullet-list li+li{margin-top:1.8mm}.hero-grid{display:grid;grid-template-columns:1.12fr .88fr;gap:4mm;margin-top:8mm}.chips{display:flex;flex-wrap:wrap;gap:2.2mm;margin-top:4mm}.chip{padding:1.7mm 2.6mm;border-radius:999px;border:.3mm solid var(--line);background:rgba(255,255,255,.04);color:#d4d4d8;font-size:2.8mm}.quote{margin-top:8mm}.quote p{margin:0;font-size:5.4mm;line-height:1.38;letter-spacing:-.03em;color:#fafafa}.quote .source{margin-top:3mm;font-size:3mm;color:var(--muted2)}
.page-intro .content{padding-bottom:16mm}.page-intro .chrome{margin-bottom:4mm}.page-intro .brand{align-items:center}.page-intro .brand-mark{width:12.4mm;height:12.4mm;align-items:center;justify-content:center;padding:1.2mm}.page-intro .brand-mark img{display:block;width:6.1mm;height:6.1mm;transform:translateY(-0.2mm)}.page-intro .eyebrow{margin-top:4mm}.page-intro .hero-title{font-size:15.2mm;margin-top:4mm;max-width:220mm}.page-intro .hero-subtitle{font-size:3.8mm;line-height:1.34;margin-top:3mm;max-width:206mm}.page-intro .hero-grid{margin-top:4.5mm;gap:2.6mm}.page-intro .card,.page-intro .quote{padding:3.4mm}.page-intro .card h3{font-size:4.9mm;margin-top:2.4mm}.page-intro .body{font-size:3.05mm;line-height:1.38;margin-top:2.2mm}.page-intro .metrics{gap:2.4mm}.page-intro .metric{padding:3.1mm}.page-intro .metric-value{font-size:6.4mm}.page-intro .caption{font-size:2.55mm;line-height:1.28}.page-intro .chips{margin-top:2.4mm;gap:1.5mm}.page-intro .chip{font-size:2.3mm;padding:1.2mm 1.9mm}.page-intro .quote{margin-top:4mm}.page-intro .quote p{font-size:4mm;line-height:1.24}.page-intro .quote .source{margin-top:1.6mm;font-size:2.5mm}
.page-partner .title{font-size:11.6mm}.page-partner .subtitle{font-size:4.1mm;line-height:1.4;max-width:214mm}.page-partner .grid-3,.page-partner .grid-2{gap:3mm}.page-partner .mt-8{margin-top:6mm}.page-partner .card{padding:4mm}.page-partner .card h3{font-size:5.1mm;margin-top:2.6mm}.page-partner .body{font-size:3.1mm;line-height:1.42;margin-top:2.4mm}.page-partner .badge{font-size:2.5mm;padding:1.4mm 2.4mm}
.matrix{display:grid;grid-template-columns:1.1fr repeat(3,1fr);gap:.3mm;padding:.3mm;overflow:hidden}.cell{background:var(--panel2);padding:3.3mm;font-size:3mm;line-height:1.4;color:#d4d4d8}.head{font-weight:700;color:#fafafa}.accent{color:#bbf7d0}.bottom-bar{position:absolute;left:15mm;right:15mm;bottom:8mm;display:flex;justify-content:space-between;align-items:center;gap:6mm;color:var(--muted2);font-size:2.8mm}.link-pill{display:inline-block;padding:2.2mm 3.6mm;border-radius:999px;background:rgba(16,185,129,.14);border:.3mm solid rgba(16,185,129,.22);color:#ecfdf5}@page{size:A4 landscape;margin:0}
"""

PAGES = [
    {
        "index": "01 / Introduction",
        "eyebrow": "AI Workspace нового поколения",
        "title": "ETRL Chat — платформа, которая превращает AI-диалог в рабочую инфраструктуру результата.",
        "subtitle": "ETRL Chat объединяет умный чат, документы, web search, live-артефакты, агентные сценарии и управляемую память в одной среде. Это не интерфейс к LLM, а операционный слой для знаний, логики, кода и процессов.",
        "body": "<div class='chrome'><div class='brand'><div class='brand-mark'><img src='" + LOGO + "' alt='logo' /></div><div class='brand-copy'><h1>ETRL Chat</h1><p>Strategic Partner Presentation</p></div></div><div class='page-note'>Премиальная презентация проекта для стратегических партнеров, продуктовых интеграторов и корпоративных экосистем.</div></div><div class='hero-grid'><div class='card'><div class='badge green'>Почему это важно</div><h3>Рынок устал от разрозненных AI-инструментов и ищет единый слой продуктивности.</h3><div class='body'>Команды переключаются между чатами, файлами, браузером, IDE и внутренними знаниями. ETRL Chat сокращает этот разрыв и соединяет контекст, анализ, генерацию и исполнение в одном UX.</div><div class='chips'><div class='chip'>Long-context</div><div class='chip'>Документы + код</div><div class='chip'>Artifacts</div><div class='chip'>Agents</div><div class='chip'>Memory</div></div></div><div class='metrics'><div class='metric'><span class='metric-value'>1</span><span class='caption'>единая среда вместо набора несвязанных AI-сервисов</span></div><div class='metric'><span class='metric-value'>6+</span><span class='caption'>ключевых продуктовых слоёв в одном опыте пользователя</span></div><div class='metric'><span class='metric-value'>B2C → B2B</span><span class='caption'>архитектура подходит и для частного, и для корпоративного сегмента</span></div><div class='metric'><span class='metric-value'>24/7</span><span class='caption'>формат цифрового рабочего пространства, а не разовых запросов</span></div></div></div><div class='quote'><p>“ETRL Chat создаёт рабочий интерфейс, где AI не просто отвечает, а помогает анализировать, создавать, структурировать и доводить задачи до результата.”</p><div class='source'>Позиционирование продукта для стратегических партнеров</div></div>",
        "footer": "ETRL Chat — AI Workspace",
    },
    {
        "index": "02 / Market Problem",
        "eyebrow": "Проблема рынка",
        "title": "Главный разрыв: AI умеет генерировать, но редко встроен в реальную рабочую систему.",
        "subtitle": "Сегодня пользователь получает чат отдельно, документы отдельно, агентов отдельно, код отдельно. В итоге AI помогает точечно, но не становится ежедневной продуктивной средой.",
        "body": "<div class='metrics mt-8'><div class='metric'><span class='metric-value'>Контекст</span><span class='caption'>теряется между окнами, чатами и файлами</span></div><div class='metric'><span class='metric-value'>Результат</span><span class='caption'>остаётся ответом, а не рабочим артефактом</span></div><div class='metric'><span class='metric-value'>Данные</span><span class='caption'>не превращаются в долговременную базу знаний</span></div><div class='metric'><span class='metric-value'>Интеграция</span><span class='caption'>требует сложной связки множества инструментов</span></div></div><div class='grid-2 mt-8'><div class='card'><div class='badge blue'>Текущий рынок</div><h3>Фрагментированный UX</h3><ul class='bullet-list'><li>Чат-сервисы дают ответы, но не рабочую систему.</li><li>Документы слабо соединены с агентами и кодом.</li><li>Команды теряют скорость на переносе контекста.</li><li>AI распадается на набор функций без платформенной логики.</li></ul></div><div class='card'><div class='badge green'>Ответ ETRL Chat</div><h3>Платформа операционного уровня</h3><ul class='bullet-list'><li>Один интерфейс для диалога, анализа, поиска и создания.</li><li>Artifacts и agents переводят AI из “ответил” в “сделал”.</li><li>Система рассчитана на долгую ежедневную работу.</li><li>Это открывает путь к enterprise и интеграциям.</li></ul></div></div>",
        "footer": "Problem → Platform shift",
    },
    {
        "index": "03 / Product Architecture",
        "eyebrow": "Что внутри платформы",
        "title": "Шесть продуктовых уровней образуют единую AI-инфраструктуру работы.",
        "subtitle": "От вопроса и файла до интерфейса, агентного процесса или структурированного знания — всё происходит внутри платформы.",
        "body": "<div class='grid-3 mt-8'><div class='card'><div class='badge blue'>01 · Smart Chat</div><h3>Умный диалог</h3><div class='body'>Ветвление диалогов, редактирование, перегенерация, markdown и удобная работа с длинными сессиями.</div></div><div class='card'><div class='badge green'>02 · Documents</div><h3>Анализ файлов и RAG</h3><div class='body'>PDF, DOCX, CSV, XLSX, изображения и скриншоты превращаются в ответы, summary, факты и цитаты.</div></div><div class='card'><div class='badge violet'>03 · Artifacts</div><h3>Результат рядом с диалогом</h3><div class='body'>Код, интерфейсы, схемы и визуальные артефакты открываются в отдельной рабочей области.</div></div><div class='card'><div class='badge orange'>04 · Agents</div><h3>Ролевые AI-сотрудники</h3><div class='body'>Готовые и кастомные агенты с инструкциями, знаниями, поиском и внешними инструментами.</div></div><div class='card'><div class='badge cyan'>05 · Knowledge Layer</div><h3>Управление знаниями</h3><div class='body'>Поиск, папки, шаблоны, закладки и сохранение полезного контекста как часть повседневной работы.</div></div><div class='card'><div class='badge green'>06 · Memory & Security</div><h3>Персонализация с контролем</h3><div class='body'>Управляемая память, экспорт, настройка интерфейса и базовые механизмы приватности.</div></div></div><div class='quote mt-8'><p>Сильная сторона ETRL Chat — не одна функция, а связность между слоями: чат понимает документы, документы питают агентов, агенты создают артефакты, а память удерживает рабочий контекст.</p></div>",
        "footer": "Connected product layers",
    },
    {
        "index": "04 / Differentiation",
        "eyebrow": "Почему платформа сильнее типового AI-chat продукта",
        "title": "Переход от “ассистента ответов” к “платформе исполнения и знаний”.",
        "subtitle": "Для стратегических партнеров это означает более высокий потенциал удержания, больше поверхностей для интеграции и более широкие сценарии монетизации.",
        "body": "<div class='matrix mt-10'><div class='cell head'>Критерий</div><div class='cell head'>Типичный AI-чат</div><div class='cell head'>Точечный AI-инструмент</div><div class='cell head accent'>ETRL Chat</div><div class='cell'>Работа с длинным контекстом</div><div class='cell'>Частично</div><div class='cell'>Ограниченно</div><div class='cell accent'>Да, как основа продукта</div><div class='cell'>Документы + изображения + анализ</div><div class='cell'>Неровно</div><div class='cell'>Часто отдельно</div><div class='cell accent'>Встроено в единый поток</div><div class='cell'>Artifacts / live-результат</div><div class='cell'>Редко</div><div class='cell'>Только в спец. сервисах</div><div class='cell accent'>Да, как нативный слой</div><div class='cell'>Агенты с ролями и знаниями</div><div class='cell'>Поверхностно</div><div class='cell'>Только в enterprise-решениях</div><div class='cell accent'>Да, внутри продукта</div><div class='cell'>Knowledge & memory layer</div><div class='cell'>Фрагментарно</div><div class='cell'>Локально</div><div class='cell accent'>Да, сквозной слой</div><div class='cell'>Потенциал интеграции</div><div class='cell'>Низкий–средний</div><div class='cell'>Средний</div><div class='cell accent'>Высокий платформенный</div></div>",
        "footer": "Strategic differentiation",
    },
    {
        "index": "05 / Use Cases",
        "eyebrow": "Где продукт создаёт реальную ценность",
        "title": "ETRL Chat особенно силён там, где нужно одновременно думать, искать, анализировать и создавать.",
        "subtitle": "Типовые сценарии, в которых партнёр может получить высокий value: как внутри своей команды, так и внутри клиентского предложения.",
        "body": "<div class='grid-2 mt-8'><div class='card'><div class='badge violet'>Product & Tech</div><h3>Разработка и прототипирование</h3><ul class='bullet-list'><li>Разбор архитектуры, логики и требований.</li><li>Создание UI-концептов и внутренних инструментов.</li><li>Быстрая итерация между идеей, кодом и артефактом.</li></ul></div><div class='card'><div class='badge green'>Knowledge Work</div><h3>Документы и исследования</h3><ul class='bullet-list'><li>Поиск ответов по PDF и сложным пакетам материалов.</li><li>Summary, цитирование и extraction.</li><li>Снижение времени на разбор больших файлов.</li></ul></div><div class='card'><div class='badge orange'>Operations</div><h3>Агентные роли</h3><ul class='bullet-list'><li>AI-агенты под поддержку, аналитику, контент и пресейл.</li><li>Повторное использование знаний и инструментов.</li><li>Web search и внешние API для реальных процессов.</li></ul></div><div class='card'><div class='badge cyan'>Multimodal</div><h3>Голос и изображения</h3><ul class='bullet-list'><li>Hands-free взаимодействие и озвучивание ответов.</li><li>Разбор графиков, интерфейсов и фотографий.</li><li>Mobile-friendly сценарии для field-команд.</li></ul></div></div>",
        "footer": "Use cases across teams and products",
    },
    {
        "index": "06 / Partner Value",
        "eyebrow": "Почему это интересно партнёру",
        "title": "Партнёр получает не просто продукт, а AI-платформу, вокруг которой можно строить собственную ценность.",
        "subtitle": "ETRL Chat можно рассматривать как фундамент для внедрений, расширений и совместных решений — от внутренних AI-workspaces до кастомных отраслевых контуров.",
        "body": "<div class='grid-3 mt-8'><div class='card'><div class='badge blue'>Integration Layer</div><h3>Интеграционный потенциал</h3><div class='body'>Подключение внутренних знаний, API и отраслевых сценариев делает продукт естественной основой для platform-extension модели.</div></div><div class='card'><div class='badge green'>Готовность к дистрибуции</div><h3>Distribution Layer</h3><div class='body'>Понятный AI UX и широкий пул use cases помогают легче выводить продукт в новые аудитории и каналы.</div></div><div class='card'><div class='badge violet'>Monetization Layer</div><h3>Несколько контуров монетизации</h3><div class='body'>Подписка, premium-возможности, корпоративные пакеты, агенты и брендированные внедрения могут сосуществовать в одной модели.</div></div></div><div class='grid-2 mt-8'><div class='card'><div class='badge orange'>White-label</div><h3>Брендируемая AI-среда</h3><div class='body'>Партнёр может использовать ETRL Chat как основу для собственного AI-workspace, не строя всё с нуля.</div></div><div class='card'><div class='badge cyan'>Vertical solutions</div><h3>Отраслевые сценарии</h3><div class='body'>Юридический анализ, консалтинг, разработка, продажи и knowledge-operations — платформа подходит для вертикализации.</div></div></div>",
        "footer": "Partner upside and expansion surface",
    },
    {
        "index": "07 / Business Logic",
        "eyebrow": "Продукт и монетизация",
        "title": "Модель уже опирается на понятную продуктовую экономику и может масштабироваться в более дорогие контуры.",
        "subtitle": "Текущая freemium/PRO логика даёт низкий порог входа и понятную конверсионную лестницу. Для партнёров поверх неё могут строиться корпоративные тарифы и специализированные пакеты.",
        "body": "<div class='grid-3 mt-10'><div class='card'><div class='badge green'>Freemium Entry</div><h3>Быстрый вход в продукт</h3><div class='body'>Базовый бесплатный слой помогает формировать привычку ежедневного использования и снижает friction первого контакта.</div></div><div class='card'><div class='badge blue'>PRO Value</div><h3>Интенсивное использование</h3><div class='body'>Безлимитные токены, высокий приоритет и active daily-usage формируют понятную ценность для power users и команд.</div></div><div class='card'><div class='badge violet'>Partner Upside</div><h3>Путь к enterprise</h3><div class='body'>Дальнейшее расширение возможно через white-label, агентные пакеты, встроенные знания и кастомные внедрения.</div></div></div><div class='quote mt-10'><p>Продуктовая логика не упирается в “чат по подписке”, а раскрывается в платформу сервисов, интеграций и решений.</p></div>",
        "footer": "Business model readiness",
    },
    {
        "index": "08 / Roadmap Direction",
        "eyebrow": "Куда платформа может расти",
        "title": "Следующий уровень развития — усиление платформенности, интеграций и enterprise-ready сценариев.",
        "subtitle": "Уже сейчас ETRL Chat выглядит как сильная основа. Для партнёрского разговора важно показать и текущее состояние, и стратегическую траекторию роста.",
        "body": "<div class='timeline mt-10'><div class='card'><div class='badge green'>Stage 1</div><h3>Усиление core UX</h3><div class='body'>Дальнейшее совершенствование диалога, навигации, памяти и качества ежедневного использования.</div></div><div class='card'><div class='badge blue'>Stage 2</div><h3>Глубокие интеграции</h3><div class='body'>Подключение внешних систем, внутренних знаний и agent actions как нативных блоков платформы.</div></div><div class='card'><div class='badge violet'>Stage 3</div><h3>Вертикальные пакеты</h3><div class='body'>Отраслевые решения под разработку, консалтинг, документы, поддержку и knowledge-intensive команды.</div></div><div class='card'><div class='badge orange'>Stage 4</div><h3>Enterprise layer</h3><div class='body'>Расширенные контроли, командные роли, governance и полноценные B2B-партнёрские модели.</div></div></div>",
        "footer": "Roadmap and growth logic",
    },
    {
        "index": "09 / Strategic Fit",
        "eyebrow": "С кем лучше всего синергирует продукт",
        "title": "ETRL Chat органично встраивается в экосистемы, где нужен AI-слой поверх знаний, команд и цифровых процессов.",
        "subtitle": "Наиболее перспективны партнёры, для которых AI — это не разовый модуль, а способ усилить собственный продукт, сервис или инфраструктуру работы клиентов.",
        "body": "<div class='grid-4 mt-10'><div class='card'><div class='badge blue'>SaaS / Platforms</div><h3>Продуктовые экосистемы</h3><div class='body'>Добавление AI-workspace слоя в существующий digital product.</div></div><div class='card'><div class='badge green'>Consulting / Services</div><h3>Сервисные компании</h3><div class='body'>Ускорение аналитики, подготовки материалов, ресёрча и внутренней экспертизы.</div></div><div class='card'><div class='badge violet'>Education / Knowledge</div><h3>Экспертные продукты</h3><div class='body'>Интеллектуальная среда вокруг контента, учебных материалов и отраслевых баз знаний.</div></div><div class='card'><div class='badge orange'>Enterprise Tech</div><h3>Корпоративные IT-контуры</h3><div class='body'>AI-рабочее пространство для knowledge workers и внутренних процессов.</div></div></div>",
        "footer": "Best-fit partner profiles",
    },
    {
        "index": "10 / Closing",
        "eyebrow": "Финальный акцент",
        "title": "ETRL Chat — это своевременная ставка на AI как на рабочую среду, а не на отдельную функцию.",
        "subtitle": "Партнёрство вокруг такой платформы даёт доступ не только к текущему продукту, но и к траектории, где AI становится полноценной частью цифровой инфраструктуры пользователя, команды и бизнеса.",
        "body": "<div class='footer-grid mt-10'><div class='footer-card'><div class='badge green'>Strategic Summary</div><h3>Что получает партнёр</h3><ul class='bullet-list'><li>Продукт с premium UX и понятным платформенным позиционированием.</li><li>Широкий набор сценариев: знания, документы, код, артефакты и агенты.</li><li>Основание для интеграций, white-label и отраслевых решений.</li><li>Историю, которая хорошо продаётся и стратегически масштабируется.</li></ul></div><div class='footer-card'><div class='badge blue'>Contact & Product</div><h3>ETRL Chat</h3><div class='body'>AI Workspace для логики, кода, документов и интеллектуальной работы.</div><div class='body' style='margin-top:6mm'><span class='link-pill'>app.etrl.chat</span></div><div class='mini' style='margin-top:6mm'>Deck type: Strategic Partner Presentation</div><div class='mini'>Format: PDF-first / print-safe</div></div></div>",
        "footer": "Closing / Strategic partner deck",
    },
]

parts = [
    "<!DOCTYPE html><html lang='ru'><head><meta charset='UTF-8' /><meta name='viewport' content='width=device-width, initial-scale=1.0' /><meta name='color-scheme' content='dark' /><title>ETRL Chat — Strategic Partner Presentation</title><style>",
    STYLE,
    "</style></head><body><main class='deck'>",
]

for i, page in enumerate(PAGES, start=1):
    title_class = "hero-title" if i == 1 else "title"
    subtitle_class = "hero-subtitle" if i == 1 else "subtitle"
    current_page_class = page_class(i)
    parts.append(
        f"<section class='page {current_page_class}'><div class='inner'><div class='content'>"
        f"<div class='index'>{page['index']}</div>"
        f"<div class='eyebrow'>{page['eyebrow']}</div>"
        f"<h2 class='{title_class}'>{page['title']}</h2>"
        f"<div class='{subtitle_class}'>{page['subtitle']}</div>"
        f"{page['body']}"
        f"</div>"
        f"<div class='bottom-bar'><span>{page['footer']}</span><span>{i:02d}</span></div>"
        f"</div></section>"
    )

parts.append("</main></body></html>")

output = "".join(parts)
Path(r"c:\Users\fhhd6\Desktop\etrl-new-main\etrl-business\partner-presentation-etrl-chat-print.html").write_text(output, encoding="utf-8")
print("ok")
