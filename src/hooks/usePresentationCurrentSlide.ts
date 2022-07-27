import * as React from 'react';
import { PresentationCurrentSlideContext } from '../providers/PresentationCurrentSlideProvider';

export const usePresentationCurrentSlide = () =>
  React.useContext(PresentationCurrentSlideContext);
