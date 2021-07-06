import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },

  rowPadding: {
    paddingRight: 32,
  },

  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  accessoryContainer: {
    width: 32,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },

  stack: {
    flex: 1,
    alignSelf: 'stretch',
  },

  flex: {
    flex: 1,
  },
})
