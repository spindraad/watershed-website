import { FormEvent, useContext, useState } from 'react';
import Heading from '~/components/Heading';
import { ShoelaceContext } from '~/components/shoelace';
import Input from '~/components/Input';

export default function MediaIndexRoute() {
  const { SlButton } = useContext(ShoelaceContext);

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
