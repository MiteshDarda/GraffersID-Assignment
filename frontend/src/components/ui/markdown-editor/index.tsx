import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState } from 'react';

const MarkdownEditor = ({ initialValue = '', onBlur }: any) => {
  const [value, setValue] = useState<any>(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const blurHandler = () => {
    onBlur(value);
  };

  return (
    <div className="w-full h-full p-2">
      <MDEditor
        height={'100%'}
        value={value}
        onChange={setValue}
        onBlur={blurHandler}
        style={{ width: '100%', height: '100%', whiteSpace: 'pre-wrap' }}
        preview="edit"
      />
    </div>
  );
};

export default MarkdownEditor;
