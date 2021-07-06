import PropTypes from 'prop-types'
import React, { Fragment, PureComponent } from 'react'
import { View, Animated } from 'react-native'

import styles, { borderRadius } from './styles'

export default class Border extends PureComponent {
  static defaultProps = {
    lineType: 'solid',
    disabled: false,
    restricted: false,
  }

  static propTypes = {
    lineType: PropTypes.oneOf(['solid', 'none']),

    disabled: PropTypes.bool,
    restricted: PropTypes.bool,

    tintColor: PropTypes.string,
    baseColor: PropTypes.string,
    errorColor: PropTypes.string,

    lineWidth: PropTypes.number,
    activeLineWidth: PropTypes.number,
    disabledLineWidth: PropTypes.number,

    focusAnimation: PropTypes.instanceOf(Animated.Value),

    contentInset: PropTypes.shape({
      left: PropTypes.number,
      right: PropTypes.number,
    }),
  }

  borderProps() {
    let {
      disabled,
      restricted,
      lineType,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      baseColor,
      tintColor,
      errorColor,
      focusAnimation,
    } = this.props

    if (disabled) {
      return {
        borderColor: baseColor,
        borderWidth: disabledLineWidth,
      }
    }

    if (restricted) {
      return {
        borderColor: errorColor,
        borderWidth: activeLineWidth,
      }
    }

    return {
      borderColor: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [errorColor, baseColor, tintColor],
      }),

      borderWidth: focusAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [activeLineWidth, lineWidth, activeLineWidth],
      }),

      borderStyle: lineType,
    }
  }

  render() {
    let { lineType, contentInset } = this.props

    if (lineType === 'none') {
      return null
    }

    let leftContainerStyle = {
      width: contentInset.left - borderRadius,
    }

    let rightContainerStyle = {
      width: contentInset.right - borderRadius,
    }

    let lineStyle = this.borderProps()

    return (
      <Fragment>
        <View style={styles.topContainer} pointerEvents="none">
          <Animated.View style={[styles.borderTop, lineStyle]} />
        </View>

        <View style={[styles.rightContainer, rightContainerStyle]} pointerEvents="none">
          <Animated.View style={[styles.borderRight, lineStyle]} />
        </View>

        <View style={styles.bottomContainer} pointerEvents="none">
          <Animated.View style={[styles.borderBottom, lineStyle]} />
        </View>

        <View style={[styles.leftContainer, leftContainerStyle]} pointerEvents="none">
          <Animated.View style={[styles.borderLeft, lineStyle]} />
        </View>
      </Fragment>
    )
  }
}
