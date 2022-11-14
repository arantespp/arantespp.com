---
book: null
draft: false
tags:
  - cycle-time
  - product-development
  - queues
  - statistics
date: '2022-11-14'
excerpt: >-
  Low-queue states are more probable than high-queue states, but high-queue
  states are more important because they delay more jobs.
title: Most of the Damage Done by a Queue Is Caused by High-Queues States
group: zettel
formattedDate: 'November 14, 2022'
updatedAt: '2022-11-14'
formattedUpdatedAt: 'November 14, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states.md
href: /zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states
slug: most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states.md
url: >-
  https://arantespp.com/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states
keywords:
  - zettel
  - cycle-time
  - product-development
  - queues
  - statistics
readingTime: 1
references:
  - /zettel/queue-capacity-utilization
  - /zettel/cycle-time
backlinks: []
---

## Notes

The probability of finding a queue in a specific quantitative state (low or high-queue state) is a function of [capacity utilization](/zettel/queue-capacity-utilization). Low-queue states are more probable than high-queue states, but high-queue states are more important because they delay more jobs. As a result, they strongly influence [cycle time](/zettel/cycle-time) and can cause more economic damage and [waste to the project](/zettel/economic-waste-that-queues-create).

The $\text{State Probability}$ of an $M/M/1/\infty$ queue to have $n$ jobs in the system is:

$$
\text{State Probability} = \frac{1-\rho}{\rho^n}
$$
