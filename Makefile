

.PHONY: be-dev fe-dev

be-dev:
	cd ./be && yarn run dev:start

fe-dev:
	cd ./fe && yarn run dev:start

