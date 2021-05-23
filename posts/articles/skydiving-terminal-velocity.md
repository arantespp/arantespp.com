---
title: Skydiving Terminal Velocity
rating: 3
date: 2021-05-23
excerpt: When an object is in skydiving fall, after enough time, its velocity will be constant, considering that the drag force is proportional to the square of the velocity.
tags:
  - calculus
  - physics
  - gravitational force
  - hyperbolic trigonometry
image:
  url: https://source.unsplash.com/R86bzJSneuw
  alt: Photo by <a href="https://unsplash.com/@vincentiu?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Vincentiu Solomon</a> on <a href="https://unsplash.com/s/photos/parachute?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
---

## The Problem

I like interdependency among subjects, and this is the reason why I wrote this article. Some years ago, I saw an article standing that a [skydiving](https://www.skydiveoc.com/about/articles/terminal-velocity-mean-skydiving/) object whose drag force is proportional to the square of the velocity will have its velocity constant at some time. This proposition caught my attention. So I've decided to investigate it more.

This is an interesting question because involves math and physics. The level of the calculus theory behind is not too easy neither too hard, it's a good point to achieve the [flow state](/zettelkasten/flow-state-psychology). We also need to understand some physics concepts to set up some boundaries conditions that will help us solve some equations.

Some days ago I remembered this problem and I decided to proof it again, this time writing this article. The questions we want to answer is:

> When an object is in skydiving fall, after enough time, its velocity will be constant, considering that the drag force is proportional to the square of the velocity.

## Modeling

The resultant force, $\vec{F_R}$, acting in a skydiver falling can be expressed by:

$$
\tag{1} \vec{F_R} = \vec{F_g} + \vec{F_d}
$$

where $\vec{F_g}$ is the gravitational force and, $\vec{F_d}$, the drag force. Let's assume that the direction of the gravitational force is positive and that the magnitude of the drag force is proportional to the square of velocity, than we have:

$$
\tag{2} m \frac{dv}{dt} = mg - kv^2
$$

where $k$ is a constant, related to the drag coefficient, fluid density through which the object is falling, and the projected area of the object.

To solve $(2)$, we can manipulate the equation to transform it to:

$$
\tag{3} m\frac{dv}{dt} = mg - kv^2 \iff \frac{1}{\left(1 - \frac{k}{mg}v^2\right)}\frac{dv}{dt} = g
$$

Considering $\beta^2 = \cfrac{mg}{k}$, we can integrate $(3)$ in function of the time in a such way that on $t=0$, the initial velocity is $v_0$. Then, we have:

$$
\tag{4} \displaystyle\int_{v_0}^{v} \frac{dv}{1 - \left(\frac{v}{\beta}\right)^2} = g\displaystyle\int_{0}^{t}dt = gt
$$

Now we need to solve $(4)$.

### Hyperbolic Trigonometry

How could we solve $(4)$? We can use [hyperbolic trigonometry](https://en.wikipedia.org/wiki/Hyperbolic_functions) to help us. Hyperbolic trigonometry uses the hyperbola $x^2 - y^2 = 1$ to determine its trigonometric identities, differently from the ordinary trigonometry, that uses the circle $x^2 + y^2 = 1$.

![By <a href="//commons.wikimedia.org/wiki/File:Hyperbolic_functions.svg" title="File:Hyperbolic functions.svg">Hyperbolic_functions.svg</a>: The original uploader was <a href="https://en.wikipedia.org/wiki/User:Marco_Polo" class="extiw" title="wikipedia:User:Marco Polo">Marco Polo</a> at <a href="https://en.wikipedia.org/wiki/" class="extiw" title="wikipedia:">English Wikipedia</a>.derivative work: <a href="//commons.wikimedia.org/wiki/User:Jeandavid54" title="User:Jeandavid54">Jeandavid54</a> (<a href="//commons.wikimedia.org/wiki/User_talk:Jeandavid54" title="User talk:Jeandavid54"><span class="signature-talk">talk</span></a>) - <a href="//commons.wikimedia.org/wiki/File:Hyperbolic_functions.svg" title="File:Hyperbolic functions.svg">Hyperbolic_functions.svg</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=8424555">Link</a>](/images/articles/skydiver-terminal-velocity/Hyperbolic_functions-2.svg)

Before applying hyperbolic functions, we need to set up some physics boundaries. In skydiving or any situation that exists a drag force, the drag force never has its magnitude greater than the driver force, in this case, the gravitational force. So we can assume, from $(2)$, that:

$$
m \frac{dv}{dt} = mg - kv^2 \geq 0 \iff v \leq \sqrt \frac{mg}{k} = \beta
$$

Thus,

$$
\tag{5} \frac{v}{\beta} \leq 1
$$

The hyperbolic tangent, $\tanh$, is defined by:

$$
\tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

If we check its properties, we can see that $\tanh$ is a [bijective function](https://math.stackexchange.com/questions/2341814/proving-hyperbolic-sine-and-tan-functions-are-bijective), which means that, for every $y \in \, \rbrack -1, 1\lbrack$, must exist a $x \in \reals$ such as $\tanh x = y$. If we consider the integral

$$
\tag{6} \displaystyle\int \frac{dv}{1 - \left(\frac{v}{\beta}\right)^2},
$$

we can assume, because of $(5)$, that must exists a $x$ such that:

$$
\tag{7} \tanh x = \cfrac{v}{\beta}
$$

Deriving $(7)$ in function of $v$, we have:

$$
\tag{8} \frac{1}{\cosh^2 x} \frac{dx}{dv} = \frac{1}{\beta} \iff dv = \beta \frac{1}{\cosh^2 x} dx
$$

Replacing $(7)$ and $(8)$ in $(6)$, we have:

$$
\displaystyle\int \frac{dv}{1 - \left(\frac{v}{\beta}\right)^2} = \beta \displaystyle\int \frac{1}{\cosh^2 x} \frac{1}{1 - \tanh^2 x}dx = \beta \displaystyle\int dx = \beta x
$$

Then, considering $(7)$, we have:

$$
\tag{9} \displaystyle\int \frac{dv}{1 - \left(\frac{v}{\beta}\right)^2} = \beta x = \beta\tanh^{-1}\left(\frac{v}{\beta}\right)
$$

Finally, applying integral limits in $(9)$, we have:

$$
\tag{10} \displaystyle\int_{v_0}^{v} \frac{dv}{1 - \left(\frac{v}{\beta}\right)^2} = \beta\tanh^{-1}\left(\frac{v}{\beta}\right) - \beta\tanh^{-1}\left(\frac{v_0}{\beta}\right)
$$

### The Terminal Velocity

If we substitute $(10)$ in $(4)$ and isolate $v$, we have the value of the velocity in function of the time:

$$
\tag{11} v = \beta\tanh \left(\sqrt\frac{kg}{m}t + \tanh^{-1}\left(\frac{v_0}{\beta}\right) \right)
$$

Our question is, _"What is the velocity when the time is sufficiently large?"_ To answer this question, let's see what happens when $t$ becomes large. Applying the limit on both sides of $(11)$, we have:

$$
\tag{12} v_t = \lim\limits_{t \rightarrow \infty }v = \beta \lim\limits_{t \rightarrow \infty}\tanh \left(c_1t + c_2\right) = \beta = \sqrt\frac{mg}{k}
$$

where $v_t$ is the terminal velocity, and constants $c_1 = \sqrt\frac{kg}{m}$ and $c_2 = \tanh^{-1}\left(\frac{v_0}{\beta}\right)$.

## Physics Analysis

From $(12)$ we can conclude that after enough time, the velocity of the skydiver becomes constant, **which was to be demonstrated**. Furthermore, if the velocity is constant, the acceleration must be equal $0$. If we take $(2)$ and assumes that $\cfrac{dv}{dt} = 0$, then we have:

$$
0 = mg - kv_t^2 \iff v_t = \sqrt\frac{mg}{k},
$$

that is the same value we find on $(12)$.

Another point we must consider is the initial velocity $v_0$. Because of $(11)$, if $v_0 > \beta$, the solution will have [complex numbers](https://en.wikipedia.org/wiki/Complex_number), which will lead to a completely different interpretation of our problem (that I have no idea which is).

Lastly, if we check [this "Speed skydiving" Wikipedia article](https://en.wikipedia.org/wiki/Speed_skydiving), we can see that their definition of the terminal velocity is

$$
v_t = \sqrt\frac{2mg}{\rho A C_d},
$$

where $C_d$ is the drag coefficient, $\rho$ the fluid density through which the object is falling, and $A$ the projected area of the object. If we compare both terminal velocities equations, we conclude that our $k$ is defined by:

$$
k = \frac{\rho A C_d}{2}.
$$
