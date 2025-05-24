import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    FlatList,
    Keyboard,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

const POMODORO_DURATION = 1 * 60; // 25 minutes in seconds
const SHORT_BREAK_DURATION = 1 * 60; // 5 minutes for a short break (optional)

export default function App() {
  const [title, setTitle] = useState('');
  const [timer, setTimer] = useState(POMODORO_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [comment, setComment] = useState('');
  const [pomodoros, setPomodoros] = useState([]);
  const [currentPomodoroId, setCurrentPomodoroId] = useState(null);
  const [sound, setSound] = useState();
  const intervalRef = useRef(null);

  // Load pomodoros from storage
  useEffect(() => {
    const loadPomodoros = async () => {
      try {
        const storedPomodoros = await AsyncStorage.getItem('pomodoros');
        if (storedPomodoros !== null) {
          setPomodoros(JSON.parse(storedPomodoros));
        }
      } catch (e) {
        console.error("Failed to load pomodoros.", e);
      }
    };
    loadPomodoros();
  }, []);

  // Save pomodoros to storage
  useEffect(() => {
    const savePomodoros = async () => {
      try {
        await AsyncStorage.setItem('pomodoros', JSON.stringify(pomodoros));
      } catch (e) {
        console.error("Failed to save pomodoros.", e);
      }
    };
    if (pomodoros.length > 0 || (pomodoros.length === 0 && AsyncStorage.getItem('pomodoros') !== null) ) { // only save if there are changes
        savePomodoros();
    }
  }, [pomodoros]);


  // Timer logic
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            playSound();
            Vibration.vibrate([500, 500, 500]); // Vibrate 3 times
            Alert.alert(
              isBreak ? "Break Over!" : "Pomodoro Finished!",
              isBreak ? "Time to get back to work!" : "Time for a break or save your session.",
              [{ text: "OK",
                onPress: () => {
                  stopSound(); // <--- MODIFICATION: Stop sound on OK press
                  // Additional logic that was originally just after Alert can go here if needed
                  if (!isBreak) {
                    // Prepare for saving (currentPomodoroId should be set)
                  } else {
                    // Reset for a new Pomodoro after break
                    setTitle('');
                    setTimer(POMODORO_DURATION);
                    setIsBreak(false);
                  }
                }, }]
            );
            if (!isBreak) {
                // If it was a work session, prepare for saving
                // The currentPomodoroId should already be set when starting
            } else {
                // If it was a break, reset for a new Pomodoro
                setTitle('');
                setTimer(POMODORO_DURATION);
                setIsBreak(false);
            }
            return isBreak ? POMODORO_DURATION : 0; // if break, reset to pomodoro, else stop at 0
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isBreak]);

  // Sound setup
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
           require('../../assets/alarm.mp3') // MAKE SURE YOU HAVE 'alarm.mp3' in an 'assets' folder
        );

        setSound(sound);
      } catch (error) {
        console.error("Failed to load sound", error);
        Alert.alert("Sound Error", "Could not load notification sound. Make sure 'alarm.mp3' is in the 'assets' folder.");
      }
    };
    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      try {
        await sound.replayAsync();
      } catch (e) {
        console.error("Failed to play sound", e);
      }
    }
  };

  const stopSound = async () => {
    if (sound) {
      try {
        console.log('Stopping Sound');
        await sound.stopAsync();
      } catch (e) {
        console.error("Failed to stop sound", e);
      }
    }
  };

  const handleStartPomodoro = () => {
    if (!title.trim()) {
      Alert.alert("No Title", "Please enter a title for your Pomodoro.");
      return;
    }
    Keyboard.dismiss();
    const newPomodoroId = Date.now().toString();
    setCurrentPomodoroId(newPomodoroId);
    setTimer(POMODORO_DURATION);
    setIsActive(true);
    setIsBreak(false);
    setComment(''); // Reset comment for the new pomodoro
    // Add to list immediately to show it's in progress, but without comment yet
    setPomodoros(prev => [{ id: newPomodoroId, title, startTime: new Date().toISOString(), comment: '', completed: false }, ...prev]);
  };

  const handlePauseResume = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    Alert.alert(
        "Reset Timer",
        "Are you sure you want to reset the current Pomodoro? Progress will be lost.",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Reset", onPress: () => {
                clearInterval(intervalRef.current);
                setIsActive(false);
                setTimer(POMODORO_DURATION);
                setTitle('');
                setComment('');
                setCurrentPomodoroId(null);
                setIsBreak(false);
                // Optionally remove the "in-progress" pomodoro if not saved
                if(currentPomodoroId){
                    setPomodoros(prev => prev.filter(p => p.id !== currentPomodoroId || p.completed));
                }
            }}
        ]
    );
  };

  const handleSavePomodoro = () => {
    if (!currentPomodoroId) {
      Alert.alert("Error", "No active Pomodoro to save.");
      return;
    }
    if (isActive) {
        Alert.alert("Timer Active", "Please pause or wait for the timer to finish before saving.");
        return;
    }
     if (timer > 0 && !isBreak) {
        Alert.alert(
            "Timer Not Finished",
            "The Pomodoro timer hasn't finished. Do you want to save it as incomplete?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Save Incomplete", onPress: () => saveCurrentPomodoro(false) }
            ]
        );
    } else {
        saveCurrentPomodoro(true);
    }
  };

  const saveCurrentPomodoro = (completed) => {
    setPomodoros(prevPomodoros =>
        prevPomodoros.map(p =>
          p.id === currentPomodoroId ? { ...p, comment, completedTime: new Date().toISOString(), completed } : p
        )
      );
      Alert.alert("Pomodoro Saved!", 
        `"${title}" has been saved.`);
      setTitle('');
      setComment('');
      setTimer(POMODORO_DURATION);
      setCurrentPomodoroId(null);
      setIsBreak(false); // Reset break state
  }

  const handleStartBreak = () => {
    if (isActive) {
        Alert.alert("Pomodoro Active", "Cannot start a break while a Pomodoro is running.");
        return;
    }
    if (timer > 0 && !isBreak) {
         Alert.alert("Pomodoro Not Finished", "Complete or save the current Pomodoro before starting a break.");
        return;
    }
    setTimer(SHORT_BREAK_DURATION);
    setIsActive(true);
    setIsBreak(true);
    setComment(''); // Clear comment field for break
    setTitle('Short Break'); // Set title for break
  };


  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderPomodoroItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}{item.completed === false && item.completedTime ? " (Incomplete)" : ""}</Text>
      <Text style={styles.itemDate}>
        Started: {new Date(item.startTime).toLocaleTimeString()} - {new Date(item.startTime).toLocaleDateString()}
      </Text>
      {item.completedTime && (
        <Text style={styles.itemDate}>
          {item.completed ? "Completed" : "Saved"}: {new Date(item.completedTime).toLocaleTimeString()} - {new Date(item.completedTime).toLocaleDateString()}
        </Text>
      )}
      {item.comment ? <Text style={styles.itemComment}>Comment: {item.comment}</Text> : null}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>🍅 Pomodoro Timer 🍅</Text>
      </View>

      <View style={styles.timerSection}>
        <Text style={styles.timer}>{formatTime(timer)}</Text>
        <Text style={styles.currentTaskText}>{isActive && !isBreak ? `Focus: ${title}` : (isBreak ? "On a Short Break" : "Ready to start?")}</Text>
      </View>

      {!isActive && timer === 0 && !isBreak && currentPomodoroId && (
         <View style={styles.inputContainer}>
            <Text style={styles.label}>Add a comment (optional):</Text>
            <TextInput
                style={styles.inputComment}
                placeholder="How did it go?"
                value={comment}
                onChangeText={setComment}
                multiline
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePomodoro}>
                <Text style={styles.buttonText}>Save Pomodoro</Text>
            </TouchableOpacity>
         </View>
      )}

      {(!isActive && timer === POMODORO_DURATION && !currentPomodoroId) && (
         <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="What are you working on?"
                value={title}
                onChangeText={setTitle}
            />
            <TouchableOpacity style={[styles.button, styles.startButton]} onPress={handleStartPomodoro} disabled={isActive}>
                <Text style={styles.buttonText}>Start Pomodoro</Text>
            </TouchableOpacity>
        </View>
      )}


      <View style={styles.controls}>
        {isActive && (
          <TouchableOpacity style={[styles.button, styles.pauseButton]} onPress={handlePauseResume}>
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        )}
        {!isActive && timer > 0 && timer < POMODORO_DURATION && !isBreak && (
          <TouchableOpacity style={[styles.button, styles.resumeButton]} onPress={handlePauseResume}>
            <Text style={styles.buttonText}>Resume</Text>
          </TouchableOpacity>
        )}
        {!isActive && timer < POMODORO_DURATION && timer > 0 && !isBreak && (
             <TouchableOpacity style={styles.saveButton} onPress={handleSavePomodoro}>
                <Text style={styles.buttonText}>Save Incomplete</Text>
            </TouchableOpacity>
        )}
        <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

       {!isActive && (timer === 0 || timer === POMODORO_DURATION) && !isBreak && pomodoros.find(p => p.id === currentPomodoroId && p.completedTime) && ( // Show break button only after a pomodoro is saved or finished
        <TouchableOpacity style={[styles.button, styles.breakButton]} onPress={handleStartBreak}>
          <Text style={styles.buttonText}>Start Short Break (5 min)</Text>
        </TouchableOpacity>
      )}
       {!isActive && timer === 0 && !isBreak && currentPomodoroId && !pomodoros.find(p => p.id === currentPomodoroId && p.completedTime) && ( // show break if pomodoro finished but not saved yet
            <TouchableOpacity style={[styles.button, styles.breakButton]} onPress={handleStartBreak}>
             <Text style={styles.buttonText}>Start Short Break (5 min)</Text>
           </TouchableOpacity>
       )}


      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>📝 Saved Pomodoros</Text>
      </View>
      {pomodoros.length === 0 ? (
        <Text style={styles.noPomodorosText}>No Pomodoros saved yet. Get to work! 💪</Text>
      ) : (
        <FlatList
          data={pomodoros}
          renderItem={renderPomodoroItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8', // Light gray background
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6347', // Tomato color for header
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  timerSection: {
    alignItems: 'center',
    marginVertical: 30,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#333',
  },
  currentTaskText: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    fontStyle: 'italic',
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  inputComment: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: 'top', // For Android
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // More rounded buttons
    minWidth: 120,
    alignItems: 'center',
    shadowColor: '#000', // Shadow for buttons
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Elevation for Android
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50', // Green
  },
  pauseButton: {
    backgroundColor: '#FFC107', // Amber
  },
  resumeButton: {
    backgroundColor: '#4CAF50', // Green
  },
  resetButton: {
    backgroundColor: '#F44336', // Red
  },
  saveButton: {
    backgroundColor: '#2196F3', // Blue
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  breakButton: {
    backgroundColor: '#00BCD4', // Cyan
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  listHeader: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 20,
  },
  listHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  list: {
    flex: 1, // Allows list to take remaining space
    paddingHorizontal: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  itemDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 3,
  },
  itemComment: {
    fontSize: 14,
    color: '#555',
    marginTop: 8,
    fontStyle: 'italic',
  },
  noPomodorosText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 30,
  },
});
