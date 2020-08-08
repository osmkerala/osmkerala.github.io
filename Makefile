build-dev-docker:
	docker build --target builder -t osmkerala/osmkerala:latest .

run-dev-docker:
	docker run -v "$(shell pwd)":/public \
			    -w /public \
			    -p 1313:1313 \
			    osmkerala/osmkerala:latest \
			    hugo serve -D --bind 0.0.0.0

build-public-folder-docker:
	docker run -v "$(shell pwd)":/public \
			-w /public \
			-p 1313:1313 \
			osmkerala/osmkerala:latest \
			hugo 

run-dev:
	hugo serve -D --bind 0.0.0.0

build-public-folder:
	hugo

.PHONY: build-dev-docker run-dev-docker build-public-folder-docker run-dev build-public-folder