// @flow
import React, {Fragment} from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

import Grid from './Grid';
import Cell from './Cell';

type CellData = {
  name: string,
  infos: string,
  activate: boolean,
};
type List = Array<any>;
type Level = {
  level: number,
  stamp_amount: number,
  reward: string,
};

type Props = {
  levels: Array<Level>,
  stamps: number,
};

type GridDimension = {nRow: number, nColumn: number};

class Stampable extends React.Component<Props> {
  renderCell = (data?: any) => {
    // opportunity to conditionaly render Cells depending on data
    // structure of the cells list passing to Grid component
    return <Cell data={data} />;
  };

  setGridDimensions = (levels: Array<Level>): GridDimension => {
    const nColumn = 5;
    // get the max amount of stamps in all Levels
    const maxAmount = Math.max.apply(Math, levels.map(l => l.stamp_amount));
    // compute rows needed
    let nRow =
      maxAmount % nColumn === 0
        ? Math.floor(maxAmount / nColumn)
        : Math.floor(maxAmount / nColumn) + 1;
    return {
      nRow,
      nColumn,
    };
  };

  isStampChecked = (data: CellData): boolean => data.name === 'check_stamp';

  isLevelComplete = (arr: Array<any>): boolean => {
    return arr.every(this.isStampChecked);
  };

  initArrayWithData = (length: number, data: CellData): List =>
    new Array(length).fill(data);

  computeTotalStampAmount = (levels: Array<Level>): number =>
    levels.reduce((a, b) => a + (b['stamp_amount'] || 0), 0);

  setCellsData = (levels: Array<Level>, stamps: number): Array<List> => {
    // total amount of stamps
    const max_stamps = this.computeTotalStampAmount(levels);
    // initialize data with empty stamps
    const buffer: List = this.initArrayWithData(max_stamps, {
      name: 'empty_stamp',
      infos: '',
      activate: false,
    });

    // initialize data with check stamps
    const all_stamps: List = this.initArrayWithData(stamps, {
      name: 'check_stamp',
      infos: '',
      activate: true,
    });
    // merge check and empty
    buffer.splice(0, all_stamps.length, ...all_stamps);
    // chunk all stamps by level

    let cellsByLevel: Array<List> = levels.map(
      (level: Level): List => {
        let temp: List = buffer.splice(0, level.stamp_amount);
        if (this.isLevelComplete(temp)) {
          // TODO: how do I know if the reward is activate or not
          temp[level.stamp_amount - 1] = {
            name: 'reward',
            infos: level.reward,
            activate: true,
          };
          return temp;
        }

        let check_stamps = temp.filter(data => {
          return data.name === 'check_stamp';
        });

        temp[check_stamps.length] = {
          name: 'add',
          infos: 'action',
          activate: true,
        };

        temp[level.stamp_amount - 1] = {
          name: 'reward',
          infos: 'action',
          activate: false,
        };
        return temp;
      },
    );

    return cellsByLevel;
  };

  renderLevelGrids = (levels: Array<Level>, stamps: number): any => {
    // setGridDimensions according to Levels stamp amount
    // and offset the grid rows for each levels if needed
    const {nRow, nColumn} = this.setGridDimensions(levels);

    // prepare data cells for the Grid
    const cellsByLevel: Array<List> = this.setCellsData(levels, stamps);

    // render all levels grid
    return cellsByLevel.map(
      (cells: Array<string>, index: number): any => {
        return (
          <Fragment key={index.toString()}>
            <Grid
              cells={cells}
              renderCell={this.renderCell}
              nRow={nRow}
              nColumn={nColumn}
            />
          </Fragment>
        );
      },
    );
  };

  render() {
    const {levels, stamps} = this.props;
    return (
      <StampableStyled horizontal={true}>
        {this.renderLevelGrids(levels, stamps)}
      </StampableStyled>
    );
  }
}

const StampableStyled = styled.ScrollView`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

export default Stampable;
