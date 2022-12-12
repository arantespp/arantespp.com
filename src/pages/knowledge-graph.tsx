import { Box } from 'theme-ui';
import { InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
// import { zettelkasten } from '../../lib/zettelkasten';
import FullWidth from '../components/FullWidth';
import dynamic from 'next/dynamic';

const KnowledgeGraph = dynamic(
  () => import('@tereza-tech/react-zettel').then((mod) => mod.KnowledgeGraph),
  {
    ssr: false,
  },
);

export const getStaticProps = async () => {
  /**
   * TODO: This is not working yet. It takes too long to generate the graph data.
   */
  // const graphData = await zettelkasten.getGraphData();
  return {
    props: {
      graphData: {
        nodes: [],
        links: [],
      },
    },
  };
};

const KnowledgeGraphPage = ({
  graphData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        {...{
          title: 'Knowledge Graph',
          description: 'Knowledge Graph of my Zettelkasten notes.',
          openGraph: {
            images: [
              {
                url: 'https://arantespp.com/images/network.webp',
                alt: 'Knowledge Graph',
              },
            ],
          },
        }}
      />
      <FullWidth>
        <Box sx={{ height: '80vh' }}>
          <KnowledgeGraph graphData={graphData} />
        </Box>
      </FullWidth>
    </>
  );
};

export default KnowledgeGraphPage;
