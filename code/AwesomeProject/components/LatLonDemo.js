import React, { useState, useEffect } from 'react';
import { Text, FlatList, View } from 'react-native';
import {get_latlon} from '../lib/weatherAPI';


const APIdemo = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const getCoordinates = async () => {
        try {
            const result = await get_latlon("415 South Street, Waltham, MA")
            setData(result); 
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {getCoordinates()}, [])

    return(
        <View>
            <Text>API Demo</Text>
            
            <Text>
                {JSON.stringify(data,null,5)}
            </Text>

        </View>
    );
}

export default APIdemo;