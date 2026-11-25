window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.RECALL_FLASHCARDS = [
  { id: "s1", tag: "os", q: "Задержки: RAM vs NVMe SSD vs DC-сеть vs Межконтинент?", a: "RAM ~100 нс • NVMe SSD ~100 мкс (в 1000× медленнее RAM) • 1 DC ~0.5 мс • Межконтинент ~100 мс!", cmd: "1 сетевой вызов ≈ 10k операций в RAM" },
  { id: "s2", tag: "os", q: "Ring 0 (Kernel) vs Ring 3 (User) — цена системного вызова?", a: "Программа в Ring 3 обращается к диску/сети через syscall (read, write, epoll_wait). Миллионы мелких syscall тормозят — нужен батчинг!", cmd: "strace -c -p <PID>" },
  { id: "s3", tag: "os", q: "free -m показывает мало free, но много buff/cache. Паника?", a: "Нет! Linux использует пустую RAM под Page Cache (ускоряет файлы и БД) и мгновенно вернёт её. Смотри колонку available!", cmd: "free -m" },
  { id: "s4", tag: "os", q: "Как найти, кого убил OOM Killer?", a: "Когда RAM реально кончается, ядро Linux убивает самый тяжёлый процесс.", cmd: "dmesg -T | grep -i -E 'oom|killed'" },
  { id: "s5", tag: "os", q: "Почему epoll быстрее select/poll?", a: "select/poll перебирают все сокеты O(N), а epoll через epoll_wait() отдаёт только готовые сокеты из очереди ядра O(1).", cmd: "Основа Go netpoller, Nginx, Redis" },
  { id: "s6", tag: "os", q: "Зачем нужно новое ядро io_uring?", a: "Два кольцевых буфера в общей RAM между ядром и приложением — почти ноль дорогих syscall!", cmd: "Submission Queue + Completion Queue" },
  { id: "s7", tag: "os", q: "Что такое Zero-Copy (sendfile)?", a: "Передача файла из Page Cache ядра прямо в сетевую карту через DMA, вообще не копируя данные в память приложения!", cmd: "Секрет скорости Kafka и Nginx" },
  { id: "s8", tag: "os", q: "SYN Queue vs Accept Queue (somaxconn) в TCP?", a: "В SYN Queue ждут ACK, готовые соединения ждут accept() в Accept Queue. Переполнение видно в Recv-Q!", cmd: "ss -lnt" },
  { id: "s9", tag: "os", q: "Почему короткие HTTP-запросы забивают порты в TIME_WAIT?", a: "Закрытый TCP-сокет держит порт 60 секунд. Лечится HTTP Keep-Alive и переиспользованием пула соединений!", cmd: "ss -s" },
  { id: "s10", tag: "os", q: "Главный минус HTTP/2 по сравнению с HTTP/3 (QUIC)?", a: "В HTTP/2 все потоки идут в 1 TCP — потеря 1 пакета замораживает ВСЕ потоки (TCP HoL Blocking). HTTP/3 работает на UDP!", cmd: "TLS 1.3 встроен прямо в QUIC" },

  { id: "s11", tag: "code", q: "OS Thread vs Go Goroutine (размер стека и модель)?", a: "OS Thread ~1–8 МБ; горутина в модели G-M-P стартует с ~2 КБ и планировщик переносит её поверх ядер CPU при ожидании сети.", cmd: "GOMAXPROCS + Work Stealing" },
  { id: "s12", tag: "code", q: "Главная опасность в Single-Thread Event Loop (Redis/Node)?", a: "Долгая CPU-операция или синхронный I/O заморозит все тысячи подключённых клиентов одновременно!", cmd: "Не вызывать KEYS * в Redis!" },
  { id: "s13", tag: "code", q: "Mutex vs RWMutex vs Atomics (CAS)?", a: "Mutex = 1 поток; RWMutex = много читателей ИЛИ 1 писатель; Atomics = 1 инструкция CPU без блокировки ядра.", cmd: "go test -race ./..." },
  { id: "s14", tag: "code", q: "Как лечить Lock Contention в горячем кэше?", a: "Sharded Map: разбить кэш на 64/256 сегментов со своим отдельным мьютексом на каждый сегмент.", cmd: "Снимает очередь из 64 ядер" },
  { id: "s15", tag: "code", q: "Что такое False Sharing?", a: "Два разных счётчика для разных ядер CPU лежат в одной 64-байтной кэш-линии RAM и постоянно сбрасывают L1 кэш друг друга!", cmd: "Лечится padding до 64 байт" },
  { id: "s16", tag: "code", q: "Зачем нужен Bloom Filter в базах и кэше?", a: "Отвечает в RAM: 'Точно НЕТ (100%)' или 'Возможно ЕСТЬ'. Не пускает запросы к несуществующим ключам на диск!", cmd: "Защита от Cache Penetration" },
  { id: "s17", tag: "code", q: "Чем Token Bucket удобнее жёсткого счётчика RPS?", a: "Пропускает короткий всплеск (Burst) до размера ведра, но строго держит среднюю скорость пополнения.", cmd: "python3 lab01_rate_limiter..." },

  { id: "s18", tag: "db", q: "Зачем в БД нужен Write-Ahead Log (WAL) + fsync()?", a: "Сначала пишем операцию в конец журнала на диск (append-only + fsync), потом обновляем RAM. При сбое БД восстановится по WAL!", cmd: "python3 lab02_wal_and_lsm..." },
  { id: "s19", tag: "db", q: "B+Tree (PostgreSQL) vs LSM-Tree (RocksDB/Cassandra)?", a: "B+Tree — чтение и диапазоны (обновление на месте); LSM-Tree — рекордная запись (MemTable -> SSTable + Compaction).", cmd: "LSM + Bloom Filter" },
  { id: "s20", tag: "db", q: "Как работает MVCC в PostgreSQL (xmin/xmax)?", a: "При UPDATE старая строка не затирается — создаётся новая версия с номерами транзакций. Читатели не блокируют писателей!", cmd: "Цена MVCC -> Dead Tuples" },
  { id: "s21", tag: "db", q: "Зачем в PostgreSQL работает Autovacuum?", a: "Удаляет старые мёртвые версии строк (Dead Tuples), предотвращая раздувание таблиц (Bloat) и переполнение XID.", cmd: "Долгие транзакции мешают Vacuum!" },
  { id: "s22", tag: "db", q: "Уровень изоляции по умолчанию в Postgres и как безопасно списать деньги?", a: "По умолчанию Read Committed! Для баланса бери SELECT ... FOR UPDATE (строку блокируем до COMMIT) в едином порядке ID!", cmd: "Или уровень Serializable (SSI)" },
  { id: "s23", tag: "db", q: "Зачем ставят PgBouncer перед PostgreSQL?", a: "Каждое подключение Postgres = отдельный процесс ОС (~10 МБ). PgBouncer (Transaction Pooling) мультиплексирует 5,000 юзеров на 40 коннектов!", cmd: "pool_mode = transaction" },
  { id: "s24", tag: "db", q: "Правило левого префикса для индекса (user_id, created_at)?", a: "Работает для WHERE user_id=? и для (user_id, created_at), но НЕ работает для одного WHERE created_at=?.", cmd: "EXPLAIN (ANALYZE, BUFFERS)" },
  { id: "s25", tag: "db", q: "Как создать индекс в проде Postgres БЕЗ остановки записи?", a: "Использовать CREATE INDEX CONCURRENTLY — собирает индекс в фоне, не блокируя INSERT/UPDATE.", cmd: "CREATE INDEX CONCURRENTLY idx ON t(col);" },
  { id: "s26", tag: "db", q: "Что убивает PostgreSQL при пагинации OFFSET 1000000?", a: "База читает и выкидывает 1,000,000 строк! Заменяй на Keyset / Cursor Pagination: WHERE id > last_id LIMIT 20.", cmd: "O(log N) вместо O(N)" },
  { id: "s27", tag: "db", q: "Как спасаются от Cache Stampede при протухании горячего ключа Redis?", a: "Singleflight (1 запрос идёт в БД, остальные 9,999 ждут в памяти) + случайный Jitter к времени TTL!", cmd: "Singleflight + TTL Jitter" },

  { id: "s28", tag: "msg", q: "Почему в gRPC/HTTP всегда ставят Timeout (context.WithTimeout)?", a: "Без дедлайна зависший сервис внизу цепочки съест все потоки/горутины и положит всю систему каскадом!", cmd: "Deadline propagation в gRPC" },
  { id: "s29", tag: "msg", q: "Где гарантируется порядок сообщений в Apache Kafka?", a: "Только внутри ОДНОЙ партиции (ключ order_id/user_id). Макс. число воркеров в Consumer Group = числу партиций!", cmd: "Partition Key -> Order" },
  { id: "s30", tag: "msg", q: "Dual Write Problem и Transactional Outbox Pattern?", a: "Нельзя отдельно писать в БД и в Kafka (между ними пропадёт сеть). Пишем заказ + событие в таблицу outbox в 1 ACID-транзакции!", cmd: "Debezium CDC читает WAL outbox" },
  { id: "s31", tag: "msg", q: "Зачем передавать Idempotency-Key в API оплаты?", a: "При повторном запросе из-за сбоя сети сервер вернёт старый чек, а деньги спишутся ровно 1 раз!", cmd: "python3 lab03_circuit_breaker..." },
  { id: "s32", tag: "msg", q: "Три состояния Circuit Breaker?", a: "CLOSED (работает) -> OPEN (серия ошибок, мгновенный отказ без ожидания сети) -> HALF_OPEN (1 пробный запрос).", cmd: "Защита от каскадного отказа" },
  { id: "s33", tag: "msg", q: "Зачем в Retry добавляют Exponential Backoff + Full Jitter?", a: "Чтобы 10,000 клиентов не повторяли запросы в одну секунду синхронно (защита от Retry Storm!).", cmd: "random(0, min(cap, base * 2^attempt))" },

  { id: "s34", tag: "dist", q: "Что реально выбирают по теореме CAP и PACELC?", a: "Разрыв сети (P) неизбежен: выбираем CP (ошибка вместо старых данных, etcd) или AP (ответ всегда, Cassandra). PACELC: в норме Latency vs Consistency.", cmd: "CA не бывает в распределённой сети" },
  { id: "s35", tag: "dist", q: "Формула кворума в распределённых БД?", a: "R + W > N (напр. N=3, W=2, R=2) — множества чтения и записи гарантированно пересекутся хотя бы на 1 свежем узле!", cmd: "Dynamo / Cassandra Quorum" },
  { id: "s36", tag: "dist", q: "Чем Consistent Hashing лучше hash(key) % N?", a: "При добавлении 4-й ноды в hash % N слетает 75%+ ключей; в Consistent Hashing с виртуальными нодами переедет лишь ~25% (1/N)!", cmd: "Virtual Nodes убирают перекос" },
  { id: "s37", tag: "dist", q: "Зачем в кластере Raft (etcd/Consul) нечётное число узлов (3 или 5)?", a: "Чтобы при разрыве сети только одна сторона могла собрать большинство (N/2 + 1) и не возник Split-Brain!", cmd: "3 ноды терпят 1 отказ, 5 -> 2" },
  { id: "s38", tag: "dist", q: "Что такое Fencing Token в Distributed Locks?", a: "Монотонно растущий номер (33, 34): если процесс проснулся после паузы GC с протухшим lock #33, база отвергнет его запись!", cmd: "Защита от пауз GC в распределёнке" },
  { id: "s39", tag: "dist", q: "Почему нельзя верить часам NTP на серверах для порядка событий и таймаутов?", a: "Физические часы разъезжаются и могут прыгнуть НАЗАД! Для порядка — Lamport Clocks/UUIDv7; для таймаутов — monotonic clock.", cmd: "time.monotonic() / time.Now() Go" },
  { id: "s40", tag: "dist", q: "Паттерн Saga vs 2PC (Two-Phase Commit)?", a: "2PC блокирует все БД и висит при падении координатора. Saga делает локальные транзакции и откатывает шаги компенсирующими событиями!", cmd: "Choreography vs Orchestration" },
  { id: "s41", tag: "dist", q: "L4 vs L7 Load Balancer?", a: "L4 (IPVS/NLB) маршрутизирует по IP+Port на скорости ядра; L7 (Envoy/Nginx) читает HTTP URL, заголовки, TLS и режет RPS.", cmd: "L4 перед L7 в High-Load" },
  { id: "s42", tag: "dist", q: "Из каких 3 механизмов Linux состоит Docker?", a: "Namespaces (изоляция процессов/сети), cgroups (лимиты CPU и RAM) и OverlayFS (слои образов).", cmd: "Нет никакой магии гипервизора!" },
  { id: "s43", tag: "dist", q: "Правильный порядок Graceful Shutdown сервиса?", a: "Readiness=503 (уйти из LB) -> дождаться текущих запросов -> закрыть пулы БД/Kafka -> exit(0).", cmd: "Обработка SIGTERM без 502 ошибок" },
  { id: "s44", tag: "dist", q: "Почему метрики смотрят по p95 и p99, а не по среднему (Avg)?", a: "Среднее скрывает 1–5% клиентов, у которых страница грузится по 3 секунды (Tail Latency).", cmd: "RED (Rate, Errors, Duration)" },
  { id: "s45", tag: "dist", q: "Первые 5 команд Брендана Грегга за 60 секунд?", a: "uptime -> dmesg -T | tail -> vmstat 1 -> mpstat -P ALL 1 -> pidstat 1 (+ iostat -xz 1 & ss -s)!", cmd: "Выявляет CPU, RAM, OOM, Swap, Disk, Сеть" }
];

window.ACADEMY_DATA.phase3 = {
  id: "phase3",
  title: "🗄️ Фаза 3: Внутренности БД (Postgres & Redis)",
  badge: "Недели 10–14 • Лаба №2",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-amber">💾 WAL + fsync</span>
        <span class="badge badge-blue">🌳 B+Tree vs LSM-Tree</span>
        <span class="badge badge-emerald">🐘 MVCC • Autovacuum • PgBouncer</span>
        <span class="badge badge-rose">⚡ Redis Stampede &amp; Bloom</span>
      </div>
      <h1 class="hero-title">Фаза 3 — Базы Данных Изнутри: PostgreSQL, LSM-Движки и Кэширование в Redis</h1>
      <p class="hero-desc">
        90% проблем производительности бэкенда сидят в базе данных. Разбираем, как данные реально лежат на диске, почему читатели не ждут писателей в Postgres и как не положить базу при протухании кэша.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/03_database_internals_btree_lsm_mvcc.svg" alt="Внутреннее устройство БД: WAL, B+Tree vs LSM-Tree, MVCC" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Путь записи WAL, сравнение B+Tree vs LSM-Tree, MVCC (xmin/xmax) и PgBouncer</div>
    </div>

    <h2 class="section-heading">🐘 1. PostgreSQL: WAL, MVCC, Изоляция и PgBouncer</h2>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">🔄 MVCC и Autovacuum</div>
        <p style="font-size:0.88rem; color:var(--text-secondary);">
          При <code class="inline-code">UPDATE</code> Postgres не перезаписывает старую строку: он ставит старой версии <code class="inline-code">xmax</code> (когда умерла) и создаёт новую версию строки с <code class="inline-code">xmin</code>. Старые транзакции читают свой снимок без блокировок!<br><br>
          Мёртвые версии (<code class="inline-code">Dead Tuples</code>) чистит фоновый <strong>Autovacuum</strong>. Не оставляй долгие незакрытые транзакции (<code class="inline-code">idle in transaction</code>) — они мешают Vacuum чистить базу!
        </p>
      </div>
      <div class="card">
        <div class="card-title">🔌 Зачем PgBouncer и что убивает индексы?</div>
        <p style="font-size:0.88rem; color:var(--text-secondary);">
          • В Postgres 1 клиент = 1 процесс ОС (~10 МБ RAM). <strong>PgBouncer (Transaction Pooling)</strong> держит 3,000 клиентов поверх 40 реальных соединений!<br>
          • Составной индекс <code class="inline-code">(user_id, created_at)</code> работает слева направо. Собирай индексы на проде только через <code class="inline-code">CREATE INDEX CONCURRENTLY</code>!<br>
          • Вместо медленного <code class="inline-code">OFFSET 1000000</code> используй <strong>Keyset Pagination</strong>: <code class="inline-code">WHERE id &gt; last_id LIMIT 20</code>.
        </p>
      </div>
    </div>

    <h2 class="section-heading">⚡ 2. Redis: 3 Смертельные Проблемы Кэша и Как их Лечить</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Проблема</th><th>Что происходит</th><th>Системное решение</th></tr></thead>
        <tbody>
          <tr><td><strong>Cache Stampede (Thundering Herd)</strong></td><td>Горячий ключ протух, и 10,000 запросов в 1 мс летят в PostgreSQL!</td><td><strong>Singleflight</strong> (в БД идёт 1 запрос, остальные ждут) + <strong>Random Jitter</strong> к TTL</td></tr>
          <tr><td><strong>Cache Penetration</strong></td><td>Шлют миллион запросов к несуществующим <code class="inline-code">id=-1</code> мимо кэша в БД</td><td>Фильтровать через <strong>Bloom Filter</strong> до похода в базу или кэшировать пустышки</td></tr>
          <tr><td><strong>Блокировка 1-поточного Redis</strong></td><td>Вызов <code class="inline-code">KEYS *</code> на 10M ключей заморозит весь Redis на секунды</td><td>Всегда использовать курсорный <code class="inline-code">SCAN</code> и ограничивать размеры списков</td></tr>
        </tbody>
      </table>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №2:</strong> Запусти наш мини-движок хранилища с <strong>Write-Ahead Log (WAL + fsync)</strong>, <strong>MemTable</strong> и симуляцией краша сервера (Crash Recovery):<br>
      <code class="inline-code">python3 02-Labs/lab02_wal_and_lsm_storage_engine.py</code>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b3-1"><input type="checkbox"><span>Понимаю WAL + fsync, отличие B+Tree (Postgres) от LSM-Tree (RocksDB) и MVCC.</span></div>
      <div class="check-row" data-check-id="b3-2"><input type="checkbox"><span>Запустил <code class="inline-code">lab02_wal_and_lsm_storage_engine.py</code> и увидел восстановление из WAL после потери памяти.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase4 = {
  id: "phase4",
  title: "📨 Фаза 4: gRPC, Kafka и Отказоустойчивость",
  badge: "Недели 15–18 • Лаба №3",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">📡 gRPC &amp; Protobuf</span>
        <span class="badge badge-amber">📨 Apache Kafka &amp; Zero-Copy</span>
        <span class="badge badge-emerald">🛡️ Transactional Outbox • Idempotency • Circuit Breaker</span>
      </div>
      <h1 class="hero-title">Фаза 4 — Коммуникация Микросервисов и Паттерны Выживания при Сбоях</h1>
      <p class="hero-desc">
        В распределённой системе сеть ВСЕГДА рвётся, сервисы тормозят, а сообщения приходят по 2 раза. Учимся строить сервисы, которые не теряют деньги и не падают по эффекту домино.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/04_highload_architecture_request_path.svg" alt="Путь запроса в High-Load системе" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Путь от CDN и L4/L7 LB до gRPC, Redis, Sharded Postgres, Outbox ➔ Kafka и расчёт RPS</div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">📨 Apache Kafka и Transactional Outbox</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Порядок в Kafka:</strong> гарантируется ТОЛЬКО внутри 1 партиции (ключ — <code class="inline-code">order_id</code>). Максимум активных воркеров = числу партиций!</li>
          <li><strong>Dual Write Problem:</strong> нельзя «записать в БД, потом отправить в Kafka» (между шагами может пропасть сеть).</li>
          <li><strong>Решение — Outbox Pattern:</strong> пишем заказ + событие в таблицу <code class="inline-code">outbox</code> в <strong>ОДНОЙ ACID-транзакции БД</strong>, а Debezium (CDC из WAL) доставляет его в Kafka!</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">🛡️ 4 Столпа Отказоустойчивости</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Timeouts + Context:</strong> жёсткий дедлайн на каждый вызов gRPC/HTTP.</li>
          <li><strong>Retry + Exponential Backoff + Full Jitter:</strong> случайный разброс паузы спасает БД от волны <em>Retry Storm</em>!</li>
          <li><strong>Circuit Breaker:</strong> при серии ошибок мгновенно открывается (<code class="inline-code">OPEN</code>), не давая потокам зависнуть.</li>
          <li><strong>Idempotency-Key:</strong> защищает от двойного списания денег при сетевом повторе!</li>
        </ul>
      </div>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №3:</strong> Запусти наш локальный стенд, показывающий <strong>Circuit Breaker (Closed/Open/Half-Open)</strong>, <strong>Idempotency Keys</strong> и <strong>Full Jitter</strong>:<br>
      <code class="inline-code">python3 02-Labs/lab03_circuit_breaker_and_idempotency.py</code>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b4-1"><input type="checkbox"><span>Понимаю партиции Kafka, Transactional Outbox, Idempotency-Key и Circuit Breaker.</span></div>
      <div class="check-row" data-check-id="b4-2"><input type="checkbox"><span>Запустил <code class="inline-code">lab03_circuit_breaker_and_idempotency.py</code> и разобрал все 3 сценария.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase5 = {
  id: "phase5",
  title: "🌐 Фаза 5: Распределённые Системы (DDIA)",
  badge: "Недели 19–24 • MIT 6.5840",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">⚖️ CAP &amp; PACELC</span>
        <span class="badge badge-cyan">💍 Consistent Hashing</span>
        <span class="badge badge-emerald">👑 Raft • Quorum R+W&gt;N • Saga</span>
      </div>
      <h1 class="hero-title">Фаза 5 — Распределённые Системы (Kleppmann DDIA &amp; MIT 6.5840)</h1>
      <p class="hero-desc">
        Когда данные не помещаются на один сервер, вступают законы распределённых систем: репликация, шардирование, кворум, консенсус Raft и коварные ловушки времени.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/05_distributed_systems_cap_sharding_raft.svg" alt="Распределённые системы: CAP, Consistent Hashing, Raft" onclick="openLightbox(this.src)">
      <div class="diagram-caption">CAP &amp; PACELC, Consistent Hashing Ring, Кворум R+W&gt;N, Raft и паттерн Saga</div>
    </div>

    <div class="grid-2">
      <div class="blue-box">
        <strong>👑 Консенсус Raft и Fencing Tokens</strong><br>
        Кластер (etcd, Consul, CockroachDB) всегда строят из <strong>нечётного числа нод (3, 5, 7)</strong>, чтобы при разрыве сети только одна половина собрала кворум <code class="inline-code">N/2 + 1</code> и не возник <strong>Split-Brain</strong>! Для распределённых блокировок применяют монотонные <strong>Fencing Tokens</strong> против пауз Garbage Collector.
      </div>
      <div class="arch-box">
        <strong>⏰ Ловушка часов и Паттерн Saga</strong><br>
        Часам на разных серверах (NTP) верить нельзя — они разъезжаются и даже прыгают назад! Для порядка событий используют <strong>Lamport Clocks / UUIDv7</strong>, а для таймаутов — <code class="inline-code">monotonic clock</code>. Вместо блокирующего 2PC в микросервисах применяют <strong>Saga</strong> с компенсирующими действиями!
      </div>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b5-1"><input type="checkbox"><span>Разобрался с CAP/PACELC, кворумом <code class="inline-code">R+W&gt;N</code>, Consistent Hashing и Raft.</span></div>
      <div class="check-row" data-check-id="b5-2"><input type="checkbox"><span>Попробовал распределённые челленджи <a class="res-link" href="https://fly.io/dist-sys/" target="_blank">Fly.io Gossip Glomers</a> / лекции <a class="res-link" href="https://pdos.csail.mit.edu/6.824/" target="_blank">MIT 6.5840</a>.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase67 = {
  id: "phase67",
  title: "🔭 Фаза 6–7: Контейнеры, High-Load & SRE",
  badge: "Недели 25+ • Прод & Отладка",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-emerald">🔭 Метрики RED/USE • p99 • OpenTelemetry</span>
        <span class="badge badge-cyan">🩺 Диагностика Linux за 60с (Brendan Gregg)</span>
        <span class="badge badge-rose">🐳 Namespaces &amp; cgroups • Graceful Shutdown</span>
      </div>
      <h1 class="hero-title">Фаза 6–7 — Продакшн Инфраструктура, Наблюдаемость и SRE-Диагностика</h1>
      <p class="hero-desc">
        Настоящий Backend Systems Engineer знает, как сервис изолирован внутри Linux-контейнера, как выкатывать код без единой 502-ошибки и как за 60 секунд найти причину тормозов на проде.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/06_observability_sre_troubleshooting_map.svg" alt="SRE и диагностика Linux за 60 секунд" onclick="openLightbox(this.src)">
      <div class="diagram-caption">Три столпа Observability (RED/USE, JSON-логи, OpenTelemetry) + 10 команд Брендана Грегга</div>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">🐳 Контейнеры и Graceful Shutdown</div>
        <p style="font-size:0.88rem; color:var(--text-secondary);">
          Docker = <strong>Namespaces</strong> (изоляция) + <strong>cgroups</strong> (лимиты CPU/RAM) + <strong>OverlayFS</strong>.<br><br>
          При <code class="inline-code">SIGTERM</code> сервис обязан:<br>
          1) Отдать <code class="inline-code">503</code> на Readiness Probe (уйти из балансировщика)<br>
          2) Дождаться активных запросов<br>
          3) Закрыть пулы БД/Kafka и выйти с кодом <code class="inline-code">0</code>!
        </p>
      </div>
      <div class="card">
        <div class="card-title">📊 SLI / SLO / SLA и Профилирование</div>
        <p style="font-size:0.88rem; color:var(--text-secondary);">
          • Смотри перцентили <strong>p95 / p99</strong> (среднее скрывает боль!).<br>
          • <strong>SLI</strong> (факт) ➔ <strong>SLO</strong> (цель, напр. 99.9% = 43.2 мин/мес <em>Error Budget</em>) ➔ <strong>SLA</strong> (штрафы).<br>
          • Узкие места CPU и памяти ищут через <strong>pprof + Flamegraphs</strong> и <strong>eBPF</strong>!
        </p>
      </div>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b6-1"><input type="checkbox"><span>Знаю устройство Docker (<code class="inline-code">namespaces/cgroups</code>), L4 vs L7 LB и порядок Graceful Shutdown.</span></div>
      <div class="check-row" data-check-id="b6-2"><input type="checkbox"><span>Отработал 10 команд диагностики Linux по Брендану Греггу и понял работу RED/USE/OpenTelemetry.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.projects_interview = {
  id: "projects_interview",
  title: "🚀 5 Проектов & System Design Interview",
  badge: "Портфолио • 45 мин",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-emerald">🚀 5 Системных Проектов</span>
        <span class="badge badge-amber">🎯 Схема System Design Interview (45 мин)</span>
      </div>
      <h1 class="hero-title">5 Проектов для Портфолио &amp; Алгоритм Прохождения System Design Interview</h1>
      <p class="hero-desc">Замени шаблонные CRUD-пет-проекты на системные задачи с замерами RPS, p99 и отказоустойчивости!</p>
    </div>

    <div class="card">
      <div class="card-title">🛠️ 5 Сильных Системных Проектов (на Go, Rust или Python)</div>
      <ol style="margin-left:20px; font-size:0.9rem;">
        <li><strong>Встраиваемое KV-хранилище (Мини-Redis) с WAL и TTL:</strong> TCP-сервер, <code class="inline-code">Sharded Map</code> (меньше Lock Contention), Write-Ahead Log с <code class="inline-code">fsync</code> и тест восстановления после <code class="inline-code">kill -9</code>!</li>
        <li><strong>Distributed Rate Limiter &amp; API Gateway Proxy:</strong> реверс-прокси с Token Bucket на Redis (Lua-скрипт), Circuit Breaker, JSON-логами (<code class="inline-code">trace_id</code>) и метриками Prometheus + бенчмарком <code class="inline-code">wrk/k6</code>.</li>
        <li><strong>Платёжный сервис с Transactional Outbox &amp; Idempotency:</strong> Postgres + Kafka, защита от двойного списания (<code class="inline-code">SELECT FOR UPDATE</code> + <code class="inline-code">Idempotency-Key</code>) и гарантированная доставка событий.</li>
        <li><strong>Распределённый Job Scheduler или Raft-кластер (MIT 6.5840):</strong> 3–5 узлов с выбором лидера, heartbeat и шардированием через Consistent Hashing.</li>
        <li><strong>TCP Load Balancer (L4/L7) с Health Checks &amp; Graceful Shutdown:</strong> Round Robin / Least Connections, авто-отключение мёртвых нод и ноль 502-ошибок под нагрузкой при <code class="inline-code">SIGTERM</code>.</li>
      </ol>
    </div>

    <h2 class="section-heading">🎯 Алгоритм System Design Interview за 45 Минут</h2>
    <div class="grid-2">
      <div class="blue-box"><strong>1. Требования (5–7 мин):</strong> 3–4 главные фичи + NFR (DAU, RPS чтения/записи, целевой <code class="inline-code">p99</code>, выбор CAP: CP vs AP).</div>
      <div class="arch-box"><strong>2. Расчёты (5 мин):</strong> Avg RPS ➔ Peak RPS (×3–5), объём диска за 5 лет, RAM для кэша (правило 80/20: горячие 20%).</div>
      <div class="blue-box"><strong>3. Архитектура (15 мин):</strong> Путь запроса сверху вниз: CDN ➔ LB ➔ Gateway ➔ Stateless сервисы ➔ Redis + Sharded DB + Kafka + схема БД.</div>
      <div class="arch-box"><strong>4. Deep Dive (15 мин):</strong> Сам найди узкие места: горячий ключ (Celebrity), Cache Stampede (Singleflight), Outbox/Idempotency, метрики в Grafana!</div>
    </div>
  `
};

window.ACADEMY_DATA.sources = {
  id: "sources",
  title: "🌍 Все Проверенные Источники",
  badge: "MIT • CMU • DDIA • GitHub",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">📖 Книги-Библии</span>
        <span class="badge badge-purple">🎓 MIT 6.5840 &amp; CMU 15-445</span>
        <span class="badge badge-emerald">💻 Protohackers &amp; Gossip Glomers</span>
      </div>
      <h1 class="hero-title">Золотая Коллекция Источников для Backend Systems Engineer</h1>
      <p class="hero-desc">Фундаментальные учебники, университетские курсы и практические стенды без воды.</p>
    </div>

    <div class="grid-2">
      <div class="card">
        <div class="card-title">📖 1. Главные Книги</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Martin Kleppmann — DDIA</strong> (<em>Designing Data-Intensive Applications</em>) — главная книга №1 по БД и распределённым системам.</li>
          <li><strong>Alex Petrov — Database Internals</strong> — устройство B-Tree, LSM-деревьев и консенсуса.</li>
          <li><strong>Brendan Gregg — Systems Performance</strong> — устройство Linux, сети, памяти и отладки.</li>
          <li><strong>Alex Xu — System Design Interview (Vol. 1 &amp; 2)</strong> — практика проектирования систем.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">🎓 2. Бесплатные Университеты</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><a class="res-link" href="https://pdos.csail.mit.edu/6.824/" target="_blank">MIT 6.5840 (Distributed Systems)</a> — лекции + лабы на Go (MapReduce, Raft!).</li>
          <li><a class="res-link" href="https://15445.courses.cs.cmu.edu/" target="_blank">CMU 15-445 (Database Systems, Andy Pavlo)</a> — лекции и сборка своей СУБД.</li>
          <li><a class="res-link" href="https://pages.cs.wisc.edu/~remzi/OSTEP/" target="_blank">OSTEP (Operating Systems: Three Easy Pieces)</a> — бесплатный учебник ОС.</li>
          <li><a class="res-link" href="https://beej.us/guide/bgnet/" target="_blank">Beej’s Guide to Network Programming</a> — классика сокетов.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">💻 3. Системные Тренажёры</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><a class="res-link" href="https://protohackers.com/" target="_blank">Protohackers</a> — написание реальных сетевых TCP/UDP серверов с нуля.</li>
          <li><a class="res-link" href="https://fly.io/dist-sys/" target="_blank">Fly.io Gossip Glomers</a> — распределённые задачи с тестированием Jepsen Maelstrom.</li>
          <li><a class="res-link" href="https://sadservers.com/" target="_blank">SadServers</a> — починка сломанных Linux-серверов в браузере.</li>
          <li><a class="res-link" href="https://pgexercises.com/" target="_blank">PostgreSQL Exercises</a> &amp; <a class="res-link" href="https://use-the-index-luke.com/" target="_blank">Use The Index, Luke</a>.</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">🐙 4. GitHub и Инженерные Блоги</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><a class="res-link" href="https://github.com/donnemartin/system-design-primer" target="_blank">donnemartin/system-design-primer</a></li>
          <li><a class="res-link" href="https://github.com/codecrafters-io/build-your-own-x" target="_blank">codecrafters-io/build-your-own-x</a></li>
          <li><a class="res-link" href="https://blog.cloudflare.com/" target="_blank">Cloudflare Engineering Blog</a> • <a class="res-link" href="https://aws.amazon.com/builders-library/" target="_blank">AWS Builders’ Library</a></li>
        </ul>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.analogies = {
  id: "analogies",
  title: "💡 Банк Бытовых Аналогий",
  badge: "10 Живых Примеров",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row"><span class="badge badge-amber">🏠 Сложная системная инженерия простыми словами</span></div>
      <h1 class="hero-title">Бытовые Аналогии Backend Systems Engineer</h1>
      <p class="hero-desc">Чтобы помнить суть механизмов ОС, БД и распределённых систем даже на стрессовом собеседовании.</p>
    </div>

    <div class="grid-2">
      <div class="card"><div class="card-title">🍽️ 1. select/poll vs epoll</div><p><strong>select:</strong> официант каждые 5 секунд подходит ко всем 100 столикам и спрашивает «Вы готовы заказать?». <strong>epoll:</strong> на каждом столике кнопка вызова — официант сразу идёт только туда, где загорелась лампочка!</p></div>
      <div class="card"><div class="card-title">🚚 2. Zero-Copy (sendfile)</div><p>Вместо того чтобы выгружать товар со склада в приёмную офиса, перекладывать в другую коробку и нести в фуру — ядро грузит паллету со склада прямо в кузов фуры!</p></div>
      <div class="card"><div class="card-title">📓 3. WAL (Write-Ahead Log)</div><p>Бухгалтер сначала быстро дописывает строчку в конец чернового блокнота (WAL + fsync), и только потом неспешно аккуратно разносит цифры по красивым таблицам главной книги. Если погаснет свет — блокнот всё восстановит!</p></div>
      <div class="card"><div class="card-title">📸 4. MVCC в PostgreSQL</div><p>Вместо того чтобы закрывать зал музея на ремонт, пока вешают новую картину, гостям показывают готовый вчерашний зал (Snapshot), а за ширмой вешают новую версию — никто никому не мешает!</p></div>
      <div class="card"><div class="card-title">🚌 5. PgBouncer</div><p>Вместо того чтобы на каждого пассажира нанимать отдельный автобус (процесс Postgres), 5,000 людей быстро передают заявки 40 водителям, которые непрерывно возят их в базу.</p></div>
      <div class="card"><div class="card-title">🎟️ 6. Singleflight (от Cache Stampede)</div><p>1,000 человек хотят узнать курс валюты, когда табло погасло. Вместо того чтобы всей толпой ломиться в кабинет директора (БД), туда заходит 1 гонец, а остальные 999 ждут у двери его ответа!</p></div>
      <div class="card"><div class="card-title">⚡ 7. Circuit Breaker</div><p>Автоматический рубильник в электрощитке: если тостер коротит 3 раза подряд — рубильник отключает линию, чтобы не сгорела проводка во всём доме (каскадный отказ)!</p></div>
      <div class="card"><div class="card-title">💍 8. Consistent Hashing</div><p>Гости сидят за круглым столом: если к столу подсаживается ещё один гость, двигаются только его ближайшие два соседа, а не пересаживается весь банкетный зал!</p></div>
    </div>
  `
};

window.ACADEMY_DATA.commands = {
  id: "commands",
  title: "🩺 Шпаргалка Отладки Linux (60с) & SQL",
  badge: "Gregg • EXPLAIN • pprof",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-emerald">🩺 Метод Брендана Грегга (10 команд)</span>
        <span class="badge badge-amber">🐘 PostgreSQL EXPLAIN ANALYZE</span>
      </div>
      <h1 class="hero-title">Справочник Быстрой Диагностики Тормозов Сервера и Базы Данных</h1>
      <p class="hero-desc">Что вводить в терминал, когда продакшн внезапно стал отвечать по 5 секунд.</p>
    </div>

    <div class="card">
      <input type="text" class="search-input" style="max-width:100%; margin-bottom:14px;" placeholder="🔎 Фильтр (uptime, vmstat, iostat, dmesg, ss, pprof, EXPLAIN, Seq Scan)..." oninput="filterCommandTable(this.value)">
      <div class="table-wrap" style="margin:0;">
        <table class="cyber-table" id="cmdMasterTable">
          <thead><tr><th>Область</th><th>Команда / Паттерн</th><th>Что показывает и какой красный флаг</th></tr></thead>
          <tbody>
            <tr><td>Linux 60s #1</td><td><code class="inline-code">uptime</code></td><td>Load Average за 1/5/15 мин — если больше числа ядер CPU, задачи стоят в очереди!</td></tr>
            <tr><td>Linux 60s #2</td><td><code class="inline-code">dmesg -T | tail</code></td><td>Ошибки ядра, диска или <strong>OOM Killer</strong> (ядро убило процесс за память!)</td></tr>
            <tr><td>Linux 60s #3</td><td><code class="inline-code">vmstat 1</code></td><td>Очередь CPU (<code class="inline-code">r</code>), сброс в Swap (<code class="inline-code">si/so &gt; 0</code>) и ожидание диска (<code class="inline-code">wa</code>)</td></tr>
            <tr><td>Linux 60s #4</td><td><code class="inline-code">mpstat -P ALL 1</code></td><td>Перекос: если 1 ядро CPU на 100%, а остальные пустуют — однопоточное горлышко</td></tr>
            <tr><td>Linux 60s #5</td><td><code class="inline-code">pidstat 1</code></td><td>Какой конкретный PID прямо сейчас сжирает CPU или память</td></tr>
            <tr><td>Linux 60s #6</td><td><code class="inline-code">iostat -xz 1</code></td><td>Загрузка диска (<code class="inline-code">%util</code> ~100%, <code class="inline-code">await</code> высокий ➔ диск задыхается!)</td></tr>
            <tr><td>Linux 60s #7</td><td><code class="inline-code">free -m</code></td><td>Смотри колонку <code class="inline-code">available</code> (Page Cache в buff/cache — норма!)</td></tr>
            <tr><td>Linux 60s #8</td><td><code class="inline-code">sar -n DEV 1</code></td><td>Нагрузка и насыщение сетевой карты</td></tr>
            <tr><td>Linux 60s #9</td><td><code class="inline-code">ss -s</code> &amp; <code class="inline-code">ss -lnt</code></td><td>Сокеты в <code class="inline-code">TIME_WAIT</code> и переполнение очереди <code class="inline-code">Recv-Q</code></td></tr>
            <tr><td>Отладка CPU/Go</td><td><code class="inline-code">go tool pprof -http=:8081 ...</code></td><td>Строит Flamegraph — сразу видна функция, сжигающая CPU или память</td></tr>
            <tr><td>Отладка Syscalls</td><td><code class="inline-code">strace -c -p &lt;PID&gt;</code></td><td>Сводная таблица системных вызовов, на которые процесс тратит время</td></tr>
            <tr><td>SQL Postgres</td><td><code class="inline-code">EXPLAIN (ANALYZE, BUFFERS) ...</code></td><td>Ищи <strong>Seq Scan</strong> на больших таблицах, <strong>external merge Disk</strong> и Buffers read</td></tr>
            <tr><td>SQL Пагинация</td><td><code class="inline-code">WHERE id &gt; last_id LIMIT 20</code></td><td>Cursor/Keyset pagination (O(log N) вместо тормозящего OFFSET 1000000!)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.gallery = {
  id: "gallery",
  title: "🖼️ Галерея Схем & 3 Лабы",
  badge: "6 Схем + Бэкап",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">🖼️ Все 6 Архитектурных Схем</span>
        <span class="badge badge-emerald">🧪 3 Локальных Python-Лабы</span>
      </div>
      <h1 class="hero-title">Галерея Визуальных Схем &amp; Локальные Файлы Проекта</h1>
      <p class="hero-desc">Нажми на любую схему, чтобы открыть её в полноэкранном лайтбоксе.</p>
    </div>

    <div class="card" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <span><strong>⚙️ Управление прогрессом курса:</strong></span>
      <div style="display:flex; gap:8px;">
        <button class="btn-action" onclick="exportProgress()">💾 Скачать бэкап прогресса</button>
        <button class="btn-action" onclick="resetProgress()">🔄 Сбросить галочки</button>
      </div>
    </div>

    <div class="grid-3">
      <div class="diagram-card"><img src="../05-Assets/01_backend_systems_engineer_roadmap.svg" onclick="openLightbox(this.src)" alt="1"><div class="diagram-caption">1. Полный роадмап Фаз 0–7 + числа задержек</div></div>
      <div class="diagram-card"><img src="../05-Assets/02_linux_kernel_epoll_network_path.svg" onclick="openLightbox(this.src)" alt="2"><div class="diagram-caption">2. Путь сетевого пакета: NIC ➔ epoll/io_uring ➔ Zero-Copy</div></div>
      <div class="diagram-card"><img src="../05-Assets/03_database_internals_btree_lsm_mvcc.svg" onclick="openLightbox(this.src)" alt="3"><div class="diagram-caption">3. Внутренности БД: WAL, B+Tree vs LSM, MVCC, PgBouncer</div></div>
      <div class="diagram-card"><img src="../05-Assets/04_highload_architecture_request_path.svg" onclick="openLightbox(this.src)" alt="4"><div class="diagram-caption">4. High-Load путь запроса: CDN ➔ LB ➔ Redis ➔ Outbox/Kafka</div></div>
      <div class="diagram-card"><img src="../05-Assets/05_distributed_systems_cap_sharding_raft.svg" onclick="openLightbox(this.src)" alt="5"><div class="diagram-caption">5. Распределённые системы: CAP, Consistent Hashing, Raft, Saga</div></div>
      <div class="diagram-card"><img src="../05-Assets/06_observability_sre_troubleshooting_map.svg" onclick="openLightbox(this.src)" alt="6"><div class="diagram-caption">6. Observability &amp; Диагностика Linux за 60 секунд</div></div>
    </div>

    <div class="card">
      <div class="card-title">📂 Прямые ссылки на учебники и лабы</div>
      <div class="grid-2">
        <div class="blue-box">
          <strong>📘 Учебники в Markdown:</strong>
          <ul style="margin-left:18px; margin-top:6px;">
            <li><a class="res-link" href="../00-Roadmap/Полный-Роадмап-Backend-Systems-Engineer.md" target="_blank">Полный-Роадмап-Backend-Systems-Engineer.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/01-Ядро-Linux-Память-Сети-и-Сокеты.md" target="_blank">01-Ядро-Linux-Память-Сети-и-Сокеты.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/02-Языки-Алгоритмы-и-Многопоточность.md" target="_blank">02-Языки-Алгоритмы-и-Многопоточность.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/03-Базы-Данных-PostgreSQL-Redis-и-Kafka.md" target="_blank">03-Базы-Данных-PostgreSQL-Redis-и-Kafka.md</a></li>
            <li><a class="res-link" href="../01-Theory-Notes/04-Распределенные-Системы-HighLoad-и-SRE.md" target="_blank">04-Распределенные-Системы-HighLoad-и-SRE.md</a></li>
          </ul>
        </div>
        <div class="arch-box">
          <strong>🧪 3 Локальные Python-Лабораторные:</strong>
          <ul style="margin-left:18px; margin-top:6px;">
            <li><a class="res-link" href="../02-Labs/lab01_rate_limiter_and_consistent_hashing.py" target="_blank">lab01_rate_limiter_and_consistent_hashing.py</a></li>
            <li><a class="res-link" href="../02-Labs/lab02_wal_and_lsm_storage_engine.py" target="_blank">lab02_wal_and_lsm_storage_engine.py</a></li>
            <li><a class="res-link" href="../02-Labs/lab03_circuit_breaker_and_idempotency.py" target="_blank">lab03_circuit_breaker_and_idempotency.py</a></li>
            <li><a class="res-link" href="../03-Cheatsheets-and-Flashcards/Окно-Быстрых-Вспоминанок-Backend.md" target="_blank">Окно-Быстрых-Вспоминанок-Backend.md</a></li>
          </ul>
        </div>
      </div>
    </div>
  `
};

window.ACADEMY_DATA.flashcards_page = {
  id: "flashcards_page",
  title: "⚡ Окно Маленьких Вспоминанок",
  badge: "45+ Карточек",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-purple">🧠 Active Recall за 5 секунд</span>
        <span class="badge badge-cyan">⚡ Вызов в любой момент: Alt + M</span>
      </div>
      <h1 class="hero-title">База Маленьких Вспоминанок: Backend Systems Engineer</h1>
      <p class="hero-desc">Нажми кнопку ниже, чтобы открыть выдвижное окно поверх любого урока, скрыть ответы и потренировать память перед интервью!</p>
      <div style="margin-top:14px;">
        <button class="btn-action btn-recall-trigger" onclick="openRecallDrawer()">🧠 Открыть Плавающее Окно Вспоминанок</button>
      </div>
    </div>
    <div id="inlineFlashcardsMount"></div>
  `
};
