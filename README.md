# medium-explorer
Blockchain explorer for Medium platform

# Requirements
- Node v10
- PosgreSQL v11
- Yarn

# How to run
Execute these commands in sequence

## Environment

```
docker-compose up -d
```

## Front-end

```
cd front-end
yarn run start
```

Then go to [https://localhost:3000](https://localhost:3000)

## Back-end

```
cd back-end
node index.js
```