// @flow
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import styled from '@emotion/native';

import Stampable from './Stampable';
const loyalty_stampable_levels = [
  {
    level: 1,
    stamp_amount: 12,
    reward: 'chocolatine',
  },
  {
    level: 2,
    stamp_amount: 10,
    reward: 'croissant',
  },
  {
    level: 3,
    stamp_amount: 5,
    reward: 'croissant',
  },
];

class App extends React.Component<*> {
  render() {
    return (
      <AppStyled>
        <Stampable levels={loyalty_stampable_levels} stamps={2} />
      </AppStyled>
    );
  }
}

const AppStyled = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default App;
