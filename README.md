## Docker 빌드 및 실행

```sh
docker build --build-arg NEXT_PUBLIC_GRAPHQL_API={NEXT_PUBLIC_GRAPHQL_API} --build-arg COOKIE_PASSWORD={COOKIE_PASSWORD} -t nadoharu-front .
```

```sh
docker run -d -p 80:80 --name nadoharu-front nadoharu-front:latest
```

이후 http://localhost 로 접속
