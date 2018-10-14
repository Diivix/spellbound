import { Icon, Tab, TabId, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { ISelectItem } from '../../models';
import './SpellSidebar.css';

interface IProps {
  handleSortBy: (newTabId: TabId, prevTabId: TabId, event: any) => void;
}

interface IState {
  selectedItems: ISelectItem[];
}

class SpellSidebarComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  public render() {
    return (
      <div className="sidebar">
        <h4>
          <Icon icon="sort-asc" /> Sort by
        </h4>
        <Tabs id="TabsExample" onChange={this.props.handleSortBy} defaultSelectedTabId="name">
          <Tab id="name" title="Name" />
          <Tab id="school" title="School" />
          <Tab id="level" title="Level" />
        </Tabs>

        <h4>
          <Icon icon="filter" /> Filter by
        </h4>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default SpellSidebarComponent;
