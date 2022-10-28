---
book: null
draft: false
tags:
  - agile
  - business
  - product-development
  - time-to-market
date: '2022-04-21'
excerpt: >-
  If a company takes ten days to deliver a feature to its customer on average,
  its cycle time is ten days.
title: Cycle Time
group: zettel
formattedDate: 'April 21, 2022'
updatedAt: 'May 01, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/cycle-time.md
href: /zettel/cycle-time
slug: cycle-time
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/cycle-time.md
url: 'https://arantespp.com/zettel/cycle-time'
keywords:
  - zettel
  - agile
  - business
  - product-development
  - time-to-market
readingTime: 1
references:
  - /zettel/little-s-law
  - /zettel/business-agility
backlinks:
  - title: Flow Efficiency
    href: /zettel/flow-efficiency
---

## Notes

- Cycle time is how fast a team finishes some work, for example, a product or a feature.

- It is the amount of time a task spends in the system through all steps.

- The shorter the cycle time, the shorter the time-to-market.

- If a company takes ten days to deliver a feature to its customer on average, its cycle time is ten days.

- One goal of [business agility](/zettel/business-agility) is to reduce cycle time.

- The product manager must consider the working and waiting times to measure the cycle time. For instance, if the team has worked on a feature for one day (active working time) and it has taken nine days to wait for some approval, its cycle time was ten days.

- You can use the [Little's Law](/zettel/little-s-law) to find the average cycle time $W$ given the average WIP $L$ and the average throughput $\lambda$.

$$
W (\text{average cycle time}) = \frac{L (\text{average WIP})}{\lambda (\text{average throughput})}
$$

## References

- [Principles of Product Development Flow](/books/the-principles-of-product-development-flow)
- [Rethinking Agile](/rethinking-agile)
