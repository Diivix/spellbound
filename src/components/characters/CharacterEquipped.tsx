import _ from 'lodash';
import * as React from 'react';
import { isNull } from 'util';

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
             {isNull(this.props.cards) || this.props.cards.length === 0 ? (
              <div className="sb-grid sb-center-h sb-center-v">
                <div className="sb-row sb-margin-top-30">
                  <div className="sb-col">
                    <i className="ra ra-lightning-storm ra-5x sb-icon sb-icon--circle" />
                  </div>
                </div>
                <div className="sb-row sb-margin-top-30">
                  <div className="sb-col sb-center-text">
                    <p>No spells have been equipped.</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="sb-card-group">{this.props.cards} </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterEquippedComponent;
