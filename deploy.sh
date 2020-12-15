sudo docker build -f Dockerfile.prod -t sample:prod .

sudo docker run -it --rm -p 3000:3000 sample:prod
