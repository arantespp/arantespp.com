import * as React from 'react';
import { Box, Button, Flex, Input, useThemeUI } from 'theme-ui';
import { ForceGraphMethods as ForceGraph2DMethods } from 'react-force-graph-2d';
import { ForceGraphMethods as ForceGraph3DMethods } from 'react-force-graph-3d';
import { Loading } from './Loading';
import { Recommendation } from '../../lib/files';
import { theme } from '../theme';
// import { useResponsiveValue } from '@theme-ui/match-media';
// import { useScrollIntoView } from '../hooks/useScrollIntoView';
import SpriteText from 'three-spritetext';
import dynamic from 'next/dynamic';

/**
 * Error [ERR_REQUIRE_ESM]: require() of ES Module not supported.
 * Instead change the require of index.js to a dynamic import() which is
 * available in all CommonJS modules.
 */
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'));
const ForceGraph3D = dynamic(() => import('react-force-graph-3d'));

const nodeColors: { [key: string]: string } = {
  post: theme.colors?.secondary as string,
  tag: theme.colors?.accent as string,
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
}: {
  graphData: { nodes: any; links: any };
  selectedNodeId?: string;
  setSelectedNodeId: (id: string) => void;
  allPosts: Recommendation[];
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const wasScrolledIntoView = React.useRef(false);

  const { theme } = useThemeUI();

  const darkBackgroundColor = theme?.rawColors?.modes?.dark
    ?.background as string;

  const forceGraph2DRef = React.useRef<ForceGraph2DMethods>();
  const forceGraph3DRef = React.useRef<ForceGraph3DMethods>();

  const [show2D, setShow2D] = React.useState(false);

  // const [{ height, width }, setDimensions] = React.useState({
  //   height: 0,
  //   width: 0,
  // });

  // const widthPercentage = useResponsiveValue([1, 1]);

  // React.useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setDimensions({
  //       height: 1 * window.innerHeight,
  //       width: widthPercentage * window.innerWidth,
  //     });
  //   }
  // }, [widthPercentage]);

  // if (height === 0 || width === 0) {
  //   return null;
  // }

  const graphCommonProps = {
    graphData,
    nodeOpacity: 0.9,
    nodeResolution: 32,
    onNodeClick: (node: any) => {
      setSelectedNodeId(node.id);
    },
    nodeColor: (node: any) => {
      if (selectedNodeId === node.id) {
        return nodeColors.selectedNode;
      }

      if (node.group === 'post') {
        return nodeColors.post;
      }

      return nodeColors.tag;
    },
    onEngineTick: () => {
      if (!wasScrolledIntoView.current && containerRef.current) {
        wasScrolledIntoView.current = true;
        containerRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    },
    onDagError: (loopNodeIds) => {},
  };

  const buttonCommonProps = {
    position: 'absolute',
    backgroundColor: 'background',
    color: 'text',
    border: '1px solid',
    borderColor: 'text',
  } as const;

  return (
    <Flex
      ref={containerRef}
      sx={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        flexDirection: 'column',
      }}
    >
      <React.Suspense fallback={<Loading />}>
        {show2D ? (
          <ForceGraph2D
            ref={forceGraph2DRef}
            {...graphCommonProps}
            backgroundColor={theme.rawColors?.background as string}
            linkColor={() => theme.rawColors?.text as string}
            linkWidth={0.3}
            linkDirectionalParticles={2}
            linkDirectionalParticleWidth={3}
            dagMode="radialin"
            // dagLevelDistance={400}
            // nodeCanvasObjectMode="replace"
            // nodeCanvasObject={(node, ctx, globalScale) => {
            // }}
          />
        ) : (
          <ForceGraph3D
            ref={forceGraph3DRef}
            {...graphCommonProps}
            backgroundColor={darkBackgroundColor}
            nodeThreeObjectExtend={true}
            nodeThreeObject={(node) => {
              const sprite = new SpriteText(node.name);
              sprite.color = 'white';
              sprite.textHeight = 4;
              return sprite;
            }}
            linkWidth={2}
            linkDirectionalParticles={4}
            linkDirectionalParticleWidth={3}
            dagMode="bu"
          />
        )}
      </React.Suspense>
      <Button
        sx={{
          ...buttonCommonProps,
          right: 32,
          top: 32,
        }}
        onClick={() => {
          setShow2D(!show2D);
        }}
      >
        {show2D ? '3D' : '2D'}
      </Button>
      <Button
        sx={{
          ...buttonCommonProps,
          bottom: 32,
          right: 32,
        }}
        onClick={() => {
          if (forceGraph2DRef.current) {
            forceGraph2DRef.current?.zoomToFit?.();
          }

          if (forceGraph3DRef.current) {
            forceGraph3DRef.current.zoomToFit?.();
          }
        }}
      >
        Reset
      </Button>
    </Flex>
  );
};

export default NetworkGraph;
