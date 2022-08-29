import FullWidth from './FullWidth';
import SpriteText from 'three-spritetext';
import dynamic from 'next/dynamic';

const ForceGraph3D = dynamic(() => import('react-force-graph-3d'));

const goals = [
  {
    name: 'Master physical energy',
    supports: ['Achieve full engagement mode'],
  },
  {
    name: 'Train at least 5 days a week',
    supports: ['Master physical energy'],
  },
  {
    name: 'Master mental energy',
    supports: ['Achieve full engagement mode'],
  },
  {
    name: 'Study and read every day',
    supports: ['Master mental energy'],
  },
  {
    name: 'Read about business',
    supports: ['Study and read every day', 'Have a successful company'],
  },
  {
    name: 'Master emotional energy',
    supports: ['Achieve full engagement mode'],
  },
  {
    name: 'Master spiritual energy',
    supports: ['Achieve full engagement mode', 'Become a spiritualized person'],
  },
  {
    name: 'Meditate every day',
    supports: [
      'Master emotional energy',
      'Master spiritual energy',
      'Be aware and fight resistances',
    ],
  },
  {
    name: 'Achieve full engagement mode',
    supports: ['Find an amazing woman', 'Have a successful company'],
  },
  {
    name: 'Find an amazing woman',
    supports: ['Have a lot of money', 'Become a spiritualized person'],
  },
  {
    name: 'Have a lot of money',
    supports: ['Find an amazing woman'],
  },
  {
    name: 'Have a successful company',
    supports: ['Have a lot of money'],
  },
  {
    name: 'Sleep well',
    supports: ['Train at least 5 days a week', 'Study and read every day'],
  },
  {
    name: 'Become a spiritualized person',
    supports: ['Find an amazing woman'],
  },
  {
    name: 'Eat healthy',
    supports: ['Master physical energy'],
  },
  {
    name: 'Journal every day',
    supports: [
      'Master emotional energy',
      'Master spiritual energy',
      'Write every day',
      'Be aware and fight resistances',
    ],
  },
  {
    name: 'Write every day',
    supports: ['Master mental energy'],
  },
  {
    name: 'Do focused work at least 4 hours a day',
    supports: ['Have a successful company'],
  },
  {
    name: 'Be aware and fight resistances',
    supports: ['Do focused work at least 4 hours a day'],
  },
];

const nodes = goals.map(({ name }) => ({
  id: name,
}));

const links = goals.flatMap((goal) =>
  (goal.supports || []).map((support) => ({
    source: goal.name,
    target: support,
  })),
);

export const Planning = () => {
  return (
    <FullWidth>
      <ForceGraph3D
        graphData={{
          nodes: nodes as any,
          links,
        }}
        nodeLabel={() => ''}
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
      />
    </FullWidth>
  );
};
