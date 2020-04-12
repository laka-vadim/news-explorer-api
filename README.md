# news-explorer-api
Яндекс.Практикум, дипломный проект, backend

Доступ к серверу: [84.201.152.157](84.201.152.157) или [laka-vadim.tk](https://laka-vadim.tk)
Запросы к API:
```
# возвращает информацию о пользователе (email и имя)
GET /users/me

# возвращает все сохранённые пользователем статьи
GET /articles

# создаёт статью с переданными в теле
# keyword, title, text, date, source, link и image
POST /articles

# удаляет сохранённую статью  по _id
DELETE /articles/articleId

# создаёт пользователя с переданными в теле
# email, password и name
POST /signup

# проверяет переданные в теле почту и пароль
# и возвращает JWT
POST /signin
```

Чтобы развернуть проект локально необходимо иметь установленные [Git](https://git-scm.com/) и [Node.js с NPM](https://nodejs.org/en/), а также [MongoDB](https://www.mongodb.com/)

В консоле Git Bush выполните следующие команды:
```
git clone https://github.com/laka-vadim/praktikum-13.git # клонирует данный репозиторий
cd webpack-praktikum # переходим в папку репозитория
npm install # установит все зависимости из package.json
```

Далее запустим сервер на localhost:3000 и БД:
```
mongod # команда для запуска ДБ (корректно работает только если запустить раньше сервера)
npm run start # обычный запуск сервера

# ИЛИ

npm run dev # запуск сервера с хотрелоадом - режим разработки
```

