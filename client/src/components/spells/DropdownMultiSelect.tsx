import { Button, Intent, ITagProps, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import * as React from 'react';
import { IDropdownCollection } from '../../models';
import './SpellSidebar.css';

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

interface IProps {
  id?: string;
  className?: string;
  type: string;
  addFilter: ((name: string, value: string) => void);
  items: IDropdownCollection[];
  placeholder: string;
}

interface IState {
  selectedItems: IDropdownCollection[];
}

class DropdownMultiSelectComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  public render() {
    const { items, className } = this.props;
    const { selectedItems } = this.state;

    const getTagProps = (value: string, index: number): ITagProps => ({
      intent: INTENTS[index % INTENTS.length],
      minimal: true
    });

    const ItemSelect = MultiSelect.ofType<IDropdownCollection>();
    const clearButton = selectedItems.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

    return (
      <ItemSelect
        className={className}
        items={items}
        // initialContent={null}
        itemRenderer={this.renderItem}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={this.handleItemSelect}
        popoverProps={{ minimal: true }}
        tagRenderer={this.renderTag}
        tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
        selectedItems={this.state.selectedItems}
        placeholder={this.props.placeholder}
      />
    );
  }

  private renderTag = (item: IDropdownCollection) => item.text;

  private renderItem: ItemRenderer<IDropdownCollection> = (item, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isItemSelected(item) ? 'tick' : 'blank'}
        key={item.key}
        onClick={handleClick}
        text={item.text}
        shouldDismissPopover={true}
      />
    );
  };

  private handleTagRemove = (tag: string, index: number) => {
    this.deselectItem(index);
  };

  private getSelectedItemIndex(item: IDropdownCollection) {
    return this.state.selectedItems.indexOf(item);
  }

  private isItemSelected(item: IDropdownCollection) {
    return this.getSelectedItemIndex(item) !== -1;
  }

  private selectItem(item: IDropdownCollection) {
    this.setState({ selectedItems: [...this.state.selectedItems, item] });
    this.props.addFilter(this.props.type, item.value);
  }

  private deselectItem(index: number) {
    this.setState({ selectedItems: this.state.selectedItems.filter((item, i) => i !== index) });
    this.props.addFilter(this.props.type, '');
  }

  private handleItemSelect = (item: IDropdownCollection) => {
    if (!this.isItemSelected(item)) {
      this.selectItem(item);
    } else {
      this.deselectItem(this.getSelectedItemIndex(item));
    }
  };

  private handleClear = () => {
    this.setState({ selectedItems: [] });
    this.props.addFilter(this.props.type, '');
  }
}

export default DropdownMultiSelectComponent;
