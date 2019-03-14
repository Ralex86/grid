// @flow
import React from 'react';
import {View, Image} from 'react-native';
import styled from '@emotion/native';

const check = require('./assets/check.png');
const add = require('./assets/add.png');
const gift = require('./assets/gift.png');

type CellData = {
  name: string,
  infos: string,
  activate: boolean,
};

type Props = {
  data?: CellData,
};

const colors = {
  green: 'rgb( 115,191,184 )',
  white: 'white',
  grey: 'rgb(240,240,240)',
  orange: 'rgb(255,87,34)',
};

const typeColors = {
  check_stamp: {bColor: colors.green, rColor: colors.green},
  empty_stamp: {bColor: colors.white, rColor: colors.green},
  reward: {bColor: colors.white, rColor: colors.green},
  add: {bColor: colors.orange, rColor: colors.orange},
  default: {bColor: colors.grey, rColor: colors.grey},
};

class Cell extends React.Component<Props> {
  render() {
    const {data} = this.props;
    if (data == null) {
      return (
        <CellStyled
          bColor={typeColors['default'].bColor}
          rColor={typeColors['default'].rColor}
        />
      );
    }

    if (data.name === 'reward') {
      return (
        <CellStyled
          bColor={data.activate ? colors.orange : colors.white}
          rColor={data.activate ? colors.orange : colors.green}>
          <Image
            style={{
              width: 23,
              height: 23,
              tintColor: data.activate ? colors.white : colors.green,
            }}
            source={gift}
          />
        </CellStyled>
      );
    }

    if (data.name === 'add') {
      return (
        <CellStyled bColor={colors.orange} rColor={colors.orange}>
          <Image
            style={{
              width: 23,
              height: 23,
            }}
            source={add}
          />
        </CellStyled>
      );
    }

    const cellColor = typeColors[data.name];

    return (
      <CellStyled bColor={cellColor.bColor} rColor={cellColor.rColor}>
        {data.name === 'check_stamp' && (
          <Image
            style={{
              width: 23,
              height: 23,
            }}
            source={check}
          />
        )}
      </CellStyled>
    );
  }
}

const CellStyled = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 46px;
  height: 46px;
  border-radius: 23px;
  border: 1px solid ${props => props.rColor};
  background-color: ${props => props.bColor};

  margin: 8px;
`;

export default Cell;
