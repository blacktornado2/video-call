import { View, Text } from 'react-native'
import React, { useEffect } from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import io from 'socket.io-client';

const SIGNALING_SERVER_URL = 'http://localhost:3001'; // Change if running on device

const CallScreen = ({ route, navigation }) => {
  const { roomId } = route.params;
  const [socket, setSocket] = React.useState(null);

  useEffect(() => {
    const s = io(SIGNALING_SERVER_URL, { transports: ['websocket'] });
    setSocket(s);

    s.on('connect', () => {
      s.emit('join-room', roomId);
    });

    s.on('user-joined', (userId) => {
      // Handle new user joining (start WebRTC offer here)
      console.log('User joined:', userId);
    });

    s.on('user-left', (userId) => {
      // Handle user leaving
      console.log('User left:', userId);
    });

    // Add more event handlers for 'offer', 'answer', 'ice-candidate' as needed

    return () => {
      s.disconnect();
    };
  }, [roomId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room: {roomId}</Text>
      <Button title="Leave Call" onPress={() => navigation.goBack()} />
      {/* Video components and controls will go here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 24 },
});

export default CallScreen;