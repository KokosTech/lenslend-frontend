import { IconCopy } from '@tabler/icons-react';

type CopyButtonProps = {
  text: string;
  className?: string;
};

const CopyButton = ({ text, className }: CopyButtonProps) => {
  const handleCopy = () => {
    navigator?.clipboard
      .writeText(text)
      .then((r) => console.log(r))
      .catch((e) => console.log(e));
  };

  return (
    <button
      onClick={handleCopy}
      type={'button'}
      className={
        className ??
        'absolute bottom-2 right-2 rounded px-4 py-2 font-bold transition-colors duration-200 ease-in-out hover:text-blue/75'
      }
    >
      <IconCopy size={24} />
    </button>
  );
};

export default CopyButton;
