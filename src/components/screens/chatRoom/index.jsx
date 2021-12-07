import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  Platform,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './header';
import Footer from './footer';
import MessageBubble from './messageBubble';
import { useChat } from '../../../services/chat';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatRoom = () => {
  const { params } = useRoute();
  const [message, setMessage] = useState('');
  const [chatRoom, setChatRoom] = useState({});
  const scrollRef = useRef(null);
  const { initiateChat, messages, sendMessage } = useChat();

  useEffect(() => {
    const initiateChatRoom = async () => {
      const chat = await initiateChat(params.data.receiver);
      setChatRoom(chat);
    };
    initiateChatRoom();
  }, []);

  const onSend = () => {
    sendMessage(message, { ...params.data, ...chatRoom });
    setMessage('');
  };

  const onTyping = (value) => {
    setMessage(value);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <Header data={params.data.receiver} />
          <View style={styles.conversation}>
            <FlatList
              ref={scrollRef}
              onContentSizeChange={() => scrollRef.current.scrollToEnd({ animated: true })}
              data={messages}
              renderItem={({ item }) => {
                return <MessageBubble data={item} />;
              }}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <Footer message={message} onSend={onSend} onTyping={onTyping} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
