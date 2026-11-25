window.ACADEMY_DATA = window.ACADEMY_DATA || {};

window.ACADEMY_DATA.dashboard = {
  id: "dashboard",
  title: "🏠 Главная Панель & Карта Пути",
  badge: "Zero ➔ Senior",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">⚙️ Backend Systems Engineer Roadmap</span>
        <span class="badge badge-emerald">🐧 Linux Kernel • epoll • Zero-Copy</span>
        <span class="badge badge-amber">🗄️ WAL • B+Tree • LSM • MVCC</span>
        <span class="badge badge-purple">🌐 CAP • Raft • Sharding • SRE</span>
      </div>
      <h1 class="hero-title">Полный Роадмап Backend Systems Engineer: От Ядра ОС и Сокетов до High-Load и SRE</h1>
      <p class="hero-desc">
        Здесь собрано всё, что отличает системного инженера от обычного CRUD-кодера: путь сетевого пакета в ядре Linux, внутренности PostgreSQL и Redis, паттерны отказа микросервисов, распределённый консенсус (MIT 6.5840 &amp; DDIA), 6 архитектурных схем, 3 Python-лабы и <strong>🧠 Окно Маленьких Вспоминанок (Alt+M)</strong>.
      </p>
    </div>

    <div class="analogy-box">
      <div class="analogy-header">🎯 Главная разница: Обычный Backend vs Backend Systems Engineer</div>
      • <strong>Обычный Backend:</strong> «Напишу ручку в фреймворке, дёрну ORM, задеплою — вроде работает».<br>
      • <strong>Backend Systems Engineer:</strong> Понимает, почему 1 сетевой запрос дороже 10,000 операций в RAM, как <code class="inline-code">epoll</code> держит 100k сокетов, как <code class="inline-code">WAL + fsync</code> спасает базу при потере света, почему без <code class="inline-code">PgBouncer</code> Postgres умрёт под нагрузкой и как уберечь платежи от сбоя с помощью <code class="inline-code">Transactional Outbox</code> и <code class="inline-code">Idempotency-Key</code>!
    </div>

    <div class="card">
      <div class="card-title">🗺️ Визуальная Карта Роадмапа (Нажми на картинку для увеличения)</div>
      <div class="diagram-card">
        <img src="../05-Assets/01_backend_systems_engineer_roadmap.svg" alt="Полный роадмап Backend Systems Engineer" onclick="openLightbox(this.src)">
        <div class="diagram-caption">Фазы 0–7 + ключевые числа задержек (CPU, RAM, NVMe SSD, Сеть)</div>
      </div>
    </div>

    <h2 class="section-heading">📊 Сводная Таблица Всех 7 Фаз Обучения</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead>
          <tr><th>Фаза</th><th>Ключевые темы</th><th>Срок</th><th>Практика и Лаба</th></tr>
        </thead>
        <tbody>
          <tr><td><strong>Фаза 0–1</strong></td><td>Ядро Linux, память, Page Cache, FD, <code class="inline-code">epoll/io_uring</code>, TCP/IP, HTTP/1.1–3, Zero-Copy</td><td>4 нед</td><td>Задачи <a class="res-link" href="https://protohackers.com/" target="_blank">Protohackers</a> + <code class="inline-code">strace</code> + <code class="inline-code">ss</code></td></tr>
          <tr><td><strong>Фаза 2</strong></td><td>Go / Rust / Python, M:N горутины, Mutex/Atomics, False Sharing, Ring Buffer, Bloom Filter</td><td>5 нед</td><td><strong>Лаба №1:</strong> Token Bucket + Consistent Hashing</td></tr>
          <tr><td><strong>Фаза 3</strong></td><td>PostgreSQL (<code class="inline-code">WAL</code>, <code class="inline-code">B+Tree</code> vs <code class="inline-code">LSM</code>, <code class="inline-code">MVCC</code>, <code class="inline-code">EXPLAIN</code>, <code class="inline-code">PgBouncer</code>), Redis (Stampede)</td><td>5 нед</td><td><strong>Лаба №2:</strong> Движок WAL + MemTable + Recovery</td></tr>
          <tr><td><strong>Фаза 4</strong></td><td>gRPC/Protobuf, Apache Kafka (партиции, Zero-Copy), <code class="inline-code">Outbox</code>, <code class="inline-code">Circuit Breaker</code>, <code class="inline-code">Jitter</code></td><td>4 нед</td><td><strong>Лаба №3:</strong> Circuit Breaker + Idempotency</td></tr>
          <tr><td><strong>Фаза 5</strong></td><td>CAP/PACELC, кворум <code class="inline-code">R+W&gt;N</code>, шардирование, Raft, Split-Brain, Fencing Tokens, Saga</td><td>6 нед</td><td>Челленджи <a class="res-link" href="https://fly.io/dist-sys/" target="_blank">Gossip Glomers</a> + MIT 6.5840</td></tr>
          <tr><td><strong>Фаза 6</strong></td><td>L4/L7 балансировщики, Docker (<code class="inline-code">namespaces/cgroups</code>), K8s Probes, Graceful Shutdown</td><td>3 нед</td><td>Нагрузочные тесты <code class="inline-code">wrk / k6</code></td></tr>
          <tr><td><strong>Фаза 7</strong></td><td>Observability (RED/USE, <code class="inline-code">p99</code>, OpenTelemetry), <code class="inline-code">pprof</code>, диагностика Linux за 60с, System Design</td><td>Финал</td><td><strong>5 системных проектов</strong> + System Design Interview</td></tr>
        </tbody>
      </table>
    </div>
  `
};

window.ACADEMY_DATA.phase01 = {
  id: "phase01",
  title: "🐧 Фаза 0–1: Ядро Linux, Память & Сети",
  badge: "Недели 1–4 • ОС и Сокеты",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-cyan">🛡️ Ring 0 vs Ring 3 (Syscalls)</span>
        <span class="badge badge-blue">💾 Page Cache &amp; OOM</span>
        <span class="badge badge-emerald">⚡ epoll / io_uring &amp; Zero-Copy</span>
      </div>
      <h1 class="hero-title">Фаза 0–1 — Как Компьютер Работает на Самом Деле: Ядро Linux, Память, Сокеты и Протоколы</h1>
      <p class="hero-desc">
        Любой бэкенд работает поверх операционной системы и сетевой карты. Поняв, как ядро Linux управляет памятью, дескрипторами файлов и очередями TCP, ты перестанешь гадать, почему сервис падает под нагрузкой.
      </p>
    </div>

    <div class="diagram-card">
      <img src="../05-Assets/02_linux_kernel_epoll_network_path.svg" alt="Путь сетевого пакета в ядре Linux и epoll" onclick="openLightbox(this.src)">
      <div class="diagram-caption">От сетевой карты (NIC + DMA) ➔ TCP Stack ➔ epoll/io_uring ➔ Zero-Copy (sendfile)</div>
    </div>

    <h2 class="section-heading">⏱️ 1. Матрица Задержек и Системные Вызовы (Syscalls)</h2>
    <div class="analogy-box">
      <div class="analogy-header">🏃 Аналогия с масштабом времени: L1 кэш = 1 секунда</div>
      Если доступ к кэшу CPU (1 нс) принять за <strong>1 секунду</strong>, то:<br>
      • Оперативная память (RAM, 100 нс) = <strong>1.5 минуты</strong>.<br>
      • Чтение блока с NVMe SSD (100 мкс) = <strong>более 1 дня!</strong><br>
      • Сетевой запрос внутри дата-центра (0.5 мс) = <strong>6 дней!</strong><br>
      • Межконтинентальный запрос по сети (100 мс) = <strong>3 года!</strong><br>
      👉 Поэтому батчинг, кэш в RAM и сокращение лишних походов в БД/сеть ускоряют сервис в сотни раз!
    </div>

    <div class="grid-2">
      <div class="blue-box">
        <strong>💾 Page Cache и миф о «кончившейся памяти»</strong><br>
        Linux забирает свободную оперативку под дисковый кэш (<strong>Page Cache</strong>), чтобы файлы и таблицы БД читались со скоростью RAM! При нехватке RAM смотри колонку <code class="inline-code">available</code> в <code class="inline-code">free -m</code>. Если реально кончится всё — проснётся <strong>OOM Killer</strong> и убьёт процесс!
      </div>
      <div class="arch-box">
        <strong>⚡ Почему <code class="inline-code">epoll</code> / <code class="inline-code">io_uring</code> держат 100,000 клиентов</strong><br>
        Вместо того чтобы каждый тик опрашивать 100k сокетов в лоб (<code class="inline-code">select/poll</code> O(N)), программа просит ядро сложить в список только готовые сокеты (<code class="inline-code">epoll_wait</code> O(1)). А <strong>Zero-Copy (<code class="inline-code">sendfile</code>)</strong> шлёт файл из Page Cache сразу в сетевую карту!
      </div>
    </div>

    <h2 class="section-heading">📡 2. Стек TCP и Эволюция HTTP (1.1 ➔ 2 ➔ 3 QUIC)</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Механизм / Протокол</th><th>Что происходит внутри</th><th>Что важно на проде</th></tr></thead>
        <tbody>
          <tr><td><strong>TCP SYN / Accept Queue</strong></td><td>После <code class="inline-code">SYN</code> сокет ждёт <code class="inline-code">ACK</code>, затем попадает в очередь <code class="inline-code">somaxconn</code> для <code class="inline-code">accept()</code></td><td>Если приложение не успевает забирать коннекты — переполняется <code class="inline-code">Recv-Q</code> (проверяй через <code class="inline-code">ss -lnt</code>)</td></tr>
          <tr><td><strong>TIME_WAIT (60 сек)</strong></td><td>Закрытый TCP-сокет удерживает порт минуту на случай потерянных пакетов</td><td>При тысячах коротких запросов в сек кончаются порты ➔ используй <strong>Keep-Alive / Connection Pool</strong>!</td></tr>
          <tr><td><strong>HTTP/2 (Основа gRPC)</strong></td><td>Бинарные фреймы + HPACK + мультиплексирование сотен запросов в 1 TCP</td><td>Минус: потеря 1 TCP-пакета тормозит ВСЕ параллельные потоки (<strong>TCP Head-of-Line Blocking</strong>)</td></tr>
          <tr><td><strong>HTTP/3 (QUIC)</strong></td><td>Построен поверх <strong>UDP</strong> со встроенным TLS 1.3 и установкой за 1-RTT</td><td>Нет TCP HoL Blocking: потеря пакета тормозит только 1 поток!</td></tr>
        </tbody>
      </table>
    </div>

    <div class="quiz-item" onclick="this.classList.toggle('open')">
      <div class="quiz-question"><span>🧪 Вопрос: На сервере <code class="inline-code">free -m</code> показывает 40 МБ в колонке free, но 12 ГБ в buff/cache. Память правда кончилась?</span><span>▼</span></div>
      <div class="quiz-answer"><strong>Нет!</strong> Это Linux Page Cache — ядро умно использует пустую RAM для кэширования диска и мгновенно вернёт её приложению по первому требованию. Реальная свободная память — в колонке <strong>available</strong>.</div>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b1-1"><input type="checkbox"><span>Понимаю разницу Ring 0 / Ring 3, Page Cache, File Descriptors (<code class="inline-code">ulimit -n</code>) и <code class="inline-code">epoll</code> / <code class="inline-code">Zero-Copy</code>.</span></div>
      <div class="check-row" data-check-id="b1-2"><input type="checkbox"><span>Разобрался с очередями TCP (<code class="inline-code">somaxconn</code>), <code class="inline-code">TIME_WAIT</code> и отличиями HTTP/1.1, HTTP/2, HTTP/3.</span></div>
      <div class="check-row" data-check-id="b1-3"><input type="checkbox"><span>Решил первые сетевые задачи на <a class="res-link" href="https://protohackers.com/" target="_blank">Protohackers</a>.</span></div>
    </div>
  `
};

window.ACADEMY_DATA.phase2 = {
  id: "phase2",
  title: "⚡ Фаза 2: Go/Rust, Потоки и Алгоритмы",
  badge: "Недели 5–9 • Лаба №1",
  html: `
    <div class="hero-banner">
      <div class="hero-badge-row">
        <span class="badge badge-blue">⚡ Go GMP • Rust • Python GIL</span>
        <span class="badge badge-purple">🔒 Mutex vs RWMutex vs Atomics</span>
        <span class="badge badge-amber">💍 Ring Buffer • Bloom Filter • Token Bucket</span>
      </div>
      <h1 class="hero-title">Фаза 2 — Конкурентность, Память CPU и Системные Структуры Данных</h1>
      <p class="hero-desc">
        В многоядерном бэкенде главные враги скорости — лишние блокировки, переключения потоков ОС, паузы Garbage Collector и гонки данных.
      </p>
    </div>

    <h2 class="section-heading">🔀 1. Три Модели Конкурентности и Планировщик Go (G-M-P)</h2>
    <div class="table-wrap">
      <table class="cyber-table">
        <thead><tr><th>Модель</th><th>Цена 1 задачи</th><th>Главный риск</th></tr></thead>
        <tbody>
          <tr><td><strong>OS Threads (1:1)</strong></td><td>~1–8 МБ RAM стек + дорогой Context Switch</td><td>10k потоков съедают гигабайты RAM и сжигают CPU на переключения</td></tr>
          <tr><td><strong>Event Loop (Nginx, Redis, Node)</strong></td><td>Несколько КБ, 1 поток на ядро</td><td><strong>Блокировка цикла:</strong> долгий расчёт CPU вешает ВСЕХ клиентов!</td></tr>
          <tr><td><strong>M:N (Go Goroutines / Tokio)</strong></td><td><strong>~2 КБ RAM</strong> на горутину, планирование поверх пула ядер (G-M-P + Work Stealing)</td><td>Утечка горутин (<code class="inline-code">Goroutine Leak</code>), если забыть <code class="inline-code">context</code> отмены</td></tr>
        </tbody>
      </table>
    </div>

    <h2 class="section-heading">🔒 2. Ловушки Многопоточности и Системные Алгоритмы</h2>
    <div class="grid-2">
      <div class="card">
        <div class="card-title">⚠️ Главные баги в конкурентном коде</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Data Race:</strong> одновременная запись двумя потоками (проверять в Go через <code class="inline-code">go test -race</code>).</li>
          <li><strong>Deadlock:</strong> цикл ожидания двух мьютексов (лечится строгим порядком захвата!).</li>
          <li><strong>Lock Contention:</strong> 64 ядра бьются за 1 глобальный <code class="inline-code">Mutex</code> (лечится <strong>Sharded Map</strong> с 64 бакетами).</li>
          <li><strong>False Sharing:</strong> 2 переменных разных ядер сидят в одной 64-байтной кэш-линии CPU!</li>
        </ul>
      </div>
      <div class="card">
        <div class="card-title">🧩 Топ-4 системных структуры данных</div>
        <ul style="margin-left:18px; font-size:0.88rem;">
          <li><strong>Ring Buffer:</strong> кольцевой массив без аллокаций (<code class="inline-code">io_uring</code>, LMAX Disruptor).</li>
          <li><strong>Bloom Filter:</strong> битовый фильтр в RAM — отсеивает 99% несуществующих ключей до диска!</li>
          <li><strong>LRU / LFU Cache:</strong> HashMap + двусвязный список (<code class="inline-code">O(1)</code> на всё).</li>
          <li><strong>Token Bucket:</strong> Rate Limiter, разрешающий короткие всплески (burst) до объёма ведра.</li>
        </ul>
      </div>
    </div>

    <div class="success-box">
      <strong>🧪 ПРАКТИКА — ЛАБА №1:</strong> Запусти наш локальный стенд, моделирующий <strong>Token Bucket Rate Limiter</strong> и сравнение <strong>Consistent Hashing vs hash % N</strong>:<br>
      <code class="inline-code">python3 02-Labs/lab01_rate_limiter_and_consistent_hashing.py</code>
    </div>

    <div class="card">
      <div class="check-row" data-check-id="b2-1"><input type="checkbox"><span>Понимаю планировщик Go (G-M-P), отличие Mutex / RWMutex / Atomics и как возникает False Sharing.</span></div>
      <div class="check-row" data-check-id="b2-2"><input type="checkbox"><span>Запустил <code class="inline-code">lab01_rate_limiter_and_consistent_hashing.py</code> и увидел разницу (23% переезда ключей вместо 75%).</span></div>
    </div>
  `
};
