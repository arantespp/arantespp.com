import * as React from 'react';
import { Flex, Text } from 'theme-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

import { openTwitterScheduler } from '../../shortcuts';

import { useKeypressSequenceListener } from '../hooks/useKeypressSequenceListener';

import { TweetsScheduler } from './TweetsScheduler';

export const TweetScheduler = () => {
  const [displaySchedule, setDisplaySchedule] = React.useState(false);

  useKeypressSequenceListener(openTwitterScheduler, () =>
    setDisplaySchedule((d) => !d),
  );

  return (
    <>
      {displaySchedule && (
        <Flex
          sx={{
            top: [0, 'auto'],
            bottom: ['auto', 60],
            right: [0, 60],
            height: ['100%', 'auto'],
            position: 'fixed',
            backgroundColor: 'background',
            width: '100%',
            maxWidth: 500,
            flexDirection: 'column',
            padding: 3,
            borderWidth: 1,
            borderColor: 'muted',
            borderStyle: 'solid',
            borderRadius: 4,
          }}
        >
          <TweetsScheduler singleTweet />
        </Flex>
      )}
      <Flex
        sx={{
          position: 'fixed',
          bottom: 15,
          right: 15,
          borderRadius: '100%',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'twitter',
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: 'twitter',
        }}
        onClick={() => setDisplaySchedule(!displaySchedule)}
      >
        <Text
          sx={{
            color: 'white',
            fontSize: 5,
            display: 'inline-flex',
          }}
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Text>
      </Flex>
    </>
  );
};

export default TweetScheduler;
