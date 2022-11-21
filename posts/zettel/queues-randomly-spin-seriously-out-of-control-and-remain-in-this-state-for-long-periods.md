---
book: null
draft: false
tags:
  - product-development
  - queueing-theory
date: '2022-10-24'
excerpt: >-
  A random process (sequence of random variables) has the chance to spin out
  from the mean because the variance of the accumulative total grows larger with
  time.
title: >-
  Queues Randomly Spin Seriously Out of Control and Remain in This State for
  Long Periods
group: zettel
formattedDate: 'October 24, 2022'
updatedAt: '2022-10-24'
formattedUpdatedAt: 'October 24, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods.md
href: >-
  /zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods
slug: >-
  queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods.md
url: >-
  https://arantespp.com/zettel/queues-randomly-spin-seriously-out-of-control-and-remain-in-this-state-for-long-periods
keywords:
  - zettel
  - product-development
  - queueing-theory
readingTime: 1
references: []
backlinks: []
---

## Notes

- A random process (sequence of random variables) has the chance to spin out from the mean because the variance of the accumulative total grows larger with time. If you flip a fair coin many times, the chances that the commutative number of heads or tails to be equal diminishes over time.

- Even in a low-variance case, as in the case of the coin above, the spin out of control happens.

- In product development, the same principle occurs, but with more intensity because its processes have much more variation. The variation is larger because you don't know the distribution of arrivals and server completions.

- It remains in a spin-out state for a long period because the probability of getting the opposite events to cancel the spin-out state is very low. If you drifted 10 heads in a sequence, the probability of getting 10 tails in a row to cancel the first 10 heads is about 1 in 1,000.

## References

- [The Principles of Product Development Flow. Q15: The Diffusion Principle](https://arantespp.com/books/the-principles-of-product-development-flow#q15-the-diffusion-principle-over-time-queues-will-randomly-spin-seriously-out-of-control-and-will-remain-in-this-state-for-long-periods)
