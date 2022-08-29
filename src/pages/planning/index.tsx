import dynamic from 'next/dynamic';

const Planning = dynamic(
  () => import('../../components/Planning').then((mod) => mod.Planning),
  {
    ssr: false,
  },
);

const PlanningPage = () => {
  return <Planning />;
};

export default PlanningPage;
