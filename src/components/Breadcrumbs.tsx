import { Breadcrumbs, IBreadcrumbProps } from '@blueprintjs/core';
import * as React from 'react';

interface IProps {
  items: IBreadcrumbProps[];
}

// This component shoudl only appear on container components. 
// The onClick method should be used over the href property for IBreadcrumbProps items for better use with react-router and redux.
class BreadcrumbsComponent extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    // Note, the name of the buttons must match the route paths!
    return (
      <div className="sb-breadcrumbs">
        <Breadcrumbs items={this.props.items} />
      </div>
    );
  }
}

export default BreadcrumbsComponent;
