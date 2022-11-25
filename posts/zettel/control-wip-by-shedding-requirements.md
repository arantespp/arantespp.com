---
title: Control WIP by Shedding Requirements
group: zettel
slug: control-wip-by-shedding-requirements
date: '2022-11-21'
formattedDate: 'November 21, 2022'
excerpt: >-
  When WIP becomes high, you can purge WIP by decreasing the batch size of your
  jobs. A way to achieve this is to shed the requirements of your jobs.
tags:
  - cycle-time
  - job-batching
  - queueing-theory
  - work-in-progress
href: /zettel/control-wip-by-shedding-requirements
url: 'https://arantespp.com/zettel/control-wip-by-shedding-requirements'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/control-wip-by-shedding-requirements.md
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/control-wip-by-shedding-requirements.md
readingTime: 1
---

## Notes

"Shedding requirements" means reducing the number of things a job must do before it can be considered complete.

When [WIP](/zettel/work-in-process-wip) becomes high, you can purge WIP by decreasing the batch size of your jobs. A way to achieve this is to shed the requirements of your jobs. The underlying logic is that the economic cost of retaining a requirement rises during periods of congestion because [the economics of holding WIP changes when queue size changes](/zettel/the-economics-of-holding-wip-changes-when-queue-size-changes).

It makes economic sense to drop requirements with marginal economic benefits during such periods. Such requirement relief can bring a high payoff because you're operating on the steep section of the queuing curve, where a small decrease in loading leads to large savings in [cycle time](/zettel/cycle-time).

You relax performance goals by dropping features.

### A few ideas of what you can do:

- Ship a minimum viable product (MVP)
- Delay features that are not essential to the user's workflow
- Break up monolithic features into smaller pieces
