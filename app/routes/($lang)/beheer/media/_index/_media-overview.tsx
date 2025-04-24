import { FormEvent, useContext, useState } from 'react';
import Heading from '~/components/Heading';
import { ShoelaceContext } from '~/components/shoelace';
import Input from '~/components/Input';
import { fileStorage } from '~/.server/file-uploads';
import { useLoaderData } from 'react-router';

export async function loader() {
  const { files } = await fileStorage.list({ includeMetadata: true });

  return {
    files,
  };
}

export default function MediaIndexRoute() {
  const { SlButton } = useContext(ShoelaceContext);
  const { files } = useLoaderData<typeof loader>();
  const [fileName, setFileName] = useState('');

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fileName = formData.get('filename') as string;
    setFileName(fileName);
  };

  return (
    <div className="space-y-4">
      <Heading level={1}>Media</Heading>

      <ul className="list-none space-y-6">
        {files.map((file) => (
          <li key={file.key} className="flex flex-row items-center gap-2">
            <img
              src={`/afbeelding/${file.name}`}
              alt={file.name}
              className="w-16 h-16 object-cover"
            />
            <div className="flex flex-col">
              <span>{file.name}</span>
              <span className="text-sm text-gray-500">{file.size} bytes</span>
            </div>
          </li>
        ))}
      </ul>

      <form className="space-y-1" onSubmit={onFormSubmit}>
        <Input label="Filename to retrieve" name="filename" type="text" />

        <SlButton type="submit">Retrieve</SlButton>
      </form>

      {fileName ?
        <img
          src={`/afbeelding/${fileName}`}
          alt="Retrieved media"
          className="w-full h-auto"
        />
      : null}
    </div>
  );
}
