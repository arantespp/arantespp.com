---
title: From Reactive Planning Model to Natural Planning Model
excerpt: Until some point, the project was manageable, but after some feature requests and bug reports, it became unfeasible. In addition, almost every bug fix or feature implementation broke other "uncorrelated" parts of the application. That slowed us down a lot because our client and his customers were using the software, and we had to rush to fix the new bugs (yes, we didn't have testing at that time).
date: 2021-06-16
tags:
  - reactive planning model
  - natural planning model
  - getting things done
  - software development
  - hyperbolic discounting
  - opportunity cost
rating: 6
image:
  url: https://source.unsplash.com/gcsNOsPEXfs
  alt: Photo by <a href="https://unsplash.com/@firmbee?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Firmbee.com</a> on <a href="https://unsplash.com/s/photos/planning?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

I work with software development. Two friends from university and me started a software house at the end of 2018. Our first big application started at the same time we founded [Triângulos Tecnologia](https://triangulostecnologia.com). Unfortunately, we didn't have much experience in software development when we began the project. As a result, we made mistakes in some parts of the project, from hiring, estimating the costs, ensuring application and architecture quality.

Reading [Getting Things Done](/books/getting-things-done) reminded me of the path we've been through these years creating software. I had that click, "Wow, I think I experienced this before" when reading about the [Reactive Planning Model](/zettelkasten/reactive-planning-model) and [Natural Planning Model](/zettelkasten/natural-planning-model). The main goal of this text is to share with you our experience, based on these planning models, and how you may save your time if you plan your projects well.

## The Reactive Planning Model

It's interesting to detect the [Reactive Planning Model](/zettelkasten/reactive-planning-model) when you don't have experience in planning. So let me share our path with you.

Every small software project starts perfectly. Very well organized, documented, without bugs, everyone with an immense amount of energy to make things happen. And this is expected because, well, the project is small. We have control over it. The issues appear when it grows and when the number of features and complexity increases. Imagine that we've worked on the application for some months without effective management, and our client has already been using it.

Until some point, the project was manageable, but after some feature requests and bug reports, it became unfeasible. In addition, almost every bug fix or feature implementation broke other "uncorrelated" parts of the application. That slowed us down a lot because our client and his customers were using the software, and we had to rush to fix the new bugs (yes, we didn't have testing at that time).

We were living doing the **next actions**. Implementation, a bug appears, the client warns us, we fix the bug. That was our cycle. Such a situation became unworkable until we finally assemble the team and say, "We need to get **organized**." Instead of start coding to fix the newest bug, we organized our priorities and requests.

This organization relieved our tension for a moment, but the bugs continued to appear. Then the manager realized that our initial planning wasn't enough and suggested to do **[brainstorming](/zettelkaten/brainstorming).** It was good. We had good ideas for ensuring software quality, such as creating more tests and documenting the application more. The number of bugs decreased but continued to appear. Why? Because after some time, even though we know that tests are vital, our mindset was something like this, "We know that tests are important, but why should we spend time doing tests if it's better to release the feature as soon as possible?"

So we went to the next step of the [Reactive Planning Model](/zettelkasten/reactive-planning-model), the **vision**. We know that tests and documentation improve software quality, but _what_ will we achieve if we do that? We'll achieve excellent software quality, customers will be happy, we'll have a good reputation, to name a few. That is the vision. Clear and concise. But again, it wasn't strong enough to make us do what we proposed on [brainstorming](/zettelkaten/brainstorming). We needed the last step.

Finally, after a long time of struggles and learning, we've got the last step of the model, **purpose, and principles**. It's the _why_. "Why do we want to build good software?" "Why do we want to make our customers satisfied." "Why do we need to create tests and document well?" The _"why"_ is the last step of this model.

After thinking about this project and others, you've concluded that your biggest problem creating software without tests and documentation is about **time**, and consequently, money. The time you spent creating tests and documentation at the same period that we implement the feature is much less than the time you'll spend fixing it some months later. And there are some reasons why this happens: you forget the main feature idea, you're working on another feature and have the [context switching](/zettelkasten/context-switching) cost, the developer who worked on that feature doesn't work with you anymore, and so on. People generally don't realize the difference between these costs because of the [hyperbolic discounting](/zettelkasten/hyperbolic-discounting). A cost in the future seems small in the present.

Another principle is that it's risky to keep technical debts when working with software because you don't know your future [opportunity costs](/zettelkasten/opportunity-cost). We can define opportunity cost as the value of the best-foregone option you could have chosen. For example, imagine you are working on a project with some technical debts, and a huge opportunity appears to you. But, unfortunately, you can't take and don't have time to spend on this huge opportunity because you're full-time supporting the current project.

## The Natural Planning Model

The [Natural Planning Model](/zettelkasten/natural-planning-model) has the same steps but in the opposite order.

1. Defining purpose and principles
1. Outcome visioning
1. [Brainstorming](/zettelkasten/brainstorming)
1. Organizing
1. Identifying next actions

[David Allen](/zettelkasten/david-allen) says that this sequence is a natural way that the brain plan tasks. Once you do these steps in this sequence, you perform with better efficiency.

Once we've realized that we were working reactive, we've changed our processes to apply natural planning. The most significant upside is that we improved the quality of your applications and their **maintainability**, which leads us to save more time and money. Consequently, we can take advantage of the opportunities that we receive.

If you want to know more about how natural planning work with more details, please, check [my notes](/zettelkasten/natural-planning-model) about it and the summary of the book [Getting Things Done](/books/getting-things-done#chapter-3-getting-projects-creatively-under-way-the-five-phases-of-project-planning).

## Final Thoughts

It was a rich path we've been through because we've learned and experienced many things. It wasn't easy. This change that occurs to us was only possible because of a unique principle: **time is your most important asset**. Once you realize that, you work hard to use your time most effectively and work to create stuff that will save your time in the future. While [Reactive Planning Model](/zettelkasten/reactive-planning-model) makes you build things that will consume your time in the future, [Natural Planning Model](/zettelkasten/natural-planning-model) doesn't.

Once you decide to adopt the [Natural Planning Model](/zettelkasten/natural-planning-model) planning in your file, the next thing you must do is answering the question:

> _What purpose and principles will guide you?_
