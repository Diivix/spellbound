import * as React from 'react';

class Error404Page extends React.Component {
  public render() {
    return (
      <div className="sb-grid sb-center-h sb-center-v" style={{ marginTop: '5%' }}>
        <div className="sb-row">
          <div className="sb-col">
            <i style={{ color: '#f21e1a' }} className="ra ra-fire-symbol ra-5x sb-icon sb-icon--circle" />
          </div>
          <div className="sb-col">
            <i style={{ color: '#fcf41b' }} className="ra ra-lightning-bolt ra-5x sb-icon sb-icon--circle" />
          </div>
          <div className="sb-col">
            <i style={{ color: '#24ccd8' }} className="ra ra-snowflake ra-5x sb-icon sb-icon--circle" />
          </div>
          <div className="sb-row">
            <div className="sb-col">
              <h2>These are not the spells you're looking for.</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Error404Page;
