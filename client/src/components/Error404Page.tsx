import * as React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

class Error404Page extends React.Component {
  public render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={1} textAlign="center" verticalAlign="middle">
            <Grid.Column>
              <Header as="h1" color="grey">
                404
                <Header.Subheader>These are not the spells you're looking for.</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={3}>
            <Grid.Column textAlign="right" width={7}>
              <Icon name="snowflake outline" size="huge" color="teal" circular={true} />
            </Grid.Column>
            <Grid.Column textAlign="center" width={2}>
              <Icon name="fire" size="huge" color="red" circular={true} />
            </Grid.Column>
            <Grid.Column textAlign="left" width={7}>
              <Icon name="lightning" size="huge" color="yellow" circular={true} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Error404Page;
