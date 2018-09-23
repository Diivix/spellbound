import * as React from 'react';
import { Icon, InputOnChangeData, Menu } from 'semantic-ui-react';

interface IProps {
  activeItem: string;
  handleItemClick: (e: any, data: InputOnChangeData) => void;
  handleSignOut: () => void;
}

class HeaderComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }
  
  public render() {
    const { activeItem, handleItemClick, handleSignOut } = this.props;
    const menuStyle = { borderRadius: 0 };

    // Note, the name of the menue items must match the route paths!
    return (
      <div>
        <Menu inverted={true} icon={true} color="violet" style={menuStyle}>
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
        </Menu>
      </div>
    );
  }
}

export default HeaderComponent;
