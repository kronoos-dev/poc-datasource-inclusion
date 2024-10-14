CONTAINER_NAME ?= app
 
build:
	docker compose build

up:
	docker compose up

up-w:
	docker compose up --watch

up-b:
	docker compose up --build

down:
	docker compose down

prisma-setup:
	docker compose exec $(CONTAINER_NAME) npx prisma migrate reset

scrapple:
	docker compose run $(CONTAINER_NAME) npm run scrapple

import-sources:
	docker compose exec $(CONTAINER_NAME) npm run import-sources
 
shell:
	@docker exec -it $(CONTAINER_NAME) \
	sh -c "/bin/bash || /bin/sh"
	
clean:
	@docker compose down
	@docker system prune --volumes --force
	@docker network prune
	@rm -rf tmp/* || sudo rm -rf tmp/*
	@mkdir -p tmp/pids && touch tmp/pids/.keep

reset-app:
	docker compose down $(CONTAINER_NAME) && docker compose up -d $(CONTAINER_NAME)

reset-db:
	docker compose down db && docker compose up -d db

reset-prisma-studio:
	docker compose down prisma-studio && docker compose up -d prisma-studio --force-recreate

