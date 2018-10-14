import { Button, Intent, ITagProps, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, MultiSelect } from '@blueprintjs/select';
import * as React from 'react';
import { IDropdownCollection } from '../../models';

const INTENTS = [Intent.NONE, Intent.PRIMARY, Intent.SUCCESS, Intent.DANGER, Intent.WARNING];

interface IProps {
  id?: string;
  type: string;
  addFilter: ((type: string, filter: IDropdownCollection) => void);
  items: IDropdownCollection[];
  placeholder: string;
  selectedItems: IDropdownCollection[]
}

interface IState {
  selectedItems: IDropdownCollection[];
}

/**
 * This code is heavily based o the MultiSelect example:
 * https://github.com/palantir/blueprint/blob/develop/packages/docs-app/src/examples/select-examples/multiSelectExample.tsx
 */
class DropdownMultiSelectComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: [...this.props.selectedItems]
    };
  }

  public render() {
    const { items } = this.props;
    const { selectedItems } = this.state;

    const getTagProps = (value: string, index: number): ITagProps => ({
      intent: INTENTS[index % INTENTS.length],
      minimal: true
    });

    const itemSelectProps = {
      itemPredicate: this.filterItem,
      itemRenderer: this.renderListItem,
      items,
    };

    const ItemSelect = MultiSelect.ofType<IDropdownCollection>();
    const clearButton = selectedItems.length > 0 ? <Button icon="cross" minimal={true} onClick={this.handleClear} /> : undefined;

    return (
      <ItemSelect
        {...itemSelectProps}
        items={items}
        itemRenderer={this.renderListItem}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={this.handleItemSelect}
        popoverProps={{ minimal: false }}
        tagRenderer={this.renderTag}
        tagInputProps={{ tagProps: getTagProps, onRemove: this.handleTagRemove, rightElement: clearButton }}
        selectedItems={this.state.selectedItems}
        resetOnSelect={false}
        placeholder={this.props.placeholder}
      />
    );
  }

  private renderTag = (item: IDropdownCollection) => item.value;

  private renderListItem: ItemRenderer<IDropdownCollection> = (item, { modifiers, handleClick }) => {
    if (!modifiers.matchesPredicate) {
      return null;
    }
    return (
      <MenuItem
        active={modifiers.active}
        icon={this.isItemSelected(item) ? 'tick' : 'blank'}
        key={item.key}
        onClick={handleClick}
        text={item.value}
        shouldDismissPopover={true}
      />
    );
  };

  private filterItem: ItemPredicate<IDropdownCollection> = (query, item) => {
    return `${item.value}`.indexOf(query.toLowerCase()) >= 0;
  };

  private handleTagRemove = (tag: string, index: number) => {
    this.deselectItem(index);
  };

  private getSelectedItemIndex(item: IDropdownCollection) {
    return this.state.selectedItems.findIndex(x => x.key === item.key)
  }

  private isItemSelected(item: IDropdownCollection) {
    return this.getSelectedItemIndex(item) !== -1;
  }

  private selectItem(item: IDropdownCollection) {
    this.setState({ selectedItems: [...this.state.selectedItems, item] });
    this.props.addFilter(this.props.type, item);
  }

  private deselectItem(index: number) {
    this.setState({ selectedItems: this.state.selectedItems.filter((item, i) => i !== index) });
    this.props.addFilter(this.props.type, { key: '', value: '' });
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
    this.props.addFilter(this.props.type, { key: '', value: '' });
  };
}

export default DropdownMultiSelectComponent;
