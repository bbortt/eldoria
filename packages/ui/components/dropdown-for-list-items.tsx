import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import DefaultButton from './default-button';
import styles from './dropdown-for-list-items.module.css';

export interface ItemType {
  label: string;
}

export interface DrowdownForListItemsProps {
  ariaLabel: string;
  label: string;
  items: ItemType[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSelectionChange: (selectedItem: any) => void;
}

export const DrowdownForListItems: React.FC<DrowdownForListItemsProps> = ({ ariaLabel, items, label, onSelectionChange }) => {
  return (
    <Dropdown className={styles.dropdown}>
      <DropdownTrigger>
        <DefaultButton className="transition-transform" color="secondary">
          {label}
        </DefaultButton>
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        variant="flat"
        disallowEmptySelection
        items={items}
        onSelectionChange={onSelectionChange}
        selectionMode="single"
      >
        {item => (
          <DropdownItem key={item.label} color="default">
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DrowdownForListItems;
