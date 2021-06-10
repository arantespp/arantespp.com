---
title: ACID (Database Systems)
excerpt: ACID stands for atomicity, consistency, isolation, durability.
date: 2021-04-26
rating: 2
tags:
  - computer science
  - database
  - Andreas Reuter
  - Theo Härder
---

## Notes

- ACID stands for atomicity, consistency, isolation, durability.

- The acronym ACID was coined by [Andreas Reuter](https://en.wikipedia.org/wiki/Andreas_Reuter) and [Theo Härder](https://en.wikipedia.org/wiki/Theo_H%C3%A4rder) in 1983.

- They're a set of database transactions intended to guarantee data validity.

  - Data validity is guaranteed even if errors or power failures happen.

- A sequence of database operations that satisfies the ACID properties is called **transaction**.

- The four properties:

  - **Atomicity**: it guarantees that each transaction (multiple operations) is considered as a single "unit". A transaction succeeds if all operations also succeed. If only one operation fails, the whole transaction also fails.

    - An atomic system must guarantee this property in all scenarios, including power failures, errors, and crashes.

  - **Consistency**: it ensures that transactions can only bring the database from a valid state to another.

    - It maintains the database invariants and constraints, for example, only numbers can be written in a property that is a number.

  - **Isolation**: it ensures that concurrent execution of transactions leaves the database as if the same transactions were executed sequentially.

    - The effects of an incomplete transaction cannot be visible by other transactions.

  - **Durability**: once the transaction is committed, it will remain even in the case of a system failure.

## References

- [Wikipedia. ACID](https://en.wikipedia.org/wiki/ACID)
