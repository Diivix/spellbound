import * as React from 'react';
import { Menu, Responsive } from 'semantic-ui-react';

class SpellSortMenuComponent extends React.Component{

  public render() {
    return (
      <Responsive as={Menu} borderless={true} pointing={true} secondary={true} stackable={true} minWidth={Responsive.onlyTablet.minWidth}>
        {this.props.children}
      </Responsive>
    );
  }
}

export default SpellSortMenuComponent;
