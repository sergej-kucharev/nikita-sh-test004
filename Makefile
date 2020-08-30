

.PHONY: be-clean be-dev be-init fe-dev

test:
	cd ./be && ls
	cd ./be && ls

be-clean:
	cd ./be && yarn run db:down

be-dev:
	cd ./be && yarn run start:dev

be-init:
	cd ./be && yarn run db:up && yarn run db:seed

be: be-clean be-init be-dev

fe-dev:
	cd ./fe && yarn run dev:start

