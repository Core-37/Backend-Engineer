<div align="center">

# ⚙️🖥️ Backend Systems Engineer Roadmap — Zero-to-Senior Architecture & Labs (`Core-37`)

**Полный системный роадмап, учебник-энциклопедия, 6 архитектурных SVG-схем, 45+ карточек-вспоминанок, 3 локальные Python-лаборатории и интерактивный сайт для становления Backend Systems Engineer.**

![Focus](https://img.shields.io/badge/Focus-Backend%20%26%20Systems%20Engineering-0ea5e9?style=for-the-badge)
![Core](https://img.shields.io/badge/OS%20%26%20Net-Linux%20Kernel%20%7C%20epoll%20%7C%20TCP%2FgRPC-10b981?style=for-the-badge)
![Data](https://img.shields.io/badge/Storage-PostgreSQL%20MVCC%20%7C%20WAL%20%7C%20Redis%20%7C%20Kafka-f59e0b?style=for-the-badge)
![Scale](https://img.shields.io/badge/Scale-CAP%20%7C%20Raft%20%7C%20Sharding%20%7C%20SRE-8b5cf6?style=for-the-badge)
![Author](https://img.shields.io/badge/Author-Core--37-111827?style=for-the-badge)

</div>

---

## 🌐 1. Открой Интерактивную Платформу + Окно Маленьких Вспоминанок

Открой в браузере файл **[`07-Interactive-Site/index.html`](07-Interactive-Site/index.html)**:
- 🧭 **14 разделов**: полная карта Фаз 0–7 от системного фундамента Linux и сокетов до High-Load, БД, распределённых систем, SRE и System Design Interview.
- 🧠 **Отдельное плавающее «Окно Маленьких Вспоминанок» (`Alt + M`)**: выдвигается поверх любого урока, содержит **45+ микро-карточек** (латентности памяти/диска/сети, `epoll`, `MVCC`, `WAL`, `CAP`, `Raft`, диагностика Linux за 60 секунд), режим самопроверки `🙈 Скрыть ответы` и поле для твоих личных заметок.
- 🖼️ **6 широкоформатных SVG-схем пути** (от сетевой карты NIC до Worker Pool, от `WAL` до `B-Tree/LSM`, от CDN до Sharded DB, CAP/Consistent Hashing и SRE Observability).
- ⇄ **Интерактивные справочники**: диагностика Linux (метод Брендана Грегга), SQL `EXPLAIN ANALYZE`, бытовые аналогии и трекер прогресса.

---

## 🖼️ 2. Визуальная Карта Роадмапа

![Полный маршрут Backend Systems Engineer](05-Assets/01_backend_systems_engineer_roadmap.svg)

---

## 🗂️ 3. Структура Репозитория (Obsidian & GitHub)

| Папка / Файл | Что внутри | Главные материалы |
| :--- | :--- | :--- |
| **`00-Roadmap/`** | Полная программа Фаз 0–7 и трекер прогресса | [`Полный-Роадмап-Backend-Systems-Engineer.md`](00-Roadmap/Полный-Роадмап-Backend-Systems-Engineer.md) • [`Чек-лист-Прогресса-Backend-Systems.md`](00-Roadmap/Чек-лист-Прогресса-Backend-Systems.md) |
| **`01-Theory-Notes/`** | 4 глубоких учебника по системному бэкенду | [`01-Ядро-Linux-Память-Сети-и-Сокеты.md`](01-Theory-Notes/01-Ядро-Linux-Память-Сети-и-Сокеты.md) • [`02-Языки-Алгоритмы-и-Многопоточность.md`](01-Theory-Notes/02-Языки-Алгоритмы-и-Многопоточность.md) • [`03-Базы-Данных-PostgreSQL-Redis-и-Kafka.md`](01-Theory-Notes/03-Базы-Данных-PostgreSQL-Redis-и-Kafka.md) • [`04-Распределенные-Системы-HighLoad-и-SRE.md`](01-Theory-Notes/04-Распределенные-Системы-HighLoad-и-SRE.md) |
| **`02-Labs/`** | 3 рабочие системные Python-лабы (без внешних зависимостей) | [`README-Labs.md`](02-Labs/README-Labs.md) • [`lab01_rate_limiter_and_consistent_hashing.py`](02-Labs/lab01_rate_limiter_and_consistent_hashing.py) • [`lab02_wal_and_lsm_storage_engine.py`](02-Labs/lab02_wal_and_lsm_storage_engine.py) • [`lab03_circuit_breaker_and_idempotency.py`](02-Labs/lab03_circuit_breaker_and_idempotency.py) |
| **`03-Cheatsheets-and-Flashcards/`** | Шпаргалки для отладки, SQL и 45+ карточек | [`Окно-Быстрых-Вспоминанок-Backend.md`](03-Cheatsheets-and-Flashcards/Окно-Быстрых-Вспоминанок-Backend.md) • [`Шпаргалка-Системная-Отладка-SQL-и-Архитектура.md`](03-Cheatsheets-and-Flashcards/Шпаргалка-Системная-Отладка-SQL-и-Архитектура.md) |
| **`04-Resources/`** | Книги, университеты (MIT 6.5840, CMU 15-445), тренажёры и GitHub | [`Все-Проверенные-Источники-Backend-Systems.md`](04-Resources/Все-Проверенные-Источники-Backend-Systems.md) |
| **`05-Assets/`** | 6 детальных архитектурных SVG-схем | [`05-Галерея-Схем-Backend-Systems.md`](05-Assets/05-Галерея-Схем-Backend-Systems.md) |
| **`06-Projects-and-Interview/`** | 5 системных проектов для GitHub + алгоритм System Design | [`06-5-Проектов-Портфолио-и-System-Design-Interview.md`](06-Projects-and-Interview/06-5-Проектов-Портфолио-и-System-Design-Interview.md) |
| **`07-Interactive-Site/`** | Интерактивный веб-сайт обучения и трекер | [`index.html`](07-Interactive-Site/index.html) |

---

## 🧪 4. Быстрый запуск 3 системных Python-лабораторий

```bash
cd 02-Labs
python3 lab01_rate_limiter_and_consistent_hashing.py  # Token Bucket + Consistent Hashing с виртуальными нодами
python3 lab02_wal_and_lsm_storage_engine.py          # Движок БД с WAL, MemTable и Crash Recovery
python3 lab03_circuit_breaker_and_idempotency.py     # Circuit Breaker, Idempotency Keys и Backoff + Jitter
```

---

## 🚀 Выгрузка в отдельный GitHub-репозиторий

```bash
chmod +x push_to_github.sh
./push_to_github.sh https://github.com/<ТВОЙ_ЛОГИН>/<НОВЫЙ_РЕПОЗИТОРИЙ>.git
```
