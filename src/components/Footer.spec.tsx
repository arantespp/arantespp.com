import { render, screen } from '../testUtils';

import { socialMediasArr } from '../../lib/socialMedias';

import Footer from './Footer';

test('should have all social medias', () => {
  render(<Footer />);
  socialMediasArr.forEach((socialMedia) => {
    const socialMediaElement = screen.getByLabelText(socialMedia.name);

    expect(socialMediaElement).toBeInTheDocument();
    expect(socialMediaElement).toHaveAttribute('href', socialMedia.href);

    const svg = socialMediaElement.firstChild;

    expect(svg?.nodeName).toBe('svg');
  });
});
