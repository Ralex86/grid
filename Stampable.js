// @flow
import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

import Grid from './Grid';
import Cell from './Cell';

type Levels = Array<{
  level: number,
  stamp_amount: number,
  reward: string,
}>;

type Props = {
  levels: Levels,
};

class Stampable extends React.Component<Props> {
  renderCell = (data: any) => {
    if (data !== null) {
      return <Cell cellType={data} />;
    }
    return <Cell cellType="default" />;
  };

  setCells = (levels: Levels) => {
    return;
  };

  render() {
    const cells = new Array(15).fill('empty');
    const stamps = new Array(1).fill('check');
    cells.splice(0, stamps.length, ...stamps);
    cells.splice(stamps.length + 1, 'add');
    cells.splice(stamps.length, 'gift');
    return (
      <StampableStyled>
        <Grid cells={cells} renderCell={this.renderCell} nRow={3} nColumn={5} />
      </StampableStyled>
    );
  }
}

const StampableStyled = styled.View``;

export default Stampable;
