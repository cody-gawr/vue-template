docker stop addubby-site
docker rm addubby-site
docker image rm addubby/site:latest
docker build -t addubby/site .