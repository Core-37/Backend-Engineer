#!/usr/bin/env python3
"""
Лаба №3 (Фаза 4): Защита распределённых микросервисов от каскадного падения и дублей оплаты:
1. Circuit Breaker (Closed -> Open -> Half-Open -> Closed)
2. Idempotency Keys (защита от повторного списания при сетевом Retry)
3. Exponential Backoff + Full Jitter (предотвращение лавины Retry Storm)
Запуск: python3 lab03_circuit_breaker_and_idempotency.py
"""

import random
import time


class CircuitBreakerOpenError(Exception):
    pass


class CircuitBreaker:
    """Автоматический предохранитель: отрубает вызовы к упавшему сервису, чтобы не положить свой сервис."""

    def __init__(self, failure_threshold: int = 3, recovery_timeout: float = 0.5):
        self.failure_threshold = failure_threshold
        self.recovery_timeout = recovery_timeout
        self.state = "CLOSED"
        self.failures = 0
        self.opened_at = 0.0

    def call(self, fn, *args, **kwargs):
        now = time.monotonic()
        if self.state == "OPEN":
            if now - self.opened_at >= self.recovery_timeout:
                self.state = "HALF_OPEN"
                print("   🟡 [CB -> HALF_OPEN] Пробуем пропустить 1 тестовый запрос...")
            else:
                raise CircuitBreakerOpenError("🔴 Предохранитель OPEN: мгновенный отказ без ожидания сети!")

        try:
            res = fn(*args, **kwargs)
            if self.state == "HALF_OPEN":
                print("   🟢 [CB -> CLOSED] Тестовый запрос прошёл — сервис ожил!")
            self.state = "CLOSED"
            self.failures = 0
            return res
        except Exception as exc:
            self.failures += 1
            if self.state == "HALF_OPEN" or self.failures >= self.failure_threshold:
                self.state = "OPEN"
                self.opened_at = time.monotonic()
                print(f"   🔴 [CB -> OPEN] Превышен порог ошибок ({self.failures})! Отключаем сервис на {self.recovery_timeout}s.")
            raise exc


class IdempotentPaymentService:
    """Платёжный сервис с защитой от повторного списания денег по Idempotency-Key."""

    def __init__(self):
        self.processed_keys = {}
        self.total_charged = 0

    def charge(self, idempotency_key: str, amount: int) -> dict:
        if idempotency_key in self.processed_keys:
            print(f"   🛡️ [Idempotency] Повторный ключ '{idempotency_key}'! Возвращаем кэш-ответ БЕЗ списания.")
            return self.processed_keys[idempotency_key]

        self.total_charged += amount
        receipt = {"tx_id": f"tx_{len(self.processed_keys) + 1}", "charged": amount, "status": "SUCCESS"}
        self.processed_keys[idempotency_key] = receipt
        print(f"   💸 [Charge] Списано {amount} USD (key={idempotency_key})")
        return receipt


def calc_backoff_with_full_jitter(attempt: int, base: float = 0.1, cap: float = 2.0) -> float:
    """Формула AWS Architecture Blog: random(0, min(cap, base * 2^attempt))."""
    exp = min(cap, base * (2 ** attempt))
    return random.uniform(0, exp)


def run_demo():
    print("\n🛡️  CORE-37 LAB #3 — CIRCUIT BREAKER, IDEMPOTENCY KEYS И JITTER\n")

    print("=" * 72)
    print("1️⃣ ДЕМО CIRCUIT BREAKER (Защита от каскадного отказа)")
    print("=" * 72)
    cb = CircuitBreaker(failure_threshold=3, recovery_timeout=0.4)
    downstream_healthy = False

    def unstable_remote_api():
        if not downstream_healthy:
            raise ConnectionError("Downstream DB timeout!")
        return "200 OK (данные получены)"

    for step in range(1, 6):
        try:
            print(f"Запрос {step}: {cb.call(unstable_remote_api)}")
        except CircuitBreakerOpenError as e:
            print(f"Запрос {step}: {e}")
        except ConnectionError as e:
            print(f"Запрос {step}: ❌ Ошибка сети ({e})")

    print("\nЖдём 0.45 сек и чиним внешний сервис...")
    time.sleep(0.45)
    downstream_healthy = True
    print(f"Запрос 6: ✅ {cb.call(unstable_remote_api)}")

    print("\n" + "=" * 72)
    print("2️⃣ ДЕМО IDEMPOTENCY KEY (Сеть моргнула, клиент повторил оплату 3 раза)")
    print("=" * 72)
    pay = IdempotentPaymentService()
    for retry_num in range(1, 4):
        resp = pay.charge(idempotency_key="order-777-pay-1", amount=150)
        print(f"   Попытка #{retry_num} ➔ ответ: {resp}")
    print(f"   💰 Итого списано со счёта клиента: {pay.total_charged} USD (вместо 450 USD!)")

    print("\n" + "=" * 72)
    print("3️⃣ ПРИМЕРЫ ЗАДЕРЖЕК EXPONENTIAL BACKOFF + FULL JITTER (без Retry Storm)")
    print("=" * 72)
    for attempt in range(5):
        delays = [f"{calc_backoff_with_full_jitter(attempt):.3f}s" for _ in range(3)]
        print(f"   Попытка #{attempt + 1}: 3 разных клиента подождут -> {', '.join(delays)}")
    print("\n🎓 Лаба №3 завершена!\n")


if __name__ == "__main__":
    run_demo()
