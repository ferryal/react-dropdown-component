import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import { Dropdown } from '../src';

const meta: Meta = {
  title: 'Dropdown',
  component: Dropdown,
  argTypes: {
    options: {
      control: false,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const options = [
  {
    id: 1,
    value: '1',
    label: 'Option 1',
  },
  {
    id: 2,
    value: '2',
    label: 'Option with Icon',
  },
  {
    id: 3,
    value: '3',
    label: 'Long Long Option 3',
  },
  {
    id: 4,
    value: '4',
    label: 'Long Long Long Option 4',
  },
  {
    id: 5,
    value: '5',
    label: 'Long Long Long Long Option 5',
  },
  {
    id: 6,
    value: '6',
    label: 'Long Long Long Long Long Option 6',
  },
  {
    id: 7,
    value: '7',
    label: 'Long Long Long Long Long Long Option 7',
  },
  {
    id: 8,
    value: '8',
    label: 'Long Long Long Long Long Long Option 8',
  },
];

const newOptions = [
  {
    id: 9,
    value: '9',
    label: 'Option 9',
  },
  {
    id: 10,
    value: '10',
    label: 'Option 10',
  },
  {
    id: 11,
    value: '11',
    label: 'Option 11',
  },
  {
    id: 12,
    value: '12',
    label: 'Option 12',
  },
];

const Template: Story = (args) => {
  const [selectedOption, setSelectedOptions] = useState([]);
  const [option, setOption] = useState(options || []);
  const [loadmore, setLoadmore] = useState(false);

  return (
    <div>
      <pre>{JSON.stringify(selectedOption)}</pre>
      <Dropdown
        label={args.label}
        options={option}
        onSelect={setSelectedOptions}
        isLastPage={loadmore}
        disabled={args.disabled}
        outlined={args.outlined}
        required={args.required}
        isError={args.isError}
        withSearch={args.withSearch}
        multiple={args.multiple}
        errorMessage={args.errorMessage}
        value={selectedOption}
        onScroll={(inView) => {
          if (inView) {
            const concatArr = option.concat(newOptions);
            setOption(concatArr);
            setLoadmore(true);
          }
        }}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Label Dropdown',
  disabled: false,
  required: false,
  isError: false,
  withSearch: true,
  outlined: true,
  multiple: true,
  errorMessage: 'errorMessage',
};
