import dynamic from 'next/dynamic';
import * as React from 'react';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';
import { Button, Flex } from 'theme-ui';

import { theme } from '../theme';

const nodeColors: { [key: string]: string } = {
  post: theme.colors?.celadonBlue as string,
  tag: theme.colors?.honeydew as string,
  selectedNode: theme.colors?.imperialRed as string,
};

const NetworkGraph = ({
  graphData,
  setSelectedNodeId,
  selectedNodeId,
}: {
  graphData: { nodes: any; links: any };
  selectedNodeId?: string;
  setSelectedNodeId: (id: string) => void;
}) => {
  const forceGraphRef = React.useRef<ForceGraphMethods>();

  const [{ height, width }, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        height: 0.7 * window.innerHeight,
        width: 0.9 * window.innerWidth,
      });
    }
  }, []);

  if (height === 0 || width === 0) {
    return null;
  }

  return (
    <Flex
      sx={{
        height,
        width,
        position: 'relative',
      }}
    >
      <ForceGraph3D
        ref={forceGraphRef}
        height={height}
        width={width}
        graphData={graphData}
        nodeOpacity={0.9}
        nodeResolution={16}
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.name);
          sprite.color = 'white';
          sprite.textHeight = 4;
          return sprite;
        }}
        onNodeClick={(node: any) => setSelectedNodeId(node.id)}
        nodeColor={(node: any) => {
          if (selectedNodeId === node.id) {
            return nodeColors.selectedNode;
          }

          if (node.group === 'post') {
            return nodeColors.post;
          }

          return nodeColors.tag;
        }}
      />
      <Button
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          backgroundColor: 'transparent',
        }}
        onClick={() => {
          if (forceGraphRef.current) {
            console.log(forceGraphRef.current);
            forceGraphRef.current.zoomToFit();
          }
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default NetworkGraph;
