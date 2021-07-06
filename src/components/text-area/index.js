import React from 'react'
import { Animated, View, Text } from 'react-native'

import TextField from '../field';
import Helper from '../helper'
import Counter from '../counter'
import Border from '../border';
import StaticLabel from '../static-label';

import styles from './styles';

export default class TextArea extends TextField {
  static contentInset = {
    ...TextField.contentInset,

    input: 16,

    top: 0,
    left: 12,
    right: 12,
  }

  static defaultProps = {
    ...TextField.defaultProps,

    lineWidth: 1,
    multiline: true,
  };

  constructor(props) {
    super(props);

    super.createGetter('contentInset');
  }

  renderLabel(props) {
    let { label, fontSize, labelTextStyle, required } = this.props

    return (
      <StaticLabel
        {...props}
        fontSize={fontSize}
        label={label}
        style={labelTextStyle}
        required={required}
      />
    )
  }

  renderBorder(props) {
    return <Border {...props} />
  }

  renderHelper() {
    let { focusAnimation, error } = this.state

    let {
      title,
      disabled,
      baseColor,
      errorColor,
      titleTextStyle: style,
      characterRestriction: limit,
    } = this.props

    let { length: count } = this.value()

    let containerStyle = {
      paddingLeft: 0,
      paddingRight: 0,
      minHeight: 12,
    }

    let styleProps = {
      style,
      baseColor,
      errorColor,
    }

    let counterProps = {
      ...styleProps,
      limit,
      count,
    }

    let helperProps = {
      ...styleProps,
      title,
      error,
      disabled,
      focusAnimation,
    }

    return (
      <View style={[styles.helperContainer, containerStyle]}>
        <Helper {...helperProps} />
        <Counter {...counterProps} />
      </View>
    )
  }

  render() {
    let { focusAnimation, requiredAnimation } = this.state
    let {
      editable,
      disabled,
      lineWidth,
      activeLineWidth,
      disabledLineWidth,
      tintColor,
      baseColor,
      errorColor,
      containerStyle,
      inputContainerStyle: inputContainerStyleOverrides,
    } = this.props

    let restricted = this.isRestricted()

    let contentInset = this.contentInset();

    let inputContainerStyle = {
      paddingTop: contentInset.top,
      paddingRight: contentInset.right,
      paddingBottom: contentInset.input,
      paddingLeft: contentInset.left,
      height: this.inputContainerHeight(),
    }

    let containerProps = {
      style: [containerStyle],
      onStartShouldSetResponder: () => true,
      onResponderRelease: this.onPress,
      pointerEvents: !disabled && editable ? 'auto' : 'none',
    }

    let inputContainerProps = {
      style: [
        this.constructor.inputContainerStyle,
        inputContainerStyle,
        inputContainerStyleOverrides,
      ],
    }

    let styleProps = {
      disabled,
      restricted,
      baseColor,
      tintColor,
      errorColor,

      contentInset,

      focusAnimation,
      requiredAnimation,
    }

    let lineProps = {
      ...styleProps,

      lineWidth,
      activeLineWidth,
      disabledLineWidth,
    }

    return (
      <View {...containerProps}>
        {this.renderLabel(styleProps)}
        <Animated.View {...inputContainerProps}>
          {this.renderBorder(lineProps)}
          <View style={styles.stack}>
            <View style={styles.row}>
              {super.renderInput()}
            </View>
          </View>
        </Animated.View>
        {this.renderHelper()}
      </View>
    )
  }
}