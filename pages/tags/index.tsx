import { InferGetStaticPropsType } from 'next';
import { Styled } from 'theme-ui';

import Tag from '../../components/Tag';

import { getAllTags } from '../../lib/files';

export const getStaticProps = async () => {
  const tags = getAllTags();
  return {
    props: { tags },
  };
};

const TagsIndex = ({
  tags,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Styled.h1>Tags</Styled.h1>
      <Styled.ul>
        {tags.map((tag) => (
          <Styled.li key={tag}>
            <Tag tag={tag} />
          </Styled.li>
        ))}
      </Styled.ul>
    </>
  );
};

export default TagsIndex;
