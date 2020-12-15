sudo docker build -f Dockerfile.prod -t sample:prod .

sudo docker run -it --rm -p 3001:3001 sample:prod
