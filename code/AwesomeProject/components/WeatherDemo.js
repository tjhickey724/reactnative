import React, { useState, useEffect } from 'react';
import { Text, Button, TextInput, View } from 'react-native';


const APIdemo = () => {
    const [data,setData] = useState([]);
    const [forecast,setForecast] = useState([]);
    const [loading,setLoading] = useState(true);
    const [latlonText,setLatLonText] = useState("");
    const [latlon,setLatLon] = useState("42.3,-71.1");
    //const [latlon,setLatLon] = useState("35.1,-106.6");

    const getJSON = async (url) => {
        try {
            console.log("In getJSON, url = "+url);
            const response = await fetch(url);
            const json = await response.json();
            console.log("In getJSON, got this: ")
            console.dir(json);
            return(json);
        } catch (error) {
            console.error(error);
        } 
    };


    const getWeather = async () => {
        const getData = async () => {
            try {


                const d = await getJSON("https://api.weather.gov/points/"+latlon)
                setData(d);

                const f = await getJSON(d.properties.forecast)  
                console.dir(f)  
                setForecast(f.properties.periods)

            } catch (error) {
            console.error(error);
            } finally {
                setLoading(false);
            }   
        }
        await getData();
    
    };

     
    useEffect(() => {getWeather()}, [latlon])

    return(
        <View style={{flex:1,margin:50,backgroundColor:'lightgreen'}}>
            <Text style={{fontSize:60,textAlign:'center'}}>Weather Demo</Text>
            <View style={{margin:100,padding:10}}>
                {loading ? 
                    <Text>Loading...</Text> 
                    :
                    <>
                    <Text>Enter your lattitude and longitude, separated by a comma</Text>
                    <TextInput 
                        placeholder="42.3,-71.1"
                        onChangeText={text => setLatLonText(text)}
                        />
                    <Button 
                        onPress={() => setLatLon(latlonText)} 
                        title="Get Weather" />  
                    <Text style={{fontSize:60,textAlign:'center'}}>{forecast[0].name}</Text>
                    <Text 
                        style={{fontSize:40, padding:50, backgroundColor:'yellow'}}>
                        
                        {forecast[0].detailedForecast}</Text>
                    {false? 
                    <>
                     <Text>{latlonText}</Text>
                     <Text>{latlon}</Text>
                     <Text>{JSON.stringify(data)}}</Text>
                     <Text style={{backgroundColor:'yellow'}}>
                        {JSON.stringify(forecast[0])}
                    </Text>
                    </>:
                    "............."}
                     
                    </>

                }
            </View>
            
        </View>
    );
}

export default APIdemo;