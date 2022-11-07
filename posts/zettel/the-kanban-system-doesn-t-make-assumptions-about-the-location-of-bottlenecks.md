---
book: null
draft: false
tags:
  - kanban
  - product-development
  - theory-of-constraints
date: '2022-11-07'
excerpt: >-
  Such a system is well-suited for the stochastic bottlenecks of product
  development.
title: The Kanban System Doesn't Make Assumptions About the Location of Bottlenecks
group: zettel
formattedDate: 'November 07, 2022'
updatedAt: '2022-11-07'
formattedUpdatedAt: 'November 07, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks.md
href: >-
  /zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks
slug: the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks.md
url: >-
  https://arantespp.com/zettel/the-kanban-system-doesn-t-make-assumptions-about-the-location-of-bottlenecks
keywords:
  - zettel
  - kanban
  - product-development
  - theory-of-constraints
readingTime: 1
references:
  - /zettel/work-in-process-wip
  - /zettel/kanban
  - /zettel/theory-of-constraints-toc
backlinks: []
---

## Notes

The [Kanban](/zettel/kanban) system doesn't make assumptions about the location of bottlenecks, compared to a [TOC system](/zettel/theory-of-constraints-toc), because any emergent bottleneck will begin to send a control signal that throttles its upstream process.

The advantage is that you don't need to know which process is the constraint, and any process can be the constraint at any time. Such a system is well-suited for the stochastic bottlenecks of product development.

Once a blockage occurs anywhere, the system stabilizes with each upstream process stopped (it can't forward the work because of the [Kanban pull principle](/zettel/kanban-pull-principle)) and holding its maximum [WIP](/zettel/work-in-process-wip). When the bottleneck regains capacity, there are no WIP-starved processes, and smooth flow begins immediately.
