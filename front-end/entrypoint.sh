echo Starting...

echo Setting environment...

destFile=.env
echo > "$destFile"
for var in ${environment}; do
  echo HASURA_HOST=$HASURA_HOST >> "$destFile"
  echo HASURA_PORT=$HASURA_PORT >> "$destFile"
  echo HASURA_ACCESS_KEY=$HASURA_ACCESS_KEY >> "$destFile"
done

echo Installing packages...
npm install --silent

echo Here we go...
npm start