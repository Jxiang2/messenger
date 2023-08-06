run:
	docker-compose up
studio:
	npx prisma generate && npx prisma studio
migrate:
	 npx prisma migrate dev --name $(name)
stop:
	docker compose down

# auth
sh-auth:
	docker exec -it messenger-api-auth bash
# presence
sh-auth:
	docker exec -it messenger-api-presence bash
# gateway
sh-gateway:
	docker exec -it messenger-api-gateway bash


