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

scrapple:
	docker compose run app npm run scrapple
 
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
	docker compose down app && docker compose up -d app

reset-db:
	docker compose down db && docker compose up -d db

reset-prisma-studio:
	docker compose down prisma-studio && docker compose up -d prisma-studio

