import 'react-native-get-random-values';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 as uuidv4 } from 'uuid';

const HomeScreen = ({ navigation }) => {
  const [roomId, setRoomId] = useState('');

  const handleCreateRoom = () => {
    const newRoomId = uuidv4();
    navigation.navigate('Call', { roomId: newRoomId });
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      navigation.navigate('Call', { roomId });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Togetherly</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Room ID"
        value={roomId}
        onChangeText={setRoomId}
      />
      <Button title="Join Room" onPress={handleJoinRoom} />
      <View style={{ height: 16 }} />
      <Button title="Create New Room" onPress={handleCreateRoom} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 32, marginBottom: 32 },
  input: { borderWidth: 1, borderColor: '#ccc', width: 200, padding: 8, marginBottom: 16, borderRadius: 8 },
});

export default HomeScreen;