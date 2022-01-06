---
image: null
book: null
draft: false
tags:
  - agner-krarup-erlang
  - david-kendall
  - kendal-notation
  - math
  - product-development
  - queues
  - statistics
rating: 3
date: '2021-07-24'
excerpt: >-
  It can provide essential insights to product developers because there're
  similar problems of unpredictable work arrival time and unpredictable task
  durations.
title: Queueing Theory
group: zettelkasten
formattedDate: 'July 24, 2021'
updatedAt: 'August 04, 2021'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettelkasten/queueing-theory.md
href: /zettelkasten/queueing-theory
as: /z/queueing-theory
slug: queueing-theory
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettelkasten/queueing-theory.md
url: 'https://arantespp.com/zettelkasten/queueing-theory'
keywords:
  - zettelkasten
  - mathematics
  - Statistics
  - Agner Krarup Erlang
  - product-development
  - kendal notation
  - David Kendall
  - queues
readingTime: 1
---

## Notes

- Queueing theory originated in 1909 with a paper written by a mathematician named Agner Krarup Erlang.

  - He accurately estimated the probability that a call would be blocked at different capacity utilization levels.

- It can provide essential insights to product developers because there're similar problems of unpredictable work arrival time and unpredictable task durations.

- Queueing systems:

  - **Queue**: the waiting work.
  - **Server**: the resource performing the work, whose time to complete the work may be unpredictable.
  - **Arrival Process**: the pattern with which work arrives, which is usually unpredictable.
  - [**Service Process**](/zettelkasten/queue-service-process): the process in which the server accomplishes the work.
  - **Queueing discipline**: how queue handles the waiting work.

- Kendall notation: $M/M/1/\infty$ queue.
  - The first $M$ refers to the **arrival process**, in this case, is the [Markov process](/zettelkasten/markov-process).
  - The second $M$ refers to the **service process**, which is also a [Markov process](/zettelkasten/markov-process).
  - The number $1$ refers to the number of parallel **servers** in the system.
  - The final term $\infty$ describes the upper limit on queue size.

## References

- [The Principles of Product Development Flow](/books/the-principles-of-product-development-flow)
