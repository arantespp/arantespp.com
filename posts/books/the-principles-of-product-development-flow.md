---
title: The Principles of Product Development Flow
date: '2021-08-31'
formattedDate: 'August 31, 2021'
updatedAt: '2022-10-13'
formattedUpdatedAt: 'October 13, 2022'
updateHistory: >-
  https://github.com/arantespp/arantespp.com/commits/main/posts/books/the-principles-of-product-development-flow.md
href: /drafts/books/the-principles-of-product-development-flow
group: books
slug: the-principles-of-product-development-flow
tags:
  - donald-g-reinertsen
  - product-development
draft: true
book:
  authors:
    - Donald G. Reinertsen
  link: >-
    https://www.amazon.com/Principles-Product-Development-Flow-Generation-ebook/dp/B00K7OWG7O
  ASIN: B00K7OWG7O
  image: /images/books/the-principles-of-product-development-flow.jpg
editLink: >-
  https://github.com/arantespp/arantespp.com/edit/main/posts/books/the-principles-of-product-development-flow.md
url: 'https://arantespp.com/books/the-principles-of-product-development-flow'
keywords:
  - books
  - donald-g-reinertsen
  - product-development
readingTime: 41
bitLink: flow
references:
  - /zettel/parkinson-s-law
  - /zettel/slack-and-efficiency
  - /zettel/proxy-variable
  - /zettel/pareto-paradox
  - /zettel/sunk-cost
  - /zettel/marginal-analysis
  - /zettel/set-based-concurrent-engineering
  - /zettel/asymmetric-opportunity
  - /zettel/critical-path
  - /zettel/queue-capacity-utilization
  - /zettel/cumulative-flow-diagram-cfd
  - /zettel/little-s-law
  - /zettel/round-robin-scheduling
backlinks: []
excerpt: ''
---

## Principles

### 2. The Economic View

_Why do you want to change the product development process?_ The answer: **to increase profits**.

The economic view of product development allows you to make product development decisions based on economic choices. You don't chase the popular [proxy variable](/zettel/proxy-variable) of the moment. Instead, you transform all proxy variables to the same unit of measure, life-cycle profits, and make multivariable trade-offs to increase profits, which is the core of product development.

#### E1: The Principle of Quantified Overall Economics: Select actions based on quantified overall economic impact.

You should consider the economic impact of all possible decisions when you have to make a project decision. For example, choosing between releasing a project soon without many tests or testing more and releasing later should be an economic, not a philosophical choice.

#### E2: The Principle of Interconnected Variables: We can't just change one thing.

One decision almost always simultaneously affects multiple variables. [Proxy variables](/zettel/proxy-variable) are interconnected because they represent other variables.

#### E3: The Principle of Quantified Cost of Delay If you only quantify one thing, quantify the cost of delay.

You don't have business trading money for cycle time if you don't know the economic value of cycle time. No single sensitivity is more eye-opening than the cost of delay (COD). The cost of queues, determined by COD, dominates the economics of Flow.

#### E4: The Principle of Economic Value-Added: The value added by an activity is the change in the economic value of the work product.

The value added by an activity is the difference in the price that an economically rational buyer would pay for work before and after the action performed.

Waste, or non-value-added, is also an economic concept. You must convert the waste in life-cycle profit to compare and other trade-off wastes.

#### E5: The Inactivity Principle: Watch the work product, not the worker.

Making activities more efficient is much less important than eliminating **inactivity**. Your most significant waste isn't unproductive engineers in product development but work products sitting idle in queues.

Inventory is the most significant waste in manufacturing because it destroys quality, efficiency, and cycle time. When you increase value-added time in a process with variability, you will create queues. The cost of these queues is far greater than any efficiency savings that come from the value-added increase.

#### E6: The U-curve Principle: Important trade-offs are likely to have U-curve optimizations.

U-curve is the combination of a hyperbolic and a linear function. It has two essential properties. First, optimization never occurs at extreme values. Because of this, it always requires quantification because you must balance two or more competing factors. Second, U-curve optimizations don't require precise answers because U-curves have flat bottoms, then missing the exact optimum costs very little. Thus, you don't need highly accurate information to improve your economic decisions. As a result, the framework becomes more insensitive to noisy assumptions.

#### E7: The Imperfection Principle: Even imperfect answers improve decision-making.

The absence of frameworks will lead workers to make bad decisions because they will use intuition instead of analysis. This intuition produces a 50 to 1 difference in the price people pay for cycle time. With an economic framework, this range is down to 2 to 1.

As you try to analyze economics, you uncover those assumptions that significantly impact your answers, which permits you to invest more effort in getting these assumptions correct. Thus, the economic view regeneratively improves your understanding of economics.

#### E8: The Principles of Small Decisions: Influence the many small decisions.

Many companies make big decisions at a higher level but don't have an economic framework to make the many small decisions correctly. These small decisions have an enormous economic impact.

Because of the [Pareto Paradox](/zettel/pareto-paradox), influencing many small decisions has important implications because there are many opportunities there.

#### E9: The Principle of Continuous Economic Trade-offs: Economic choices must be made continuously.

Few, big, predictable trade-offs at the start of the development process don't work in product development as they work in manufacturing. In product development, you continuously receive new information from the market, design process, customers preference, or engineering. Instead, you make many small trade-offs, at random times, throughout your development process. Therefore, following [Principle E1](#e1-the-principle-of-quantified-overall-economics-select-actions-based-on-quantified-overall-economic-impact) is more important than following the original plan.

#### E10: The First Perishability Principle: Many economic choices are more valuable when made quickly.

These continuously and randomly opportunities are pretty perishable. Opportunities get smaller with time, and obstacles get larger. The longer you wait to exploit an option, the less economic value is available. Therefore, you must measure and shorten the time it takes to make decisions.

People at the lowest level of the organization are the ones that first detect these opportunities and obstacles. Those levels should be able to make these decisions. You should add a decentralized strategy to your organization.

#### E11: The Subdivision Principle: Inside every bad choice lies a good choice.

Most of your decisions can be divided into components parts that have different economics, which means that you can isolate the good and the bad parts. You can decompose the choice into pieces and keep the good parts because your economic framework permits you to evaluate the components based on cost and benefit. Then, using decomposition and recombination, you can keep, discard, or improve those parts.

#### E12: The Principles of Early Harvesting: Create systems to harvest the early cheap opportunities.

Create processes that allow people recognize the cheapest opportunities to buy cycle time that appear early in the development cycle. Actions at the end are more expensive than at the beginning of the development process.

For example, an organization may permit every engineer to buy up to 4 weeks of schedule improvement at a cost no higher than $500 per week. Controlling by time and value reduces any significant risk.

#### E13: The First Decision Rule Principle: Use decision rules to decentralize economic control.

You must provide high-quality decision support information to the level of the organization responsible for the small decisions making. You should decentralize authority to this level.

The most important tool for influencing the many small decisions is **economic decision rules**, which accomplish four things:

1. They align all economic choices of the entire project.
1. They ensure that these choices are optimum at the system level.
1. They enable you to push control to low levels with limited risks.
1. They streamline the process of making decisions.

For example, for a Boeing project, the engineers were authorized to increase the unit cost by up $300 by making changes to save a pound of weight. As a result, they had the whole team making system-level optimum trade-offs without the need to ask for permission from their superiors.

The superiors control the decision without participating in it. Control without participating is control without decision-making delays.

#### E14: The First Market Principle. Ensure decision-makers feel both cost and benefit.

Decision-makers should feel both the cost and benefit of their decisions. Today, some product developers enjoy benefits while being insulated from costs. As a result, the resources will tend to be more utilized than they would, leading to decision delays.

Price should be used to control demand. That is how the economic market works. When prices rise, demand falls. Market work because decision-makers experience both the benefit and the cost of their decisions. Pricing enables such decentralized control.

#### E15: The Principle of Optimum Decision Timing: Every decision has its optimum economic timing.

Each decision will have an optimum economic timing if the cost, payoff, and risk of your decisions are time-dependent. Thus, the timing of economic choices should be based on their economics, not broad philosophical concepts like "front-loading" or "responsible deferral."

You should make each decision at the point where further delay no longer increases de expected economic outcome. Waiting some time has the advantage of the fact that market and technical uncertainty decrease with time.

#### E16: The Principle of Marginal Economics. Always compare marginal cost and marginal value.

When evaluating the economic impact of incremental decisions, use [marginal analysis](/zettel/marginal-analysis) instead of comparing total costa with the total value of the system. Whenever marginal value exceeds marginal cost, the action improves economic value. Sometimes, a feature implementation adds some value to the system, but the marginal value is smaller than the marginal cost.

An example is two feature implementations. The first one was 100% completed, and the second, 80%. Most companies would work on the second feature because they assume that achieving planned objectives maximize economic outcomes. However, the correct decision is the feature that has the most significant difference between marginal cost and benefit, which is often the completed feature since it's most likely to have additional unexploited opportunities for improvement.

#### E17: The Sunk Cost Principle. Do not consider money already spent.

Money already spent is a [sunk cost](/zettel/sunk-cost) and should not enter into an economical choice. Instead, you should make a choice based on [marginal economics](#e16-the-principle-of-marginal-economics-always-compare-marginal-cost-and-marginal-value).

#### E18: The Principle of Buying Information: The value of information is its expected economic value.

Information reduces uncertainty. When you reduce uncertainty, you create economic value. You shouldn't pay more than the economic value that it creates.

Investments in product development can create economic value even when they don't lead to successful products because they can make information that has economic value.

#### E19: The Insurance Principle: Don't pay more for insurance than the expected loss.

When you develop backup solutions, you trade development expenses for risk reduction. Parallel development of a backup solution is an insurance policy; you pay money to reduce risk. Whenever the economic benefit of the risk reduction is less than the cost of insurance, it's not a good investment.

Parallel development of multiple backup solutions is called [set-based concurrent engineering](/zettel/set-based-concurrent-engineering). For example, if a single solution has $10$ percent failure rate, $n$ parallel solutions would have $0.1^n$ failure rate. Thus, the incremental value added by each additional backup solution decreases geometrically, while the incremental cost added by each additional solution is constant or possibly increasing.

The optimum number of parallel paths occurs when incremental value equals incremental cost (U-curve optimization). Therefore, since this economic optimum can equal one, parallel paths don't always make economic sense.

#### E20: The Newsboy Principle: High probability of failure does not equal bad economics.

Uncertain opportunities have large payoff asymmetries, making them the best source of new ideas. Before acquiring sufficient information to make a good economical choice, filtering bad opportunities would eliminate uncertain and poorly understood opportunities. However, it also removes best asymmetries and opportunities. **Thus, opening the filter to pass these [asymmetric opportunities](/zettel/asymmetric-opportunity) actually increases economic value.**

#### E21: The Show Me the Money Principle: To influence financial decisions, speak the language of money.

Most corporations give control over financial resources to people who worry about the economics of their choices. To influence those people, you must speak the language of economics, not the language of [proxy variables](/zettel/proxy-variable). When you talk to those who control the money using the language of the money, you can get fast decisions and enthusiastic support.

### 3. Managing Queues

**[Q1](#q1-the-principle-of-invisible-inventory-product-development-inventory-is-physically-and-financially-invisible) to [Q2](#q2-the-principle-of-queueing-waste-queues-are-the-root-cause-of-the-majority-of-economic-waste-in-product-development) - Why Queues Matter?** Queues matter because they're economically important, poorly managed, and they have the potential to be much better managed. They profoundly affect the economics of product development.

**[Q3](#q3-the-principle-of-queueing-capacity-utilization-capacity-utilization-increases-queues-exponentially) to [Q8](#q8-the-principle-of-linked-queues-adjacent-queues-see-arrival-or-service-variability-depending-on-loading) - The Behavior of Queues.** To understand the behavior of queues, you need to understand how capacity utilization and variability affect the size of queues, the relative frequency of high-queue states, and how the structure of a queueing system affects their performance.

**[Q9](#q9-the-principle-of-queue-size-optimization-optimum-queue-size-is-an-economic-trade-off) to [Q10](#q10-the-principle-of-queueing-discipline-queue-cost-is-affected-by-the-sequence-in-which-we-handle-the-jobs-in-the-queue) - The Economics of Queues.** Optimizing queues brings a problem because the higher you utilize capacity, the more you pay for queues, but the less you pay for excess capacity. How to make quantitative trade-offs between them? How can you use queueing discipline to reduce the economic cost without reducing the queue size?

**[Q11](#q11-the-cumulative-flow-principle-use-cf-ds-to-monitor-queues) to [Q16](#q16-the-intervention-principle-we-cannot-rely-on-randomness-to-correct-a-random-queue) - Managing Queues.** Six principles to help you manage queues. First is the cumulative flow diagram (CFD). Second, the Little's Formula. Then, two important principles for controlling queue size. Finally, the counterintuitive nature of random processes.

#### Q1: The Principle of Invisible Inventory: Product development inventory is physically and financially invisible.

Inventory in product development isn't physical objects but information. Then, it's virtually invisible, both physically and financially. Product development inventory's effects: increased cycle time, delayed feedback, constantly shifting priorities, and status reporting.

#### Q2: The Principle of Queueing Waste: Queues are the root cause of the majority of economic waste in product development.

Product development queues do much more damage than manufacturing queues for two reasons.

1. Product development queues tend to be much bigger than manufacturing queues. No natural predators are controlling them because these [queues are invisible](#q1-the-principle-of-invisible-inventory-product-development-inventory-is-physically-and-financially-invisible). Then companies don't measure, manage, and realize that queues are a problem.
2. Queues create many forms of economic waste.
   - **Longer Cycle Time.** It takes longer to reach the front of an extensive line than a small one. Usually, delay costs rise linearly with queue size.
   - **Increased Risk.** Queues increase the transit time through the product development pipeline. When transit time goes up, you're more vulnerable to changes in customer preference, preemption by competitors, and shifts in the underlying technology.
   - **More Variability.** High levels of utilization tend to amplify variability.
   - **More Overhead.** The more projects you have in process, the more you have to track and report status to your managers. Even worse, your team asks for more progress reports per project because queues lead to long transit times.
   - **Lower Quality.** Queues reduce quality by delaying feedback from downstream processes. If a programmer makes a flawed assumption and must wait for 30 days to get this feedback, she'll embed the flawed assumption into 30 days' worth of code. Thus, following a wrong path typically increases exponentially, not linearly.
   - **Less Motivation.** Queues undermine motivation and initiative. When the next process has a long time, you feel there is little value in hurrying to finish your work. [Parkinson's Law](/zettel/parkinson-s-law) explains this behavior.

Queues off the [critical path](/zettel/critical-path) also create costs to the project because only one of these six wastes arises from the cost of delay. The other five wastes are still present even when the queues are off the [critical path](/zettel/critical-path).

#### Q3: The Principle of Queueing Capacity Utilization: Capacity utilization increases queues exponentially.

[Queue capacity utilization](/zettel/queue-capacity-utilization) is the most critical factor that affects queue size. As you approach 100% of the queue capacity, queues become exponentially large. Knowing capacity utilization allows you to predict:

- the percent of the time that the arriving work will find the server busy;
- the average number of items in the queue;
- the average number of items in the system;
- the percent of overall cycle time is queue time;
- the ratio of cycle time to value-added time.

This property is helpful from a practical perspective, but it's often tough to directly measure capacity utilization ($\rho$) in product development processes. Moreover, it's problematic because the ratio of **demand** and **capacity** are individually hard to estimate.

#### Q4: The Principle of High-Queues States: Most of the damage done by a queue is caused by high-queues states.

The probability of finding a queue in a specific quantitative state (low or high-queue state) is a function of capacity utilization. Low-queue states are more probable than high-queue states, but high-queue states are more important because they delay more jobs. As a result, they strongly influence cycle time and can cause more economic damage to the project.

The $\text{State Probability}$ of an $M/M/1/\infty$ queue to have $n$ jobs in the system is:

$$
\text{State Probability} = \frac{1-\rho}{\rho^n}
$$

#### Q5: The Principle of Queueing Variability: Variability increases queues linearly.

Variability causes much less damage than capacity utilization on queues. The Allen-Cuneen approximation for the queue length is given by:

$$
L_q = \frac{\rho^2}{1-\rho}\frac{C^2_\text{arrival} + C^2_\text{service}}{2}
$$

![Queue Size vs Percent Capacity Utilization](/images/originals/queue-size-vs-percent-capacity-utilization.png)

The equation shows that queues are proportional to the average squares of the coefficient of variation for arrivals and service processes. You compute the coefficient as the ratio between standard deviation and the mean of a probability distribution. Since the square of the standard deviation is the variance, **this means that queues vary linearly with variance**.

If you could make the processing time of a queue equal every time ($C^2_\text{service} = 0$), this would only cut the average queue size in half because of the randomness of arrival times. **So, be very cautious if you think you can solve the problem of queues by reducing variability.**

#### Q6: The Principle of Variability Amplification: Operating at high levels of capacity utilization increases variability.

For an $M/M/1/\infty$ queue, the equation below shows how the operation transforms charges in loading into queue size. Thus, as we move up to higher capacity utilization, random changes in loading will have a more significant effect on cycle times because queue size and cycle time are correlated ([Principle Q3](#q3-the-principle-of-queueing-capacity-utilization-capacity-utilization-increases-queues-exponentially)).

$$
\frac{dW}{d\rho} = \frac{1}{(1-\rho)^2}T_\text{service}
$$

$W$ represents queue size, $T_\text{service}$ represents service time or loading, and $\rho$ represents queue capacity utilization.

A change in loading at 95 percent utilization produces a cycle time impact that is 25 times higher than the exact change in loading at 75 percent utilization.

#### Q7. The Principle of Queueing Structure: Serve pooled demand with reliable high-capacity servers.

Exists many process structures in a queue. For example, you can have a single demand stream with a single server in an $M/M/1$ queue or with $n$ servers in an $M/M/n$ queue. In addition, you can have single or multiple servers with a single shared queue or individual queues for each server. Naturally, the performance of these structures differs.

![Queueing System Structure.](/images/originals/queueing-system-structure.png)

- One queue per server: a single bad job can block everything behind it in the queue.
- Single-queue multiple-server: smaller delay and lower processing time variance.
- Single-queue single high-capacity server: the processing time will be faster. In a light-loaded queue, a high-capacity server accomplishes tasks faster than many low-capacity servers because the service time is the majority of cycle time. However, it's also less robust because a failure will stop all flow, and a bad job can block the entire flow.

#### Q8. The Principle of Linked Queues: Adjacent queues see arrival or service variability depending on loading.

The departure process for a queue becomes the arrival process for the next one if they're linked. Depending on the queue size at a process, its output pattern will either look more like its arrival pattern or its service pattern.

In a process with a chain of linked queues, one of them is the bottleneck. In a scenario like this, you need to reduce the variability from the bottleneck to permit smoother flow, which leads to a higher throughput.

It's important to go beyond the popular but simplistic idea that the bottleneck's capacity controls system flow. In other words, flow through a bottleneck is affected strongly by the process that precedes it. The upstream process determines the variation in the arrival rate at the bottleneck. **Managing the process upstream of the bottleneck is a valuable tool for improving flow at the bottleneck.**

#### Q9. The Principle of Queue Size Optimization. Optimum queue size is an economic trade-off.

The trade-off is between delay cost and capacity margin. When delay cost is high, you prevent delays by having excess capacity. When capacity is expensive, you can afford less margin.

The total cost $C_T$ of a $M/M/1/\infty$ queue can be expressed by

$$
C_T = C_C\mu+C_D\frac{\lambda}{\mu - \lambda},
$$

where $C_C$ is the cost of capacity, $C_D$, cost of delay, $\mu$, average capacity, and $\lambda$, average arrival rate. Total cost $C_T$ is a U-curve, whose minimal value happens with the optimal capacity $\mu_0$.

$$
\mu_0 = \lambda + \sqrt{\frac{C_D\lambda}{C_C}}.
$$

The optimal capacity for a process must be higher when the cost of delay increases because queues become more expensive. When the cost of capacity rises, then optimal capacity decreases.

#### Q10. The Principle of Queueing Discipline: Queue cost is affected by the sequence in which we handle the jobs in the queue.

Your goal is to reduce the economic cost of queues, not simply reduce queues' size. The sequence of the items and the length of the delay influences the cost. Therefore, changing the sequence of the jobs in the queue can significantly reduce its cost.

You can create value with a thoughtful queueing discipline. For example, if two jobs take the same time, it's better to first service the one with the highest delay cost. Likewise, if two jobs have the exact cost of delay, it's better to process the shortest job first.

You can ask three questions to improve the economics of a queue. First, is there a difference in the cost of delay of different jobs in the queue? Second, is there a difference in the time a job will block a resource? Third, is the average length of the queue large?

The third question is important because the payoff from queueing discipline is highest when queue sizes are large. In such circumstances, moving a high cost-of-delay to the head of the line leads to a cycle time reduction and considerable economic benefits.

#### Q11: The Cumulative Flow Principle: Use CFDs to monitor queues.

[Cumulative flow diagram (CFD) notes](/zettel/cumulative-flow-diagram-cfd).

The CFD visually presents a great deal of information about your queue. Unfortunately, many companies only track queue size as a function of time, which provides less information. Using CDF, you can see if excess arrivals or insufficient departures caused a change in the queue size. You can also observe the time dependency of demand and capacity.

Changes in the slope of the arrival and departure lines inform trends in demand and capacity. Batch size problems are also visible on a CFD because they appear as jagged lines.

![Cumulative Flow Diagram (CDF)](/images/originals/cumulative-flow-diagram.png)

#### Q12: Little's Formula: Wait Time = Queue Size/Processing Rate

[Little's Law notes](/zettel/little-s-law).

This formula applies to virtually all queues disciplines, arrival rates, and departure processes.

$$
W_Q = \frac{L_Q}{\lambda} \quad \text{or} \quad W_S = \frac{L_S}{\lambda}
$$

Where $W_Q$ is the queue time for an average job, $L_Q$ number of jobs in a queue, $\lambda$ average processing rate, $W_S$ is the system time for an average job, $L_S$ number of jobs in the system.

You can apply Little's Formula to either the queue or to the system as a whole. Applying it to the system as a whole is useful if you have trouble distinguishing which items are in the queue and which ones are in service.

For example, if your development process has 50 projects in process and completes an average of 10 projects per year, it'll take an average of 5 years to complete a project.

#### Q13: The First Queue Size Control Principle: Don't control capacity utilization, control queue size.

Queues' capacity utilization is almost useless as a metric for real-time control because you can't estimate either demand or capacity with sufficient accuracy, as discussed in [Principle Q3](#q3-the-principle-of-queueing-capacity-utilization-capacity-utilization-increases-queues-exponentially).

Choose queue size as the control variable instead of capacity utilization.

Small changes in capacity utilization will translate to large changes in queue size and cycle time because of the steep slope of the queueing curve (exponential). This means that a relatively wide control band of queue size will force the system into a very tight capacity utilization range. **Controlling queue size directly controls cycle time.**

![Steep slope of the queuing curve](/images/originals/queue-size-vs-percent-capacity-utilization-slope.png)

#### Q14: The Second Queue Size Control Principle: Don't control cycle time, control queue size.

It's more manageable controlling queue size than cycle time. Cycle time is a lagging indicator because you can only evaluate it when a job exits the system. You can determine the queue size instantly at the moment that it changes.

#### Q15: The Diffusion Principle: Over time, queues will randomly spin seriously out of control and will remain in this state for long periods.

A random process—a sequence of random variables events—can lead a system to specific states. In the case of product development, queues can reach high-queue states. When these states occur, you can't rely on randomness to correct the problems that randomness creates, which leads to the last principle.

#### Q16: The Intervention Principle: We cannot rely on randomness to correct a random queue.

A queue that drifts into a sustained high-queue state won't easily and quickly drift back to a low-queue state.

If you drifted 10 heads in a sequence, the probability of getting 10 tails in a row to cancel the first 10 heads is about 1 in 1,000.

You need to make quick and forceful interventions when situations like these happen. You might set limits on maximum queue size and intervene as your system approach these limits.

**The more you monitor queues, and the more quickly you intervene, the fewer queues will cost you.**

### 4 - Exploiting Variability

#### V1: The Principle of Beneficial Variability: Variability can create economic value.

Which choice is the best economic choice? Which option has the minimum uncertainty in its outcome?

| Choice | Stakes   | Payoff    | Probability | EMV     |
| ------ | -------- | --------- | ----------- | ------- |
| A      | \$15,000 | \$100,000 | 50%         | $35,000 |
| B      | \$15,000 | \$20,000  | 90%         | $3,000  |
| C      | \$15,000 | \$16,000  | 100%        | $1,000  |

_EMV = Expected Monetary Value_

Choice A is the best economic choice and the most uncertain. Choice C has zero uncertainty, yet it isn't the best economic choice.

The economics of each discrete choice depends on two factors: the probability and the payoff function. We can't make good economic choices if we only pay attention to probabilities. So you need to pay attention to both probability and payoff functions.

### 7. Controlling Flow Under Uncertainty

#### F8: The Cadence Batch Size Enabling Principle: Use a regular cadence to enable small batch sizes.

Cadence enforces small batch size by forcing work products to move forward on a fixed rhythm. For example, if the review is every X time, the batch size is X time worth of work.

It also enforces small batch sizes to remove coordination overhead and transaction costs. Everyone knows the event will occur on some date, so there is no overhead associated with setting up the event. With the lower transaction cost, small batches are economical.

#### F19: The Round-Robin Principle: When task duration is unknown, time-share capacity

When you need to schedule a task and don't know its duration, you cannot predict how long it will block a resource. It's even worse if the task is impossible to complete and takes infinite time.

In operating system design, you can solve this problem with the [round-robin (RR) scheduling](/zettel/round-robin-scheduling) method. Instead of giving all of the capacity of a processor to a single job until it is complete, you time-share the processor between multiple jobs. Each job has a quantum of time, and at the end of this time, you put the job back in the queue and start working on the next waiting job. This approach ensures that short jobs will always be completed faster than long ones, even if you don't know their length.

Deciding the size of the quantum is the key decision. The quantum behaves like a FIFO system if the quantum is very large. The system has high overhead and transactional costs due to context switching if it's very small.

One heuristic for RR scheduling is ensuring the system clears 80 percent of the jobs through a single quantum of time.

#### F28: The Principle of Preplaned Flexibility: For fast responses, preplan and invest in flexibility.

Flexibility is the result of advance choices and planning. Two examples below illustrate this planning.

If you plan to jettison requirements to hold schedules, you should decide, in advance, which requirements are nonessential. For example, you can identify the requirements as mandatory, important, and optional at the beginning. This way, your team can architect the solution to couple these optional requirements loosely with the rest of the architecture.

If you plan to pull resources to new queues, you should invest in making these resources productive on short notice. For example, you can keep the backup resources informed on the programs, so they'll have much faster response times when you need them.

### 8. Using Fast Feedback

#### FF5: The Moving Target Principle: Know when to pursue a dynamic goal.

Many companies create economically destructive control systems because they don't appreciate the difference between static and dynamic goals. They assume that following the plan is correct and a deviation is always harmful. They often discover it's cheaper to prevent deviations than it is to correct them, so they use control frameworks that prevent deviation, such as Six Sigma.

This approach works in the repetitive manufacturing world but is very dangerous in product development. In product development, you continually get better information that makes the team reevaluate and shift the goals. Therefore, you need different control systems for dynamic and stable goals.

If you have stable goals, you try to prevent deviations, often by increasing inertia and avoiding risk. If you have dynamic goals, you try to correct variations quickly by decreasing inertia and continuously reducing the gap between the current and the economically desired state.

Because product development has inherently high variability, it's critical to recognize situations where your goals should be dynamic or stable.

#### FF10: The First Agility Principle: We don't need long planning horizons when we have a short turning radius

One way to make a control system more effective is to reduce the work it must do. You can achieve this by making your system more agile. Agility means the ability to change direction quickly while traveling at high speed. A physical analogy is of changing the direction of a moving object. The time it takes to change the momentum of an object is proportional to the mass and inversely proportional to the applied force. If you wish to quickly change the direction of motion of an object, pick a small object and apply a large force.

The same logic applies to product development. To be agile, you need a less massive program and sufficient resources to redirect them. Megaprojects are difficult to redirect because they're so massive.

In product development, you must quickly apply adequate resources to redirect programs. Organizations operating at 100 percent capacity utilization usually apply too few resources, too late to get a quick change in direction.

You can proceed safely at a higher speed whenever you have a short turning radius and a quick reaction time. This permits you to operate at higher speeds in an uncertain environment and reduces the magnitude of your control problem.

### 9. Achieving Decentralized Control

- D1 to D?: Balancing Centralization and Decentralization

#### D1: The Second Perishability Principle: Decentralize control for problems and opportunities that age poorly.

Certain problems and opportunities are perishable and best dealt with quickly. It's best to deal with fires quickly because they can turn into big fires. In contrast, other problems are self-limiting, such as investing in a bad stock. The maximum amount of losses is the amount you've invested.

The control strategy should focus on reacting most quickly to problems that age poorly, like fire.

How can you quickly solve problems that age poorly or seize fleeting opportunities? You need to decentralize control (it doesn't mean decentralizing responsibility). You need to decentralize authority to act and pre-position sufficient resources to make the action meaningful.

_Note: you can think of centralized resources as the tasks you set with the team at the beginning of the work week. The decentralized is slack, where everyone on the team has the resources to fix minor problems without reporting._

#### D2: The Scale Principle: Centralize control for problems that are infrequent, large, or that have significant economies of scale.

There are other kinds of problems that benefit from large-scale responses, different from perishables. Big fires are best handled by large trucks, not by individuals with garden hoses. You use centralized resources whenever you have infrequent but large excursions in demand, which is even more attractive if they have scale economies. In contrast, you should use decentralized resources for frequent, small-excursion, and low-variability demand with limited scale economies ([Principle D1](#d1-the-second-perishability-principle-decentralize-control-for-problems-and-opportunities-that-age-poorly)).

Centralizing resources increases response time because it has more mass, so it has a high cost of delay. Therefore, to ensure better time responses, you must prioritize it.

In product development, rather than putting an expert (high mass) on every program, you centralize him.

#### D3. The Principle of Layered Control: Adapt the control approach to emerging information about the problem.

When you don't know if you should centralize or decentralize your problem, you can use two approaches: triage and escalation.

Hospitals use the triage approach. When you have insufficient resources, you try to provide the maximum benefit to the maximum number of people. You do this by making tough sorting decisions at the intake point. You shouldn't use scarce resources on unsolvable or not critical problems. Instead, you use your resources on issues that can become critical, and you can solve. Triage works whenever you have sufficient information to make sound judgments at the intake point.

When you don't know which job will take the most time to run, you use the [round-robin](/zettel/round-robin-scheduling) approach discussed in [Principle F19](#f19-the-round-robin-principle-when-task-duration-is-unknown-time-share-capacity). You allocate a quantum time to each job and put the ones that don't finish at the end of the quantum back into the work queue. This way, you guarantee that long jobs won't block short ones.

As in operating systems, you can divide the jobs into priority classes and service them in order of priority. To eliminate the risk of a low-priority job not getting resources, you escalate them when they have waited too long in the queue. A good escalation process prevents you from elevating all problems to centralized resources. At the same time, it prevents important problems from getting stuck at low levels.

![Triage and Escalation](/images/originals/triage-and-escalation.png)

#### D4. The Opportunistic Principle: Adjust the plan for unplanned obstacles and opportunities.

Accordingly, with [Principle FF5](#ff5-the-moving-target-principle-know-when-to-pursue-a-dynamic-goal), you should focus on conformance when you have static goals. But, if you have dynamic goals, you continuously adapt.

You should use plans to maintain alignment, not to get conformance. Your plans should form a baseline to synchronize complex changes. If you decide to launch in one day, the many activities required to make this happen call all be quickly aligned.

If your plans are adaptable, you can take advantage of opportunities. Seize opportunities adds enormous value to product development. For example, as your team progresses, you may discover that a feature is ten times more expensive and add less value to consumers. A good process will recognize that this feature no longer makes economic sense.

Similarly, you may discover that another feature is easier to implement and add more value to your customers. In this case, if you have adaptive plans, it's easier to change. On the other hand, it's pretty difficult to change in conformance-oriented processes.

#### D5. The Principle of Virtual Centralization: Be able to quickly reorganize decentralized resources to create centralized power.

Sometimes, it's not cost-effective to leave centralized resources idle while waiting for infrequent large demands. To avoid this inefficiency, you often use these resources for background activities and mobilize them as needed to create centralized power to deal with a big problem. You can get the combined benefits of having both centralized and decentralized resources.

For example, a city can train civilians in firefighting and create a centralized virtual capacity. In addition, fire departments in adjacent communities provide mutual support. This strategy permits a community to cope with infrequent large fires without having a large fire department.

In product development, some organizations use "tiger teams" that have experienced and highly productive people. The company calls the team when a program gets in unexpected and severe trouble. Yet, they work at their regular day jobs when there is no crisis. Therefore, the company can bring them quickly if they plan this strategy.

#### D6. The Inefficiency Principle: The inefficiency of decentralization can cost less than the value of faster response time.

In many cases, it's better to pay the price of inefficient, decentralized resources to provide responsiveness. In these cases, response time is very valuable.

So, don't assume that efficiency should have higher priority than response time by default. Instead, use your economic framework to make this choice.

#### D7. The Principle of Alignment: There is more value created with overall alignment than local excellence.

It has been said that one barbarian could defeat one Roman soldier in combat, but that 1,000 Roman soldiers could always defeat 1,000 barbarians. This is because the strength of the Roman army lay in its ability to coordinate and align its combat power.

_Mass_ and _economy of force_ principles of war explain the power of alignment. Mass refers to the ability to concentrate force in one area. Economy of force refers to the ability to allocate minimum resources to all other activities. The effects of subordinating all activities to the main objective are not linearly proportional to effort.

The same applies to product development. One percent excess over parity on 15 features creates no excitement, but a 15 percent advantage on a key attribute may shift customer preference.

#### D8. The Principle of Mission: Specify the end state, its purpose, and the minimal possible constraints.

In maneuver warfare, a mission is a key tool for creating alignment, which is communicated using "mission orders." Mission orders focus on the operation's intent rather than how the mission should be accomplished—it's the end state. It communicates the "why" of the operation, not the "what" or "how."

When the intent is clear, the mission executors can select the right course of action. This is true when dealing with an emerging obstacle or opportunity. In many ways, the intent is simply a robust and compact way of providing direction.

The mission statement for a project can be a powerful way of maintaining coordination. The most important part of this mission is the "why."

#### D9. The Principle of Boundaries: Establish clear roles and boundaries.

The military doesn't approach warfare the way five-years-old approach soccer—everyone goes around the ball. The problem is that if everyone is near the ball, there is nobody else to receive it once someone kicks it.

With decentralized control, the discipline of roles and boundaries becomes important. Both excessive overlap and gaps are dangerous.

Clear role definition is equally important for product development teams. Poorly defined roles and boundaries increase the need for communication and the time spent in meetings. For example, if your team doesn't have clear roles, your meetings can have 20 people vote on the color of a button. You must send the information to 20 people; the only time the team can decide is when all 20 people are present because you have excessive overlap. Well-defined roles make teams much more efficient.

You also need to be alert for white spaces between roles and gaps that nobody feels responsible for.

#### D10. The Main Effort Principle: Designate a main effort and subordinate other activities.

In executing a mission, the Marines designate one point of action as the main effort, where they focus on the maximum possible effort. They reduce forces in other areas to create maximum strength at the focal point.

It's most desirable if the main effort is aimed at a point of weakness since it's desirable to concentrate strength against weakness. However, sometimes the main effort can be directed to a strong point—the center of gravity, the heart of their ability to fight. The choice of main effort depends on assessing both the cost and the benefit of attacking a particular point.

In the same way, it's useful for product developers to designate the main effort for their projects. Only a small set of product attributes truly drive success. While the customer may be able to identify 200 features and explain what they want, only four to six of these features are capable of shifting preference from one brand to another. The entire team must focus on these preference-shifting features and let the other 195 features subordinate to achieving performance on these critical features.

#### D11. The Principle of Dynamic Alignment: The main effort may shift quickly when conditions change.

The main effort may shift in the course of battle because it's fluid. One unit may be the main effort, and all supporting resources should help the main effort succeed.

But the battlefield conditions may change. For example, when defenders oppose the main effort, they may create weakness in another area, which is attractive to designate a different location as the main effort.

As you progress through a project, new information becomes available. You want to make the best economic choice using this further information. If the option involves shifting your focus, you must be able to do this easily and quickly.

#### D12. The Second Agility Principle: Develop the ability to quickly shift focus.

_The First Agility Principle: [Principle FF10](#ff10-the-first-agility-principle-we-don-t-need-long-planning-horizons-when-we-have-a-short-turning-radius)._

It's not sufficient to decide to change focus quickly; one must execute this change quickly.

In product development, you can change direction more quickly when you have:

- A small team of highly skilled people instead of a late team.
- A product with a streamlined feature set instead of one bloated with minor features.
- Reserve capacity in your resources. It's tough to apply an extra burst of effort when people are working at total capacity.

You can also exploit architecture as an enabler of rapid changes. You can project your architecture to absorb potential changes. For example, you might segregate uncertainty into one design zone and loosely couple it with the rest of the system.

For example, some of Nokia's cellular handsets have colored faceplates, allowing them to change colors very late in the design process. They don't permit the uncertainty of color preference to permeate the entire design.

#### D13: The Principle of Peer-Level Coordination: Tactical coordination should be local.

Maintaining alignment is easy with centralized control. It's much more difficult when we decentralize control and emphasize local initiative. The advantage of local communication is that it leads to a rapid realignment of adjacent units. The team doesn't need to send requests up the hierarchy chain and wait for instructions. Instead, they communicate directly with one another. Another advantage is that continuous peer-to-peer communication of adjacent teams is far more effective at responding to uncertainty than in a centralized project management organization.

The Marines solve this problem with both explicit and implicit lateral peer-to-peer communication. Explicit is about face-to-face and voice communications, and they achieve implicit communications with doctrine and training. As a result, marines can predict how other Marines will act in similar situations with surprising accuracy. They can make this prediction because they have shared beliefs about the best way to fight, and they have trained extensively with their peers.

This approach is different from that of many product development organizations. Such organizations typically try to achieve control by creating detailed plans and project management offices to manage these plans.

#### D14: The Principle of Flexible Plans: Use simple modular plans.

You should carefully plan everything you can forecast reasonably well in advance.

You know plans will change, so the best strategy is to focus on simpler, modular, and flexible plans because simplicity leads to fast adaptation. Modularity solves the problem of adaptation because you can configure different modules in different ways, depending on your context. You achieve flexibility by preplanning "branches" and "sequels." Branches are points where you can use different paths depending on existing conditions. Sequels are preplanned follow-up actions.

This approach to planning increases the chance that you can maintain alignment when conditions change.

#### D15: The Principle of Tactical Reserves: Decentralize a portion of reserves

In product development, tactical reserves are capacity margins pre-positioned at various levels within the project organizational structure, such as human resources, budgetary capacity, or safety margin in key processes. This strategy permits support groups to absorb variation locally instead of elevating the issue to higher organizational levels.

By holding reserves at each organizational level, even larger supplementary forces can help, albeit with longer delays. This allows the team to apply force at critical times instead of making guesses prior to the project.

#### D16: The Principle of Early Contact: Make early and meaningful contact with the problem.

Marines make contact early with opposing forces to reduce uncertainty about the composition and disposition of enemy forces. This early contact allows them to judge the opposition accurately and resolves a great deal of uncertainty.

In product development, your opposition forces are the market and technical risks you must overcome during the project. Therefore, you must apply meaningful effort to judge the severe risks and whether your team can overcome them. Focusing these early efforts on zones of high technical or market risk is critical, so it's important to do a quick proof-of-concept and early market feedback.

This approach differs from the typical systematic top-down design of the entire system. Such top-down approaches appear logical, but they rarely resolve risks rapidly enough.

#### D17: The Principle of Decentralized Information: For decentralized decisions, disseminate key information widely.

Decentralizing control requires decentralizing the authority to make decisions and the necessary information to make these decisions correctly. Each person should understand the executives' intentions in the organization—generally, the company's vision.

Many companies classify and keep important information closed. Unfortunately, this approach undermines the ability of decentralized actors to make decisions.

This approach doesn't mean the organization should collect all information in isolated local pools. Instead, the executives can define system-level optimum trade-off rules and send them to the team members, enabling them to quickly and correctly make small decisions. For example, a software company could define that everyone can refactor some old code only if they write tests before the refactoring to avoid regression and that it doesn't take more than one workday.

#### D18: The Frequency Response Principle: We can't respond faster than our frequency response.

In product development, queues do more damage if we respond to them slowly ([The Intervention Principle, Q16](#q16-the-intervention-principle-we-cannot-rely-on-randomness-to-correct-a-random-queue)). As a result, you need to accelerate your decision-making speed. You do this involving few people and few layers of management. By ensuring that low levels can correctly make most decisions, you must avoid overloading the limited bandwidth at high management levels.

You need to give them authority, information, and practice to enable lower organization levels to make decisions. Without preparation and the freedom to fail upon occasion, they won't take control of these decisions.

#### D19: The Quality of Service Principle: When response time is important, measure response time.

If the time on the [critical path](/zettel/critical-path) is worth a lot of money and a support group is on the critical path, you should measure this support group on response time, not efficiency.

For example, in a development team, the developers are always on the critical path of projects. The managers always measure efficiency and keep all developers working heavily without [slack](/zettel/slack-and-efficiency). When they changed the metric to how long developers respond to changes, their behavior changed utterly.

If response times drive economics, you should align measurements and incentives for support groups to respond time. A straightforward way to move in this direction is to create a quality service agreement that spells out the response in time that users can expect from the department.

#### D20: The Second Market Principle: Use internal and external markets to decentralized control.

The [The First Market Principle, E14](#e14-the-first-market-principle-ensure-decision-makers-feel-both-cost-and-benefit) states that pricing allows markets to balance supply and demand more effectively than centralized control. When a service prices different levels with different values, the service user can make self-serving decisions to buy premium when it's most valuable.

Most product development organizations only permit pricing to play a role when using external services, not from internal support groups. This culture creates infinite demand for premium service and forces them to allocate this service. To deconflict projects, they elevate the decision to a management level above that of the project, adding delays.

Differential pricing solves this problem. It decentralizes control and ensures people make good economic choices. However, if all users are willing to pay for premium service, you have made the wrong balance between capacity and queue size.

One variant of this decentralization is to allow users to buy premium services with a limited number of tokens rather than money. Managers would go to a support group and ask for assistance only if they give the token.

#### D21: The Principle of Regenerative Initiative: Cultivating initiative enables us to use initiative.

The Marine Corps view initiative as the most critical quality of a leader. They're susceptible to the risk created by stifling initiative. As a result, they consider inaction and lack of decisiveness to be much more dangerous than making a bad decision. They believe one of the biggest mistakes a leader could make is to stifle initiative.

The more you encourage initiative, the more chances you have to provide positive reinforcement for this initiative. The more chances people have to use initiative, the more they'll feel this isn't a risky thing to do.
