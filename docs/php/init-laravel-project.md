---
sidebar_position: 2
---

# Init Laravel Project

## Phần mềm, công cụ cần thiết
- PHP
  + Ưu tiên sử dụng phiên bản mới nhất, hiện tại là 8.3. Tránh dùng các phiên bản đã End of life, xem thêm danh sách phiên bản tại [đây](https://www.php.net/supported-versions.php)
  + Khuyến khích sử dụng Docker, Docker Compose để cài PHP và thiết lập môi trường dev
- Laravel
  + Ưu tiên sử dụng phiên bản mới nhất, xem danh sách phiên bản tại [đây](https://laravel.com/docs/master/releases#support-policy)
- NodeJS
  + Khuyến khích cài NodeJS để cài các tool như Husky, Lint-staged
  + Sử dụng version [LTS](https://nodejs.org/en/about/previous-releases) mới nhất
  + Sử dụng các tool quản lý version để cài đặt dễ dàng hơn, ví dụ [mise](https://github.com/jdx/mise), [fnm](https://github.com/Schniz/fnm), [nvm](https://github.com/nvm-sh/nvm), [asdf](https://github.com/asdf-vm/asdf),...
- Docker, Docker Compose
  + Docker Compose V1 (`docker-compose`) đã lỗi thời, nếu đang dùng thì nên [migrate](https://docs.docker.com/compose/migrate/) sang V2
  + Sử dụng Docker Engine (Docker CLI), không cần cài Docker Desktop. Hướng dẫn cài đặt Docker Engine tại [đây](https://docs.docker.com/engine/install/)
  + Để sử dụng các command `docker` mà không cần sudo thì nhớ làm theo hướng dẫn [Linux post-installation steps for Docker Engine](https://docs.docker.com/engine/install/linux-postinstall/)
- Makefile
  + Sử dụng `make` và `Makefile` để  tạo shortcut cho các command hay dùng trong project, ví dụ thay vì phải gõ command dài `docker compose exec workspace bash` thì có thể tạo shortcut `make enter-workspace`
  + Tool `make` thường được cài sẵn ở Ubuntu, nếu chưa có thì cài bằng lệnh `sudo apt install make`
  + TODO: sử dụng [`just`](https://github.com/casey/just) và `justfile` thay cho `make`?

## Một số config cần thiết

### Husky, Lint-staged

File `package.json` để cài husky, lint-staged
```json title="package.json"
{
    "private": true,
    "scripts": {
        "prepare": "husky install"
    },
    "lint-staged": {
        "*.php": [
            "docker compose exec -T workspace composer cs:fix --config=.php-cs-fixer.dist.php",
            "docker compose exec -T workspace composer phpstan"
        ]
    },
    "devDependencies": {
        "@commitlint/cli": "^17.4.4",
        "@commitlint/config-conventional": "^17.4.4",
        "husky": "^8.0.3",
        "lint-staged": "^13.1.2"
    }
}
```

Config husky để chạy lint khi commit (pre-commit):

```bash title=".husky/pre-commit"
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged --relative
```

### Coding conventions

Tham khảo thêm tại [đây](./coding-conventions.md).

### Static code analysis

Sử dụng PHPStan để analyse code trước khi đẩy pull request. Chi tiết xem tại [đây](https://github.com/AvengersCodeLovers/laravel-coding-standards?tab=readme-ov-file#static-analysis).


### Makefile

Ví dụ file `Makefile` với dự án dùng docker, docker compose:

```Makefile title="Makefile"
# This Makefile is generally for development env
COMPOSE=docker compose

.PHONY: composer-install
composer-install:
	$(COMPOSE) exec workspace composer install

.PHONY: composer-autoload
composer-autoload:
	$(COMPOSE) exec workspace composer dump-autoload

.PHONY: up
up:
	$(COMPOSE) up -d --wait
	@make composer-install

.PHONY: build
build:
	$(COMPOSE) build

.PHONY: init
init:
	./docker/build-docker-dev.sh
	cp docker/dev/.env.example .env
	@make build
	@make up
	$(COMPOSE) exec workspace php artisan key:generate
	# $(COMPOSE) exec workspace php artisan storage:link
	@make db-migrate

.PHONY: stop
stop:
	$(COMPOSE) stop

.PHONY: down
down:
	$(COMPOSE) down

.PHONY: reup
reup:
	@make down
	@make build
	@make up

.PHONY: restart
restart:
	$(COMPOSE) restart

# % is for specific service, e.g. make restart-php-fpm
.PHONY: restart-%
restart-%:
	$(COMPOSE) restart $*

.PHONY: destroy
destroy:
	$(COMPOSE) down --rmi local --volumes --remove-orphans

.PHONY: destroy-volumes
destroy-volumes:
	$(COMPOSE) down --volumes

.PHONY: ps
ps:
	$(COMPOSE) ps

.PHONY: top
top:
	$(COMPOSE) top

# % is for specific service, e.g. make top-php-fpm
.PHONY: top-%
top-%:
	$(COMPOSE) top $*

.PHONY: logs
logs:
	$(COMPOSE) logs --tail=500 --follow

# % is for specific service, e.g. make logs-php-fpm
.PHONY: logs-%
logs-%:
	$(COMPOSE) logs --tail=500 --follow $*

.PHONY: logs-all
logs-all:
	$(COMPOSE) logs

# % is for specific service, e.g. make logs-all-php-fpm
.PHONY: logs-all-%
logs-all-%:
	$(COMPOSE) logs $*

# Enter default container shell, ref: https://github.com/moby/moby/issues/41702
.PHONY: enter-%
enter-%:
	$(COMPOSE) exec $* /bin/sh -c "[ -e /bin/bash ] && /bin/bash || /bin/sh"

.PHONY: mysql
mysql:
	$(COMPOSE) exec mysql mysql -uapp_user -p

.PHONY: tinker
tinker:
	$(COMPOSE) exec workspace php artisan tinker

.PHONY: db-migrate
db-migrate:
	$(COMPOSE) exec workspace php artisan migrate

.PHONY: db-rollback
db-rollback:
	$(COMPOSE) exec workspace php artisan migrate:rollback

.PHONY: cs-fix
cs-fix:
	$(COMPOSE) exec workspace composer cs:fix

.PHONY: phpstan
phpstan:
	$(COMPOSE) exec workspace composer phpstan

.PHONY: test-db-migrate
test-db-migrate:
	$(COMPOSE) exec workspace php artisan migrate --env testing

.PHONY: test
test:
	$(COMPOSE) exec workspace php artisan test

.PHONY: test-cov
test-cov:
	$(COMPOSE) exec workspace composer pest:coverage

.PHONY: test-cov-html
test-cov-html:
	$(COMPOSE) exec workspace composer pest:coverage-html
```

Nếu muốn xem logs của php-fpm, thay vì phải dùng command `docker compose logs --tail=500 --follow php-fpm` thì có thể chạy lệnh `make logs-php-fpm`,...


### GKC

Sử dụng GKC utils để đảm bảo hash code được đính kèm vào các file mã nguồn, phục vụ cho việc detect lộ source code.

Đối với project Laravel, nên sử dụng GKC bash script đã được chỉnh sửa để phù hợp với coding standards, tải về  tại [đây](https://github.com/framgia/gkc_utils/pull/18).

Ngoài ra, nếu muốn tích hợp vào CI bạn có thể tham khảo script đã được chỉnh sửa và hướng dẫn tích hợp tại [đây](https://github.com/framgia/gkc_utils/pull/19/files).

### Docker

Chia nhỏ thành các container có chức năng riêng, ví dụ:
- workspace: container dùng để chạy các command như composer, php artisan,...
- php-fpm: container chạy php-fpm
- worker: container chạy queue worker để thực thi queue jobs
- scheduler: container chạy cron jobs phục vụ cho scheduling
- nginx: container để chạy nginx dùng làm reverse proxy cho php-fpm
- redis: container chạy redis server, dùng cho cache, session, queue connection,...
- mysql: database
- adminer: giao diện web để tương tác với MySQL
- mail-server: sử dụng [mailpit](https://github.com/axllent/mailpit) làm mail catcher ở local

Đối với môi trường dev ở local thì các container `workspace`, `worker`, `scheduler` có thể  dùng chung docker image để giảm dung lượng, vì các phần mềm cài cho các container này là giống nhau. Container `php-fpm` thì dùng image riêng để chạy `php-fpm`.

Ví dụ về Dockerfile cho workspace:

```Dockerfile title="docker/dev/php-workspace/Dockerfile"
FROM php:8.3-cli

ARG HOST_UID=1000
ARG HOST_GID=1000

ENV DEBIAN_FRONTEND=noninteractive

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get -y install unzip locales libicu-dev libzip-dev supervisor htop libgmp-dev && \
    apt-get -y install git vim cron && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/* /etc/cron.*/*

RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

# Locale setting, ref: https://www.baeldung.com/linux/locale-environment-variables
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US \
    LC_ALL=en_US.UTF-8

# ext-intl for laravel email dns validator or currency format with NumberFormatter
RUN docker-php-ext-configure intl \
    && docker-php-ext-install -j$(nproc) intl

RUN docker-php-ext-install -j$(nproc) pdo_mysql zip pcntl gmp
RUN pecl install redis-6.0.2 && docker-php-ext-enable redis

# Install Xdebug (but don't enable yet, may for debugging), for test coverage
RUN pecl install xdebug

# Install pcov (but don't enable yet), for test coverage
RUN pecl install pcov

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY docker/dev/php-ini-overrides.ini "$PHP_INI_DIR/conf.d/999-overrides.ini"

# For --no-log-init, see note in https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN groupadd --gid $HOST_GID deploy \
    && useradd --uid $HOST_UID --gid deploy --shell /bin/bash --create-home --no-log-init deploy

# Run laravel schedule. Have to run as root (but switch user when run command) to output any log to stdout, stderr
RUN echo '* * * * * root su deploy -c "cd /app && /usr/local/bin/php artisan schedule:run" > /proc/1/fd/1 2>/proc/1/fd/2' > /etc/crontab

COPY docker/dev/php-workspace/supervisord.conf /etc/supervisor/docker-supervisord.conf
COPY docker/dev/php-workspace/start-cron.sh /usr/local/bin/start-cron.sh
COPY docker/dev/php-workspace/start-queue-worker.sh /usr/local/bin/start-queue-worker.sh

WORKDIR /app
```

Dockerfile cho `php-fpm`:
```Dockerfile title="docker/dev/php-fpm/Dockerfile"
FROM php:8.3-fpm

ARG HOST_UID=1000
ARG HOST_GID=1000

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
    apt-get -y install unzip locales libicu-dev libzip-dev htop libgmp-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

RUN sed -i '/en_US.UTF-8/s/^# //g' /etc/locale.gen && \
    locale-gen

# Locale setting, ref: https://www.baeldung.com/linux/locale-environment-variables
ENV LANG=en_US.UTF-8 \
    LANGUAGE=en_US \
    LC_ALL=en_US.UTF-8

# ext-intl for laravel email dns validator or currency format with NumberFormatter
RUN docker-php-ext-configure intl \
    && docker-php-ext-install -j$(nproc) intl

RUN docker-php-ext-install -j$(nproc) pdo_mysql zip pcntl gmp
RUN pecl install redis-6.0.2 && docker-php-ext-enable redis

# Install Xdebug (but don't enable yet, may for debugging)
RUN pecl install xdebug

RUN mv "$PHP_INI_DIR/php.ini-development" "$PHP_INI_DIR/php.ini"
COPY docker/dev/php-ini-overrides.ini "$PHP_INI_DIR/conf.d/99-overrides.ini"
COPY docker/dev/php-fpm/fpm-overrides.conf /usr/local/etc/php-fpm.d/zzz-docker-overrides.conf

# For --no-log-init, see note in https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
RUN groupadd --gid $HOST_GID deploy \
    && useradd --uid $HOST_UID --gid deploy --shell /bin/bash --create-home --no-log-init deploy

WORKDIR /app
```

Docker compose cho project:
```yml title="docker-compose.yml"
name: some-service

volumes:
    mysql-data:
    redis-data:
    minio-data:

services:
    workspace:
        image: some-service-php-workspace
        build:
            context: ./
            dockerfile: ./docker/dev/php-workspace/Dockerfile
            args:
                # HOST_UID: result of command `id -u`
                HOST_UID: __HOST_USER_UID__
                # HOST_GID: result of command `id -g`
                HOST_GID: __HOST_USER_GID__
        working_dir: /app
        user: deploy
        tty: true
        volumes:
            - .:/app

    scheduler:
        image: some-service-php-workspace
        # Reuse image built in service 'workspace'
        pull_policy: never
        working_dir: /app
        init: true
        command: /usr/local/bin/start-cron.sh
        volumes:
            - .:/app

    worker:
        image: some-service-php-workspace
        pull_policy: never
        working_dir: /app
        init: true
        command: /usr/local/bin/start-queue-worker.sh
        volumes:
            - .:/app
            - ./docker/dev/php-workspace/supervisord.conf:/etc/supervisor/docker-supervisord.conf

    php-fpm:
        image: some-service-php-fpm
        build:
            context: ./
            dockerfile: docker/dev/php-fpm/Dockerfile
            args:
                # HOST_UID: result of command `id -u`
                HOST_UID: __HOST_USER_UID__
                # HOST_GID: result of command `id -g`
                HOST_GID: __HOST_USER_GID__
        working_dir: /app
        volumes:
            - .:/app
        expose:
            - 9000

    nginx:
        image: nginx:1-alpine
        working_dir: /app
        volumes:
            - .:/app
            - ./docker/dev/nginx/default.conf:/etc/nginx/conf.d/default.conf
        expose:
            - 80
        ports:
            - "${DOCKER_WEB_PORT:-9872}:80"

    mail-server:
        image: axllent/mailpit:latest
        environment:
            - MP_DATA_FILE=/tmp/mailpit.sqlite
            - MP_MAX_MESSAGES=500
        expose:
            - 1025
            - 8025
        ports:
            - "${DOCKER_MAILBOX_PORT:-9873}:8025"

    redis:
        image: redis:7-alpine
        expose:
            - 6379
        volumes:
            - redis-data:/data
        healthcheck:
            test: ["CMD", "redis-cli", "ping"]
            retries: 3
            timeout: 5s

    mysql:
        image: mysql:8
        command: --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
        volumes:
            - mysql-data:/var/lib/mysql
            - ./docker/dev/mysql/init:/docker-entrypoint-initdb.d
        environment:
            MYSQL_ROOT_PASSWORD: root
        expose:
            - 3306
        healthcheck:
            test: ["CMD", "mysqladmin", "ping", "-proot"]
            retries: 3
            timeout: 5s

    adminer:
        image: adminer
        volumes:
            - ./docker/dev/adminer/php-ini-overrides.ini:/usr/local/etc/php/conf.d/99-overrides.ini
        expose:
            - "8080"
        ports:
            - "${DOCKER_DB_ADMINER_PORT:-9874}:8080"
        environment:
            ADMINER_DEFAULT_SERVER: mysql
            ADMINER_DESIGN: "pappu687"
```