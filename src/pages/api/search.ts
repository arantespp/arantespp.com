import { NextApiRequest, NextApiResponse } from 'next';
import { searchPosts } from '../../../lib/searchPosts';

const searchHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = JSON.parse(req.body);
  const posts = await searchPosts({ query });
  const postsWithoutContent = posts.map(({ content, ...post }) => post);
  res.status(200).json({ query, posts: postsWithoutContent });
};

export default searchHandler;
