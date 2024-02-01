## Konfiguracja bazy danych z użyciem migracji

### Krok 1: Uruchomienie kontenera Docker
Aby rozpocząć, wykonaj poniższą komendę w terminalu, aby uruchomić kontenery Docker:
`docker-compose up -d`

### Krok 2: Wykonanie migracji
Następnie, aby utworzyć schemat bazy danych, użyj poniższej komendy migracji:
`npx knex migrate:latest --knexfile knexfile.ts`

### Krok 3: Załadowanie danych początkowych
Aby wypełnić bazę danych danymi początkowymi, wykonaj komendę seed:
`npx knex seed:run`

### Krok 4: Cofnięcie migracji
W przypadku konieczności cofnięcia migracji bazy danych użyj komendy:
`npx knex migrate:rollback --all`

### Konto administratora
- **Email:** admin@gmail.com
- **Hasło:** admin

### Konto użytkownika
- **Email:** user@gmail.com
- **Hasło:** user

### Ścieżki API

#### Autentykacja (auth)
- Wylogowanie (logout): http://localhost:8080/api/auth/logout
- Logowanie (login): http://localhost:8080/api/auth/login
- Rejestracja (register): http://localhost:8080/api/auth/register

#### Zarządzanie zadaniami (tasks)
- Stworzenie zadania (dostępne tylko dla zalogowanego użytkownika): http://localhost:8080/api/task 
- Pobranie jednego zadania (dla twórcy): http://localhost:8080/api/task/1
- Pobranie wszystkich zadań (tylko dla administratora): http://localhost:8080/api/task
