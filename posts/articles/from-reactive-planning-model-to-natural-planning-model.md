---
title: From Reactive Planning Model to Natural Planning model
excerpt:
date:
tags:
  - reactive planning model
  - natural planning model
  - getting things done
  - software development
  - hyperbolic discounting
rating: 6
image:
  url: https://source.unsplash.com/gcsNOsPEXfs
  alt: Photo by <a href="https://unsplash.com/@firmbee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Firmbee.com</a> on <a href="https://unsplash.com/s/photos/planning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
draft: true
---

I work with software development. Two friends from university and me stared a software house at the end of 2018. Today we aren't only a software house (SH), we're defining process and rules to become a [Venture Builder](/zettelkasten/startup-studio). Our first big application just started at the same time we founded [Triângulos Tecnologia](https://triangulostecnologia.com). We didn't have much experience in software development when we started such project, we made mistakes in some parts of the project, from hiring and estimating the costs until ensure quality of the application and architecture.

## The Reactive Planning Model

It's interesting to detect the Reactive Planning Model when you don't have experience in what you're doing. Let me share our path with you.

Every small software project just starts perfect. Very well organized, documented, without bugs, everyone with a big amount of energy to make things happen. And this is expected because, well, the project is small. We have control on it. The issues appear when it grows, when the number of features and complexity increase. Now imagine that we've worked on application for some months without a effective management, it was live, and our client has already been using it.

Until some point, the project was manageable, but after some feature requests and bug reports, it becomes unfeasible. Almost every bug fix or feature implementation broke other "uncorrelated" part of the application. That slowed us down a lot because the software was being used by our client and his customers and we had to rush to fix the new bugs (yes, we didn't have testing at that time).

We were living doing the **next actions**. Implementation, bug appear, client warn us, fix the bug. That was our cycle. Such situation became unworkable, until we finally assemble the team and say, "We need to get **organized**". Instead just start coding to fix the newest bug, we organized our priorities and requests.

This organization relieved our tension for a moment, but the bugs continued to appear. Then the manager realized that our initial planning wasn't enough and suggested to do a **[brainstorming](/zettelkaten/brainstorming).** It was good. We had good ideas of _how_ to ensure software quality, as create more tests and document more the application. The quantity of bugs decreased, but still continued to appear. Why? Because after some time, even we know that tests are important, our mindset was something like this, "We know that tests are important, but why should we spend time doing tests if it's better release the feature as soon as possible?"

So we went to the next step of the Reactive Planning Model, the **vision**. We know that tests and documentation improve software quality, but _what_ will we achieve if we do that? We'll achieve excellent software quality, customers will be happy, we'll have a good reputation. That is the vision. Clear and concise. But again, it wasn't strong enough to make us doing what we proposed on [brainstorming](/zettelkaten/brainstorming). We needed the last step.

Finally, after long time of struggles and learning, we've got the last step of the model, **purpose and principles**. It's the _why_. "Why do we want building good software?" "Why do we want to make our customers satisfied." "Why do we need to create tests and document well?" The _why_ is the last step of this model.

After thought about this project and others, you've concluded that your biggest problem creating software without tests and documentation is about **time**, and consequently, money. The time you spent to create tests and documentation at the same period that the feature is being developed is much less than the time that you'll spent to fix it some months later. And there are some reasons why this happens: you forget the feature main idea, you're working on another feature and have the [context switching](/zettelkasten/context-switching) cost, the developer who worked on that feature doesn't work with you anymore, and so on. People generally don't realize the difference between these costs because of the [hyperbolic discounting](/zettelkasten/hyperbolic-discounting). A cost in the future may seen small in the present.

It's risky keep technical debts when you're working with software because you don't know your future [opportunity costs](/zettelkasten/opportunity-cost).
