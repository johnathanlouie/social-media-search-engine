FROM python:2.7.13-jessie

WORKDIR /app/
COPY ./src/ /app/
COPY ./requirements.txt /app/requirements.txt

RUN apt update && apt install -y libxtst-dev qt4-default cmake xvfb && apt-get clean
RUN pip2 install -r ./requirements.txt

ENTRYPOINT [ "python2" ]
CMD [ "fb.py" ]
