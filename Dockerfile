from debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y git python3-pip

COPY requirements.txt .

RUN pip3 install --break-system-packages -r requirements.txt 
