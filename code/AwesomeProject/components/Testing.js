import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const APIdemo = () => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [data,setData] = useState([]);
    const [forecast,setForecast] = useState([]);
    const [loading,setLoading] = useState(false);

    const getWeather = async (latitude, longitude) => {
        try {
          setLoading(true);
          const url=`https://api.weather.gov/points/${latitude},${longitude}`
          const response = await fetch(url);
          const json = await response.json();
          const response2 = await fetch(json.properties.forecast)
          const json2 = await response2.json()
          const forecast = json2.properties.periods[0].detailedForecast
          setData(json); 
          setForecast(forecast)
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };

    const handleGetWeather = () => {
        getWeather(latitude, longitude);
    }

    return(
        <View>
            <Text>API Demo</Text>
            <TextInput 
                placeholder="Enter Latitude"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
            />
            <TextInput 
                placeholder="Enter Longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
            />
            <Button 
                title="Get Weather"
                onPress={handleGetWeather}
                disabled={loading}
            />
            <Text>{loading ? 'Loading...' : JSON.stringify(forecast)}</Text>
        </View>
    );
}

export default APIdemo;