// @flow
import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from '@emotion/native';
import Swiper from './components/Swiper';

import Stampable from './components/Stampable';
const loyalty_stampable_levels = [
  {
    level: 1,
    stamp_amount: 23,
    reward: 'chocolatine',
  },
  {
    level: 2,
    stamp_amount: 9,
    reward: 'croissant',
  },
  {
    level: 3,
    stamp_amount: 3,
    reward: 'croissant',
  },
];

class App extends React.Component<*> {
  render() {
    const grids = [<Grid />, <Grid />, <Grid />];
    const levels = [<Level />, <Level />, <Level />];

    return (
      <AppStyled>
        <Stampable levels={loyalty_stampable_levels} stamps={22} />
      </AppStyled>
    );
  }
}

//{tValue => (
//<Fragment>
//<Swiper>
//</Swiper>
//<Container left={tValue}>{levels}</Container>
//<Container left={tValue}>{grids}</Container>
//</Fragment>
//)}
const Container = styled.View`
  display: flex;
  flex-direction: row;
`;

const Level = styled.View`
  width: 100px;
  height: 50px;
  border: 1px solid yellow;
  background-color: orange;
`;

const Grid = styled.View`
  width: 100px;
  height: 100px;
  border: 1px solid blue;
  background-color: red;
`;

const AppStyled = styled.View`
  display: flex;
  flex: 1;
`;

export default App;
