// @flow
import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import styled from '@emotion/native';
import Slider from './Swiper';

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

    all_stamps.push({
      name: 'add',
      infos: 'action',
      activate: true,
    });

    // merge check and empty
    buffer.splice(0, all_stamps.length, ...all_stamps);

    // chunk all stamps by level
    let cellsByLevel: Array<List> = levels.map(
      (level: Level): List => {
        let chunk: List = buffer.splice(0, level.stamp_amount);
        if (this.isLevelComplete(chunk)) {
          // TODO: how do I know if the reward is activate or not
          chunk[level.stamp_amount - 1] = {
            name: 'reward',
            infos: level.reward,
            activate: true,
          };
          return chunk;
        }

        if (chunk[level.stamp_amount - 1].name === 'add') {
          chunk[level.stamp_amount - 1].isLast = true;
          return chunk;
        }

        chunk[level.stamp_amount - 1] = {
          name: 'reward',
          infos: level.reward,
          activate: false,
        };
        return chunk;
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

  setSlides = (levels: Array<Level>, stamps: number): any => {
    // setGridDimensions according to Levels stamp amount
    // and offset the grid rows for each levels if needed
    const {nRow, nColumn} = this.setGridDimensions(levels);

    // prepare data cells for the Grid
    const cellsByLevel: Array<List> = this.setCellsData(levels, stamps);

    // render all levels grid
    const grids = cellsByLevel.map(
      (cells: Array<string>): any => {
        return (
          <Grid
            cells={cells}
            renderCell={this.renderCell}
            nRow={nRow}
            nColumn={nColumn}
          />
        );
      },
    );

    const slides = grids.map((grid, index) => {
      return {
        content: () => grid,
        delayedContent: () => <Text>{`Level ${index + 1}`}</Text>,
      };
    });

    return slides;
  };

  renderContent = (Component: any) => {
    return (
      <Content>
        <Component />
      </Content>
    );
  };

  renderDelayedContent = (Component: any) => (
    <DelayedContent>
      <Component />
    </DelayedContent>
  );

  render() {
    const {levels, stamps} = this.props;
    console.log('render');
    return (
      <StampableStyled>
        <Slider
          slides={this.setSlides(levels, stamps)}
          renderContent={this.renderContent}
          renderDelayedContent={() => null}
          delayFactor={0.3}
          triggeringThreshold={0}
        />
      </StampableStyled>
    );
  }
}

const Content = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const DelayedContent = styled.View`
  top: 100px;

  align-items: center;
  justify-content: center;
`;

const StampableStyled = styled.View`
  display: flex;
  flex: 1;
  flex-direction: row;
`;

export default Stampable;
