/* eslint
   no-console: 0,
   no-param-reassign: 0,
   no-use-before-define: ["error", { "variables": false }],
   no-return-assign: 0,
   react/no-string-refs: 0,
   react/sort-comp: 0
*/

import PropTypes from 'prop-types';
import React from 'react';

import { FlatList, View, StyleSheet, Keyboard } from 'react-native';

import LoadEarlier from './LoadEarlier';
import Message from './Message';
import moment from 'moment';
import ScrollToBotButton from './ScrollToBotButton';
import DateBubble from './DateBubble';
export default class MessageContainer extends React.PureComponent {

 constructor(props) {
   super(props);

   this.renderRow = this.renderRow.bind(this);
   this.renderFooter = this.renderFooter.bind(this);
   this.renderLoadEarlier = this.renderLoadEarlier.bind(this);
   this.renderHeaderWrapper = this.renderHeaderWrapper.bind(this);
   this.attachKeyboardListeners = this.attachKeyboardListeners.bind(this);
   this.detatchKeyboardListeners = this.detatchKeyboardListeners.bind(this);

   if (props.messages.length === 0) {
     this.attachKeyboardListeners(props);
   }

   //new
   this.state = {
     showScrollBottom: false,
     currentDate: ''
   }

   this.handleOnScroll = this.handleOnScroll.bind(this);
   this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
 }

 componentWillReceiveProps(nextProps) {
   if (this.props.messages.length === 0 && nextProps.messages.length > 0) {
     this.detatchKeyboardListeners();
   } else if (this.props.messages.length > 0 && nextProps.messages.length === 0) {
     this.attachKeyboardListeners(nextProps);
   }
 }

 attachKeyboardListeners(props) {
   Keyboard.addListener('keyboardWillShow', props.invertibleScrollViewProps.onKeyboardWillShow);
   Keyboard.addListener('keyboardDidShow', props.invertibleScrollViewProps.onKeyboardDidShow);
   Keyboard.addListener('keyboardWillHide', props.invertibleScrollViewProps.onKeyboardWillHide);
   Keyboard.addListener('keyboardDidHide', props.invertibleScrollViewProps.onKeyboardDidHide);
 }

 detatchKeyboardListeners() {
   Keyboard.removeListener('keyboardWillShow', this.props.invertibleScrollViewProps.onKeyboardWillShow);
   Keyboard.removeListener('keyboardDidShow', this.props.invertibleScrollViewProps.onKeyboardDidShow);
   Keyboard.removeListener('keyboardWillHide', this.props.invertibleScrollViewProps.onKeyboardWillHide);
   Keyboard.removeListener('keyboardDidHide', this.props.invertibleScrollViewProps.onKeyboardDidHide);
 }

 renderFooter() {
   if (this.props.renderFooter) {
     const footerProps = {
       ...this.props,
     };
     return this.props.renderFooter(footerProps);
   }
   return null;
 }

 renderLoadEarlier() {
   if (this.props.loadEarlier === true) {
     const loadEarlierProps = {
       ...this.props,
     };
     if (this.props.renderLoadEarlier) {
       return this.props.renderLoadEarlier(loadEarlierProps);
     }
     return <LoadEarlier {...loadEarlierProps} />;
   }
   return null;
 }

 scrollTo(options) {
   if (this.flatListRef) {
     this.flatListRef.scrollToOffset(options);
   }
 }

 //new function --->
 scrollToBottom = () => {
   this.scrollTo({ offset: 0, animated: 'true' });
 }

 handleOnScroll(event) {
   if (event.nativeEvent.contentOffset.y > 200) {
     this.setState({ showScrollBottom: true });
   } else {
     this.setState({ showScrollBottom: false });
   }
 }

 onViewableItemsChanged = ({ viewableItems }) => {
   let dateDiff = ''
   if (viewableItems && viewableItems.length > 0 && this.state.showScrollBottom) {
     const msg = viewableItems[viewableItems.length - 1].item
     dateDiff = moment(msg.createdAt).calendar(null, {
       sameDay: '[]',
       nextDay: '[]',
       nextWeek: '[]',
       lastDay: '[Yesterday]',
       lastWeek: 'DD-MM-YYYY',
       sameElse: 'DD-MM-YYYY'
     })
   }
  
   this.setState({
     currentDate: dateDiff,
   })
 }

 //end new function --->

 renderRow({ item, index }) {
   if (!item._id && item._id !== 0) {
     console.warn('GiftedChat: `_id` is missing for message', JSON.stringify(item));
   }
   if (!item.user) {
     if (!item.system) {
       console.warn('GiftedChat: `user` is missing for message', JSON.stringify(item));
     }
     item.user = {};
   }
   const { messages, ...restProps } = this.props;
   const previousMessage = messages[index + 1] || {};
   const nextMessage = messages[index - 1] || {};

   const messageProps = {
     ...restProps,
     key: item._id,
     currentMessage: item,
     previousMessage,
     nextMessage,
     position: item.user._id === this.props.user._id ? 'right' : 'left',
   };

   if (this.props.renderMessage) {
     return this.props.renderMessage(messageProps);
   }
   return <Message {...messageProps} />;
 }

 renderHeaderWrapper() {
   return <View style={styles.headerWrapper}>{this.renderLoadEarlier()}</View>;
 }

 render() {
   if (this.props.messages.length === 0) {
     return <View style={styles.container} />;
   }
   return (
     <View style={styles.container}>
       <FlatList
         ref={(ref) => (this.flatListRef = ref)}
         keyExtractor={(item) => item._id}
         enableEmptySections
         automaticallyAdjustContentInsets={false}
         inverted={this.props.inverted}
         data={this.props.messages}
         style={styles.listStyle}
         contentContainerStyle={styles.contentContainerStyle}
         renderItem={this.renderRow}
         {...this.props.invertibleScrollViewProps}
         ListFooterComponent={this.renderHeaderWrapper}
         ListHeaderComponent={this.renderFooter}
         {...this.props.listViewProps}
         //new
         windowSize={30}
         onEndReachedThreshold={10}
         onScroll={this.handleOnScroll}
         scrollEventThrottle={100}
         onViewableItemsChanged={this.onViewableItemsChanged}
       />
       <DateBubble date={this.state.currentDate} />
       {this.state.showScrollBottom && <ScrollToBotButton onPress={this.scrollToBottom} />}
     </View>
   );
 }

}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
 contentContainerStyle: {
   justifyContent: 'flex-end',
 },
 headerWrapper: {
   flex: 1,
 },
 listStyle: {
   flex: 1,
 },
});

MessageContainer.defaultProps = {
 messages: [],
 user: {},
 renderFooter: null,
 renderMessage: null,
 onLoadEarlier: () => { },
 inverted: true,
 loadEarlier: false,
 listViewProps: {},
 invertibleScrollViewProps: {}, // TODO: support or not?
};

MessageContainer.propTypes = {
 messages: PropTypes.arrayOf(PropTypes.object),
 user: PropTypes.object,
 renderFooter: PropTypes.func,
 renderMessage: PropTypes.func,
 renderLoadEarlier: PropTypes.func,
 onLoadEarlier: PropTypes.func,
 listViewProps: PropTypes.object,
 inverted: PropTypes.bool,
 loadEarlier: PropTypes.bool,
 invertibleScrollViewProps: PropTypes.object, // TODO: support or not?
};



