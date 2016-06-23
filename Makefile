.PHONY: run-dev
run-dev:
	./scripts/dev_mode.sh

.PHONY: serve
serve:
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
