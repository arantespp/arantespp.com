import * as React from 'react';
import { Box, Button, Flex, Input, useThemeUI } from 'theme-ui';
import { Recommendation } from '../../lib/files';
import { theme } from '../theme';
import { useResponsiveValue } from '@theme-ui/match-media';
import ForceGraph3D, { ForceGraphMethods } from 'react-force-graph-3d';
import SpriteText from 'three-spritetext';

const nodeColors: { [key: string]: string } = {
  post: theme.colors?.secondary as string,
  tag: theme.colors?.highlight as string,
  selectedNode: theme.colors?.primary as string,
};

const SearchInput = ({
  setSelectedNodeId,
  allPosts,
}: {
  setSelectedNodeId: (id: string) => void;
  allPosts: Recommendation[];
}) => {
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    const result = allPosts.find((r) => r.title === inputValue);
    if (result) {
      setSelectedNodeId(result.href);
    }
  }, [allPosts, inputValue, setSelectedNodeId]);

  return (
    <>
      <Input
        sx={{
          position: 'absolute',
          top: 2,
          width: 500,
          maxWidth: '96%',
          left: 0,
          right: 0,
          margin: 'auto',
          backgroundColor: 'background',
        }}
        list="results"
        placeholder="What do you want to search?"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
      />
      {inputValue.length > 1 && (
        <Box as="datalist" id="results">
          {allPosts.map((result) => (
            <option key={result.href}>{result.title}</option>
          ))}
        </Box>
      )}
    </>
  );
};

const NetworkGraph = ({
  graphData,
  setSelectedNodeId,
  selectedNodeId,
  allPosts,
}: {
  graphData: { nodes: any; links: any };
  selectedNodeId?: string;
  setSelectedNodeId: (id: string) => void;
  allPosts: Recommendation[];
}) => {
  const { theme } = useThemeUI();

  const forceGraphRef = React.useRef<ForceGraphMethods>();

  const [{ height, width }, setDimensions] = React.useState({
    height: 0,
    width: 0,
  });

  const widthPercentage = useResponsiveValue([0.96, 0.9]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setDimensions({
        height: 0.7 * window.innerHeight,
        width: widthPercentage * window.innerWidth,
      });
    }
  }, [widthPercentage]);

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
        backgroundColor={theme?.rawColors?.modes?.dark?.background as string}
        ref={forceGraphRef}
        height={height}
        width={width}
        graphData={graphData}
        nodeOpacity={0.9}
        nodeResolution={32}
        nodeThreeObjectExtend={true}
        nodeThreeObject={(node) => {
          const sprite = new SpriteText(node.name);
          sprite.color = 'white';
          sprite.textHeight = 4;
          return sprite;
        }}
        onNodeClick={(node: any) => {
          setSelectedNodeId(node.id);
        }}
        nodeColor={(node: any) => {
          if (selectedNodeId === node.id) {
            return nodeColors.selectedNode;
          }

          if (node.group === 'post') {
            return nodeColors.post;
          }

          return nodeColors.tag;
        }}
        linkWidth={2}
      />
      <SearchInput setSelectedNodeId={setSelectedNodeId} allPosts={allPosts} />
      <Button
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          backgroundColor: 'transparent',
        }}
        onClick={() => {
          if (forceGraphRef.current) {
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
