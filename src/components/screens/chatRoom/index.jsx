import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';
import {
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from './header';
import Footer from './footer';
import MessageBubble from './messageBubble';
import { useChat } from '../../../services/chat';

const ChatRoom = () => {
  const { params } = useRoute();
  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);
  const { initiateChat, messages, sendMessage } = useChat();

  useEffect(() => {
    const initiateChatRoom = async () => {
      await initiateChat(params.data.receiver);
    };
    initiateChatRoom();
  }, []);

  const onSend = () => {
    sendMessage(message, params.data);
    setMessage('');
  };

  const onTyping = (value) => {
    setMessage(value);
  };

  return (
    <View style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatRoom;
