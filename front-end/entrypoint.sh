echo Starting...

echo Setting environment...

destFile=.env
echo > "$destFile"
echo "REACT_APP_HASURA_HOST=$HASURA_HOST" >> "$destFile"
echo "REACT_APP_HASURA_PORT=$HASURA_PORT" >> "$destFile"
echo "REACT_APP_HASURA_ACCESS_KEY=$HASURA_ACCESS_KEY" >> "$destFile"

echo Installing packages...
npm install --silent

echo Here we go...
npm start
