import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { Plan, getAllPlans } from '../../../lib/planning';
import { PlanningNetworkGraphProps } from '../../components/PlanningNetworkGraph';
import { paramCase } from 'change-case';
import { theme } from '../../theme';
import Heading from '../../components/Heading';
import Markdown from '../../components/Markdown';
import dynamic from 'next/dynamic';

const PlanningNetworkGraph = dynamic<PlanningNetworkGraphProps>(
  () =>
    import('../../components/PlanningNetworkGraph').then(
      (mod) => mod.PlanningNetworkGraph,
    ),
  {
    ssr: false,
  },
);

export const getStaticPaths: GetStaticPaths = async () => {
  const plans = await getAllPlans();

  return {
    paths: plans.map((plan) => ({ params: { plan: plan.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { plan: string };
}) => {
  const plans = await getAllPlans();

  const plan = plans.find((plan_) => plan_.slug === params.plan) as Plan;

  const nodesMeta = plan.groups.flatMap((group) => {
    return group.nodes.flatMap((node) => {
      const urlHash = paramCase(node.name);

      return {
        id: urlHash,
        group: group.name,
        supports: node.supports || [],
        color: group.name === 'Systems' ? theme?.colors?.accent : null,
        urlHash,
        ...node,
      };
    });
  });

  const nodes = nodesMeta;

  const links = nodesMeta
    .flatMap((node) => {
      return node.supports.map((support) => ({
        source: node.id,
        target: paramCase(support),
      }));
    })
    /**
     * Remove links that source and target are the same as target and source.
     */
    .filter((link, _, links) => {
      const reverseLink = links.find(
        (link_) => link_.source === link.target && link_.target === link.source,
      );

      return !reverseLink;
    });

  const markdown = [...plan.groups].reverse().reduce((acc, group) => {
    return [
      acc,
      `## ${group.name}`,
      ...group.nodes.flatMap((node) => {
        return [`### ${node.name}`, `${node.description || ''}`]
          .filter((line) => line)
          .join('\n');
      }),
    ].join('\n');
  }, '');

  return {
    props: {
      title: `Planning - ${plan.name}`,
      graphData: { nodes, links },
      markdown,
    },
  };
};

const PlanningPlan = ({
  title,
  graphData,
  markdown,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Heading as="h1">{title}</Heading>
      <PlanningNetworkGraph graphData={graphData} />
      <Markdown content={markdown} />
    </>
  );
};

export default PlanningPlan;
