# medium-explorer
Blockchain explorer for Medium platform

[![Preview](demo.gif)](demo.gif)

# Requirements

## Using docker
- Docker only!

## Manual install
See **How to Run**

# How to run
## Automatically

```
cd docker-medium-explorer
docker-compose up -d
```

## Manually
Install
- Node v10
- Yarn
- PosgreSQL v11
- Hasura 1.0.0 beta 4 or later
Execute these commands in sequence

### Database
```
docker-compose run timescale -d
docker-compose run graphql-engine -d
```

### Front-end

```
cd front-end
yarn
yarn run start
```

Then go to [https://localhost:3000](https://localhost:3000)

### Back-end
Currently only push mock data to database

```
cd back-end
pnpm i
node index.js
```

# Troubleshoot

## graphql-engine failed to start
Adjust amount of memory available to Docker. Should be at least 4GB, ideally 8GB

## mock or front-end failed to start
Check if docker can access the Internet by going into the containers and run `npm install`