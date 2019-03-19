// @flow
import React from 'react';
import {View, Image} from 'react-native';
import styled from '@emotion/native';

const check = require('../assets/check.png');
const add = require('../assets/add.png');
const gift = require('../assets/gift.png');

type CellData = {
  name: string,
  infos: string,
  activate: boolean,
  isLast?: boolean,
};

type Props = {
  data?: CellData,
  size: {
    width: number,
    height: number,
  },
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
    const {data, size} = this.props;
    if (data == null) {
      return (
        <CellStyled
          width={size.width}
          height={size.height}
          borderRadius={size.width / 2}
          bColor={typeColors['default'].bColor}
          rColor={typeColors['default'].rColor}
        />
      );
    }

    if (data.name === 'reward') {
      return (
        <CellStyled
          width={size.width}
          height={size.height}
          borderRadius={size.width / 2}
          bColor={data.activate ? colors.green : colors.white}
          rColor={colors.green}>
          <Image
            style={{
              width: size.width / 2,
              height: size.height / 2,
              tintColor: data.activate ? colors.white : colors.green,
            }}
            source={gift}
          />
        </CellStyled>
      );
    }

    if (data.name === 'add') {
      return (
        <CellStyled
          width={size.width}
          height={size.height}
          borderRadius={size.width / 2}
          bColor={colors.orange}
          rColor={colors.orange}>
          <Image
            style={{
              width: size.width / 2,
              height: size.height / 2,
            }}
            source={data.isLast ? gift : add}
          />
        </CellStyled>
      );
    }

    const cellColor = typeColors[data.name];

    return (
      <CellStyled
        size={size}
        width={size.width}
        height={size.height}
        borderRadius={size.width / 2}
        bColor={cellColor.bColor}
        rColor={cellColor.rColor}>
        {data.name === 'check_stamp' && (
          <Image
            style={{
              width: size.width / 2,
              height: size.height / 2,
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

  border: 1px solid ${props => props.rColor};
  background-color: ${props => props.bColor};

  margin: 8px;
`;

export default Cell;
