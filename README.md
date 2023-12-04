# pay-for-a-cause-challenge

### Projeto para o desafio da play for a cayse

**API DOCS** : http://54.234.157.163:3002/api

**APP FRONT** : http://54.234.157.163:3000/auth

Um chat, com opção de criar deletar chats, e conversar com todos conectados
Nesse repositorio temos o fronend e o backend

## technologias utilizadas

- [Docker](https://www.docker.com/)
- Nestjs
- Nextjs
- Zustand
- Tailwind
- Redis
- WebSockets
- PostgresSql
- JWT
- Swagger

**Como rodar o projeto localmente**
1 - rodar as imagens do docker que são redis e postgres

```zsh
$ docker-compose up -d
```

2 - Entre pasta frontend e backend e instale as dependencias
obs : pastas backend e frontend - pode usar npm i também

```zsh
$ yarn
```

3 - Rode o frontend e o backend e terminais diferentes
obs : pastas backend e frontend - pode usar npm run também

### backend

```zsh
$ cd backend-nestjs-socket
$ yarn start dev
```

### frontend

```zsh
$ cd frontend
$ yarn dev
```
