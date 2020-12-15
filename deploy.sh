sudo docker build -f Dockerfile.prod -t sample:prod .

sudo docker run -it --rm -p 443:443 sample:prod
