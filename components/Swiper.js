import React from 'react';
import {View, Text, Button} from 'react-native';
import styled from '@emotion/native';

// 1. cree une scene qui fait bouger son contenu dun certain offset

type Props = {
  children: any,
};
type State = {
  tValue: number,
};

class Slider extends React.Component<Props, State> {
  OFFSET: number = -100;

  state = {
    tValue: 200 / 2 - 100 / 2,
  };

  onPressNext = () => {
    this.setState(prevState => ({tValue: prevState.tValue + this.OFFSET}));
  };

  render() {
    const {tValue} = this.state;
    return (
      <SliderStyled>
        <Scene>{this.props.children && this.props.children(tValue)}</Scene>
        <Button onPress={this.onPressNext} title="next" color="#841584" />
      </SliderStyled>
    );
  }
}

const Scene = styled.View`
  display: flex;
  justify-content: center;

  width: 200px;
  height: 200px;
  opacity: 0.4;
  background: green;
`;

const SliderStyled = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Slider;
