import { GetStaticPaths, InferGetStaticPropsType } from 'next';
import { Plan, getAllPlans } from '../../../lib/planning';

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

  return { props: { plan } };
};

const PlanningPlan = ({
  plan,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <pre>{JSON.stringify(plan, null, 2)}</pre>;
};

export default PlanningPlan;
