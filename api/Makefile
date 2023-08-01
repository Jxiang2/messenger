run:
	docker-compose up
refresh:
	npx prisma generate && npx prisma studio

# auth
sh-auth:
	docker exec -it messenger-api-auth bash
migrate-auth:
	 npx prisma migrate dev --name $(name)

# gateway
sh-gateway:
	docker exec -it messenger-api-gateway bash

stop:
	docker compose down
