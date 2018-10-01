import { Tab, TabId, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { Dropdown, DropdownProps, Menu, Responsive } from 'semantic-ui-react';
import { IDropdownCollection, IFilters } from '../../models';

interface IProps {
  addFilterFromEvent: ((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void);
  namesFilters: IDropdownCollection[];
  classTypesFilters: IDropdownCollection[];
  schoolsFilters: IDropdownCollection[];
  componentsFilters: IDropdownCollection[];
  rangesFilters: IDropdownCollection[];
  filters: IFilters;
  handleSortBy: (newTabId: TabId, prevTabId: TabId, event: any) => void;
}

class SpellSidebarComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { addFilterFromEvent, namesFilters, classTypesFilters, schoolsFilters, componentsFilters, rangesFilters, filters } = this.props;

    return (
      <Responsive as={Menu} vertical={true} floated={true} borderless={true} minWidth={Responsive.onlyTablet.minWidth}>
        <Menu.Item name="Sort By" icon="arrow" style={{ color: '#6342c3' }} />
        <Tabs id="TabsExample" onChange={this.props.handleSortBy} defaultSelectedTabId="name">
          <Tab id="name" title="Name" />
          <Tab id="school" title="School" />
          <Tab id="level" title="Level" />
        </Tabs>
        <Menu.Item name="Filters" icon="filter" style={{ color: '#6342c3' }} />
        <Menu.Item>
          <Dropdown
            fluid={true}
            multiple={true}
            selection={true}
            search={true}
            closeOnChange={true}
            minCharacters={1}
            placeholder="By Name..."
            onChange={addFilterFromEvent}
            options={namesFilters}
            name="names"
            value={filters.names}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid={true}
            multiple={true}
            selection={true}
            search={true}
            closeOnChange={true}
            name="classTypes"
            placeholder="Classes"
            options={classTypesFilters}
            onChange={addFilterFromEvent}
            value={filters.classTypes}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid={true}
            multiple={true}
            selection={true}
            search={true}
            closeOnChange={true}
            name="schools"
            placeholder="Schools"
            options={schoolsFilters}
            onChange={addFilterFromEvent}
            value={filters.schools}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid={true}
            multiple={true}
            selection={true}
            search={true}
            closeOnChange={true}
            name="components"
            placeholder="Components"
            options={componentsFilters}
            onChange={addFilterFromEvent}
            value={filters.components}
          />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            fluid={true}
            multiple={true}
            selection={true}
            search={true}
            closeOnChange={true}
            name="ranges"
            placeholder="Range"
            options={rangesFilters}
            onChange={addFilterFromEvent}
            value={filters.ranges}
          />
        </Menu.Item>
      </Responsive>
    );
  }
}

export default SpellSidebarComponent;
