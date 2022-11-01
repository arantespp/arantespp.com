import * as React from 'react';
import { Box, useThemeUI } from 'theme-ui';
import { ForceGraphMethods, GraphData } from 'react-force-graph-3d';
import { useRouter } from 'next/router';
import FullWidth from './FullWidth';
import SpriteText from 'three-spritetext';
import dynamic from 'next/dynamic';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'));

export type PlanningNetworkGraphProps = {
  graphData: GraphData;
};

export const PlanningNetworkGraph = ({
  graphData,
}: PlanningNetworkGraphProps) => {
  const { theme } = useThemeUI();

  const containerRef = React.useRef<HTMLDivElement>(null);

  const wasScrolledIntoView = React.useRef(false);

  const graphRef = React.useRef<ForceGraphMethods | undefined>(undefined);

  const [selectedNodeId, setSelectedNodeId] = React.useState<string>();

  const { asPath, push } = useRouter();

  const hash = asPath.split('#')[1];

  React.useEffect(() => {
    if (hash) {
      setSelectedNodeId(hash);
    }
  }, [hash]);

  return (
    <Box
      sx={{
        position: 'relative',
        '.nodeLabel': {
          backgroundColor: 'white',
          paddingX: 3,
          paddingY: 1,
          p: {
            color: 'black',
          },
        },
      }}
    >
      <FullWidth ref={containerRef}>
        <ForceGraph3D
          ref={graphRef}
          height={700}
          graphData={graphData}
          dagMode="lr"
          nodeColor={(node: any) => {
            if (node.id === selectedNodeId) {
              return theme.rawColors?.primary;
            }

            return node.color;
          }}
          dagLevelDistance={1.2 * graphData.nodes.length}
          nodeAutoColorBy="group"
          nodeResolution={2 ** 5}
          nodeThreeObjectExtend={true}
          nodeThreeObject={(node) => {
            const sprite = new SpriteText(node.id);
            sprite.color = 'white';
            sprite.textHeight = 4;
            return sprite;
          }}
          linkWidth={1}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={1}
          linkDirectionalParticles={3}
          linkDirectionalParticleWidth={1}
          onEngineTick={() => {
            if (!wasScrolledIntoView.current && containerRef.current) {
              wasScrolledIntoView.current = true;
              containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onDagError={(loopNodeIds) => {}}
          onNodeClick={(node: any) => {
            /**
             * Only anchor to the URL if the user clicked on the selected node.
             */
            if (selectedNodeId === node.id) {
              push(`#${node.id}`, undefined, {
                shallow: false,
              });
            }

            setSelectedNodeId(node.id);
          }}
        />
      </FullWidth>
    </Box>
  );
};
