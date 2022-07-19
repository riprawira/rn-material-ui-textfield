import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Animated, Text, View } from 'react-native'
import { TextPropTypes } from 'deprecated-react-native-prop-types'

import styles from './styles'

export default class StaticLabel extends PureComponent {
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

    baseColor: PropTypes.string.isRequired,
    tintColor: PropTypes.string.isRequired,
    errorColor: PropTypes.string.isRequired,

    requiredAnimation: PropTypes.instanceOf(Animated.Value).isRequired,

    style: TextPropTypes.style,
    label: PropTypes.string,
  }

  render() {
    let {
      label,
      disabled,
      required,
      restricted,
      fontSize,
      errorColor,
      baseColor,
      tintColor,
      style,
      requiredAnimation,
      ...props
    } = this.props

    if (label == null) {
      return null
    }

    let color = disabled ? baseColor : restricted ? errorColor : baseColor

    color = style.color || color

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

    return (
      <View style={styles.container}>
        <Text style={[styles.text, style, textStyle]} {...props}>
          {label}
          {required ? (
            <Animated.Text style={[styles.text, style, requiredStyle]} {...props}>
              *
            </Animated.Text>
          ) : null}
        </Text>
      </View>
    )
  }
}
