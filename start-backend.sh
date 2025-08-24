#!/bin/bash
# Start script for OCI Resource Monitor

# Pfad zur .env Datei
ENV_FILE=".env"

# Prüfen, ob .env existiert
if [ ! -f "$ENV_FILE" ]; then
  echo ".env file not found!"
  exit 1
fi

# Variablen aus .env exportieren
export $(grep -v '^#' $ENV_FILE | xargs)

# Optional: Maven clean & build
# mvn clean package

# Spring Boot starten
mvn spring-boot:run
