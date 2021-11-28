import type { Book } from '../../lib/files';

import CustomImage from './CustomImage';

const BookHeader = ({ book }: { book: Book }) => {
  const { authors, image, link, ASIN, ISBN } = book;

  const alt = [
    `By <strong>${authors.join(', ')}</strong>`,
    ISBN && `ISBN: ${ISBN}`,
    !ISBN && ASIN && `ASIN: ${ASIN}`,
    `<a href=${link}>Read more about the book here.</a>`,
  ]
    .filter((line) => !!line)
    .join('. ');

  return <CustomImage src={image || ''} alt={alt} />;
};

export default BookHeader;
