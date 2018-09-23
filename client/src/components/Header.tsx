// import { Icon, InputOnChangeData, Menu } from 'semantic-ui-react';
import { Alignment, Button, Colors, Icon, Navbar } from '@blueprintjs/core';
import * as React from 'react';

interface IProps {
  activeItem: string;
  handleItemClick: (event: any) => void;
  handleSignOut: () => void;
}

class HeaderComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { activeItem, handleItemClick, handleSignOut } = this.props;
    // const menuStyle = { borderRadius: 0 };
    const headerStyle = { backgroundColor: '#6442c3', color: '#FFFFFF' };
    const headerIconStyle = { color: '#FFFFFF', paddingRight: '5px' };
    const colourStyle = { color: '#FFFFFF' };

    // Note, the name of the menue items must match the route paths!
    return (
      <div>
        {/* <Menu inverted={true} icon={true} color="violet" style={menuStyle}>
          <Menu.Item name="home" onClick={handleItemClick}>
            <Icon name="book" size="large" link={true} />
            SpellBound
          </Menu.Item>
          <Menu.Item name="characters" active={activeItem === 'characters'} onClick={handleItemClick}>
            <Icon name="users" />
          </Menu.Item>
          <Menu.Item name="spells" active={activeItem === 'spells'} onClick={handleItemClick}>
            <Icon name="book" size="large" />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item name="auth" onClick={handleSignOut}>
              <Icon inverted={true} name="log out" size="large" />
              {'Sign Out'}
            </Menu.Item>
          </Menu.Menu>
        </Menu> */}
        <Navbar fixedToTop={false} style={headerStyle}>
          <Navbar.Group align={Alignment.LEFT}>
            <i className="ra ra-scroll-unfurled ra-lg" style={headerIconStyle} />
            <Navbar.Heading>SpellBound</Navbar.Heading>
            <Navbar.Divider />
            <Button
              name="home"
              className="bp3-minimal"
              style={colourStyle}
              text="Home"
              icon={<Icon icon="home" color={Colors.WHITE} />}
              onClick={handleItemClick}
              active={activeItem === 'home'}
            />
            <Button
              name="characters"
              className="bp3-minimal"
              style={colourStyle}
              text="Characters"
              icon={<Icon icon="people" color={Colors.WHITE} onClick={handleItemClick} />}
              active={activeItem === 'characters'}
            />
            <Button
              name="spells"
              className="bp3-minimal"
              style={colourStyle}
              text="Spells"
              icon={<Icon icon="book" color={Colors.WHITE} />}
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

export default HeaderComponent;
