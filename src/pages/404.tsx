import { getDrafts } from '../../lib/files';
import NotFound from '../components/NotFound';

export const getStaticProps = async () => {
  const drafts = await getDrafts();

  const draftsHrefs = drafts.map(({ href }) => href);

  return {
    props: { draftsHrefs },
  };
};

export default NotFound;
