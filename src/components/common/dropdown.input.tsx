import Input, { InputProps } from '@/components/common/input';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

export interface DropdownInputProps extends InputProps {
  value: string;
  dropdownOptions: string[];
  children?: React.ReactNode;
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  t?: (key: string) => string;
}

const DropdownItem = ({
  name,
  option,
  setShow,
  onChange,
  t,
}: {
  name: string;
  option: string;
  setShow: (show: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t?: (key: string) => string;
}) => (
  <div
    className='cursor-pointer rounded-md border border-stroke p-2 transition-colors duration-200 ease-in-out hover:border-stroke-secondary'
    onClick={() => {
      if (onChange) {
        onChange({
          target: {
            name,
            value: option,
          },
        } as ChangeEvent<HTMLInputElement>);
      }
      setShow(false);
    }}
  >
    {t ? t(option) : option}
  </div>
);

const DropdownItems = ({
  name,
  dropdownOptions,
  setShow,
  onChange,
  t,
}: {
  name: string;
  dropdownOptions: string[];
  setShow: (show: boolean) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  t?: (key: string) => string;
}) => (
  <div className='absolute z-50 mt-2 flex w-full flex-col gap-2 rounded-lg border border-stroke bg-primary p-2'>
    {dropdownOptions.map((option, index) => (
      <DropdownItem
        key={index}
        name={name}
        option={option}
        setShow={setShow}
        onChange={onChange}
        t={t}
      />
    ))}
  </div>
);

const DropdownInput = ({
  id,
  name,
  type,
  placeholder,
  errors,
  addClass,
  value,
  onChange,
  children,
  t,
  ...props
}: DropdownInputProps) => {
  const [show, setShow] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    props.setShow ? props.setShow((prev) => !prev) : setShow((prev) => !prev);
  };

  // close if clicked outside
  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (
        (props.show || show) &&
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        props.setShow ? props.setShow(false) : setShow(false);
      }
    };

    document.addEventListener('mousedown', checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, [props, show]);

  return (
    <div className='relative w-full' ref={ref}>
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={t ? t(value) : value}
        addClass={`!max-w-none !w-full ${addClass}`}
        required={true}
        readOnly={true}
        errors={errors}
        dropDownButton={handleClick}
        {...props}
      />
      <div>
        {(props.show ?? show) &&
          (children ?? (
            <DropdownItems
              name={name}
              dropdownOptions={props.dropdownOptions}
              setShow={props.setShow ?? setShow}
              onChange={onChange}
              t={t}
            />
          ))}
      </div>
    </div>
  );
};

export default DropdownInput;
