import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { Group } from './files';
import { getPost } from './files';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export type GeneratePostMetadata = {
  excerpt?: string;
  tags?: string;
  insight?: string;
};

export const generatePostMetadata = async ({
  content,
}: {
  content: string;
}): Promise<GeneratePostMetadata> => {
  const handleCreateCompletion = async ({
    instruction,
    ...completion
  }: { instruction: string } & Partial<CreateCompletionRequest>) => {
    const prompt = `${instruction}\n\n${content}`;

    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt,
      ...completion,
    });

    const { choices } = response.data;

    const firstChoice = choices[0].text?.trim();

    return firstChoice;
  };

  const getExcerpt = async () => {
    const instruction =
      'Write an excerpt of this text with a maximum of 160 characters:';

    return handleCreateCompletion({
      instruction,
      max_tokens: 100,
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
  };

  const getTags = async () => {
    const instruction = 'Write a list of tags for this text:';

    return handleCreateCompletion({
      instruction,
      max_tokens: 50,
      temperature: 0.5,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
  };

  const getInsight = async () => {
    const instruction =
      'what questions and further topics can I have from this text:';

    return handleCreateCompletion({
      instruction,
      max_tokens: 2000,
      temperature: 0.9,
      presence_penalty: 1.8,
      frequency_penalty: 1.8,
    });
  };

  const [excerpt, tags, insight] = await Promise.all([
    getExcerpt(),
    getTags(),
    getInsight(),
  ]);

  return {
    excerpt,
    tags: tags?.replaceAll(' ', ';').replaceAll('#', ''),
    insight,
  };
};
