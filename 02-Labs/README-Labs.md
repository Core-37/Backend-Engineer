# 🧪⚙️ 02. Практические Системные Лабораторные Работы (Local Labs)

> Все 3 лаборатории написаны на чистом **Python 3** (только стандартная библиотека) — запускаются мгновенно на любом Linux/macOS/Windows без установки БД или Docker.

---

## 💻 Запуск 3 локальных лабораторий

```bash
cd 02-Labs

# Лаба №1: Token Bucket Rate Limiter + Кольцо Consistent Hashing с виртуальными нодами
python3 lab01_rate_limiter_and_consistent_hashing.py

# Лаба №2: Движок хранения с Write-Ahead Log (WAL), MemTable и Crash Recovery
python3 lab02_wal_and_lsm_storage_engine.py

# Лаба №3: Circuit Breaker (Closed/Open/Half-Open) + Idempotency Keys + Exponential Backoff & Jitter
python3 lab03_circuit_breaker_and_idempotency.py
```

---

## 🔧 Полезные утилиты Linux для системного бэкенда (Arch & Ubuntu)

```bash
# Arch Linux:
sudo pacman -S strace sysstat lsof tcpdump wrk docker

# Ubuntu / Debian:
sudo apt install -y strace sysstat lsof tcpdump wrk docker.io
```

### Что попробовать на своём компьютере:
1. Посмотреть системные вызовы обычной команды `ls`:
   ```bash
   strace -c ls -la
   ```
2. Посмотреть загруженность диска и памяти в реальном времени (по методу Брендана Грегга):
   ```bash
   vmstat 1 5
   iostat -xz 1 3
   ss -s
   ```
3. Погонять бесплатный локальный HTTP-сервер нагрузочным тестом (`wrk` или `hey`) и увидеть `p99` латентность!
