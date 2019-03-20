// @flow
import React, {Fragment} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import styled from '@emotion/native';

const levelImg = require('../assets/fondNiveau.png');

type Matrix = Array<Array<*>>;

type Props = {
  nLevels: number,
};

const Level = (props: {level: number}) => {
  const {level} = props;
  return (
    <LevelStyled>
      <ImageBackground
        source={levelImg}
        style={{
          width: 42,
          height: 25,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 11,
            color: 'white',
          }}>
          {level}
        </Text>
      </ImageBackground>
    </LevelStyled>
  );
};

class LevelHeader extends React.Component<Props> {
  renderLevelElements = (nLevels: number): Matrix => {
    const row2: Array<React$Element<*>> = [];
    const row1: Array<React$Element<*>> = [];
    row2.push(<Level key={'l0'} level={1} />);
    row1.push(<Title key={'l0'}>Niveau</Title>);
    for (let i = 1; i < nLevels; i += 1) {
      row1.push(<LevelSeparator key={'s' + i.toString()} level={i + 1} />);
      row2.push(
        <LevelSeparator
          bColor="rgb(116, 173, 238)"
          key={'s' + i.toString()}
          level={i + 1}
        />,
      );
      row1.push(<Title key={'l' + i.toString()}>Niveau</Title>);
      row2.push(<Level key={'l' + i.toString()} level={i + 1} />);
    }
    return [row1, row2].map(
      (row: any, index: number): any => {
        return <Row key={index.toString()}>{row}</Row>;
      },
    );
  };

  render() {
    const {nLevels} = this.props;
    return (
      <LevelHeaderStyled>
        <Container>{this.renderLevelElements(nLevels)}</Container>
      </LevelHeaderStyled>
    );
  }
}

const Title = styled.Text`
  width: 42px;
  margin: 4px;
  color: rgb(116, 173, 238);
  font-size: 12px;
  text-align: center;
`;

const Row = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const LevelStyled = styled.View`
  margin: 0 4px 4px 4px;
`;

const LevelSeparator = styled.View`
  flex: 1;
  height: 1px;
  margin-bottom: 4px;
  background-color: ${props => props.bColor};
`;

const Container = styled.View`
  display: flex;
  flex-direction: column;
`;

const LevelHeaderStyled = styled.View`
  display: flex;
  width: 100%;
`;

export default LevelHeader;
