import { GraphData } from 'react-force-graph-3d';
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
  return (
    <FullWidth>
      <ForceGraph3D
        graphData={graphData}
        dagMode="zin"
        nodeLabel={() => ''}
        nodeAutoColorBy="group"
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
      />
    </FullWidth>
  );
};
