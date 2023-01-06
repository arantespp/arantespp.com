---
title: Queue Capacity Utilization Allows You to Predict Many Queues Characteristics
group: zettel
slug: queue-capacity-utilization-allows-you-to-predict-many-queues-characteristics
date: '2023-01-06'
formattedDate: 'January 06, 2023'
excerpt: >
  The percent of the time that the arriving work will find the server busy, the
  average number of items in the queue, the average number of items in the
  system.
tags:
  - queueing-theory
href: >-
  /zettel/queue-capacity-utilization-allows-you-to-predict-many-queues-characteristics
url: >-
  https://arantespp.com/zettel/queue-capacity-utilization-allows-you-to-predict-many-queues-characteristics
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/queue-capacity-utilization-allows-you-to-predict-many-queues-characteristics.md
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/queue-capacity-utilization-allows-you-to-predict-many-queues-characteristics.md
readingTime: 1
---

## Notes

Knowing [queue capacity utilization](/zettel/queue-capacity-utilization) ($\rho$) allows you to predict the following:

- the percent of the time that the arriving work will find the server busy;
- the average number of items in the queue;
- the average number of items in the system;
- the percent of overall cycle time is queue time;
- the ratio of cycle time to value-added time.

For $M/M/1/\infty$ Queue, you can predict these characteristics:

- Percent Capacity Utilization $= \rho$
- Percent Unblocked Time $= 1 - \rho$
- Number of Items in Queue $= \cfrac{\rho^2}{1-\rho}$
- Numbers of Items in System $= \cfrac{\rho}{1-\rho}$
- Percent Queue Time $= \rho$
- $\cfrac{\text{Cycle Time}}{\text{Value-Added Time}} = \cfrac{1}{1-\rho}$

This property is helpful from a practical perspective, but it's often tough to directly measure capacity utilization in product development processes. Moreover, it's problematic because the ratio of **demand** and **capacity** are individually hard to estimate.

## Questions

- What methods can measure queue capacity utilization in product development processes?

## References

- [The Principles of Product Development Flow. Chapter 3. Managing Queues](/books/the-principles-of-product-development-flow#3-managing-queues)
