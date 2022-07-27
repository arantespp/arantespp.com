import * as React from 'react';
// import { MODES } from '../constants/modes';
// import { Storage } from '../hooks/useStorage';
// import { useMode } from '../context/ModeContext';
import { usePresentationCurrentSlide } from '../hooks/usePresentationCurrentSlide';
import { useRouter } from 'next/router';
// import { useTotalPages } from '../context/TotalPagesContext';
// import PresentationMode from '../components/PresentationMode';
import { PresentationSlide } from './PresentationSlide';
// import Swipeable from '../components/Swipeable';
// import useEventListener from '../hooks/useEventListener';
import { useSwipeable } from 'react-swipeable';
import useKeypress from 'react-use-keypress';

const useMode = () => {
  return { mode: 'slideshow' };
};

const Swipeable = ({ children, ...props }) => {
  const handlers = useSwipeable(props);
  return <div {...handlers}>{children}</div>;
};

const useNavigation = () => {
  const { currentSlide, setSlide } = usePresentationCurrentSlide();

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values
   */
  const nextKeys = ['ArrowRight', 'ArrowDown', ' ', 'Enter'];

  const prevKeys = ['ArrowLeft', 'ArrowUp', 'Backspace'];

  const navigate = ({ key }: { key: string }) => {
    /**
     * Handle previous page
     */
    if (prevKeys.includes(key)) {
      setSlide((prevState) => {
        return prevState - 1;
      });
    }

    /**
     * Handle next page
     */
    if (nextKeys.includes(key)) {
      setSlide((prevState) => {
        return prevState + 1;
      });
    }
  };

  useKeypress([...nextKeys, ...prevKeys], navigate);

  const swipeLeft = () => {
    navigate({ key: nextKeys[0] });
  };

  const swipeRight = () => {
    navigate({ key: prevKeys[0] });
  };

  return {
    swipeLeft,
    swipeRight,
  };
};

export const PresentationSlidePage = ({ children }: any) => {
  const { push, asPath, pathname } = useRouter();

  const {
    currentSlide,
    setSlide,
    currentStep,
    setCurrentStep,
    steps,
    clearSteps,
  } = usePresentationCurrentSlide();

  // const totalPages = useTotalPages();

  const { mode } = useMode();

  const { swipeLeft, swipeRight } = useNavigation();

  // const NEXT = [13, 32, 39];
  // const PREV = 37;
  // const PRESENTER = 80;

  let slideCount = 0;

  // const navigate = ({ keyCode, altKey }) => {
  //   // Handle Presentation Mode shortcut
  //   if (altKey) {
  //     if (keyCode === PRESENTER) {
  //       if (mode === MODES.SPEAKER) {
  //         setMode(MODES.SLIDESHOW);
  //         router.push(
  //           router.pathname,
  //           `${router.pathname}?mode=${MODES.SLIDESHOW}#${currentSlide}`,
  //           { shallow: true },
  //         );
  //       } else {
  //         setMode(MODES.SPEAKER);
  //         router.push(
  //           router.pathname,
  //           `${router.pathname}?mode=${MODES.SPEAKER}#${currentSlide}`,
  //           { shallow: true },
  //         );
  //       }
  //       return false;
  //     }
  //   }

  //   // Handle Previous page
  //   if (keyCode === PREV && currentSlide === 0) {
  //     if (router.query && router.pathname) {
  //       if (router.pathname > 1) {
  //         router.push(`${parseInt(router.pathname, 10) - 1}?mode=${mode}#999`);
  //       }
  //     }
  //     return false;
  //   }

  //   // Handle next page
  //   if (NEXT.indexOf(keyCode) !== -1 && currentSlide === slideCount) {
  //     if (router.query && router.pathname && next) {
  //       router.push(`${next}?mode=${mode}`);
  //     }
  //     return false;
  //   }

  //   // Handle slide changes
  //   if (NEXT.indexOf(keyCode) !== -1) {
  //     // Do we have Steps inside the slide? Navigate those first
  //     if (steps.length > 0 && currentStep < steps.length - 1)
  //       return setCurrentStep((prevStep) => prevStep + 1);

  //     // Otherwise go to next slide
  //     setSlide((prevState) => {
  //       return prevState + 1;
  //     });
  //     clearSteps();
  //   } else if (keyCode === PREV) {
  //     // Do we have Steps inside the slide? Navigate those first
  //     if (steps.length > 0 && currentStep !== 0)
  //       return setCurrentStep((prevStep) => prevStep - 1);

  //     // Otherwise go to prev slide
  //     setSlide((prevState) => {
  //       // router.push(
  //       //   `${router.pathname}`,
  //       //   `${router.pathname}?mode=${mode}#${prevState - 1}`
  //       // );
  //       return prevState - 1;
  //     });
  //     clearSteps();
  //   }
  // };

  React.useEffect(() => {
    const newRoute = `${pathname}?mode=${mode}#${currentSlide}`;

    if (asPath !== newRoute) {
      push(`${pathname}`, `${pathname}?mode=${mode}#${currentSlide}`);
    }
  }, [asPath, currentSlide, mode, pathname, push]);

  // const slideNotes = () => {
  //   let generatorCount = 0;
  //   let generatedNotes = [];
  //   // Filter down children by only Slides
  //   React.Children.map(children, (child) => {
  //     // Check for <hr> element to separate slides
  //     const childType = child && child.props && (child.props.mdxType || []);
  //     if (childType && childType.includes('hr')) {
  //       generatorCount += 1;
  //       return;
  //     }
  //     // Check if it's a SpeakerNotes component
  //     if (childType && childType.includes('SpeakerNotes')) {
  //       if (!Array.isArray(generatedNotes[generatorCount])) {
  //         generatedNotes[generatorCount] = [];
  //       }
  //       generatedNotes[generatorCount].push(child);
  //     }
  //   });
  //   return generatedNotes;
  // };

  const renderSlide = () => {
    let generatedSlides: any[] = [];
    let generatorCount = 0;

    /**
     * Filter down children by only Slides
     */
    React.Children.map(children, (child) => {
      //
      const childType: string | undefined = child.type?.displayName;

      /**
       * Check for <hr> element to separate slides
       */
      if (childType?.includes("MdxComponents('hr')")) {
        generatorCount += 1;
        return;
      }

      /**
       * Check if it's a SpeakerNotes component
       */
      if (childType && !childType.includes('SpeakerNotes')) {
        /**
         * Add slide content to current generated slide
         */
        if (!Array.isArray(generatedSlides[generatorCount])) {
          generatedSlides[generatorCount] = [];
        }

        generatedSlides[generatorCount].push(child);
      }
    });

    /**
     * Get total slide count
     */
    slideCount = generatorCount;

    /**
     * Return current slide
     */
    if (currentSlide === 999) {
      push(pathname, `${pathname}?mode=${mode}#${slideCount}`, {
        shallow: true,
      });

      setSlide(slideCount);
    }

    return (
      <PresentationSlide>{generatedSlides[currentSlide]}</PresentationSlide>
    );
  };

  return (
    <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
      {renderSlide()}
    </Swipeable>
  );

  // return (
  //   <Swipeable onSwipedLeft={swipeLeft} onSwipedRight={swipeRight}>
  //     <Storage />
  //     <PresentationMode
  //       mode={mode}
  //       notes={slideNotes()}
  //       currentSlide={currentSlide}
  //     >
  //       <div id="slide" style={{ width: '100%' }}>
  //         {renderSlide()}
  //       </div>
  //     </PresentationMode>
  //   </Swipeable>
  // );
};
