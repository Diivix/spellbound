import * as React from 'react';
import { Menu, Responsive } from 'semantic-ui-react';

class CompendiumMenu extends React.Component{
  public render() {
    return (
      <Responsive as={Menu} borderless={true} pointing={true} secondary={true} stackable={true} minWidth={Responsive.onlyTablet.minWidth}>
        {this.props.children}
      </Responsive>
    );
  }
}

export default CompendiumMenu;
