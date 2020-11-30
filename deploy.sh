sudo docker build -f Dockerfile.prod -t sample:prod .

sudo docker run -it --rm -p 3000:80 sample:prod
