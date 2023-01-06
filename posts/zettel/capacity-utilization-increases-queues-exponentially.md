---
title: Capacity Utilization Increases Queues Exponentially
group: zettel
slug: capacity-utilization-increases-queues-exponentially
date: '2023-01-06'
formattedDate: 'January 06, 2023'
excerpt: >-
  Each time you halve the amount of excess capacity, you double the queue. You
  fold the queue as you move from 80 to 90 or 90 to 95 percent.
tags:
  - queueing-theory
href: /zettel/capacity-utilization-increases-queues-exponentially
url: >-
  https://arantespp.com/zettel/capacity-utilization-increases-queues-exponentially
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/capacity-utilization-increases-queues-exponentially.md
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/capacity-utilization-increases-queues-exponentially.md
readingTime: 1
---

## Notes

[Queue capacity utilization](/zettel/queue-capacity-utilization) is the most critical factor that affects queue size. As you approach 100% of the queue capacity, queues become exponentially large.

Each time you halve the amount of excess capacity, you double the queue. You fold the queue as you move from 80 to 90 or 90 to 95 percent.

![Queue Size vs Percent Capacity Utilization](/images/originals/queue-size-vs-percent-capacity-utilization.png)

## Questions

- What are the consequences of not monitoring queue capacity utilization?
- What techniques can be used to manage queue capacity utilization?

## References

- [The Principles of Product Development Flow. Chapter 3. Managing Queues](/books/the-principles-of-product-development-flow#3-managing-queues)
