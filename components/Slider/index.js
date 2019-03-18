import React from 'react';
import {View, Text, Button} from 'react-native';
import styled, {css} from '@emotion/native';

// 1. cree une scene qui fait bouger son contenu dun certain offset

type Props = {
  children: any,
};
type State = {
  tValue: number,
};

class Slider extends React.Component<Props, State> {
  nChildren: number = this.props.children.length;

  state = {
    tValue: 0,
    sceneWidth: 0,
    dx: 0,
    index: 0,
  };

  onPressRequestIndex = (index: number) => {
    const direction = this.state.index - index;
    this.setState(prevState => ({
      dx: this.state.sceneWidth * direction,
    }));
  };

  renderScenery = (children, dx) => {
    return (
      <Scenery>
        <Container
          onLayout={event => {
            this.setState({
              sceneWidth: event.nativeEvent.layout.width / this.nChildren,
            });
          }}
          style={{
            transform: [{translateX: dx}],
          }}>
          {children}
        </Container>
      </Scenery>
    );
  };

  render() {
    const {dx, index} = this.state;
    const {children} = this.props;
    console.warn(dx);
    return (
      <SliderStyled>
        {this.renderScenery(children, dx)}
        <Button
          onPress={() => this.onPressRequestIndex(index + 1)}
          title="next"
          color="#841584"
        />
        <Button
          onPress={() => this.onPressRequestIndex(index - 1)}
          title="prev"
          color="#841584"
        />
      </SliderStyled>
    );
  }
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;

  width: 300%;
  border: 4px solid yellow;
`;

const Scenery = styled.View`
  position: absolute;
  top: 0;
  left: 16px;
  right: 16px;
  bottom: 50%;

  display: flex;
  flex-direction: column;
  border: 6px solid orange;
`;

const SliderStyled = styled.View`
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  flex: 1;

  width: 100%;

  border: 8px solid red;
`;

export default Slider;
