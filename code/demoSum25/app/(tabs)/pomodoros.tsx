import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const PomodoroApp = () => {
  const pomodoroDuration = 25 * 60; // 25 minutes in seconds
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [pomodoros, setPomodoros] = useState([]);
  const [currentPomodoroId, setCurrentPomodoroId] = useState(null);
  
  const intervalRef = useRef(null);
  const soundRef = useRef(null);

  useEffect(() => {
    loadPomodoros();
    loadSound();
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      playSound();
      Alert.alert(
            'Pomodoro Complete!', 
            'Great job! Your 25-minute session is done.',
            [
              {
                text: 'OK',
                onPress: () => stopSound(),
              }
            ]
          );
      //Alert.alert('Pomodoro Complete!', 'Great job! Your 25-minute session is done.');
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

const loadSound = async () => {
  try {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
    
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/alarm.mp3'), // Your actual sound file
      { shouldPlay: false }
    );
    soundRef.current = sound;
  } catch (error) {
    console.log('Error loading sound:', error);
  }
};

  const playSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.replayAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };
  

  const stopSound = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
      }
    } catch (error) {
      console.log('Error stopping sound:', error);
    }
  };


  const loadPomodoros = async () => {
    try {
      const stored = await AsyncStorage.getItem('pomodoros');
      if (stored) {
        setPomodoros(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading pomodoros:', error);
    }
  };

  const savePomodoros = async (updatedPomodoros) => {
    try {
      await AsyncStorage.setItem('pomodoros', JSON.stringify(updatedPomodoros));
      setPomodoros(updatedPomodoros);
    } catch (error) {
      console.log('Error saving pomodoros:', error);
    }
  };

  const startTimer = () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title for your Pomodoro session.');
      return;
    }
    
    const newId = Date.now().toString();
    setCurrentPomodoroId(newId);
    setIsActive(true);
    setIsCompleted(false);
    setTimeLeft(25 * 60);
  };

  const stopTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
    setIsCompleted(false);
    setCurrentPomodoroId(null);
  };

  const savePomodoro = async () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title to save this Pomodoro.');
      return;
    }

    const newPomodoro = {
      id: currentPomodoroId || Date.now().toString(),
      title: title.trim(),
      comment: comment.trim(),
      completedAt: new Date().toISOString(),
      duration: 25, // minutes
    };

    const updatedPomodoros = [newPomodoro, ...pomodoros];
    await savePomodoros(updatedPomodoros);
    
    // Reset form
    setTitle('');
    setComment('');
    setIsCompleted(false);
    setCurrentPomodoroId(null);
    
    Alert.alert('Saved!', 'Your Pomodoro has been saved successfully.');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🍅 Pomodoro Timer</Text>
        </View>

        {/* Timer Section */}
        <View style={styles.timerSection}>
          <View style={styles.timerCircle}>
            <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
            <Text style={styles.timerLabel}>
              {isActive ? 'Focus Time' : isCompleted ? 'Complete!' : 'Ready to Start'}
            </Text>
          </View>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <TextInput
            style={styles.titleInput}
            placeholder="What are you working on?"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor="#7f8c8d"
          />

          {isCompleted && (
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment about this session..."
              value={comment}
              onChangeText={setComment}
              multiline
              numberOfLines={3}
              placeholderTextColor="#7f8c8d"
            />
          )}
        </View>

        {/* Button Section */}
        <View style={styles.buttonSection}>
          {!isActive && !isCompleted && (
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <Text style={styles.buttonText}>Start Pomodoro</Text>
            </TouchableOpacity>
          )}

          {isActive && (
            <TouchableOpacity style={styles.stopButton} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop Timer</Text>
            </TouchableOpacity>
          )}

          {isCompleted && (
            <TouchableOpacity style={styles.saveButton} onPress={savePomodoro}>
              <Text style={styles.buttonText}>Save Pomodoro</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* History Section */}
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Recent Sessions</Text>
          {pomodoros.length === 0 ? (
            <Text style={styles.noHistoryText}>No completed Pomodoros yet. Start your first session!</Text>
          ) : (
            pomodoros.slice(0, 10).map((pomodoro) => (
              <View key={pomodoro.id} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyItemTitle}>{pomodoro.title}</Text>
                  <Text style={styles.historyItemDate}>{formatDate(pomodoro.completedAt)}</Text>
                </View>
                {pomodoro.comment && (
                  <Text style={styles.historyItemComment}>{pomodoro.comment}</Text>
                )}
                <Text style={styles.historyItemDuration}>🍅 {pomodoro.duration} minutes</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3e50',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  timerSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#34495e',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#e74c3c',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ecf0f1',
  },
  timerLabel: {
    fontSize: 14,
    color: '#bdc3c7',
    marginTop: 8,
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleInput: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ecf0f1',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4a6741',
  },
  commentInput: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#ecf0f1',
    textAlignVertical: 'top',
    minHeight: 80,
    borderWidth: 2,
    borderColor: '#4a6741',
  },
  buttonSection: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  startButton: {
    backgroundColor: '#27ae60',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stopButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: '#3498db',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#ecf0f1',
    fontSize: 18,
    fontWeight: 'bold',
  },
  historySection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  historyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 16,
  },
  noHistoryText: {
    color: '#bdc3c7',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 20,
  },
  historyItem: {
    backgroundColor: '#34495e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ecf0f1',
    flex: 1,
    marginRight: 10,
  },
  historyItemDate: {
    fontSize: 12,
    color: '#bdc3c7',
  },
  historyItemComment: {
    fontSize: 14,
    color: '#bdc3c7',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  historyItemDuration: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});

export default PomodoroApp;