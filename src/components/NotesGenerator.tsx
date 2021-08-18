import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Flex, Input, Label, Textarea, Themed } from 'theme-ui';
import * as yup from 'yup';

// const STORAGE_KEY = 'arantespp.com/notes';

// const getStorageNotes = () => {
//   if (typeof localStorage !== 'undefined') {
//     return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
//   }

//   return {};
// };

// const useStorageSaving = ({
//   noteId,
//   values,
// }: {
//   noteId: string;
//   values: string;
// }) => {
//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       const notes = getStorageNotes();
//       notes[noteId] = values;
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
//     }, 2000);

//     return () => clearTimeout(timeout);
//   }, [noteId, values]);
// };

const noteSchema = yup.object({
  title: yup.string().required(),
  excerpt: yup.string().required(),
  rating: yup.number().positive().integer().required(),
  tags: yup.string().required(),
  notes: yup.string().required(),
  references: yup.string(),
});

export type Note = yup.Asserts<typeof noteSchema>;

const putNote = async (note: Note) => {
  return fetch(`/api/note`, {
    method: 'PUT',
    body: JSON.stringify(note),
  });
};

const Note = ({ defaultValues }: { id?: string; defaultValues?: Note }) => {
  // const [noteId] = React.useState(id || Date.now().toString());

  const {
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
  } = useForm<Note>({
    defaultValues: {
      title: '',
      excerpt: '',
      rating: 2,
      tags: '',
      notes: '',
      ...defaultValues,
    },
    resolver: yupResolver(noteSchema),
  });

  console.log({ isDirty, isValid, errors });

  const [href, setHref] = React.useState('');

  const [apiError, setApiError] = React.useState(null);

  const onSubmit = async (data: Note) => {
    try {
      setApiError(null);
      const response = await putNote(data);
      const json = await response.json();
      if (response.status === 200) {
        setHref(json.href);
      } else {
        throw json;
      }
    } catch (error) {
      setApiError(error);
    }
  };

  // const { isDirty, isValid } = formState;

  // console.log({ isDirty, isValid });

  // const values = JSON.stringify(watch());

  // useStorageSaving({ noteId, values });

  // console.log({ id, defaultValues });

  return (
    <Box>
      <Flex
        as="form"
        sx={{ flexDirection: 'column' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Label>Title</Label>
        <Textarea rows={1} {...register('title')} />
        <Label>Excerpt</Label>
        <Textarea rows={1} {...register('excerpt')} />
        <Label>Rating</Label>
        <Input {...register('rating')} type="number" />
        <Label>Tags</Label>
        <Textarea rows={1} {...register('tags')} />
        <Label>Notes</Label>
        <Textarea rows={8} {...register('notes')} />
        <Label>References</Label>
        <Textarea rows={2} {...register('references')} />
        {apiError && <Themed.pre>{JSON.stringify(apiError)}</Themed.pre>}
        {href && <Themed.a href={href}>{href}</Themed.a>}
        <Flex sx={{ justifyContent: 'center', marginTop: 4 }}>
          <Button type="submit">Save</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

const NotesGenerator = () => {
  // const notes = getStorageNotes();
  // const values = JSON.parse(notes);

  return (
    <Box>
      <Themed.h1>Notes Generator</Themed.h1>
      <Note />
    </Box>
  );
};

export default NotesGenerator;
