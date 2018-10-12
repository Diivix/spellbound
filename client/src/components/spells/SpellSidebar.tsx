import { FormGroup, Icon, Tab, TabId, Tabs } from '@blueprintjs/core';
import * as React from 'react';
import { IDropdownCollection, IFilters } from '../../models';
import DropdownMultiSelect from './DropdownMultiSelect';
import './SpellSidebar.css';

interface IProps {
  addFilterFromEvent: (type: string, value: string) => void;
  namesFilters: IDropdownCollection[];
  classTypesFilters: IDropdownCollection[];
  schoolsFilters: IDropdownCollection[];
  componentsFilters: IDropdownCollection[];
  rangesFilters: IDropdownCollection[];
  filters: IFilters;
  handleSortBy: (newTabId: TabId, prevTabId: TabId, event: any) => void;
}

interface IState {
  selectedItems: IDropdownCollection[];
}

class SpellSidebarComponent extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedItems: []
    };
  }

  public render() {
    const { namesFilters, classTypesFilters, componentsFilters, rangesFilters, schoolsFilters } = this.props;

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
          <Icon icon="sort-asc" /> Filter by
        </h4>
        <div>
          <FormGroup label="Names" labelFor="names-dropdown">
            {/* FIXME: The types should be changed to an enum. They must match the IFilter property names exactly */}
            <DropdownMultiSelect
              id="names-dropdown"
              className="dropdown"
              type="names"
              items={namesFilters}
              addFilter={this.props.addFilterFromEvent}
              placeholder="Names..."
            />
          </FormGroup>
          <FormGroup label="Classes" labelFor="classtypes-dropdown">
            <DropdownMultiSelect
              id="classtypes-dropdown"
              className="dropdown"
              type="classTypes"
              items={classTypesFilters}
              addFilter={this.props.addFilterFromEvent}
              placeholder="Classes..."
            />
          </FormGroup>
          <FormGroup label="Schools" labelFor="schools-dropdown">
            <DropdownMultiSelect
              id="schools-dropdown"
              className="dropdown"
              type="schools"
              items={schoolsFilters}
              addFilter={this.props.addFilterFromEvent}
              placeholder="Schools..."
            />
          </FormGroup>
          <FormGroup label="Components" labelFor="components-dropdown">
            <DropdownMultiSelect
              id="components-dropdown"
              className="dropdown"
              type="components"
              items={componentsFilters}
              addFilter={this.props.addFilterFromEvent}
              placeholder="Components..."
            />
          </FormGroup>
          <FormGroup label="Range" labelFor="ranges-dropdown">
            <DropdownMultiSelect
              id="ranges-dropdown"
              className="dropdown"
              type="ranges"
              items={rangesFilters}
              addFilter={this.props.addFilterFromEvent}
              placeholder="Range..."
            />
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default SpellSidebarComponent;
