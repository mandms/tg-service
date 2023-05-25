<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Отправляет сообщение пользователю в телеграме по номеру телефона.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# .env
APP_ID='your app id'
PHONE='your phone number'
APP_HASH='your app hash'
TDLIB_COMMAND="tdjson.dll"

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
