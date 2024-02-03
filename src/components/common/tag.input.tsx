'use client';

import { isEmpty } from 'lodash';
import { IconX } from '@tabler/icons-react';
import { ChangeEvent, KeyboardEvent, useState } from 'react';
import CopyButton from '@/components/common/buttons/copyButton';

type TagInputProps = {
  placeholder?: string;
  tags: string[];
  handleAddTag: (tag: string) => void;
  handleRemoveTag: (tag: string) => void;
};

const TagInput = ({
  placeholder,
  tags,
  handleAddTag,
  handleRemoveTag,
}: TagInputProps) => {
  const [tagText, setTagText] = useState<string>('');

  const handleTagTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTagText(e.target.value);

    if (!e.target.value.includes(',')) return;

    const tags = e.target.value.split(',');
    tags.map((tag) => handleAddTag(tag));
    setTagText('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();

    if (e.key === 'Enter') {
      e.preventDefault();

      const input = e.target as HTMLInputElement;
      const tag = input.value
        .replace(',', '')
        .replace(/[^a-zA-Z0-9]/g, '')
        .trim();

      if (isEmpty(tag)) return;
      handleAddTag(tag);

      setTagText('');
      input.value = '';
    } else if (e.key === 'Backspace' && isEmpty(tagText)) {
      e.preventDefault();

      const tagToRemove = tags[tags.length - 1];
      setTagText(tagToRemove);
      handleRemoveTag(tagToRemove);
    }
  };

  return (
    <div
      className={
        'relative flex w-full flex-wrap items-start justify-start gap-2 rounded-lg border border-stroke p-2 text-text-secondary'
      }
    >
      {tags.map((tag) => (
        <Tag key={tag} tag={tag} handleRemoveTag={handleRemoveTag} />
      ))}
      <input
        type='text'
        value={tagText}
        onChange={handleTagTextChange}
        placeholder={tags.length === 0 ? `  ${placeholder}` : ''}
        onKeyDown={handleKeyDown}
        className='h-10 grow bg-transparent text-text-secondary outline-none'
      />
      <CopyButton text={`${tags.join(',')},`} />
    </div>
  );
};

type TagProps = {
  tag: string;
  handleRemoveTag: (tag: string) => void;
};

const Tag = ({ tag, handleRemoveTag }: TagProps) => (
  <div
    key={tag}
    className={
      'flex items-center justify-center gap-2 rounded-lg border border-stroke px-3 py-2 text-text-secondary transition-colors hover:border-stroke-secondary'
    }
  >
    {tag}
    <button
      onClick={() => {
        handleRemoveTag(tag);
      }}
      type={'button'}
    >
      <IconX
        size={16}
        className='text-text-secondary transition-colors hover:text-blue'
      />
    </button>
  </div>
);

export default TagInput;
