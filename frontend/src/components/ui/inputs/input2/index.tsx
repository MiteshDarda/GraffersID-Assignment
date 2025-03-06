import { FC } from 'react';

interface Input2Props {
  icon: React.ReactNode;
  placeholder?: string;
}

const Input2: FC<Input2Props> = ({ icon, placeholder }) => {
  return (
    <>
      <div className="border-gray-300 border rounded-md flex items-center justify-center w-full">
        <input className="h-full outline-none p-2 w-full" placeholder={placeholder} />
        <span className="pr-2">{icon}</span>
      </div>
    </>
  );
};

export default Input2;
