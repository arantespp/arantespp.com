import { Markdown, readFolderMarkdowns } from './readFolderMarkdowns';
import { assign, createMachine, interpret } from 'xstate';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';

const md = new MarkdownIt();

export type Plan = {
  name: string;
  slug: string;
  groups: {
    name: string;
    nodes: {
      name: string;
      description?: string;
      supports?: string[];
    }[];
  }[];
};

type MarkdownEvent = {
  type: 'MARKDOWN';
  markdown: Markdown;
};

type TokenEvent = {
  type: 'TOKEN';
  token: Token;
};

type Events = MarkdownEvent | TokenEvent;

const parsePlansMachine = createMachine<
  {
    plans: Partial<Plan>[];
  },
  Events
>(
  {
    id: 'parsePlans',
    initial: 'noMarkdowns',
    context: {
      plans: [],
    },
    on: {
      MARKDOWN: {
        target: 'newMarkdown',
      },
    },
    states: {
      noMarkdowns: {},
      newMarkdown: {
        entry: [
          assign({
            plans: (context, { markdown }: MarkdownEvent) => {
              const newPlan = {
                slug: markdown.slug,
              };

              return [...context.plans, newPlan];
            },
          }),
        ],
        on: {
          TOKEN: {
            target: 'h1',
            cond: {
              type: 'isTokenTypeHeadingOpen',
              tag: 'h1',
            },
          },
        },
      },
      h1: {
        id: 'h1',
        initial: 'headingOpen',
        states: {
          headingOpen: {
            on: {
              TOKEN: {
                target: 'inline',
                cond: 'isTokenTypeInline',
              },
            },
          },
          inline: {
            on: {
              TOKEN: {
                target: 'headingClose',
                cond: 'isTokenTypeHeadingClose',
              },
            },
            entry: [
              assign({
                plans: (context, { token }: TokenEvent) => {
                  const plan = context.plans[context.plans.length - 1];
                  plan.name = token.content;
                  plan.groups = [];
                  return context.plans;
                },
              }),
            ],
          },
          headingClose: {
            on: {
              TOKEN: {
                target: 'h2',
                cond: {
                  type: 'isTokenTypeHeadingOpen',
                  tag: 'h2',
                },
              },
            },
          },
          h2: {
            id: 'h2',
            initial: 'headingOpen',
            states: {
              headingOpen: {
                on: {
                  TOKEN: {
                    target: 'inline',
                    cond: 'isTokenTypeInline',
                  },
                },
              },
              inline: {
                on: {
                  TOKEN: {
                    target: 'headingClose',
                    cond: 'isTokenTypeHeadingClose',
                  },
                },
                entry: [
                  assign({
                    plans: (context, { token }: TokenEvent) => {
                      const plan = context.plans[context.plans.length - 1];

                      plan.groups?.push({
                        name: token.content,
                        nodes: [],
                      });

                      return context.plans;
                    },
                  }),
                ],
              },
              headingClose: {
                on: {
                  TOKEN: {
                    target: 'h3',
                    cond: {
                      type: 'isTokenTypeHeadingOpen',
                      tag: 'h3',
                    },
                  },
                },
              },
              h3: {
                id: 'h3',
                initial: 'headingOpen',
                states: {
                  headingOpen: {
                    on: {
                      TOKEN: {
                        target: 'inline',
                        cond: 'isTokenTypeInline',
                      },
                    },
                  },
                  inline: {
                    on: {
                      TOKEN: {
                        target: 'headingClose',
                        cond: 'isTokenTypeHeadingClose',
                      },
                    },
                    entry: [
                      assign({
                        plans: (context, { token }: TokenEvent) => {
                          const plan = context.plans[context.plans.length - 1];
                          const group = plan.groups?.[plan.groups.length - 1];

                          group?.nodes.push({
                            name: token.content,
                          });

                          return context.plans;
                        },
                      }),
                    ],
                  },
                  headingClose: {
                    on: {
                      TOKEN: [
                        {
                          target: '#h1',
                          cond: {
                            type: 'isTokenTypeHeadingOpen',
                            tag: 'h1',
                          },
                        },
                        {
                          target: '#h2',
                          cond: {
                            type: 'isTokenTypeHeadingOpen',
                            tag: 'h2',
                          },
                        },
                      ],
                    },
                  },
                  supports: {
                    id: 'supports',
                    initial: 'open',
                    states: {
                      open: {
                        on: {
                          TOKEN: {
                            target: 'inline',
                            cond: 'isTokenTypeInline',
                          },
                        },
                      },
                      inline: {},
                      close: {},
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isTokenTypeHeadingOpen: (_, { token }: TokenEvent, { cond }: any) =>
        token.type === 'heading_open' && cond.tag === token.tag,
      isTokenTypeInline: (_, { token }: TokenEvent) => token.type === 'inline',
      isTokenTypeHeadingClose: (_, { token }: TokenEvent) =>
        token.type === 'heading_close',
    },
  },
);

const parsePlansService = interpret(parsePlansMachine).start();

export const getAllPlans = async (): Promise<Plan[]> => {
  const markdowns = await readFolderMarkdowns({ folder: 'planning' });

  const plans = markdowns.forEach((markdown) => {
    parsePlansService.send({ type: 'MARKDOWN', markdown });

    const tokens = md.parse(markdown.content, {});

    tokens.forEach((token) => {
      parsePlansService.send({ type: 'TOKEN', token });
      console.log(parsePlansService.state.value);
    });

    console.log(JSON.stringify(parsePlansService.state.context, null, 2));

    // let plan: Plan = {
    //   slug: markdown.slug,
    //   name: '',
    //   nodes: {},
    // };
    // let currentNodeGroup = '';
    // let currentNode: PlanNode | undefined;
    // let currentNodeLastStep: 'name' | 'description' | 'supports' | '' = '';
    // let lastToken: Token | undefined;
    // console.log('AAAAAAAAAAAAAAAAAAAas');
    // for (const token of tokens) {
    //   console.log(
    //     JSON.stringify(
    //       {
    //         currentNodeGroup,
    //         currentNode,
    //         currentNodeLastStep,
    //         plan,
    //       },
    //       null,
    //       2,
    //     ),
    //     console.log('\n\n\n\n'),
    //   );
    //   if (!lastToken) {
    //     lastToken = token;
    //     continue;
    //   }
    //   if (lastToken.type === 'heading_open' && lastToken.tag === 'h1') {
    //     plan.name = token.content;
    //   }
    //   /**
    //    * Reset the current node group if we encounter a new h2 heading.
    //    */
    //   if (token.type === 'heading_open' && token.tag === 'h2') {
    //     currentNodeGroup = '';
    //   }
    //   if (lastToken.type === 'heading_open' && lastToken.tag === 'h2') {
    //     currentNodeGroup = token.content;
    //   }
    //   /**
    //    * Reset the current node if we encounter a new h3 heading and push it to
    //    * the current node group.
    //    */
    //   if (token.type === 'heading_open' && token.tag === 'h3') {
    //     if (currentNode) {
    //       plan.nodes[currentNodeGroup] = plan.nodes[currentNodeGroup] || [];
    //       plan.nodes[currentNodeGroup].push(currentNode);
    //     }
    //     currentNode = undefined;
    //   }
    //   if (lastToken.type === 'heading_open' && lastToken.tag === 'h3') {
    //     if (!currentNode) {
    //       currentNode = {
    //         name: token.content,
    //       };
    //     }
    //     currentNode.name = token.content;
    //     currentNodeLastStep = 'name';
    //   }
    //   if (
    //     lastToken.type === 'paragraph_open' &&
    //     currentNodeLastStep === 'name' &&
    //     currentNode
    //   ) {
    //     currentNode.description = token.content;
    //     currentNodeLastStep = 'description';
    //   }
    //   if (token.content === 'It supports:') {
    //     currentNodeLastStep = 'supports';
    //   }
    //   if (
    //     token.type === 'inline' &&
    //     currentNodeLastStep === 'supports' &&
    //     currentNode &&
    //     token.content !== 'It supports:'
    //   ) {
    //     currentNode.supports = currentNode.supports || [];
    //     currentNode.supports.push(token.content);
    //   }
    //   if (
    //     token.type === 'bullet_list_close' &&
    //     currentNodeLastStep === 'supports'
    //   ) {
    //     currentNodeLastStep = '';
    //     currentNode = undefined;
    //   }
    //   lastToken = token;
    // }
    // return plan;
  });

  return [];
};
