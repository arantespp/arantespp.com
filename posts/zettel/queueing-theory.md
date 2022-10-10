---
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
date: '2021-07-24'
excerpt: >-
  It can provide essential insights to product developers because there're
  similar problems of unpredictable work arrival time and unpredictable task
  durations.
title: Queueing Theory
group: zettel
formattedDate: 'July 24, 2021'
updatedAt: '2022-10-10'
formattedUpdatedAt: 'October 10, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/queueing-theory.md
href: /zettel/queueing-theory
slug: queueing-theory
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/queueing-theory.md
url: 'https://arantespp.com/zettel/queueing-theory'
keywords:
  - zettel
  - agner-krarup-erlang
  - david-kendall
  - kendal-notation
  - math
  - product-development
  - queues
  - statistics
readingTime: 1
references:
  - /zettel/markov-process
  - /zettel/queue-service-process
backlinks:
  - title: M/G/1 Queue
    href: /zettel/m-g-1-queue
  - title: Queue Capacity Utilization
    href: /zettel/queue-capacity-utilization
---

## Notes

- Queueing theory originated in 1909 with a paper written by a mathematician named Agner Krarup Erlang.

  - He accurately estimated the probability that a call would be blocked at different capacity utilization levels.

- It can provide essential insights to product developers because there're similar problems of unpredictable work arrival times and task durations.

- Queueing systems:

  - **Queue**: the waiting work.
  - **Server**: the resource performing the work, whose time to complete the work may be unpredictable.
  - **Arrival Process**: the pattern with which work arrives. It's usually unpredictable.
  - [**Service Process**](/zettel/queue-service-process): the process in which the server accomplishes the work.
  - **Queueing discipline**: how queue handles the waiting work, the rules under which an organization processes incoming items. For example, First Come, First Served, Last In First Out, First In Still Here, etc.

- Kendall notation: $M/M/1/\infty$ queue.
  - The first $M$ refers to the **arrival process**, in this case, is the [Markov process](/zettel/markov-process).
  - The second $M$ refers to the **service process**, which is also a [Markov process](/zettel/markov-process).
  - The number $1$ refers to the number of parallel **servers** in the system.
  - The final term $\infty$ describes the upper limit on queue size.

## References

- [The Principles of Product Development Flow](/books/the-principles-of-product-development-flow)
