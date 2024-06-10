import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

const TextBox = ({info}) => {
    return (
        <View style={styles.container}>
        <Text>{info}</Text>
        </View>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default TextBox;