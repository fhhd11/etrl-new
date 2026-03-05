# ETRL Chat Partner Presentation Site

Отдельный статический мини-проект для деплоя презентации на Railway.

## Локальный запуск

```bash
npm install
npm start
```

Сайт откроется на порту `3000` или на порту из переменной окружения `PORT`.

## Deploy на Railway

1. Создайте новый service в Railway.
2. В качестве root directory укажите `presentation-site`.
3. Railway автоматически выполнит `npm start`.
4. После деплоя привяжите нужный домен в настройках Railway.

## Структура

- `index.html` — основная web-версия презентации
- `assets/logo.svg` — логотип
- `server.js` — минимальный статический HTTP-сервер
- `package.json` — скрипт запуска
