import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Animated, Text } from 'react-native'

import styles from './styles'

export default class Label extends PureComponent {
  static defaultProps = {
    numberOfLines: 1,
    disabled: false,
    restricted: false,
    required: false,
  }

  static propTypes = {
    numberOfLines: PropTypes.number,

    disabled: PropTypes.bool,
    required: PropTypes.bool,
    restricted: PropTypes.bool,

    fontSize: PropTypes.number.isRequired,
    activeFontSize: PropTypes.number.isRequired,

    baseColor: PropTypes.string.isRequired,
    tintColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    focusAnimation: PropTypes.instanceOf(Animated.Value).isRequired,

    labelAnimation: PropTypes.instanceOf(Animated.Value).isRequired,

    requiredAnimation: PropTypes.instanceOf(Animated.Value).isRequired,

    contentInset: PropTypes.shape({
      label: PropTypes.number,
    }),

    offset: PropTypes.shape({
      x0: PropTypes.number,
      y0: PropTypes.number,
      x1: PropTypes.number,
      y1: PropTypes.number,
    }),

    style: Text.propTypes.style,
    label: PropTypes.string,
  }

  render() {
    let {
      label,
      offset,
      disabled,
      required,
      restricted,
      fontSize,
      activeFontSize,
      contentInset,
      errorColor,
      baseColor,
      tintColor,
      style,
      focusAnimation,
      labelAnimation,
      requiredAnimation,
      ...props
    } = this.props

    if (label == null) {
      return null
    }

    let color = disabled
      ? baseColor
      : restricted
      ? errorColor
      : focusAnimation.interpolate({
          inputRange: [-1, 0, 1],
          outputRange: [errorColor, baseColor, tintColor],
        })
    
    color = style.color || color;

    let textStyle = {
      lineHeight: fontSize,
      fontSize,
      color,
    }

    let requiredColor = disabled
      ? baseColor
      : requiredAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [errorColor, baseColor],
        })

    let requiredStyle = {
      lineHeight: fontSize,
      fontSize,
      color: requiredColor,
    }

    let { x0, y0, x1, y1 } = offset

    y0 += activeFontSize
    y0 += contentInset.label
    y0 += fontSize * 0.25

    let containerStyle = {
      transform: [
        {
          scale: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, activeFontSize / fontSize],
          }),
        },
        {
          translateY: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [y0, y1],
          }),
        },
        {
          translateX: labelAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [x0, x1],
          }),
        },
      ],
    }

    return (
      <Animated.View style={[styles.container, containerStyle]}>
        <Animated.Text style={[styles.text, style, textStyle]} {...props}>
          {label}
          {required
            ?
            (
              <Animated.Text style={[styles.text, style, requiredStyle]} {...props}>
                *
              </Animated.Text>
            )
            :
            null
          }
        </Animated.Text>
      </Animated.View>
    )
  }
}
