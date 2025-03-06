import { FC, useState } from 'react';
import ErrorCatcher from '../../error-catcher';

interface TabsProps {
  tabs: { title: string; content: JSX.Element }[];
  initialTab?: number;
}

const Tabs: FC<TabsProps> = ({ tabs, initialTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <>
      <ErrorCatcher>
        <div className="w-full grow h-full">
          <div className="flex">
            {tabs.map((tab, index) => (
              <div
                key={index}
                style={{
                  borderRadius: `${index === 0 ? '8px 0 0 0' : index === tabs.length - 1 ? '0 8px 0 0' : '0'}`
                }}
                className={`cursor-pointer w-full p-2 px-4 ${activeTab === index ? 'bg-gray-100 underline' : 'bg-gray-200 hover:bg-gray-300 '}`}
                onClick={() => setActiveTab(index)}>
                {tab.title}
              </div>
            ))}
          </div>
          <div
            style={{
              borderRadius: `0 0 8px 8px`
            }}
            className=" bg-gray-100 h-full grow">
            {tabs[activeTab].content}
          </div>
        </div>
      </ErrorCatcher>
    </>
  );
};

export default Tabs;
