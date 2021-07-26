---
title: Queueing Theory
excerpt: It can provide essential insights to product developers because there're similar problems of unpredictable work arrival time and unpredictable task durations.
date: 2021-07-24
tags:
  - mathematics
  - Statistics
  - Agner Krarup Erlang
  - product-development
  - kendal notation
  - David Kendall
rating: 3
---

## Notes

- Queueing theory originated in 1909 with a paper written by a mathematician named Agner Krarup Erlang.

  - He accurately estimated the probability that a call would be blocked at different capacity utilization levels.

- It can provide essential insights to product developers because there're similar problems of unpredictable work arrival time and unpredictable task durations.

- Queueing systems:

  - **Queue**: the waiting work.
  - **Server**: the resource performing the work, whose time to complete the work may be unpredictable.
  - **Arrival Process**: the pattern with which work arrives, which is usually unpredictable.
  - **Service Process**: the process in which the server accomplishes the work.
  - **Queueing discipline**: how queue handles the waiting work.

- Kendall notation: $M/M/1/\infty$ queue.
  - The first $M$ refers to the **arrival process**, in this case, is the [Markov process](/zettelkasten/markov-process).
  - The second $M$ refers to the **service process**, which is also a [Markov process](/zettelkasten/markov-process).
  - The number $1$ refers to the number of parallel **servers** in the system.
  - The final term $\infty$ describes the upper limit on queue size.

## References

- [The Principles of Product Development Flow](/books/the-principles-of-product-development-flow)
