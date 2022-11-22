---
title: The Economics of Holding WIP Changes when Queue Size Changes
group: zettel
slug: the-economics-of-holding-wip-changes-when-queue-size-changes
date: '2022-11-16'
formattedDate: 'November 16, 2022'
excerpt: >-
  Whenever WIP is high, queues are high. When queues are high, jobs in the
  process generate high delay costs. Most of the damage is caused by high-state
  queues.
tags:
  - cost-of-delay
  - economic-framework
  - high-state-queues
  - queueing-theory
  - work-in-process
href: /zettel/the-economics-of-holding-wip-changes-when-queue-size-changes
url: >-
  https://arantespp.com/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes.md
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes.md
readingTime: 1
---

## Hypotheses

- Whenever [WIP](/zettel/work-in-process-wip) is high, [queues](/zettel/queues-in-product-development) are high.

- When queues are high, jobs in the process generate high [delay costs](/zettel/cost-of-delay) because of the multiplier of [queues in the state of out control](/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods).

- [Most of the damage done by a queue is caused by high-state queues](/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states).

## Theses

Therefore, the cost of a job when the queue state is low increases when the queue is in a high state.

## Questions

1. What is the relationship between WIP and queues?
2. How do delay costs affect jobs in the process?
3. Does most of the damage done by a queue come from high-state queues?
