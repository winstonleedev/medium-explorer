echo Starting...

echo Setting environment...
environment="HASURA_HOST HASURA_PORT HASURA_ACCESS_KEY"
destFile=.env

for var in ${environment}; do
  echo "$var" > "$destFile"
done

echo Installing packages...
npm install --silent

echo Here we go...
npm start