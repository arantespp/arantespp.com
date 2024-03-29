import { Markdown, readFolderMarkdowns } from './readFolderMarkdowns';
import { assign, createMachine, interpret } from 'xstate';
import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';

const md = new MarkdownIt();

const SUPPORTS_INDICATOR = 'Supports:';

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
    predictableActionArguments: true,
    id: 'parsePlans',
    initial: 'noMarkdowns',
    context: {
      plans: [],
    },
    on: {
      MARKDOWN: {
        target: 'newMarkdown',
      },
      TOKEN: [
        {
          target: '#h1',
          cond: {
            type: 'matchToken',
            token: {
              type: 'heading_open',
              tag: 'h1',
            },
          },
        },
        {
          target: '#h2',
          cond: {
            type: 'matchToken',
            token: {
              type: 'heading_open',
              tag: 'h2',
            },
          },
        },
        {
          target: '#h3',
          cond: {
            type: 'matchToken',
            token: {
              type: 'heading_open',
              tag: 'h3',
            },
          },
        },
      ],
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
      },
      h1: {
        id: 'h1',
        initial: 'headingOpen',
        states: {
          headingOpen: {
            on: {
              TOKEN: {
                target: 'inline',
                cond: {
                  type: 'matchToken',
                  token: {
                    type: 'inline',
                  },
                },
              },
            },
          },
          inline: {
            on: {
              TOKEN: {
                target: 'headingClose',
                cond: {
                  type: 'matchToken',
                  token: {
                    type: 'heading_close',
                  },
                },
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
          headingClose: {},
          h2: {
            id: 'h2',
            initial: 'headingOpen',
            states: {
              headingOpen: {
                on: {
                  TOKEN: {
                    target: 'inline',
                    cond: {
                      type: 'matchToken',
                      token: {
                        type: 'inline',
                      },
                    },
                  },
                },
              },
              inline: {
                on: {
                  TOKEN: {
                    target: 'headingClose',
                    cond: {
                      type: 'matchToken',
                      token: {
                        type: 'heading_close',
                      },
                    },
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
              headingClose: {},
              h3: {
                id: 'h3',
                initial: 'headingOpen',
                states: {
                  headingOpen: {
                    on: {
                      TOKEN: {
                        target: 'inline',
                        cond: {
                          type: 'matchToken',
                          token: {
                            type: 'inline',
                          },
                        },
                      },
                    },
                  },
                  inline: {
                    on: {
                      TOKEN: {
                        target: 'headingClose',
                        cond: {
                          type: 'matchToken',
                          token: {
                            type: 'heading_close',
                          },
                        },
                      },
                    },
                    entry: [
                      assign({
                        plans: (context, { token }: TokenEvent) => {
                          const plan = context.plans[context.plans.length - 1];
                          const group = plan.groups?.[plan.groups.length - 1];

                          group?.nodes.push({
                            name: token.content,
                            supports: [],
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
                          target: 'description',
                          cond: {
                            type: 'matchDescription',
                          },
                        },
                        {
                          target: 'supports',
                          cond: {
                            type: 'matchToken',
                            token: {
                              content: SUPPORTS_INDICATOR,
                            },
                          },
                        },
                      ],
                    },
                  },
                  description: {
                    id: 'description',
                    initial: 'inline',
                    states: {
                      inline: {
                        on: {
                          TOKEN: {
                            target: 'close',
                            cond: {
                              type: 'matchToken',
                              token: {
                                type: 'paragraph_close',
                              },
                            },
                          },
                        },
                        entry: [
                          assign({
                            plans: (context, { token }: TokenEvent) => {
                              const plan =
                                context.plans[context.plans.length - 1];

                              const group =
                                plan.groups?.[plan.groups.length - 1];

                              const node = group?.nodes[group.nodes.length - 1];

                              if (node) {
                                if (!node.description) {
                                  node.description = '';
                                }

                                node.description += token.content + '\n\n';
                              }

                              return context.plans;
                            },
                          }),
                        ],
                      },
                      listItem: {
                        on: {
                          TOKEN: {
                            target: 'inline',
                            cond: {
                              type: 'matchToken',
                              token: {
                                type: 'inline',
                              },
                            },
                          },
                        },
                        entry: [
                          assign({
                            plans: (context, { token }: TokenEvent) => {
                              const plan =
                                context.plans[context.plans.length - 1];

                              const group =
                                plan.groups?.[plan.groups.length - 1];

                              const node = group?.nodes[group.nodes.length - 1];

                              if (node) {
                                if (!node.description) {
                                  node.description = '';
                                }

                                node.description += `1. `;
                              }

                              return context.plans;
                            },
                          }),
                        ],
                      },
                      close: {
                        on: {
                          TOKEN: [
                            {
                              target: '#supports',
                              cond: {
                                type: 'matchToken',
                                token: {
                                  content: SUPPORTS_INDICATOR,
                                },
                              },
                            },
                            {
                              target: 'listItem',
                              cond: {
                                type: 'matchToken',
                                token: {
                                  type: 'list_item_open',
                                },
                              },
                            },
                            {
                              target: 'inline',
                              cond: {
                                type: 'matchToken',
                                token: {
                                  type: 'inline',
                                },
                              },
                            },
                          ],
                        },
                      },
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
                            cond: {
                              type: 'matchToken',
                              token: {
                                type: 'inline',
                              },
                            },
                          },
                        },
                      },
                      inline: {
                        on: {
                          TOKEN: {
                            target: 'close',
                            cond: {
                              type: 'matchToken',
                              token: {
                                type: 'list_item_close',
                                tag: 'li',
                              },
                            },
                          },
                        },
                        entry: [
                          assign({
                            plans: (context, { token }: TokenEvent) => {
                              const plan =
                                context.plans[context.plans.length - 1];

                              const group =
                                plan.groups?.[plan.groups.length - 1];

                              const node = group?.nodes[group.nodes.length - 1];

                              node?.supports?.push(token.content);

                              return context.plans;
                            },
                          }),
                        ],
                      },
                      close: {
                        on: {
                          TOKEN: [
                            {
                              target: 'open',
                              cond: {
                                type: 'matchToken',
                                token: {
                                  type: 'list_item_open',
                                },
                              },
                            },
                          ],
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
    },
  },
  {
    guards: {
      matchToken: (_, { token }: TokenEvent, { cond }: { cond: any }) => {
        return Object.keys(cond.token).every((key) => {
          return token[key] === cond.token[key];
        });
      },
      matchDescription: (_, { token }: TokenEvent) => {
        if (token.type !== 'inline') {
          return false;
        }

        if (token.content === SUPPORTS_INDICATOR) {
          return false;
        }

        return true;
      },
    },
  },
);

export const getAllPlans = async (): Promise<Plan[]> => {
  const parsePlansService = interpret(parsePlansMachine).start();

  const markdowns = await readFolderMarkdowns({ folder: 'planning' });

  markdowns.forEach((markdown) => {
    parsePlansService.send({ type: 'MARKDOWN', markdown });

    const tokens = md.parse(markdown.content, {});

    tokens.forEach((token) => {
      parsePlansService.send({ type: 'TOKEN', token });
    });
  });

  const { state } = parsePlansService.stop();

  return state.context.plans as Plan[];
};
