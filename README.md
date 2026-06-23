# EmailWritingAssistant

A Java-based assistant for composing, templating, and personalizing emails. This repository contains the source code, templates, and utilities used to generate and send written email content efficiently.

## Features
- Template-driven email composition
- Personalization variables for recipient data
- Pluggable transport layer for sending emails
- Simple CLI and IDE-friendly entry points
- Unit tests and sample templates included

## Prerequisites
- Java 11+ (or the project's configured JDK)
- Maven or Gradle (if the project uses a build tool)
- Optional: an SMTP account for sending emails (credentials stored via configuration)

## Installation
1. Clone the repository:
   git clone <repo-url> G:\JAVA_Project\EmailWritingAssistant
2. Open the project in your preferred Java IDE (IntelliJ IDEA, Eclipse, VS Code).
3. If using Maven:
   mvn clean install
   If using Gradle:
   ./gradlew build

## Running
- From your IDE: run the main class (check src/main/java for the application's entrypoint).
- From the command line (example with Maven):
  mvn -q exec:java -Dexec.mainClass="com.example.Main"
- Configure SMTP and templates before sending real emails (see Configuration).

## Configuration
Create or update a config file (example: application.properties or config.yml) with:
- smtp.host
- smtp.port
- smtp.username
- smtp.password
- default.from.address

Keep credentials secure; prefer environment variables or a secrets manager.

## Templates
- Templates are located in the templates/ directory.
- Use placeholders like {{firstName}}, {{company}}, {{date}} for personalization.
- The project includes a sample template (templates/sample-email.txt).

## Development
- Follow existing code style and tests.
- Add new templates into the templates/ folder and wire them through the template service.
- Use dependency injection where applicable to keep components testable.

## Testing
- Run unit tests with:
  mvn test
  or
  ./gradlew test
- Add tests for new logic and template rendering.

## Contributing
- Fork the repository and open a pull request with a clear description.
- Include tests for new features and ensure the build passes.
- Keep changes minimal and focused per PR.

