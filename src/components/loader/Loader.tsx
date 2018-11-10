import React from 'react';
import './Loader.css';

export function Loader() {
  return (
    <div className="assembly">
      <div className="cube" />
      <div className="cube" />
      <div className="cube" />
      <div className="cube" />
      <div className="cube" />
      <div className="switch--out">
        <div className="mover">
          <div className="switch--in">
            <div className="cube" />
          </div>
        </div>
      </div>
      <div className="switch--out">
        <div className="mover">
          <div className="switch--in">
            <div className="cube" />
          </div>
        </div>
      </div>
      <div className="switch--out">
        <div className="mover">
          <div className="switch--in">
            <div className="cube" />
          </div>
        </div>
      </div>
      <div className="switch--out">
        <div className="mover">
          <div className="switch--in">
            <div className="cube" />
          </div>
        </div>
      </div>
      <div className="switch--out">
        <div className="mover">
          <div className="switch--in">
            <div className="cube" />
          </div>
        </div>
      </div>
    </div>
  );
}
