# ✅📋 Чек-лист Прогресса: Backend Systems Engineer

> Отмечай `[x]` по мере освоения в Obsidian или используй интерактивные чекбоксы в [`07-Interactive-Site/index.html`](../07-Interactive-Site/index.html).

---

## 🛠️ Фаза 0–1: Ядро Linux, Память, Сокеты и Сети
- [ ] Знаю на память ключевые числа задержек (L1 кэш ~1 нс, RAM ~100 нс, NVMe SSD ~100 мкс, сеть DC ~0.5 мс, межконтинент ~100 мс).
- [ ] Понимаю разницу User Space (`Ring 3`) vs Kernel Space (`Ring 0`), накладные расходы `syscall` и отладку через `strace`.
- [ ] Разобрался с виртуальной памятью, Page Cache, OOM Killer и File Descriptors (`ulimit -n`).
- [ ] Понимаю, как работает `epoll` / `io_uring`, очереди TCP (`SYN Queue`, `Accept Queue`) и `Zero-Copy (sendfile)`.
- [ ] Знаю отличия HTTP/1.1, HTTP/2 (мультиплексирование + TCP HoL Blocking) и HTTP/3 (QUIC).
- [ ] Решил минимум 3–5 сетевых задач на **Protohackers** (напр., TCP Echo Server, Prime Time, Budget Chat).

## ⚡ Фаза 2: Язык (Go / Rust / Python), Конкурентность и Алгоритмы
- [ ] Умею объяснить 3 модели конкурентности: OS Threads vs Event Loop vs M:N Goroutines (GMP).
- [ ] Знаю, чем опасны Data Race, Deadlock, Lock Contention и как работают `Mutex`, `RWMutex` и `Atomics (CAS)`.
- [ ] Понимаю, как Garbage Collector (GC) вызывает паузы латентности `p99` и как их уменьшать.
- [ ] Освоил системные структуры: Ring Buffer, LRU Cache, Bloom Filter, Skip List, Token Bucket.
- [ ] Запустил и разобрал код **Лабы №1**: [`lab01_rate_limiter_and_consistent_hashing.py`](../02-Labs/lab01_rate_limiter_and_consistent_hashing.py).

## 🗄️ Фаза 3: Внутреннее устройство БД (PostgreSQL & Redis)
- [ ] Понимаю, как работает `WAL (Write-Ahead Log)` + `fsync()` и восстановление после сбоя (Crash Recovery).
- [ ] Чётко различаю `B+Tree` (Postgres/MySQL) и `LSM-Tree` (RocksDB/Cassandra: MemTable, SSTable, Compaction, Bloom Filter).
- [ ] Понимаю `MVCC` в Postgres (`xmin/xmax`), проблему `Dead Tuples` и работу `Autovacuum`.
- [ ] Знаю уровни изоляции (`Read Committed`, `Repeatable Read`, `Serializable`), `Write Skew` и `SELECT FOR UPDATE`.
- [ ] Умею читать `EXPLAIN (ANALYZE, BUFFERS)` и знаю, зачем нужен `PgBouncer` (Transaction Pooling).
- [ ] Понимаю угрозы кэша Redis (`Cache Stampede / Singleflight`, `Cache Penetration / Bloom Filter`, Eviction LRU/LFU).
- [ ] Запустил и изучил **Лабу №2**: [`lab02_wal_and_lsm_storage_engine.py`](../02-Labs/lab02_wal_and_lsm_storage_engine.py).

## 📨 Фаза 4: gRPC, Kafka и Отказоустойчивость микросервисов
- [ ] Понимаю бинарный формат Protobuf, потоки gRPC и необходимость дедлайнов (`context.WithTimeout`).
- [ ] Разобрался в устройстве Kafka: топики, партиции, offsets, Consumer Groups и гарантии порядка.
- [ ] Знаю, как решать проблему Dual Write через **Transactional Outbox + CDC**.
- [ ] Понимаю паттерны: **Idempotency Keys**, **Retry + Exponential Backoff + Full Jitter**, **Circuit Breaker**, **Bulkhead**.
- [ ] Запустил и изучил **Лабу №3**: [`lab03_circuit_breaker_and_idempotency.py`](../02-Labs/lab03_circuit_breaker_and_idempotency.py).

## 🌐 Фаза 5: Распределённые системы (DDIA & MIT 6.5840)
- [ ] Понимаю **CAP** и **PACELC** без мифов (что происходит с системой при Network Partition и без него).
- [ ] Знаю формулу кворума `R + W > N`, проблему Replication Lag и чтения своих записей (Read-Your-Own-Writes).
- [ ] Умею проектировать шардирование и решать проблему горячего ключа (Celebrity Problem).
- [ ] Разобрался в алгоритме консенсуса **Raft** (Leader Election, Term, Split-Brain), Fencing Tokens и **Saga**.
- [ ] Прошёл минимум первые 3–4 челленджа **Fly.io Gossip Glomers** (и посмотрел лекции **MIT 6.5840**).

## 🚀 Фаза 6–7: High-Load, Контейнеры, SRE и System Design
- [ ] Различаю балансировщики L4 и L7 и умею настраивать **Graceful Shutdown** без обрыва запросов.
- [ ] Понимаю, как устроен Docker на уровне ядра Linux (`Namespaces`, `cgroups`, `OverlayFS`) и пробы K8s (Liveness vs Readiness).
- [ ] Настраиваю Observability: метрики RED/USE (`p95/p99`), структурные JSON-логи с `trace_id`, OpenTelemetry-трейсы.
- [ ] Знаю 10 команд диагностики Linux за 60 секунд по Брендану Греггу (`vmstat`, `iostat`, `mpstat`, `pidstat`, `ss`).
- [ ] Построил минимум **3 из 5 системных проектов** для GitHub и потренировался решать задачи **System Design за 45 минут**.
