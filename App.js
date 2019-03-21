// @flow
import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from '@emotion/native';
import Slider from './components/Slider';

import Stampable from './components/Stampable';
const loyalty_stampable_levels = [
  {
    level: 1,
    stamp_amount: 15,
    reward: 'chocolatine',
  },
  {
    level: 2,
    stamp_amount: 3,
    reward: 'croissant',
  },
  {
    level: 3,
    stamp_amount: 10,
    reward: 'croissant',
  },
  //{
  //level: 4,
  //stamp_amount: 3,
  //reward: 'croissant',
  //},
];

class App extends React.Component<*> {
  render() {
    return (
      <AppStyled>
        <Stampable levels={loyalty_stampable_levels} stamps={14} />
      </AppStyled>
    );
  }
}

//<Slider>
//<Scene opacity={0.6}>
//<Text>Bla</Text>
//</Scene>
//<Scene opacity={0.4}>
//<Text>Bla</Text>
//</Scene>
//<Scene opacity={0.2}>
//<Text>Bla</Text>
//</Scene>
//</Slider>

const Scene = styled.View`
  display: flex;
  flex: 1;
  background-color: green;
`;

// <Grids left={tValue}>{levels}</Grids>

//<Stampable levels={loyalty_stampable_levels} stamps={22} />
//
//
const AppStyled = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default App;
