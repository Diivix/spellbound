// import { Icon, InputOnChangeData, Menu } from 'semantic-ui-react';
import { Alignment, Button, Colors, Icon, Navbar } from '@blueprintjs/core';
import * as React from 'react';
import { primaryColour } from 'utils/ui';

interface IProps {
  activeItem: string;
  handleItemClick: (event: any) => void;
  handleSignOut: () => void;
}

class NavbarComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { activeItem, handleItemClick, handleSignOut } = this.props;
    // TODO: Move these to css file.
    const headerStyle = { backgroundColor: primaryColour, color: '#FFFFFF' };
    const colourStyle = { color: '#FFFFFF' };

    // Note, the name of the buttons must match the route paths!
    return (
      <div className="header">
        <Navbar fixedToTop={false} style={headerStyle}>
          <Navbar.Group align={Alignment.LEFT}>
            {/* <div>
              <Logo scale={0.1} primaryColour={backgroundColour} secondaryColour={primaryColour} />
            </div> */}
            <Navbar.Heading>Spellbound</Navbar.Heading>
            <Navbar.Divider />
            <Button
              name="characters"
              className="bp3-minimal"
              style={colourStyle}
              text="Characters"
              icon={<Icon icon="people" color={Colors.WHITE} />}
              onClick={handleItemClick}
              active={activeItem === 'characters'}
            />
            <Button
              name="spells"
              className="bp3-minimal"
              style={colourStyle}
              text="Spells"
              icon={<Icon icon="flame" color={Colors.WHITE} />}
              onClick={handleItemClick}
              active={activeItem === 'spells'}
            />
          </Navbar.Group>
          <Navbar.Group align={Alignment.RIGHT}>
            <Button
              name="logout"
              className="bp3-minimal"
              style={colourStyle}
              text="Logout"
              icon={<Icon icon="log-out" color={Colors.WHITE} />}
              onClick={handleSignOut}
            />
          </Navbar.Group>
        </Navbar>
      </div>
    );
  }
}

export default NavbarComponent;
