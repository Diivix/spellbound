import * as React from 'react';
import { Dropdown, DropdownProps, Menu, Responsive } from 'semantic-ui-react';
import { IDropdownCollection, IFilters } from '../../models';

interface IProps {
  addFilterFromEvent: ((event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => void);
  // tslint:disable-next-line:ban-types
  // addFilterFromEvent: Function;

  namesFilters: IDropdownCollection[];
  classTypesFilters: IDropdownCollection[];
  schoolsFilters: IDropdownCollection[];
  componentsFilters: IDropdownCollection[];
  rangesFilters: IDropdownCollection[];
  filters: IFilters;
}

class SpellFilterMenuComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { addFilterFromEvent, namesFilters, classTypesFilters, schoolsFilters, componentsFilters, rangesFilters, filters } = this.props;

    return (
      <Responsive as={Menu} vertical={true} floated={true} borderless={true} minWidth={Responsive.onlyTablet.minWidth}>
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

export default SpellFilterMenuComponent;
