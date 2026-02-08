/**
 * ACID Simulation using PostgreSQL + Node.js (TypeScript)
 *
 * Requirements covered:
 * 1. Atomicity   → transaction fails halfway and rolls back
 * 2. Isolation   → concurrent transactions don't interfere
 * 3. Consistency → constraint violation is rejected
 * 4. Durability  → explained below (PostgreSQL internals)
 */

import { Pool, PoolClient } from "pg";

// 🔧 Update with your DB credentials
const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "acid_demo",
    port: 5432,
});

/* -----------------------------------------------------
   SETUP (run once)
----------------------------------------------------- */
async function setup() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS accounts (
      account_id SERIAL PRIMARY KEY,
      owner TEXT NOT NULL,
      balance NUMERIC NOT NULL CHECK (balance >= 0)
    );

    TRUNCATE TABLE accounts;

    INSERT INTO accounts (owner, balance) VALUES
      ('Alice', 1000),
      ('Bob', 500);
  `);
}

/* -----------------------------------------------------
   1️⃣ ATOMICITY
   All-or-nothing transaction
----------------------------------------------------- */
async function atomicityDemo() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Deduct money from Alice
        await client.query(
            "UPDATE accounts SET balance = balance - 300 WHERE owner = 'Alice'"
        );

        // ❌ Intentional failure
        throw new Error("Something exploded midway 💥");

        // Add money to Bob (never reached)
        await client.query(
            "UPDATE accounts SET balance = balance + 300 WHERE owner = 'Bob'"
        );

        await client.query("COMMIT");
    } catch (err) {
        console.log("Atomicity demo failed → rolling back");
        await client.query("ROLLBACK");
    } finally {
        client.release();
    }
}

/* -----------------------------------------------------
   2️⃣ ISOLATION
   Concurrent transactions don’t see dirty data
----------------------------------------------------- */
async function isolationDemo() {
    const clientA = await pool.connect();
    const clientB = await pool.connect();

    try {
        await clientA.query("BEGIN");
        await clientB.query("BEGIN");

        // Transaction A updates balance but does NOT commit
        await clientA.query(
            "UPDATE accounts SET balance = balance - 200 WHERE owner = 'Alice'"
        );

        // Transaction B tries to read Alice's balance
        const resB = await clientB.query(
            "SELECT balance FROM accounts WHERE owner = 'Alice'"
        );

        console.log("Isolation demo (Tx B sees):", resB.rows[0].balance);

        await clientA.query("ROLLBACK");
        await clientB.query("COMMIT");
    } finally {
        clientA.release();
        clientB.release();
    }
}

/* -----------------------------------------------------
   3️⃣ CONSISTENCY
   Constraint violation is rejected
----------------------------------------------------- */
async function consistencyDemo() {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // ❌ Violates CHECK (balance >= 0)
        await client.query(
            "UPDATE accounts SET balance = -999 WHERE owner = 'Bob'"
        );

        await client.query("COMMIT");
    } catch (err) {
        console.log("Consistency demo failed → constraint enforced");
        await client.query("ROLLBACK");
    } finally {
        client.release();
    }
}

/* -----------------------------------------------------
   4️⃣ DURABILITY (Explanation)
----------------------------------------------------- */
/**
 * PostgreSQL guarantees durability using:
 *
 * - Write-Ahead Logging (WAL)
 *   Before a COMMIT is acknowledged, changes are written
 *   to the WAL (on disk).
 *
 * - fsync()
 *   Ensures data is physically flushed to disk.
 *
 * - Crash Recovery
 *   If PostgreSQL crashes, it replays WAL logs
 *   to restore committed transactions.
 *
 * This means:
 * ✅ Once COMMIT succeeds, data survives crashes,
 *    power loss, and restarts.
 */

/* -----------------------------------------------------
   RUN ALL DEMOS
----------------------------------------------------- */
async function run() {
    await setup();

    console.log("\n--- ATOMICITY DEMO ---");
    await atomicityDemo();

    console.log("\n--- ISOLATION DEMO ---");
    await isolationDemo();

    console.log("\n--- CONSISTENCY DEMO ---");
    await consistencyDemo();

    const final = await pool.query("SELECT * FROM accounts");
    console.log("\nFinal account state:", final.rows);

    await pool.end();
}

run().catch(console.error);