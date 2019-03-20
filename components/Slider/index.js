import React, {Fragment} from 'react';
import {Animated, View, Text, Button} from 'react-native';
import styled, {css} from '@emotion/native';
import LevelHeader from '../LevelHeader';

// 1. cree une scene qui fait bouger son contenu dun certain offset

type Props = {
  scene: React$Element<*>,
  nSlides: number,
};

type State = {
  sceneWidth: number,
  dx: any,
  index: number,
};

class Slider extends React.Component<Props, State> {
  state = {
    sceneElement: 0,
    dx: new Animated.Value(0),
    index: 0,
  };

  onPressRequestIndex = (index: number) => {
    const direction = this.state.index - index;
    const toValue = this.state.sceneElement * direction;
    this.animate(index, toValue);
  };

  animate = (destIndex: number, toValue: number) => {
    const {dx} = this.state;
    const config = {
      toValue,
      overshootClamping: true,
      useNativeDriver: true,
    };

    Animated.spring(dx, config).start(() => {
      this.state.dx.setValue(0);
      this.setState({index: destIndex});
    });
  };

  renderScenery = (scene: React$Element<*>, nSlides: number) => {
    const sceneWidth = nSlides * 100;
    console.log(this.state);

    return (
      <Scenery>
        <Animated.View
          style={{
            display: 'flex',
            flex: 1,
            width: `${sceneWidth}%`,
            left: this.state.index * -1 * this.state.sceneElement,
            transform: [{translateX: this.state.dx}],
          }}
          onLayout={event => {
            this.setState({
              sceneElement: event.nativeEvent.layout.width / nSlides,
            });
          }}>
          <Scene marginHorizontal={this.state.sceneElement / 2}>
            <LevelHeader nLevels={3} />
          </Scene>
          <Scene>{scene}</Scene>
        </Animated.View>
      </Scenery>
    );
  };

  render() {
    const {dx, index} = this.state;
    const {scene, nSlides} = this.props;

    return (
      <SliderStyled>
        {this.renderScenery(scene, nSlides)}
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

const Scene = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

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
`;

export default Slider;
