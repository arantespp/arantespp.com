---
title: ACID (Database Systems)
excerpt: ACID (database systems) stands for atomicity, consistency, isolation, durability.
date: 2021-04-26
rating: 2
tags:
  - computer science
  - database
  - Andreas Reuter
  - Theo Härder
---

## Notes

- ACID (database systems) stands for atomicity, consistency, isolation, durability.

- [Andreas Reuter](https://en.wikipedia.org/wiki/Andreas_Reuter) and [Theo Härder](https://en.wikipedia.org/wiki/Theo_H%C3%A4rder) coined the acronym ACID in 1983.

- They're a set of database transactions intended to guarantee data validity.

  - Data validity is guaranteed even if errors or power failures happen.

- **Transaction** is a sequence of database operations that satisfies the ACID properties.

- The four properties:

  - **Atomicity**: guarantees that each transaction (multiple operations) is considered a single "unit." A transaction succeeds if all operations also succeed. If only one operation fails, the whole transaction also fails.

    - An atomic system must guarantee this property in all scenarios, including power failures, errors, and crashes.

  - **Consistency**: ensures that transactions can only bring the database from a valid state to another.

    - It maintains the database invariants and constraints. For example, only numbers can be written in a property that is a number.

  - **Isolation**: ensures that concurrent execution of transactions leaves the database as if the same transactions were executed sequentially.

    - The effects of an incomplete transaction cannot be visible by other transactions.

  - **Durability**: once the transaction is committed, it will remain even in the case of a system failure.

## References

- [Wikipedia. ACID](https://en.wikipedia.org/wiki/ACID)
