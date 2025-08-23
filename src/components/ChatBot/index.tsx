import React, { useState } from 'react';
import styles from './ChatBot.module.css';

interface ChatBotProps {}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot: React.FC<ChatBotProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '您好！我是AI助手，有什么可以帮助您的吗？',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // 简单的自动回复
    setTimeout(() => {
      const botReply: Message = {
        id: messages.length + 2,
        text: '谢谢您的消息！我已收到，正在处理中...',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botReply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatBot}>
      {/* 机器人图标 */}
      <div className={styles.robotIcon} onClick={toggleChat}>
        <img src="/robot.png" alt="AI助手" />
      </div>

      {/* 对话框 */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>AI助手</h3>
            <button className={styles.closeBtn} onClick={toggleChat}>
              ×
            </button>
          </div>
          
          <div className={styles.chatMessages}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.isUser ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageText}>{message.text}</div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="请输入您的问题..."
              className={styles.inputField}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendBtn}
              disabled={inputText.trim() === ''}
            >
              发送
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;