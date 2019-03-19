import React from 'react';
import {Animated, View, Text, Button} from 'react-native';
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
    sceneWidth: 200,
    dx: new Animated.Value(0),

    index: 0,
  };

  onPressRequestIndex = (index: number) => {
    const direction = this.state.index - index;
    const toValue = this.state.sceneWidth * direction;
    this.animate(index, toValue);
  };

  animate = (destIndex: number, toValue: number) => {
    const {dx} = this.state;
    const config = {
      toValue,
      overshootClamping: true,
      useNativeDriver: true,
    };

    Animated.timing(dx, config).start(() => {
      this.state.dx.setValue(0);
      this.setState({index: destIndex});
    });
  };

  renderScenery = (children, dx) => {
    console.log('render', this.state);
    return (
      <Scenery>
        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            width: '300%',
            border: '4px solid yellow',
            left: (-1 * this.state.index * this.state.sceneWidth) / 2,
            transform: [
              {
                translateX: Animated.divide(dx, 2),
              },
            ],
          }}
          onLayout={event => {
            this.setState({
              sceneWidth: event.nativeEvent.layout.width / this.nChildren,
            });
          }}>
          {children}
        </Animated.View>
        <Animated.View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            width: '300%',
            border: '4px solid yellow',
            left: this.state.index * -1 * this.state.sceneWidth,
            transform: [{translateX: dx}],
          }}
          onLayout={event => {
            this.setState({
              sceneWidth: event.nativeEvent.layout.width / this.nChildren,
            });
          }}>
          {children}
        </Animated.View>
      </Scenery>
    );
  };

  render() {
    const {dx, index} = this.state;
    const {children} = this.props;

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

const Container = styled.View``;

const Scenery = styled.View`
  position: absolute;
  top: 100px;
  left: 24px;
  right: 24px;

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
