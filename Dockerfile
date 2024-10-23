FROM oven/bun:debian as base
WORKDIR /usr/src/app

FROM base as release
COPY . .
RUN bun install --production
RUN apt-get update && apt-get -y install ffmpeg

USER bun
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "." ]