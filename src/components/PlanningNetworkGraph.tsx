import * as React from 'react';
import { Box } from 'theme-ui';
import { ForceGraphMethods, GraphData } from 'react-force-graph-3d';
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
  const containerRef = React.useRef<HTMLDivElement>(null);

  const wasScrolledIntoView = React.useRef(false);

  const graphRef = React.useRef<ForceGraphMethods | undefined>(undefined);

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
            const { urlHash } = node;

            if (urlHash) {
              window.location.hash = urlHash;
            }
          }}
        />
      </FullWidth>
    </Box>
  );
};
