import _ from 'lodash';
import * as React from 'react';

interface IProps {
  heading: string;
  cards: JSX.Element[] | null;
}

class CharacterEquippedComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const heading = _.startCase(this.props.heading);

    return (
      <div className="sb-grid sb-center-h sb-center-v sb-center-text">
        <div className="sb-row">
          <div className="sb-col">
            <h2>{heading}</h2>
          </div>
        </div>
        <div className="sb-row">
          <div className="sb-col">
            <div className="sb-card-group">{this.props.cards} </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterEquippedComponent;
