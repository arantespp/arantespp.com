---
book: null
draft: false
tags:
  - product-development
  - work-in-process
date: '2022-11-09'
excerpt: >-
  If you fix the level of a WIP pool, you'd inherently synchronize the arrival and departure rates of this pool.
title: Fixed WIP Couples the Batch Sizes of Adjacent Processes
group: zettel
formattedDate: 'November 09, 2022'
updatedAt: '2022-11-09'
formattedUpdatedAt: 'November 09, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes.md
href: /zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes
slug: fixed-wip-couples-the-batch-sizes-of-adjacent-processes
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes.md
url: >-
  https://arantespp.com/zettel/fixed-wip-couples-the-batch-sizes-of-adjacent-processes
keywords:
  - zettel
  - work-in-process
readingTime: 1
references:
  - /zettel/work-in-process-wip
backlinks: []
---

## Notes

If you fix the level of a [WIP](/zettel/work-in-process-wip) pool, you'd inherently synchronize this pool's arrival and departure rates.

In such a system, the pool blocks the new arrivals until a job departs from the WIP pool. This configuration forces the batch size and timing of the arrival process to match the batch size and timing of the departure process, coupling them.

Coupling the adjacent processes isn't always desirable because they may have different economic sizes.

For example, the batch size of a manufacturing process may be 100 units, while the batch size of a downstream process may be 10 units. In such a case, the manufacturing process would be forced to produce 10 batches of 10 units each, instead of 1 batch of 100 units.

## Questions

You decouple adjacent processes by allowing WIP pools to cycle between an upper constraint and the lower limit of zero. Why does this happen?

## References

- [The Principles of Product Development Flow. Chapter 6. Applying WIP Constraints](/books/the-principles-of-product-development-flow#6-applying-wip-constraints)
