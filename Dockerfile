FROM debian:stretch

# Create user meteor who will run all entrypoint instructions
RUN useradd bfuser -G staff -m -s /bin/bash
#WORKDIR ~/
#/home/.blockfreight

RUN apt-get update && \
   apt-get install -y  curl unzip && \
  apt-get clean && \
  rm -Rf /var/lib/apt/lists/* /tmp/* /var/tmp/*



COPY entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/entrypoint.sh

RUN chown -R bfuser:bfuser .//home ~/ /usr/bin/entrypoint.sh

ENTRYPOINT ["su", "-c", "/usr/bin/entrypoint.sh", "bfuser"]
CMD []