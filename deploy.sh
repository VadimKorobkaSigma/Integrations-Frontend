sudo docker build -f Dockerfile.prod -t sample:prod .

sudo docker run -it --rm -p 1337:80 sample:prod