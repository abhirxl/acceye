if [ -z "$1" ]
  then
    echo "Please provide a enviorment"
    exit 1
fi
    cd functions
    docker-compose up -d &&
    npm install --legacy-peer-deps &&
    NODE_ENV=$1 npm run devServers
