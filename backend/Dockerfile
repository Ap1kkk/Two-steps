# Stage 1: Build
FROM gradle:8.5-jdk17-alpine AS builder
WORKDIR /app

# Копируем только gradle конфигурацию для кэширования зависимостей
COPY build.gradle settings.gradle ./
COPY gradle gradle
COPY gradlew ./

# Даем права на выполнение
RUN chmod +x gradlew

# Скачиваем зависимости (кэшируется)
RUN ./gradlew dependencies --no-daemon

# Копируем исходный код
COPY src src

# Собираем приложение
RUN ./gradlew build --no-daemon -x test

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Создаем пользователя для безопасности
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Копируем jar из builder
COPY --from=builder /app/build/libs/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", \
    "-XX:+UseContainerSupport", \
    "-XX:MaxRAMPercentage=75.0", \
    "-jar", "app.jar"]