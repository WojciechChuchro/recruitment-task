# Zadanie:
Zaprojektować backend (API), który będzie umożliwiał użytkownikowi zarządzanie
listą codziennych zadań (to-do app)
## Wymagana funkcjonalność:
1. Logowanie użytkownika (zawartość aplikacji powinna być dostępna tylko dla
   zalogowanych użytkowników)
2. Implementacja dwóch typów użytkowników - zwykły użytkownik oraz
   administrator
3. Endpoint umożliwiający dodanie nowego zadania do bazy danych (tylko przez
   zalogowanego użytkownika)
4. Endpoint umożliwiający pobranie z bazy konkretnego zadania (tylko dla
   zalogowanego użytkownika, który dodatkowo jest autorem zadania)
5. Endpoint umożliwiający pobranie z bazy wszystkich zadań (tylko dla
   administratora)
## Dodatkowe informacje:
1. Można wykorzystać dowolne biblioteki jakie będą potrzebne do napisania
   aplikacji
2. Dowolność bazy danych
3. Uwierzytelnianie użytkowników powinno być oparte o tokeny JWT
4. Oczekiwane technologie: Node.js, Express.js, TypeScript
## Konfiguracja bazy danych z użyciem migracji

Wykonaj migrację, aby utworzyć schemat bazy danych: `npx knex migrate:latest --knexfile knexfile.ts`

Załaduj bazę danych danymi początkowymi: `npx knex seed:run`

Aby cofnąć migrację bazy danych: `npx knex migrate:rollback --all`
