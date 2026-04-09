import { FC } from 'react';
import {IoIosArrowDown} from "react-icons/io";
import { DropdownIndicatorProps, GroupBase } from 'react-select';

interface OptionType {
  value: string;
  label: string;
}

export const CustomDropdownIndicator: FC<DropdownIndicatorProps<OptionType, true, GroupBase<OptionType>>> = (props) => {
  return (
    <div {...props.innerProps} style={{ display: 'flex', alignItems: 'center', padding: '0 8px', cursor: 'pointer' }}>
      <IoIosArrowDown
        size={20}
        style={{ color: 'var(--secondary-color)' }}
      />
    </div>
  );
};

