1. docker 실행
~~~
docker run --name {컨테이너명} \
-e POSTGRES_USER={유저명} \
-e POSTGRES_PASSWORD={비밀번호} \
-e POSTGRES_DB={DB명} \
-p 5432:5432 \
-v pg16_data:/var/lib/postgresql/data \
-d postgres:16
~~~

2. docker 확인
~~~
docker ps
docker logs -f {컨테이너명}
~~~

3. docker 내부접속
~~~
docker exec -it {컨테이너명} psql -U {유저명} -d {DB명}
~~~