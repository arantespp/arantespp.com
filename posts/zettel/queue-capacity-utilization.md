---
title: Queue Capacity Utilization
excerpt: Queue capacity utilization is the amount of time the service process is working (not idle).
date: 2021-08-04
tags:
  - queues
rating: 2
---

## Notes

- Queue capacity utilization is the amount of time the [service process](/zettel/queueing-theory) is working (not idle).

- Knowing capacity utilization allows you to predict:

  - the percent of time arriving work will find the resource busy;
  - the average number of items in the queue;
  - the average number of items in the system;
  - the percent of overall cycle time is queue time;
  - the ratio of cycle time to value-added time.

- For $M/M/1/\infty$ Queue, you can predict these characteristcs:

  - Percent Capacity Utilization $= \rho$
  - Percent Unblocked Time $= 1 - \rho$
  - Number of Items in Queue $= \cfrac{\rho^2}{1-\rho}$
  - Numbers of Items in System $= \cfrac{\rho}{1-\rho}$
  - Percent Queue Time $= \rho$
  - $\cfrac{\text{Cycle Time}}{\text{Value-Added Time}} = \cfrac{1}{1-\rho}$

- Percent capacity utilization and percent queue time are identical for a random queue.

  - If you operate an $M/M/1/\infty$ queue at $X$ percent utilization, you're choosing to use $X$ percent queue time.

- Queues grow when you approach 100 percent utilization, they become exponentially large.

- It's hard to measure capacity utilization directly.

## References

- [The Principles of Product Development Flow](/books/the-principles-of-product-development-flow)

- [Tero Parviainen. A Dash of Queueing Theory](https://teropa.info/blog/2016/04/02/a-dash-of-queueing-theory.html)
