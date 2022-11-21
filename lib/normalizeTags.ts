import { paramCase } from 'change-case';

const mapTags = {
  queues: 'queueing-theory',
  queue: 'queueing-theory',
};

export const normalizeTags = (tags: string[] = []) =>
  [...tags]
    /**
     * Remove invalid tags.
     */
    .filter((tag) => !!tag)
    /**
     * https://stackoverflow.com/a/37511463/8786986
     */
    .map((tag) => tag.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
    .map((tag) => paramCase(tag))
    .map((tag) => {
      if (mapTags[tag]) {
        console.error(
          `Tag "${tag}" is deprecated. Use "${mapTags[tag]}" instead.`,
        );
        process.exit(1);
      }

      return tag;
    })
    /**
     * Remove duplicated tags.
     * https://stackoverflow.com/a/56757215/8786986
     */
    .filter((tag, index, array) => array.indexOf(tag) === index)
    .sort((tagA, tagB) => tagA.localeCompare(tagB));
