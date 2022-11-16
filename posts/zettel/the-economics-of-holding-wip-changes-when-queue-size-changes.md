---
book: null
draft: false
tags:
  - cost-of-delay
  - economic-framework
  - high-state-queues
  - queues
  - work-in-process
date: '2022-11-16'
excerpt: >-
  Whenever WIP is high, queues are high. When queues are high, jobs in the
  process generate high delay costs. Most of the damage is caused by high-state
  queues.
title: The Economics of Holding WIP Changes when Queue Size Changes
group: zettel
formattedDate: 'November 16, 2022'
updatedAt: '2022-11-16'
formattedUpdatedAt: 'November 16, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes.md
href: /zettel/the-economics-of-holding-wip-changes-when-queue-size-changes
slug: the-economics-of-holding-wip-changes-when-queue-size-changes
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes.md
url: >-
  https://arantespp.com/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes
keywords:
  - zettel
  - cost-of-delay
  - economic-framework
  - high-state-queues
  - queues
  - work-in-process
readingTime: 1
references:
  - /zettel/cost-of-delay
  - /zettel/work-in-process-wip
  - /zettel/queues-in-product-development
  - >-
    /zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods
  - /zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states
backlinks: []
---

## Hypotheses

- Whenever [WIP](/zettel/work-in-process-wip) is high, [queues](/zettel/queues-in-product-development) are high.

- When queues are high, jobs in the process generate high [delay costs](/zettel/cost-of-delay) because of the multiplier of [queues in the state of out control](/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods).

- [Most of the damage done by a queue is caused by high-state queues](/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states).

## Theses

- Therefore, the cost of a job when the queue state is low changes when the queue is in a high state.

- It's logical to purge jobs of low value from the queue whenever there is a surplus of high-value jobs, ensuring open slots for other high-value jobs.

- You must ask whether it's appropriate to hold jobs in the queue using your economic framework. It's like a hospital moving noncritical patients from the limited number of emergency room beds to serve critical patients.

## Questions

1. What is the relationship between WIP and queues?
2. How do delay costs affect jobs in the process?
3. Does most of the damage done by a queue come from high-state queues?
