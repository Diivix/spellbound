import React from "react";
import './Logo.css';

interface IProps {
  scale: number,
  primaryColour: string,
  secondaryColour: string
}

export function Logo(props: IProps) {
  return (
    <div className="logo" style={{transform: `scale(${props!.scale})`}}>
      <div className="sphere" style={{background: props.primaryColour}}>
        <div className="negative-sphere" style={{background: props.secondaryColour}}>
          <div className="inner-sphere" style={{background: props.secondaryColour}}/>
        </div>
      </div>
    </div>
  );
}
