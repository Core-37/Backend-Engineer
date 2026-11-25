#!/usr/bin/env python3
"""
Лаба №1 (Фаза 2 & Фаза 5):
1. Token Bucket Rate Limiter (с поддержкой burst и плавным пополнением по monotonic clock).
2. Consistent Hashing Ring (с виртуальными нодами) vs обычное hash(key) % N при добавлении сервера.
Запуск: python3 lab01_rate_limiter_and_consistent_hashing.py
"""

import bisect
import hashlib
import time


class TokenBucketRateLimiter:
    """Классический алгоритм ограничения RPS (используется в Nginx, Envoy, API Gateways)."""

    def __init__(self, capacity: int, refill_rate_per_sec: float):
        self.capacity = float(capacity)
        self.tokens = float(capacity)
        self.refill_rate = float(refill_rate_per_sec)
        self.last_refill = time.monotonic()  # Используем monotonic clock, чтобы скачки NTP не сломали время!

    def allow_request(self) -> bool:
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.last_refill = now

        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        if self.tokens >= 1.0:
            self.tokens -= 1.0
            return True
        return False


class ConsistentHashRing:
    """Кольцо консистентного хэширования с виртуальными нодами для шардирования БД/кэша."""

    def __init__(self, virtual_nodes: int = 50):
        self.virtual_nodes = virtual_nodes
        self.ring = {}
        self.sorted_hashes = []

    @staticmethod
    def _hash(key: str) -> int:
        return int(hashlib.md5(key.encode("utf-8")).hexdigest()[:8], 16)

    def add_node(self, node_name: str):
        for i in range(self.virtual_nodes):
            vnode_hash = self._hash(f"{node_name}#vn{i}")
            if vnode_hash not in self.ring:
                self.ring[vnode_hash] = node_name
                bisect.insort(self.sorted_hashes, vnode_hash)

    def get_node(self, key: str) -> str:
        if not self.sorted_hashes:
            raise RuntimeError("Ring is empty")
        h = self._hash(key)
        idx = bisect.bisect_right(self.sorted_hashes, h)
        if idx == len(self.sorted_hashes):
            idx = 0
        return self.ring[self.sorted_hashes[idx]]


def demo_rate_limiter():
    print("=" * 72)
    print("🚦 ЧАСТЬ 1. TOKEN BUCKET RATE LIMITER (емкость=5, пополнение=5/сек)")
    print("=" * 72)
    limiter = TokenBucketRateLimiter(capacity=5, refill_rate_per_sec=5.0)

    print("Отправляем всплеск (burst) из 8 мгновенных запросов:")
    for i in range(1, 9):
        allowed = limiter.allow_request()
        status = "✅ 200 OK" if allowed else "⛔ 429 Too Many Requests"
        print(f"   Запрос #{i}: {status} (остаток токенов: {limiter.tokens:.2f})")

    print("\nЖдём 0.45 сек (должно восстановиться ~2 токена) и шлём ещё 3 запроса:")
    time.sleep(0.45)
    for i in range(9, 12):
        allowed = limiter.allow_request()
        status = "✅ 200 OK" if allowed else "⛔ 429 Too Many Requests"
        print(f"   Запрос #{i}: {status} (остаток токенов: {limiter.tokens:.2f})")


def demo_consistent_hashing():
    print("\n" + "=" * 72)
    print("💍 ЧАСТЬ 2. CONSISTENT HASHING vs ОБЫЧНОЕ MODULO (% N) ПРИ МАСШТАБИРОВАНИИ")
    print("=" * 72)

    keys = [f"user:{i}" for i in range(1000)]
    nodes_before = ["shard-1", "shard-2", "shard-3"]
    nodes_after = ["shard-1", "shard-2", "shard-3", "shard-4"]

    # 1. Обычное модульное хэширование hash(key) % N
    def mod_node(k: str, nodes: list) -> str:
        h = int(hashlib.md5(k.encode()).hexdigest()[:8], 16)
        return nodes[h % len(nodes)]

    mod_moved = sum(1 for k in keys if mod_node(k, nodes_before) != mod_node(k, nodes_after))

    # 2. Consistent Hashing Ring (50 виртуальных нод на шард)
    ring_before = ConsistentHashRing(virtual_nodes=50)
    for n in nodes_before:
        ring_before.add_node(n)

    ring_after = ConsistentHashRing(virtual_nodes=50)
    for n in nodes_after:
        ring_after.add_node(n)

    ch_moved = 0
    distribution = {n: 0 for n in nodes_after}
    for k in keys:
        n1 = ring_before.get_node(k)
        n2 = ring_after.get_node(k)
        distribution[n2] += 1
        if n1 != n2:
            ch_moved += 1

    print(f"Тест на 1,000 ключей при расширении кластера с 3 до 4 серверов:")
    print(f"   ❌ Обычный hash(key) % N: переехало {mod_moved} ключей ({mod_moved / 10:.1f}% кэша протухло!)")
    print(f"   ✅ Consistent Hashing:    переехало {ch_moved} ключей ({ch_moved / 10:.1f}% — ровно ~1/4!)")
    print("\nРаспределение нагрузки по 4 шардам с виртуальными нодами:")
    for node, cnt in distribution.items():
        print(f"   • {node}: {cnt} ключей ({cnt / 10:.1f}%)")
    print("\n🎓 Лаба №1 завершена!\n")


if __name__ == "__main__":
    demo_rate_limiter()
    demo_consistent_hashing()
