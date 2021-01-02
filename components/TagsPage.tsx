import { Styled } from 'theme-ui';

import Recommendations from './Recommendations';
import Tag from './Tag';

import { Recommendation } from '../lib/files';

const TagsPage = ({
  recommendations,
  tags,
}: {
  recommendations?: Recommendation[];
  tags: string[];
}) => {
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
      {recommendations && <Recommendations recommendations={recommendations} />}
    </>
  );
};

export default TagsPage;
