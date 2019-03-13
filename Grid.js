// @flow
import React, {Fragment} from 'react';
import styled from '@emotion/native';

type Props = {
  nRow: number,
  nColumn: number,
  renderCell: Function,
};

type Matrix = Array<Array<any>>;
type List = Array<any>;

class Grid extends React.Component<Props> {
  initGrid = (list: List, nColumn: number, nRow: number): Matrix => {
    var matrix = [];
    for (let i = 0; i < list.length; i += nColumn) {
      let row = new Array(nColumn).fill(null);
      let chunk = list.slice(i, i + nColumn);
      row.splice(0, chunk.length, ...chunk);
      matrix.push(row);
    }
    for (let j = matrix.length; j < nRow; j += 1) {
      matrix.push(new Array(nColumn).fill(null));
    }
    console.log(matrix);
    return matrix;
  };

  renderRow = (row: Array<any>) => {
    const {renderCell} = this.props;
    return (
      <Row>
        {row.map((cell: any, index: number) => (
          <Fragment key={index.toString()}>{renderCell(cell)}</Fragment>
        ))}
      </Row>
    );
  };

  renderGrid = (cells: List, nColumn: number, nRow: number) => {
    const grid = this.initGrid(cells, nColumn, nRow);
    return grid.map((row: Array<any>, index: number) => (
      <Fragment key={index.toString()}>{this.renderRow(row)}</Fragment>
    ));
  };

  render() {
    const {nColumn, nRow, cells} = this.props;
    return <GridStyled>{this.renderGrid(cells, nColumn, nRow)}</GridStyled>;
  }
}

const GridStyled = styled.View`
  display: flex;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
`;

export default Grid;

//stamps: 12,
//max_stamps: 25,
//levels: [
//{
//level: 1
//stamp_amount: 10,
//reward: 'chocolatine'
//},
