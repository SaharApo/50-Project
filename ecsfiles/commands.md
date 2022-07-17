cd /your/app/directory
docker build -t nodeapp -f ecsfiles/Dockerfile.app .
docker run --name net01 -p 41960:3000 -d nodeapp
docker exec -it net01 /bin/bash