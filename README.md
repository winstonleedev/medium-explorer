# medium-explorer
Blockchain explorer for Medium platform

# Requirements

## Using docker
- Docker only!

## Manual install
- Node v10
- Yarn
- PosgreSQL v11
- Hasura 1.0.0 beta 4 or later

# How to run
## Automatically

```
cd docker-medium-explorer
docker-compose up -d
```

## Manually
Execute these commands in sequence

### Front-end

```
cd front-end
yarn
yarn run start
```

Then go to [https://localhost:3000](https://localhost:3000)

### Back-end

```
cd back-end
pnpm i
node index.js
```