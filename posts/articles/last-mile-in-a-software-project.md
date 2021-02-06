---
title: Last Mile in a Software Project
draft: true
excerpt: These final adjustments can have fewer tasks compared with the core, but it is the laborious part, then the time to finish it is almost as the core time implementation.
date: 2021-01-02
tags:
  - software-engineering
  - last-mile
  - project-management
rating: 5
image:
  url: https://source.unsplash.com/Kuu5mmxkwW4
  alt: Photo by <a href="https://unsplash.com/@vidarnm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Vidar Nordli-Mathisen</a> on <a href="https://unsplash.com/s/photos/road?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
---

We built an App recently for a researchers team about helping other researchers to keep their projects in day. Let's call this project as **ProRes**. There was a problem with this project: we took so much time to finish it, and the quality wasn't the best as we were used to. We were wondering about this project and others we've built at [Triângulos Tecnologia](https://triangulostecnologia.com) and we had some insights about the issues.

The other projects aren't necessarily easier, they were as difficult as **ProRes**, but they took 4x less time than **ProRes** to be finished. The biggest difference was the order in which we executed the implementation.

In this article, we're going to try to understand better why this big difference happened. We think this problem is correlated to the [last mile problem](/zettelkasten/last-mile-problem). So let's discuss a little about it.

## Last Mile Problem

Telecommunications is a common field in which the [last mile problem](/zettelkasten/last-mile-problem) appears. It occurs when it has a whole telecommunication infrastructure available except the one that links the final client, the final leg. For instance, suppose we have a optical fiber ring in a city that provides Internet to some buildings, but neighbor buildings don't have access to the ring. This is a last mile problem because the ring is working but some clients can't access.

We can see this problem in logistics too. A product may arrive in a capital of a country but might not arrives to neighbor cities because there isn't a easy path to there, for instance, need to cross a river.

_In summary, last mile problem is the last thing that need to be done to something works/arrives/finishes._

## Last Mile in a Software Development Context

Almost every App we build, we can see a last mile part in every implemented feature. The first part of a feature is the core. We can call core the most important and the essential functionalities that such feature must have. After the core implemented, we have the final adjustments (FA) or the last mile. These adjustments doesn't change the functionalities, rather improve the user experience of the application. For instance, if we're building a form, the core features are the fields and the submit logic; the FA are some input masks and design.

These final adjustments can have fewer tasks compared with the core, but it is the laborious part, then the time to finish it is almost as the core time implementation. We may explain this using the [flow state](/zettelkasten/flow-state-psychology). Core tasks commonly are more challenging and interesting to be done, a condition to enter the state, whilst the last mile tasks, don't. Then the FA may be the least efficient part of a feature implementation.

![Core and last mile development time vs number of tasks.](/images/last-mile-time-vs-tasks.png)

## ProRes Execution

The **ProRes** App had some features. The objective of the project was validating these features. Then, since the beginning, we started implementing all the core features together. Once we've finished the core features and validate their core functionalities with the stakeholders, we've started building the final adjustments.

![Core features finished. Final adjustments unfinished.](/images/last-mile-application-prores.png)

As we can see in the figure above, we have 4 core features working and the final adjustments to be done. But other big problem arose: **they're dependent to each other**, therefore the energy needed ($E_N$) to finish them wasn't evaluated as a linear sum of the energy of each final refining, rather we have to consider the dependency of all unfinished parts. The definition of energy in a software context might be the time or the cost of the implementation.

$$
E_N = \underbrace{E_1 + E_2 + E_3 + E_4 + \dots}_{\text{linear}} + \underbrace{E_{12} + E_{13} + E_{124} + E_{1234\dots} + \dots}_{\text{dependency}}
$$

The number of factors of $E_N$ is given by the sum of all dependencies subgroups that can be made considering $n$ features, that is, $2^n -1$.

One of the reasons the dependency existence is because you need to switch between features when implementing them. Suppose you're doing the feature 1's FA. At some time, you need a feature 2's FA to continue working on feature 1, so you switch your work to implement it. Working on feature 2, you also need some feature 3's FA... and so on.

## Other Apps Execution

While we've implemented all core features first on **ProRes**, on the other Apps we completely finishes a feature (core and final adjustments) before starting another one. In this case, we didn't need to switch between required features because they've already had been implemented.

![Feature 1 and 2 finished. Working on feature 3.](/images/last-mile-application-other-apps.png)

## Conclusion

We and the stakeholders weren't very happy with the **ProRes** execution. However, it was a very insightful experience that teach us more about the importance of having an efficient development's path.

As developers, maybe we'll always want to develop the coolest parts of an application and because of this, the role of a product manager is very important. In addition to manage the development time, it's far-reaching that he/she, together with the whole team and the stakeholders, plans the most efficient features sequence to be implemented to avoid the dependencies of all software's unfinished parts.
