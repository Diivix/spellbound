import * as React from 'react';

class Error404Page extends React.Component {
  public render() {
    return (
      <div className="sb-grid sb-center-h sb-center-v">
        <div className="sb-row sb-margin-top-40">
          <div className="sb-col">
            <i style={{ color: '#f21e1a' }} className="ra ra-fire-symbol ra-5x sb-icon sb-icon--circle" />
          </div>
          <div className="sb-col">
            <i style={{ color: '#fcf41b' }} className="ra ra-lightning-bolt ra-5x sb-icon sb-icon--circle" />
          </div>
          <div className="sb-col">
            <i style={{ color: '#24ccd8' }} className="ra ra-snowflake ra-5x sb-icon sb-icon--circle" />
          </div>
        </div>
        <div className="sb-row sb-margin-top-30">
          <div className="sb-col sb-center-text">
            <h2>These are not the spells you're looking for.</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404Page;
