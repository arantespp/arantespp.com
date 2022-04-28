---
image: null
book: null
draft: false
tags:
  - cumulative-flow-diagram
  - queues
rating: 2
date: '2021-12-01'
excerpt: The cumulative flow diagram (CFD) is a helpful tool for managing queues.
title: Cumulative Flow Diagram (CFD)
group: zettelkasten
formattedDate: 'December 01, 2021'
updatedAt: 'December 01, 2021'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettelkasten/cumulative-flow-diagram-cfd.md
href: /zettelkasten/cumulative-flow-diagram-cfd
as: /z/cumulative-flow-diagram-cfd
slug: cumulative-flow-diagram-cfd
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettelkasten/cumulative-flow-diagram-cfd.md
url: 'https://arantespp.com/zettelkasten/cumulative-flow-diagram-cfd'
keywords:
  - zettelkasten
  - cumulative-flow-diagram
  - queues
readingTime: 1
---

## Notes

- The cumulative flow diagram (CFD) is a helpful tool for managing queues.

- The diagram uses:

  - Time as its horizontal axis;
  - Cumulative quantity as its vertical axis;
  - Cumulative arrivals at a process as one variable;
  - Cumulative departure as a second variable.

- The vertical distance between the arrival line and the departure line is work that has arrived but not yet departed, the size of the queue at a time.

- The horizontal distance between the lines tells the cycle time through the process for an item of work.

- The total area between these two lines tells the size of the queue.

- The slope of the arrival line tells the arrival rate of the queue.

- The slope of the departure line tells the capacity of the process of emptying the queue.

![Cumulative Flow Diagram (CFD)](/images/originals/cumulative-flow-diagram.png)

## References

[Flow. Chapter 3 - Managing Queues](/flow#3-managing-queues)
