import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import { Plan, getAllPlans } from '../../../lib/planning';
import { PlanningNetworkGraphProps } from '../../components/PlanningNetworkGraph';
import Heading from '../../components/Heading';
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
    return group.nodes.flatMap((node) => ({
      id: node.name,
      group: group.name,
      supports: node.supports || [],
      ...node,
    }));
  });

  const nodes = nodesMeta.map(({ id, group }) => ({ id, group }));

  const links = nodesMeta.flatMap((node) => {
    return node.supports.map((support) => ({
      source: node.name,
      target: support,
    }));
  });

  return {
    props: { title: `Planning - ${plan.name}`, graphData: { nodes, links } },
  };
};

const PlanningPlan = ({
  title,
  graphData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo noindex nofollow title={title} />
      <Heading as="h1">{title}</Heading>
      <PlanningNetworkGraph graphData={graphData} />
    </>
  );
};

export default PlanningPlan;
