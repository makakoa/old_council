.PHONY: web-dev
web-dev:
	webpack-dev-server --inline

.PHONY: api
api: migrate start-server

.PHONY: start-server
start-server:
	node api

.PHONY: serve-production
serve-production:
	./scripts/prod_serve.sh

.PHONY: build-ios
build-ios:
	./scripts/build_ios.sh

.PHONY: quick-ios
quick-ios:
	./scripts/quick_build_ios.sh

.PHONY: migrate
migrate:
	node api/db/migrate run

.PHONY: db-fresh
db-fresh:
	./api/db/fresh
