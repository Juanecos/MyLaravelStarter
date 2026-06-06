FROM php:8.3-fpm-alpine

ARG UID=1000
ARG GID=1000

RUN apk add --no-cache \
    bash \
    git \
    unzip \
    nodejs \
    npm \
    libpq-dev \
    oniguruma-dev \
    autoconf \
    gcc \
    g++ \
    make \
    linux-headers \
    su-exec \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    mbstring \
    bcmath \
    pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN addgroup -g ${GID} appuser && \
    adduser -D -u ${UID} -G appuser -s /bin/bash appuser

ENV COMPOSER_HOME=/home/appuser/.composer
ENV PATH="${COMPOSER_HOME}/vendor/bin:${PATH}"

RUN mkdir -p /home/appuser/.composer && \
    chown -R appuser:appuser /home/appuser

USER appuser
RUN composer global require laravel/installer
USER root

COPY docker/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint.sh"]

WORKDIR /var/www/html/application

CMD ["php-fpm"]
