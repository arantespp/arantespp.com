import * as React from 'react';
import { Flex, Text, Textarea } from 'theme-ui';

export const TWEET_MAX_CHARS = 280;

export const tweetCharCount = (tweet: string) => {
  /**
   * https://help.twitter.com/en/using-twitter/how-to-tweet-a-link
   * "A URL of any length will be altered to 23 characters"
   */
  const tmpUrl = 'x'.repeat(23);
  const tweetUrlReplace = tweet.replace(/(http[s]?:\/\/[\S]*)/g, tmpUrl);
  return tweetUrlReplace.length;
};

export const charReplacer = (tweet = '') => {
  return tweet.replace(/’/g, "'").replace(/“/g, '"').replace(/”/g, '"');
};

export const TweetEditor = ({
  value,
  maxChars = TWEET_MAX_CHARS,
  disabled,
  setValue,
  onBlur,
}: {
  value: string;
  setValue: (v: string) => void;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement> | undefined;
  maxChars?: number;
  disabled?: boolean;
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const charactersCount = tweetCharCount(value);

  const reachedMaxChars = charactersCount > maxChars;

  const copyClipboard = async () => {
    const text = await navigator.clipboard.readText();
    if (text && textareaRef.current) {
      /**
       * Don't update text if text already exists.
       */
      if (!textareaRef.current.value) {
        setValue(charReplacer(text));
      }
    }
  };

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Textarea
        ref={textareaRef}
        rows={7}
        onChange={(e) => {
          setValue(charReplacer(e.target.value));
        }}
        onBlur={onBlur}
        value={value}
        sx={{ borderColor: reachedMaxChars ? 'error' : 'auto' }}
        aria-label="tweetEditor"
        disabled={disabled}
        onDoubleClick={copyClipboard}
      />
      <Text
        sx={{
          textAlign: 'right',
          color: reachedMaxChars ? 'error' : 'text',
          fontSize: 1,
        }}
      >
        {charactersCount}/{maxChars}
      </Text>
    </Flex>
  );
};
