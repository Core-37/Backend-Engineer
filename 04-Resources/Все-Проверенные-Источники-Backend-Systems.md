# 🌍📚 Все Проверенные Источники: Backend Systems Engineer

> Подборка мировых книг-библий, университетских курсов с открытыми лекциями и лабами, практических тренажёров и эталонных GitHub-репозиториев.

---

## 📖 1. Главные Книги-Фундамент (Читать обязательно)

1. **Martin Kleppmann — *Designing Data-Intensive Applications (DDIA)* («Высоконагруженные приложения»):**
   - Абсолютная библия №1 для любого Backend Systems Engineer: устройство БД, WAL, LSM/B-Tree, репликация, шардирование, транзакции, консенсус и потоковая обработка.
2. **Alex Petrov — *Database Internals* («Внутреннее устройство баз данных»):**
   - Глубокий разбор B-Tree, LSM-деревьев и распределённого консенсуса (Paxos, Raft).
3. **Brendan Gregg — *Systems Performance: Enterprise and the Cloud*:**
   - Библия по внутреннему устройству Linux, диагностике CPU, памяти, дисков, сети, профилированию и eBPF.
4. **Alex Xu — *System Design Interview (Vol. 1 & Vol. 2)*:**
   - Лучшая практическая тренировка проектирования реальных систем с расчётами RPS/памяти.

---

## 🎓 2. Бесплатные Университетские Курсы (Уровень MIT & CMU)

1. **MIT 6.5840 (ранее 6.824) — Distributed Systems:**
   - 🔗 https://pdos.csail.mit.edu/6.824/
   - *Суть:* лекции профессора Роберта Морриса + знаменитые лабы на **Go** (сборка MapReduce, отказоустойчивого KV-сервера на **Raft** и шардированного хранилища!).
2. **CMU 15-445 / 15-645 — Intro to Database Systems (Andy Pavlo):**
   - 🔗 https://15445.courses.cs.cmu.edu/
   - *Суть:* блестящие лекции на YouTube и лабы по написанию реального движка СУБД (Buffer Pool Manager, B+Tree, MVCC, Lock Manager).
3. **OSTEP — *Operating Systems: Three Easy Pieces* (Бесплатный учебник ОС):**
   - 🔗 https://pages.cs.wisc.edu/~remzi/OSTEP/
   - *Суть:* лучшее в мире простое объяснение виртуализации CPU, памяти, потоков, мьютексов и файловых систем.
4. **Beej’s Guide to Network Programming (Бесплатно):**
   - 🔗 https://beej.us/guide/bgnet/
   - *Суть:* классика по работе с сокетами, `poll`/`select`, TCP/UDP.

---

## 💻 3. Лучшие Бесплатные Практические Тренажёры

1. **Protohackers (Сетевое программирование на сокетах):**
   - 🔗 https://protohackers.com/
   - *Зачем:* серия реальных сетевых задач (Echo, Prime Time, Budget Chat, Line Reversal поверх UDP) — учит работать с байтовыми потоками, буферами и высокой конкурентностью без фреймворков.
2. **Fly.io Distributed Systems Challenges (*Gossip Glomers*, создано с Kyle Kingsbury / Aphyr):**
   - 🔗 https://fly.io/dist-sys/
   - *Зачем:* 6 пошаговых задач по распределённым системам, которые тестирует симулятор Maelstrom (Jepsen) с реальными потерями пакетов и разрывами сети!
3. **SadServers (Отладка сломанного Linux в браузере):**
   - 🔗 https://sadservers.com/
   - *Зачем:* набивать руку на поиске зависших процессов, забитых дисков, портов и сломанного Postgres.
4. **PostgreSQL Exercises (`pgexercises.com`) & Use The Index, Luke:**
   - 🔗 https://pgexercises.com/ • 🔗 https://use-the-index-luke.com/

---

## 🐙 4. Эталонные GitHub-Репозитории и Инженерные Блоги

1. **`donnemartin/system-design-primer`** — 🔗 https://github.com/donnemartin/system-design-primer *(главный каталог паттернов масштабирования и расчётов).*
2. **`codecrafters-io/build-your-own-x`** — 🔗 https://github.com/codecrafters-io/build-your-own-x *(как с нуля написать свой Redis, свою БД, свой HTTP-сервер или Docker).*
3. **`binhnguyennus/awesome-scalability`** — 🔗 https://github.com/binhnguyennus/awesome-scalability *(архитектурные кейсы реальных high-load компаний).*
4. **Инженерные блоги (Must Read):**
   - **Cloudflare Blog** (https://blog.cloudflare.com/) — статьи про eBPF, Pingora, DDoS, HTTP/3, Ring Buffers.
   - **High Scalability** (http://highscalability.com/) и **ByteByteGo** (https://blog.bytebytego.com/).
   - **AWS Builders’ Library** (https://aws.amazon.com/builders-library/) — статьи про Timeouts, Retries with Jitter, Avoiding Overload и Shuffle Sharding!
