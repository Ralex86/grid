// @flow
import React from 'react';
import {View} from 'react-native';
import styled from '@emotion/native';

type Props = {
  cellType: string,
};

colors = {
  green: 'rgb( 115,191,184 )',
  white: 'white',
  grey: 'rgb(240,240,240)',
};

const typeColors = {
  check: {bColor: colors.green, rColor: colors.green},
  empty: {bColor: colors.white, rColor: colors.green},
  default: {bColor: colors.grey, rColor: colors.grey},
};

class Cell extends React.Component {
  render() {
    const {cellType} = this.props;
    const cellColor = typeColors[cellType];
    return <CellStyled bColor={cellColor.bColor} rColor={cellColor.rColor} />;
  }
}

const CellStyled = styled.View`
  width: 46px;
  height: 46px;
  border-radius: 23px;
  border: 1px solid ${props => props.rColor};
  background-color: ${props => props.bColor};

  margin: 8px;
`;

export default Cell;
