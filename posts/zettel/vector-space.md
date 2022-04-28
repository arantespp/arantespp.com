---
image: null
book: null
draft: false
tags:
  - linear-algebra
  - math
rating: 3
date: '2021-06-27'
excerpt: >-
  A vector space, or linear space, is a set of vectors. It's possible to scale
  by numbers, called scalars, and add these vectors together.
title: Vector Space
group: zettelkasten
formattedDate: 'June 27, 2021'
updatedAt: 'June 27, 2021'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/zettelkasten/vector-space.md
href: /zettelkasten/vector-space
as: /z/vector-space
slug: vector-space
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/zettelkasten/vector-space.md
url: 'https://arantespp.com/zettelkasten/vector-space'
keywords:
  - zettelkasten
  - linear algebra
  - mathematics
readingTime: 1
---

## Notes

- A vector space, or linear space, is a set of vectors. It's possible to scale by numbers, called scalars, and add these vectors together.

- The operations of vector addition or scalar multiplication in a vector space $X$ must safisty the following axions:
  - Additive axions. For every $\vec{x}$, $\vec{y}$, and $\vec{z}$ in $X$, we have:
    - $\vec{x} + \vec{y} = \vec{y} + \vec{x}$.
    - $(\vec{x} + \vec{y}) + \vec{z} = \vec{x} + (\vec{y} + \vec{z})$.
    - $\vec{0} + \vec{x} = \vec{x} + \vec{0} = \vec{x}$.
    - $(-\vec{x}) + \vec{x} = \vec{x} + (-\vec{x}) = \vec{x}$.
  - Multiplicative axions. For every $\vec{x}$ in $X$, and real numbers $c$ and $d$, we have:
    - $0\vec{x} = 0$.
    - $1\vec{x} = \vec{x}$.
    - $(cd)\vec{x} = c(d\vec{x})$.
  - Distributive axions. For every $\vec{x}$ and $\vec{y}$ in $X$, and real numbers $c$ and $d$, we have:
    - $c(\vec{x} + \vec{y}) = c\vec{x} + c\vec{y}$.
    - $(c + d)\vec{x} = c\vec{x} + d\vec{x}$.

## References

- [Wikipedia. Vector space](https://en.wikipedia.org/wiki/Vector_space)
- [Axioms of real vector spaces](https://www.math.ucla.edu/~tao/resource/general/121.1.00s/vector_axioms.html)
