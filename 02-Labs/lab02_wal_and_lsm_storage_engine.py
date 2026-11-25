#!/usr/bin/env python3
"""
Лаба №2 (Фаза 3): Мини-движок хранения данных с Write-Ahead Log (WAL), MemTable и Crash Recovery.
Демонстрирует, как PostgreSQL и RocksDB гарантируют сохранность данных при внезапном падении процесса!
Запуск: python3 lab02_wal_and_lsm_storage_engine.py
"""

import json
import os
import tempfile
from pathlib import Path


class MiniWALStorageEngine:
    """Учебный движок KV-базы: MemTable в RAM + WAL на диске с fsync() + сброс SSTable."""

    def __init__(self, data_dir: Path):
        self.data_dir = data_dir
        self.wal_path = data_dir / "wal.log"
        self.sstable_path = data_dir / "sstable_001.json"
        self.memtable = {}
        self.recover_from_disk()

    def recover_from_disk(self):
        """Восстановление состояния: сначала читаем сохранённый SSTable, затем проигрываем WAL."""
        self.memtable.clear()
        if self.sstable_path.exists():
            self.memtable.update(json.loads(self.sstable_path.read_text(encoding="utf-8")))

        replayed = 0
        if self.wal_path.exists():
            with self.wal_path.open("r", encoding="utf-8") as f:
                for line in f:
                    line = line.strip()
                    if not line:
                        continue
                    record = json.loads(line)
                    if record["op"] == "PUT":
                        self.memtable[record["key"]] = record["val"]
                    elif record["op"] == "DEL":
                        self.memtable.pop(record["key"], None)
                    replayed += 1
        if replayed:
            print(f"   🔄 [Recovery] Проиграно {replayed} записей из WAL-журнала на диске!")

    def put(self, key: str, value: str):
        # 1. Сначала СИНХРОННО пишем в конец WAL и делаем fsync на физический диск!
        entry = json.dumps({"op": "PUT", "key": key, "val": value}, ensure_ascii=False)
        with self.wal_path.open("a", encoding="utf-8") as f:
            f.write(entry + "\n")
            f.flush()
            os.fsync(f.fileno())
        # 2. Только потом обновляем быструю память MemTable
        self.memtable[key] = value

    def delete(self, key: str):
        entry = json.dumps({"op": "DEL", "key": key}, ensure_ascii=False)
        with self.wal_path.open("a", encoding="utf-8") as f:
            f.write(entry + "\n")
            f.flush()
            os.fsync(f.fileno())
        self.memtable.pop(key, None)

    def get(self, key: str):
        return self.memtable.get(key)

    def checkpoint_flush_to_sstable(self):
        """Сброс MemTable на диск в неизменяемый SSTable (и очистка WAL)."""
        existing = {}
        if self.sstable_path.exists():
            existing = json.loads(self.sstable_path.read_text(encoding="utf-8"))
        existing.update(self.memtable)
        self.sstable_path.write_text(json.dumps(existing, indent=2, ensure_ascii=False), encoding="utf-8")
        if self.wal_path.exists():
            self.wal_path.unlink()
        print("   💾 [Checkpoint] MemTable сброшена в SSTable, старый WAL безопасно очищен.")


def run_demo():
    print("\n🗄️  CORE-37 LAB #2 — ДВИЖОК БАЗЫ ДАННЫХ: WAL + MEMTABLE + CRASH RECOVERY\n")
    with tempfile.TemporaryDirectory() as tmp:
        db_dir = Path(tmp)

        print("1️⃣ Запускаем движок БД и записываем транзакции:")
        db = MiniWALStorageEngine(db_dir)
        db.put("wallet:alice", "1000 USD")
        db.put("wallet:bob", "500 USD")
        db.put("wallet:alice", "1250 USD")
        db.checkpoint_flush_to_sstable()

        print("\n2️⃣ Пишем новые критичные данные (они попали в WAL и RAM, но НЕ в SSTable!):")
        db.put("wallet:bob", "250 USD")
        db.put("tx:991", "PAID")
        db.delete("tx:old")
        print(f"   В памяти прямо сейчас: bob = {db.get('wallet:bob')}, tx:991 = {db.get('tx:991')}")

        print("\n💥 3️⃣ СИМУЛЯЦИЯ ВНЕЗАПНОГО ОТКЛЮЧЕНИЯ СВЕТА (RAM полностью потеряна!)...")
        del db  # Уничтожаем объект и всю MemTable в памяти

        print("\n🔌 4️⃣ Перезапускаем сервер БД с тем же каталогом диска:")
        db_restarted = MiniWALStorageEngine(db_dir)
        print(f"   ✅ Проверено после рестарта: alice = {db_restarted.get('wallet:alice')}")
        print(f"   ✅ Проверено после рестарта: bob   = {db_restarted.get('wallet:bob')}")
        print(f"   ✅ Проверено после рестарта: tx:991= {db_restarted.get('tx:991')}")
        print("\n🎓 Вывод: ни один закоммиченный байт не пропал благодаря Write-Ahead Log + fsync!\n")


if __name__ == "__main__":
    run_demo()
