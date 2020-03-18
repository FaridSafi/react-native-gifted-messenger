import PropTypes from 'prop-types';
import React, { RefObject } from 'react';
import { Animated, StyleProp, ViewStyle, FlatList, TextStyle } from 'react-native';
import { ActionSheetOptions } from '@expo/react-native-action-sheet';
import * as utils from './utils';
import Actions from './Actions';
import Avatar from './Avatar';
import Bubble from './Bubble';
import SystemMessage from './SystemMessage';
import MessageImage from './MessageImage';
import MessageText from './MessageText';
import Composer from './Composer';
import Day from './Day';
import InputToolbar from './InputToolbar';
import LoadEarlier from './LoadEarlier';
import Message from './Message';
import MessageContainer from './MessageContainer';
import Send from './Send';
import Time from './Time';
import GiftedAvatar from './GiftedAvatar';
import { IMessage, User, Reply, LeftRightStyle } from './types';
import QuickReplies from './QuickReplies';
export interface GiftedChatProps<TMessage extends IMessage = IMessage> {
    messages?: TMessage[];
    isTyping?: boolean;
    messagesContainerStyle?: StyleProp<ViewStyle>;
    text?: string;
    alignTop?: boolean;
    wrapInSafeArea?: boolean;
    scrollToBottom?: boolean;
    scrollToBottomStyle?: StyleProp<ViewStyle>;
    initialText?: string;
    placeholder?: string;
    disableComposer?: boolean;
    user?: User;
    locale?: string;
    timeFormat?: string;
    dateFormat?: string;
    loadEarlier?: boolean;
    isLoadingEarlier?: boolean;
    showUserAvatar?: boolean;
    scrollToBottomDelay?: number;
    showAvatarForEveryMessage?: boolean;
    isKeyboardInternallyHandled?: boolean;
    renderAvatarOnTop?: boolean;
    inverted?: boolean;
    imageProps?: Message<TMessage>['props'];
    lightboxProps?: any;
    bottomOffset?: number;
    minInputToolbarHeight?: number;
    listViewProps?: any;
    layoutListScrollToBottomDelay?: number;
    textInputProps?: any;
    keyboardShouldPersistTaps?: any;
    maxInputLength?: number;
    forceGetKeyboardHeight?: boolean;
    alwaysShowSend?: boolean;
    imageStyle?: StyleProp<ViewStyle>;
    extraData?: any;
    minComposerHeight?: number;
    maxComposerHeight?: number;
    options?: {
        [key: string]: any;
    };
    optionTintColor?: string;
    quickReplyStyle?: StyleProp<ViewStyle>;
    isCustomViewBottom?: boolean;
    timeTextStyle?: LeftRightStyle<TextStyle>;
    actionSheet?(): {
        showActionSheetWithOptions: (options: ActionSheetOptions, callback: (i: number) => void) => void;
    };
    onPressAvatar?(user: User): void;
    onLongPressAvatar?(user: User): void;
    messageIdGenerator?(message?: TMessage): string;
    onSend?(messages: TMessage[]): void;
    onLoadEarlier?(): void;
    renderLoading?(): React.ReactNode;
    renderLoadEarlier?(props: LoadEarlier['props']): React.ReactNode;
    renderAvatar?(props: Avatar<TMessage>['props']): React.ReactNode;
    renderBubble?(props: Bubble<TMessage>['props']): React.ReactNode;
    renderSystemMessage?(props: SystemMessage<TMessage>['props']): React.ReactNode;
    onLongPress?(context: any, message: any): void;
    renderMessage?(message: Message<TMessage>['props']): React.ReactNode;
    renderMessageText?(messageText: MessageText<TMessage>['props']): React.ReactNode;
    renderMessageImage?(props: MessageImage<TMessage>['props']): React.ReactNode;
    renderCustomView?(props: Bubble<TMessage>['props']): React.ReactNode;
    renderDay?(props: Day<TMessage>['props']): React.ReactNode;
    renderTime?(props: Time<TMessage>['props']): React.ReactNode;
    renderFooter?(): React.ReactNode;
    renderChatEmpty?(): React.ReactNode;
    renderChatFooter?(): React.ReactNode;
    renderInputToolbar?(props: InputToolbar['props']): React.ReactNode;
    renderComposer?(props: Composer['props']): React.ReactNode;
    renderActions?(props: Actions['props']): React.ReactNode;
    renderSend?(props: Send['props']): React.ReactNode;
    renderAccessory?(props: InputToolbar['props']): React.ReactNode;
    onPressActionButton?(): void;
    onInputTextChanged?(text: string): void;
    parsePatterns?(linkStyle: TextStyle): any;
    onQuickReply?(replies: Reply[]): void;
    renderQuickReplies?(quickReplies: QuickReplies['props']): React.ReactNode;
    renderQuickReplySend?(): React.ReactNode;
    scrollToBottomComponent?(): React.ReactNode;
    shouldUpdateMessage?(props: Message<TMessage>['props'], nextProps: Message<TMessage>['props']): boolean;
}
export interface GiftedChatState<TMessage extends IMessage = IMessage> {
    isInitialized: boolean;
    composerHeight?: number;
    messagesContainerHeight?: number | Animated.Value;
    typingDisabled: boolean;
    text?: string;
    messages?: TMessage[];
}
declare class GiftedChat<TMessage extends IMessage = IMessage> extends React.Component<GiftedChatProps<TMessage>, GiftedChatState> {
    static childContextTypes: {
        actionSheet: PropTypes.Requireable<(...args: any[]) => any>;
        getLocale: PropTypes.Requireable<(...args: any[]) => any>;
    };
    static defaultProps: {
        messages: never[];
        messagesContainerStyle: undefined;
        text: undefined;
        placeholder: string;
        disableComposer: boolean;
        messageIdGenerator: () => string;
        user: {};
        onSend: () => void;
        locale: null;
        timeFormat: string;
        dateFormat: string;
        loadEarlier: boolean;
        onLoadEarlier: () => void;
        isLoadingEarlier: boolean;
        renderLoading: null;
        renderLoadEarlier: null;
        renderAvatar: undefined;
        showUserAvatar: boolean;
        scrollToBottomDelay: number;
        actionSheet: null;
        onPressAvatar: null;
        onLongPressAvatar: null;
        renderUsernameOnMessage: boolean;
        renderAvatarOnTop: boolean;
        renderBubble: null;
        renderSystemMessage: null;
        onLongPress: null;
        renderMessage: null;
        renderMessageText: null;
        renderMessageImage: null;
        imageProps: {};
        videoProps: {};
        lightboxProps: {};
        textInputProps: {};
        listViewProps: {};
        layoutListScrollToBottomDelay: null;
        renderCustomView: null;
        isCustomViewBottom: boolean;
        renderDay: null;
        renderTime: null;
        renderFooter: null;
        renderChatEmpty: null;
        renderChatFooter: null;
        renderInputToolbar: null;
        renderComposer: null;
        renderActions: null;
        renderSend: null;
        renderAccessory: null;
        isKeyboardInternallyHandled: boolean;
        onPressActionButton: null;
        bottomOffset: number;
        minInputToolbarHeight: number;
        keyboardShouldPersistTaps: string;
        onInputTextChanged: null;
        maxInputLength: null;
        forceGetKeyboardHeight: boolean;
        inverted: boolean;
        extraData: null;
        minComposerHeight: number | undefined;
        maxComposerHeight: number;
        wrapInSafeArea: boolean;
    };
    static propTypes: {
        messages: PropTypes.Requireable<(object | null)[]>;
        messagesContainerStyle: PropTypes.Requireable<number | object>;
        text: PropTypes.Requireable<string>;
        initialText: PropTypes.Requireable<string>;
        placeholder: PropTypes.Requireable<string>;
        disableComposer: PropTypes.Requireable<boolean>;
        messageIdGenerator: PropTypes.Requireable<(...args: any[]) => any>;
        user: PropTypes.Requireable<object>;
        onSend: PropTypes.Requireable<(...args: any[]) => any>;
        locale: PropTypes.Requireable<string>;
        timeFormat: PropTypes.Requireable<string>;
        dateFormat: PropTypes.Requireable<string>;
        isKeyboardInternallyHandled: PropTypes.Requireable<boolean>;
        loadEarlier: PropTypes.Requireable<boolean>;
        onLoadEarlier: PropTypes.Requireable<(...args: any[]) => any>;
        isLoadingEarlier: PropTypes.Requireable<boolean>;
        renderLoading: PropTypes.Requireable<(...args: any[]) => any>;
        renderLoadEarlier: PropTypes.Requireable<(...args: any[]) => any>;
        renderAvatar: PropTypes.Requireable<(...args: any[]) => any>;
        showUserAvatar: PropTypes.Requireable<boolean>;
        scrollToBottomDelay: PropTypes.Requireable<number>;
        actionSheet: PropTypes.Requireable<(...args: any[]) => any>;
        onPressAvatar: PropTypes.Requireable<(...args: any[]) => any>;
        onLongPressAvatar: PropTypes.Requireable<(...args: any[]) => any>;
        renderUsernameOnMessage: PropTypes.Requireable<boolean>;
        renderAvatarOnTop: PropTypes.Requireable<boolean>;
        isCustomViewBottom: PropTypes.Requireable<boolean>;
        renderBubble: PropTypes.Requireable<(...args: any[]) => any>;
        renderSystemMessage: PropTypes.Requireable<(...args: any[]) => any>;
        onLongPress: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessage: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageText: PropTypes.Requireable<(...args: any[]) => any>;
        renderMessageImage: PropTypes.Requireable<(...args: any[]) => any>;
        imageProps: PropTypes.Requireable<object>;
        videoProps: PropTypes.Requireable<object>;
        lightboxProps: PropTypes.Requireable<object>;
        renderCustomView: PropTypes.Requireable<(...args: any[]) => any>;
        renderDay: PropTypes.Requireable<(...args: any[]) => any>;
        renderTime: PropTypes.Requireable<(...args: any[]) => any>;
        renderFooter: PropTypes.Requireable<(...args: any[]) => any>;
        renderChatEmpty: PropTypes.Requireable<(...args: any[]) => any>;
        renderChatFooter: PropTypes.Requireable<(...args: any[]) => any>;
        renderInputToolbar: PropTypes.Requireable<(...args: any[]) => any>;
        renderComposer: PropTypes.Requireable<(...args: any[]) => any>;
        renderActions: PropTypes.Requireable<(...args: any[]) => any>;
        renderSend: PropTypes.Requireable<(...args: any[]) => any>;
        renderAccessory: PropTypes.Requireable<(...args: any[]) => any>;
        onPressActionButton: PropTypes.Requireable<(...args: any[]) => any>;
        bottomOffset: PropTypes.Requireable<number>;
        minInputToolbarHeight: PropTypes.Requireable<number>;
        listViewProps: PropTypes.Requireable<object>;
        layoutListScrollToBottomDelay: PropTypes.Requireable<number>;
        keyboardShouldPersistTaps: PropTypes.Requireable<string>;
        onInputTextChanged: PropTypes.Requireable<(...args: any[]) => any>;
        maxInputLength: PropTypes.Requireable<number>;
        forceGetKeyboardHeight: PropTypes.Requireable<boolean>;
        inverted: PropTypes.Requireable<boolean>;
        textInputProps: PropTypes.Requireable<object>;
        extraData: PropTypes.Requireable<object>;
        minComposerHeight: PropTypes.Requireable<number>;
        maxComposerHeight: PropTypes.Requireable<number>;
        alignTop: PropTypes.Requireable<boolean>;
        wrapInSafeArea: PropTypes.Requireable<boolean>;
    };
    static append<TMessage extends IMessage>(currentMessages: TMessage[] | undefined, messages: TMessage[], inverted?: boolean): TMessage[];
    static prepend<TMessage extends IMessage>(currentMessages: TMessage[] | undefined, messages: TMessage[], inverted?: boolean): TMessage[];
    _isMounted: boolean;
    _keyboardHeight: number;
    _bottomOffset: number;
    _maxHeight?: number;
    _isFirstLayout: boolean;
    _locale: string;
    invertibleScrollViewProps: any;
    _actionSheetRef: any;
    _messageContainerRef?: RefObject<FlatList<IMessage>>;
    textInput?: any;
    state: {
        isInitialized: boolean;
        composerHeight: number | undefined;
        messagesContainerHeight: undefined;
        typingDisabled: boolean;
        text: undefined;
        messages: undefined;
    };
    constructor(props: GiftedChatProps<TMessage>);
    getChildContext(): {
        actionSheet: () => any;
        getLocale: () => string;
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps?: GiftedChatProps<TMessage>): void;
    initLocale(): void;
    setLocale(locale: string): void;
    getLocale: () => string;
    setTextFromProp(textProp?: string): void;
    getTextFromProp(fallback: string): string;
    setMessages(messages: TMessage[]): void;
    getMessages(): undefined;
    setMaxHeight(height: number): void;
    getMaxHeight(): number | undefined;
    setKeyboardHeight(height: number): void;
    getKeyboardHeight(): number;
    setBottomOffset(value: number): void;
    getBottomOffset(): number;
    setIsFirstLayout(value: boolean): void;
    getIsFirstLayout(): boolean;
    setIsTypingDisabled(value: boolean): void;
    getIsTypingDisabled(): boolean;
    setIsMounted(value: boolean): void;
    getIsMounted(): boolean;
    getMinInputToolbarHeight(): number | undefined;
    calculateInputToolbarHeight(composerHeight: number): number;
    /**
     * Returns the height, based on current window size, without taking the keyboard into account.
     */
    getBasicMessagesContainerHeight(composerHeight?: number | undefined): number;
    /**
     * Returns the height, based on current window size, taking the keyboard into account.
     */
    getMessagesContainerHeightWithKeyboard(composerHeight?: number | undefined): number;
    safeAreaIphoneX: (bottomOffset: number) => number;
    onKeyboardWillShow: (e: any) => void;
    onKeyboardWillHide: (_e: any) => void;
    onKeyboardDidShow: (e: any) => void;
    onKeyboardDidHide: (e: any) => void;
    scrollToBottom(animated?: boolean): void;
    renderMessages(): JSX.Element;
    onSend: (messages?: TMessage[], shouldResetInputToolbar?: boolean) => void;
    resetInputToolbar(): void;
    focusTextInput(): void;
    onInputSizeChanged: (size: {
        height: number;
    }) => void;
    onInputTextChanged: (text: string) => void;
    notifyInputTextReset(): void;
    onInitialLayoutViewLayout: (e: any) => void;
    onMainViewLayout: (e: any) => void;
    renderInputToolbar(): {} | null | undefined;
    renderChatFooter(): {} | null | undefined;
    renderLoading(): {} | null | undefined;
    render(): JSX.Element;
}
export * from './types';
export { GiftedChat, Actions, Avatar, Bubble, SystemMessage, MessageImage, MessageText, Composer, Day, InputToolbar, LoadEarlier, Message, MessageContainer, Send, Time, GiftedAvatar, utils, };
