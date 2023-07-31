build:
	docker compose build
run:
	docker-compose up --build

# auth
sh-auth:
	docker exec -it messenger-api-auth bash
schema-auth:
	npx prisma generate

# gateway
sh-gateway:
	docker exec -it messenger-api-gateway bash

stop:
	docker compose down
