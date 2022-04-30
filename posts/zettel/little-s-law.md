---
image: null
book: null
draft: false
tags:
  - john-d-c-little
  - queues
rating: 2
date: '2021-12-06'
excerpt: >-
  The law states that average queue time will equal the average queue size
  divided by the average processing rate.
title: Little's Law
group: zettelkasten
formattedDate: 'December 06, 2021'
updatedAt: 'April 22, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettelkasten/little-s-law.md
href: /zettelkasten/little-s-law
as: /z/little-s-law
slug: little-s-law
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettelkasten/little-s-law.md
url: 'https://arantespp.com/zettelkasten/little-s-law'
keywords:
  - zettelkasten
  - john-d-c-little
  - queues
readingTime: 1
---

## Notes

- The law states that average queue time will equal the average queue size divided by the average processing rate.

- It also states that the long-term average number $L$ of work in a system equals the long-term average effective arrival rate $\lambda$ multiplied by the average time $W$ that the work stays in the system.

$$
L = \lambda W
$$

- MIT professor John D. C. Little proved it in 1961.

- This formula is robust; it applies to virtually all queues disciplines, arrival rates, and departure processes ($W_Q$ is the queue time for an average job, $L_Q$ number of jobs in a queue, $\lambda$ average processing rate, $W_S$ is the system time for an average job, $L_S$ number of jobs in the system).

$$
W_Q = \frac{L_Q}{\lambda} \quad \text{or} \quad W_S = \frac{L_S}{\lambda},
$$

- You can use the formula for the whole system instead of just for a queue. This use is helpful when you have trouble distinguishing which items are in the queue and which ones are in service.

### Examples

Assume customers arrive at a rate of 10 per hour in a store and stay 0.5 hours on average. The average number of customers in the store is $L = 10 * 0.5 = 5$.

## References

- [The Principles of Product Development Flow](/books/the-principles-of-product-development-flow#q12-little-s-formula-wait-time-queue-size-processing-rate)

- [Wikipedia. Little's law](https://en.wikipedia.org/wiki/Little%27s_law)
