---
book: null
draft: false
tags:
  - product-development
  - queue
  - work-in-process
date: '2022-11-14'
excerpt: >-
  You can block queues in two ways: 1. Eject the arriving job from the system.
  2. Hold back the job in an upstream queue.
title: Block All Demand when WIP Reaches Its Upper Limit
group: zettel
formattedDate: 'November 14, 2022'
updatedAt: '2022-11-14'
formattedUpdatedAt: 'November 14, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/block-all-demand-when-wip-reaches-its-upper-limit.md
href: /zettel/block-all-demand-when-wip-reaches-its-upper-limit
slug: block-all-demand-when-wip-reaches-its-upper-limit
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/block-all-demand-when-wip-reaches-its-upper-limit.md
url: 'https://arantespp.com/zettel/block-all-demand-when-wip-reaches-its-upper-limit'
keywords:
  - zettel
  - product-development
  - queue
  - work-in-process
readingTime: 1
references: []
backlinks: []
---

## Hypotheses

1. It takes a long time to correct a high-queue state.
1. [Queue can do enormous damage during this high-queue period](/zettel/most-of-the-damage-done-by-a-queue-is-caused-by-high-queues-states).
1. The most straightforward way to use the WIP constraint is to block all demand when it reaches its upper limit.

## Arguments

It's preferable to block demands than to allow queues to reach a high-queue state because the damage a high-queue condition can cause is greater than the gains of the demands.

You can block queues in two ways:

1. Eject the arriving job from the system.
2. Hold back the job in an upstream queue. This approach doesn't reduce demand; it just shifts the location of the queue. In addition, it can generate economic benefits because different queues have different holding costs.
