---
image:
  url: /images/nonauthor/vidar-nordli-mathisen-Kuu5mmxkwW4-unsplash.webp
  alt: >-
    Photo by <a
    href="https://unsplash.com/@vidarnm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Vidar
    Nordli-Mathisen</a> on <a
    href="https://unsplash.com/s/photos/road?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
book: null
bitLink: last-mile
draft: false
tags:
  - 90-90-rule
  - last-mile
  - product-development
  - project-management
  - software-engineering
rating: 5
date: '2021-03-22'
excerpt: >-
  These final adjustments can have fewer tasks than the core, but it is
  laborious. The time to finish it is almost like the core time implementation.
title: Last Mile in a Software Project
group: articles
formattedDate: 'March 22, 2021'
updatedAt: 'April 24, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/articles/last-mile-in-a-software-project.md
href: /articles/last-mile-in-a-software-project
as: /last-mile
slug: last-mile-in-a-software-project
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/articles/last-mile-in-a-software-project.md
url: 'https://arantespp.com/articles/last-mile-in-a-software-project'
keywords:
  - articles
  - 90-90-rule
  - last-mile
  - project-management
  - software-engineering
readingTime: 5
---

We recently built an App for a research team to help other researchers keep their projects up to date. Let's call this project **ProRes**. There was a problem with this project: we took so much time to finish it, and the quality wasn't the best as we were used to. We wondered about this project and others we've built at [Triângulos Tecnologia](https://triangulostecnologia.com), and we had some insights into the issues.

The other projects aren't necessarily more straightforward, they were as tricky as **ProRes**, but they took 4x less time than **ProRes** to be finished. The most significant difference was the order in which we executed the implementation.

In this article, we will better understand why this big difference happened. We think this problem is correlated to the [last mile problem](/zettel/last-mile-problem). So let's discuss a little about it.

## Last Mile Problem

Telecommunications is a common field where the [last mile problem](/zettel/last-mile-problem) appears. It occurs when it has a whole telecommunication infrastructure available except the one that links the final client, the final leg. For instance, suppose we have an optical fiber ring in a city that provides Internet to some buildings, but neighbor buildings don't have access to the ring. This is the last mile problem because the ring is working, but some clients can't access it.

We can see this problem in logistics too. A product may arrive in a country's capital but might not arrive in neighboring cities because there isn't an easy path there, for instance, need to cross a river.

_In summary, the last mile problem is the last thing that needs to be done before something works/arrives/finishes._

## Last Mile in a Software Development Context

We can see the last mile part in every implemented feature in almost every App we build. The first part of a feature is its core. We can call core the essential functionalities that such a feature must have. After the core is implemented, we have the final adjustments (FA) or the last mile. These adjustments don't change the functionalities but improve the application's user experience. For instance, if we're building a form, the core features are the fields and the submit logic; the FA are some input masks and designs.

These final adjustments can have fewer tasks than the core, but it is laborious. The time to finish it is almost like the core time implementation. We may explain this using the [flow state](/zettel/flow-state-psychology). Core tasks commonly are more challenging and exciting to be done, a condition to enter the state, while the last mile tasks don't. Then the FA may be the least efficient part of feature implementation.

![Core and last-mile development time vs. the number of tasks.](/images/originals/last-mile-time-vs-tasks.png)

## ProRes Execution

The **ProRes** App had some features. The objective of the project was to validate these features. Then, we started implementing all the core features together from the beginning. Once we've finished the core features and validated their core functionalities with the stakeholders, we've started building the final adjustments.

![Core features finished. Final adjustments are unfinished.](/images/originals/last-mile-application-prores.png)

As we can see in the figure above, we have four core features working and the final adjustments to be done. But another big problem arose: **they're dependent on each other**. Therefore, the energy needed ($E_N$) to finish them wasn't evaluated as a linear sum of the energy of each final refining. Instead, we have to consider the dependency of all unfinished parts. The definition of energy in a software context might be the time or the cost of the implementation.

$$
E_N = \underbrace{E_1 + E_2 + E_3 + E_4 + \dots}_{\text{linear}} + \underbrace{E_{12} + E_{13} + E_{124} + E_{1234\dots} + \dots}_{\text{dependency}}
$$

The number of factors of $E_N$ is given by the sum of all dependencies subgroups that can be made considering $n$ features, that is, $2^n -1$.

One of the reasons the dependency exists is because you need to switch between features when implementing them. For example, suppose you're doing feature 1's FA. At some time, you need a feature 2's FA to continue working on feature 1, so you switch your work to implement it. Working on feature 2, you also need some feature 3's FA... and so on.

### 90-90 Rule

This scenario is correlated to the [90-90 Rule](/zettel/the-90-90-rule), which states that

> "The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time." Tom Cargill, Bell Labs.

It was our case. 90% of the time was used to implement 90% of the main functionalities, while the last mile, which represents 10% of the value aggregated to the App, took another 90% of the stipulated time to be done.

## Other Apps Execution

While we've implemented all core features first on **ProRes**, on the other Apps, we finish a feature (core and final adjustments) before starting another one. So we didn't need to switch between required features because they've already been implemented.

We didn't have to worry about the energy dependency in these cases because it didn't exist.

![Features 1 and 2 are finished. Working on feature 3.](/images/originals/last-mile-application-other-apps.png)

## How to Overcome the Last Mile Problem?

1. **Break the project into small tasks**. This is the most important action to overcome the last mile problem. Once the tasks are small enough, big dependency energy among features doesn't exist - we don't have to switch between features while implementing one of them.

1. **Set aggressive deadlines**. Don't worry about setting aggressive deadlines because you know that the real one is still ahead. Even if you know that you won't make the deadline, you'll make better plans and prioritizations because you don't have much time left.

## Conclusion

The stakeholders and we weren't pleased with the **ProRes** execution. However, it was a very insightful experience that taught us more about the importance of having an efficient development path.

As developers, maybe we'll always want to develop the most excellent parts of an application, and because of this, the role of a [product manager (PM)](/zettel/product-manager) is significant. Also, to manage the development time, it's far-reaching that they, together with the whole team and the stakeholders, plan the most compelling features' sequence implementation to avoid the dependencies among all software's unfinished parts. It's also substantial that the PM guarantees that one feature is being implemented at a time.
