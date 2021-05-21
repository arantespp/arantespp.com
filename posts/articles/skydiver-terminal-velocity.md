---
title: Skydiver Terminal Velocity
rating: 3
tags:
  - calculus
  - physics
  - gravitational force
image:
  url: https://source.unsplash.com/R86bzJSneuw
  alt: Photo by <a href="https://unsplash.com/@vincentiu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vincentiu Solomon</a> on <a href="https://unsplash.com/s/photos/parachute?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

draft: true
---

## The Problem

I have a degree in electrical engineering. I've chosen this course because it's subjects interdependency. We study from math, physics, a little about computer science, electronics, economy, until a little about social science. At the mid of the course, maybe 2013 or 2014, I saw a article standing that a skydiver with a parachute whose drag force is proportional to the square of the speed will have its speed constant at some time. This proposition caught my attention. So I decided to investigate it more.

It is a interesting question because involves math and physics, and I like studying both. The level of the calculus theory behind was not too easy neither too hard, a good point to achieve the [flow state](/zettelkasten/flow-state-psychology). Some days ago I remembered this problem and I decided to proof it again, this time writing this article.

## Modeling

The resultant force, $F_R$, acting in a skydriver falling can be expressed by:

$$
\tag{1} \vec{F_R} = \vec{F_g} + \vec{F_d}
$$

where $F_g$ is the gravitational force and, $F_d$, the drag force. Let's assume that the direction of the gravitational force is positive and that the magnitude of the drag force is proportional to the square of speed, than we have:

$$
\tag{2} m \frac{dv}{dt} = mg - kv^2
$$

where $k$ is a parachute constant. To solve $(2)$, we can manipulate the equation to transform it to:

$$
\tag{3} m\frac{dv}{dt} = mg - kv^2 \iff \frac{1}{\left(1 - \frac{k}{mg}v^2\right)}\frac{dv}{dt} = g
$$

Considering $a^2 = \cfrac{mg}{k}$, we can integrate $(3)$ in function of the time in a such way that on $t=0$, the initial velocity is $v_0$, we have:

$$
\tag{4} \displaystyle\int_{v_0}^{v} \frac{dv}{1 - \left(\frac{v}{a}\right)^2} = g\displaystyle\int_{0}^{t}dt = gt
$$

Now we need to solve $(4)$.

### Hyperbolic Trigonometry

If we consult a integral table, we can verify that the left side of $(4)$ is:

$$
\tag{5} \displaystyle\int_{v_0}^{v} \frac{dv}{1 - \left(\frac{v}{a}\right)^2} = a\tanh^{-1}\left(\frac{v}{a}\right) - a\tanh^{-1}\left(\frac{v_0}{a}\right)
$$

But, if we didn't have the integral table, how could we solve $(4)$?

STEP BY STEP HERE

### The Terminal Velocity

If we substitute $(5)$ in $(4)$ and isolate $v$, we have the value of the velocity in function of the time:

$$
\tag{6} v = a\tanh \left(\sqrt\frac{kg}{m}t + \tanh^{-1}\left(\frac{v_0}{a}\right) \right)
$$

Our question is:

> What is the velocity when the time is sufficient large?

To answer this question, let's see what happens when $t$ becomes large. Applying the limit in both sides of $(6)$, we have:

$$
\tag{7} v_t = \lim\limits_{t \rightarrow \infty }v = a \lim\limits_{t \rightarrow \infty}\tanh \left(c_1t + c_2\right) = a.1 = a = \sqrt\frac{mg}{k}
$$

where $v_t$ is the terminal velocity, and constants $c_1 = \sqrt\frac{kg}{m}$ and $c_2 = \tanh^{-1}\left(\frac{v_0}{a}\right)$.

## Interpreting the Physics

From $(7)$ we can conclude that after some time, the velocity of the skydiver becomes constant, what was to be demonstrated. Furthermore, if the velocity is constant, the acceleration must be equals $0$. If we take $(2)$ and assumes that $\cfrac{dv}{dt} = 0$, then we have:

$$
0 = mg - kv^2 \iff v = \sqrt\frac{mg}{k},
$$

that is the same value we find on $(7)$.
