---
title: Last Mile in a Software Project
excerpt: >-
  These final adjustments can have fewer tasks compared with the core, but it is
  the laborious part, then the time to finish it is almost as the core time
  implementation.
date: '2021-03-22T00:00:00.000Z'
tags:
  - software-engineering
  - last-mile
  - project-management
  - 90-90-rule
rating: 5
image:
  url: 'https://source.unsplash.com/Kuu5mmxkwW4'
  alt: >-
    Photo by <a
    href="https://unsplash.com/@vidarnm?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Vidar
    Nordli-Mathisen</a> on <a
    href="https://unsplash.com/s/photos/road?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a>
---

# last-mile-in-a-software-project

We built an App recently for a researchers team about helping other researchers to keep their projects in day. Let's call this project **ProRes**. There was a problem with this project: we took so much time to finish it, and the quality wasn't the best as we were used to. We were wondering about this project and others we've built at [Triângulos Tecnologia](https://triangulostecnologia.com) and we had some insights about the issues.

The other projects aren't necessarily easier, they were as difficult as **ProRes**, but they took 4x less time than **ProRes** to be finished. The biggest difference was the order in which we executed the implementation.

In this article, we're going to try to understand better why this big difference happened. We think this problem is correlated to the [last mile problem](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/zettelkasten/last-mile-problem/README.md). So let's discuss a little about it.

## Last Mile Problem

Telecommunications is a common field in which the [last mile problem](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/zettelkasten/last-mile-problem/README.md) appears. It occurs when it has a whole telecommunication infrastructure available except the one that links the final client, the final leg. For instance, suppose we have an optical fiber ring in a city that provides Internet to some buildings, but neighbor buildings don't have access to the ring. This is a last mile problem because the ring is working but some clients can't access it.

We can see this problem in logistics too. A product may arrive in a capital of a country but might not arrive in neighboring cities because there isn't an easy path to there, for instance, need to cross a river.

_In summary, the last mile problem is the last thing that needs to be done to something works/arrives/finishes._

## Last Mile in a Software Development Context

Almost every App we build, we can see the last mile part in every implemented feature. The first part of a feature is the core. We can call core the most important and the essential functionalities that such feature must-have. After the core is implemented, we have the final adjustments \(FA\) or the last mile. These adjustments don't change the functionalities, rather improve the user experience of the application. For instance, if we're building a form, the core features are the fields and the submit logic; the FA are some input masks and design.

These final adjustments can have fewer tasks compared with the core, but it is the laborious part, then the time to finish it is almost as the core time implementation. We may explain this using the [flow state](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/zettelkasten/flow-state-psychology/README.md). Core tasks commonly are more challenging and interesting to be done, a condition to enter the state, whilst the last mile tasks, don't. Then the FA may be the least efficient part of a feature implementation.

![Core and last mile development time vs number of tasks.](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/images/articles/last-mile-in-a-software-project/last-mile-time-vs-tasks.png)

## ProRes Execution

The **ProRes** App had some features. The objective of the project was to validate these features. Then, since the beginning, we started implementing all the core features together. Once we've finished the core features and validate their core functionalities with the stakeholders, we've started building the final adjustments.

![Core features finished. Final adjustments unfinished.](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/images/articles/last-mile-in-a-software-project/last-mile-application-prores.png)

As we can see in the figure above, we have 4 core features working and the final adjustments to be done. But another big problem arose: **they're dependent on each other**, therefore the energy needed \($E\_N$\) to finish them wasn't evaluated as a linear sum of the energy of each final refining, rather we have to consider the dependency of all unfinished parts. The definition of energy in a software context might be the time or the cost of the implementation.

$$
E_N = \underbrace{E_1 + E_2 + E_3 + E_4 + \dots}_{\text{linear}} + \underbrace{E_{12} + E_{13} + E_{124} + E_{1234\dots} + \dots}_{\text{dependency}}
$$

The number of factors of $E\_N$ is given by the sum of all dependencies subgroups that can be made considering $n$ features, that is, $2^n -1$.

One of the reasons the dependency existence is because you need to switch between features when implementing them. Suppose you're doing the feature 1's FA. At some time, you need a feature 2's FA to continue working on feature 1, so you switch your work to implement it. Working on feature 2, you also need some feature 3's FA... and so on.

### 90-90 Rule

This scenario is correlated to the [90-90 Rule](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/zettelkasten/the-90-90-rule/README.md), which states that

> "The first 90 percent of the code accounts for the first 90 percent of the development time. The remaining 10 percent of the code accounts for the other 90 percent of the development time." Tom Cargill, Bell Labs.

It was our case. 90% of the time was used to implement 90% of the main functionalities, while the last mile, which represents 10% of the value aggregated to the App, took another 90% of the stipulated time to be done.

## Other Apps Execution

While we've implemented all core features first on **ProRes**, on the other Apps we finish a feature \(core and final adjustments\) before starting another one. In this case, we didn't need to switch between required features because they've already had been implemented.

In these case, we didn't have to worry about the dependency energy because it didn't exist.

![Feature 1 and 2 finished. Working on feature 3.](https://github.com/arantespp/arantespp.com/tree/b6972d031c3b14786c74e4cbe8941b4cc5f36c0f/images/articles/last-mile-in-a-software-project/last-mile-application-other-apps.png)

## How to Overcome the Last Mile Problem?

1. **Break the project into small tasks**. This is the most important action to be made to overcome the last mile problem. Once the tasks are small enough, big dependency energy among features doesn't exist - we don't have to switch between features while implementing one of them.
2. **Set aggressive deadlines**. Don't worry about setting aggressive deadlines because you know that the real one is still ahead. Even if you know that you won't make the deadline, you'll make better plans and prioritizations because you don't have much time left.

## Conclusion

We and the stakeholders weren't very happy with the **ProRes** execution. However, it was a very insightful experience that teaches us more about the importance of having an efficient development path.

As developers, maybe we'll always want to develop the coolest parts of an application and because of this, the role of a product manager \(PM\) is very important. Also, to manage the development time, it's far-reaching that he/she, together with the whole team and the stakeholders, plans the most effective features' sequence implementation to avoid the dependencies among all software's unfinished parts. It's also substantial the PM guarantee that one feature is being implemented at a time.

