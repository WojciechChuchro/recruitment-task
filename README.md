## Konfiguracja Środowiska oraz Bazy Danych

### Krok 1: Uruchomienie kontenera Docker
Aby rozpocząć, wykonaj poniższą komendę w terminalu, aby uruchomić kontenery Docker:
`docker-compose up -d`
### Krok 2: Pobranie zależności
Przejdź do folderu /server i wykonaj poniższą komendę, aby zainstalować niezbędne zależności:
`cd server`
`npm install`

### Krok 3: Włączenie serwera
Z folderu /server wykonaj poniższą komendę:
`npm start`

### Krok 4: Wykonanie migracji
Wszystkie poniższe komendy muszą być wywoływane z folderu server/src/database
Następnie, aby utworzyć schemat bazy danych, użyj poniższej komendy migracji:
`npx knex migrate:latest --knexfile knexfile.ts`

### Krok 5: Załadowanie danych początkowych
Aby wypełnić bazę danych danymi początkowymi, wykonaj komendę seed:
`npx knex seed:run`

### Krok 6: Cofnięcie migracji
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
- Pobranie jednego zadania (dla twórcy): http://localhost:8080/api/task/id
- Pobranie wszystkich zadań (tylko dla administratora): http://localhost:8080/api/task
