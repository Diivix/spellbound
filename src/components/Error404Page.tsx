import * as React from 'react';

class Error404Page extends React.Component {
  public render() {
    return (
      <div className="sb-container sb-container--row-center sb-container--mt5">
        <div className="sb-container--column-center">
          <div>
            <i style={{ color: '#f21e1a' }} className="ra ra-fire-symbol ra-5x sb-icon sb-icon--circle" />
            <i style={{ color: '#fcf41b' }} className="ra ra-lightning-bolt ra-5x sb-icon sb-icon--circle" />
            <i style={{ color: '#24ccd8' }} className="ra ra-snowflake ra-5x sb-icon sb-icon--circle" />
          </div>
          <h2 className="mt5">These are not the spells you're looking for.</h2>
        </div>
      </div>
    );
  }
}

export default Error404Page;
