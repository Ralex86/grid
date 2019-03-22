import React, {Fragment} from 'react';
import {
  Animated,
  View,
  Text,
  Button,
  PanResponder,
  Dimensions,
} from 'react-native';
import styled, {css} from '@emotion/native';
import LevelHeader from '../LevelHeader';

// 1. cree une scene qui fait bouger son contenu dun certain offset

type Props = {
  scene: React$Element<*>,
  nSlides: number,
};

type State = {
  sceneElement: number,
  headerElement: number,
  dx: any,
  index: number,
};

class Slider extends React.Component<Props, State> {
  state = {
    sceneElement: 0,
    headerElement: 0,
    sliderWidth: 0,
    dx: new Animated.Value(0),
    index: 0,
  };

  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => false,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponder: (evt, gestureState) =>
      Math.abs(gestureState.dx) > 7,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderTerminationRequest: () => false,
    onPanResponderMove: (evt, gestureState) => {
      Animated.event([null, {dx: this.state.dx}])(evt, gestureState);
    },
    onPanResponderRelease: (evt, gestureState) => {
      this.endGesture(evt, gestureState);
    },
    onPanResponderTerminate: () => {},
    onShouldBlockNativeReponser: () => true,
  });

  endGesture = (evt: any, gestureState: any) => {
    const {index} = this.state;
    const {dx} = gestureState;

    const userIsSwipingLeft = dx < 0;
    const requestedIndex = userIsSwipingLeft ? index + 1 : index - 1;

    if (Math.abs(dx) / Dimensions.get('window').width > 0.3) {
      let destIndex =
        requestedIndex >= this.props.nSlides || requestedIndex <= -1
          ? index
          : requestedIndex;
      this.requestIndex(destIndex);
    } else {
      this.requestIndex(index);
    }
  };

  requestIndex = (index: number) => {
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
    console.log(nSlides);

    return (
      <Scenery>
        <Animated.View
          {...this.panResponder.panHandlers}
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
          <Scene>{scene}</Scene>
        </Animated.View>
      </Scenery>
    );
  };

  render() {
    const {dx, index} = this.state;
    const {scene, nSlides} = this.props;

    return (
      <SliderStyled
        onLayout={event => {
          this.setState({
            sliderWidth: event.nativeEvent.layout.width,
          });
        }}>
        <Animated.View
          style={{
            width: Dimensions.get('window').width + 50,
            left: (this.state.index * -1 * this.state.sceneElement) / 2,
            transform: [
              {
                translateX: Animated.divide(Animated.add(this.state.dx, 0), 2),
              },
            ],
          }}
          onLayout={event => {
            this.setState({
              headerElement: event.nativeEvent.layout.width,
            });
          }}>
          <Header>
            <LevelHeader nLevels={nSlides} />
          </Header>
        </Animated.View>
        {this.renderScenery(scene, nSlides)}
      </SliderStyled>
    );
  }
}

//<Spacer width={this.state.sceneElement / 2 - 25} />

const Spacer = styled.View`
  background-color: blue;
  opacity: 0.5;
`;

const Header = styled.View`
  display: flex;
  height: 50px;
`;

const Scene = styled.View`
  display: flex;
  flex-direction: row;
  flex: 1;
`;

const Scenery = styled.View`
  position: absolute;
  top: 100px;
  left: 36px;
  right: 36px;

  display: flex;
  flex-direction: column;
`;

const SliderStyled = styled.View`
  position: relative;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  width: 100%;
`;

export default Slider;
