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
  The formula states that average queue time will equal the average queue size
  divided by the average processing rate.
title: Little's Formula
group: zettelkasten
formattedDate: 'December 06, 2021'
updatedAt: 'December 06, 2021'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettelkasten/little-s-formula.md
href: /zettelkasten/little-s-formula
as: /z/little-s-formula
slug: little-s-formula
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettelkasten/little-s-formula.md
url: 'https://arantespp.com/zettelkasten/little-s-formula'
keywords:
  - zettelkasten
  - john-d-c-little
  - queues
readingTime: 1
---

## Notes

- The formula states that average queue time will equal the average queue size divided by the average processing rate.

- The MIT professor John D. C. Little proved it in 1961.

- This formula is very robust; it applies to virtually all queues disciplines, arrival rates, and departure processes.

$$
W_Q = \frac{L_Q}{\lambda} \quad \text{or} \quad W_S = \frac{L_S}{\lambda}
$$

Where $W_Q$ is the queue time for an average job, $L_Q$ number of jobs in a queue, $\lambda$ average processing rate, $W_S$ is the system time for an average job, $L_S$ number of jobs in the system.

- You can use the formula for the whole system instead of just for a queue. This use is helpful when you have trouble distinguishing which items are in the queue and which ones are in service.

## References

- [The Principles of Product Development Flow](/flow#q12-little-s-formula-wait-time-queue-size-processing-rate)
