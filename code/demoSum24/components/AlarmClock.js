/* AlarmClock.js
This example comes from
https://www.geeksforgeeks.org/create-an-alarm-clock-using-react-native/

*/
import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Platform, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
 
const AlarmClock = () => {
    const [alarmTime, setAlarmTime] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);
 
    const showTimePickerModal = () => {
        setShowTimePicker(true);
    };
 
    const hideTimePickerModal = () => {
        setShowTimePicker(false);
    };
 
    const handleTimeChange = (event, selectedTime) => {
        hideTimePickerModal();
        if (selectedTime) {
            setAlarmTime(selectedTime);
        }
    };
 
    useEffect(() => {
        const checkAlarm = setInterval(() => {
            const currentTime = new Date();
            if (
                currentTime.getHours() === alarmTime.getHours() &&
                currentTime.getMinutes() === alarmTime.getMinutes()
            ) {
                // Matched the set alarm time, show an alert
                Alert.alert("Alarm", "It is time!");
                // Stop checking once the alert is shown
                clearInterval(checkAlarm); 
            }
        }, 1000); // Check every second
        // Cleanup on component unmount
        return () => clearInterval(checkAlarm); 
    }, [alarmTime]);
 
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>AlarmClock</Text>
            </View>
 
            <View style={styles.clockContainer}>
                <Text style={styles.clockText}>
                    {alarmTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}
                </Text>
            </View>
 
            {showTimePicker && (
                <DateTimePicker
                    value={alarmTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}
 
            <Button
                title="Set Alarm"
                onPress={showTimePickerModal}
                color="#3498db"
            />
        </View>
    );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ecf0f1", // Set your desired background color
    },
    header: {
        marginBottom: 20,
    },
    appName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#2c3e50", // Set your desired text color
    },
    clockContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    clockText: {
        fontSize: 50,
        marginRight: 10,
        color: "#2c3e50", // Set your desired text color
    },
    footerText: {
        marginTop: 20,
        fontSize: 16,
        color: "#7f8c8d", // Set your desired text color
    },
});
 
export default AlarmClock;