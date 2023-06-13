import React, { useState, useEffect } from 'react';
import { Text, FlatList, View } from 'react-native';

const Movie = ({ title, releaseYear }) => (
    <View style={{backgroundColor:'lightblue'}}>
        <Text>{title}, {releaseYear}</Text>
    </View>
);

const APIdemo = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const getMovies = async () => {
        try {
          const response = await fetch('https://reactnative.dev/movies.json');
          const json = await response.json();
          setData(json.movies); 
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {getMovies()}, [])

    return(
        <View>
            <Text>API Demo</Text>
            
            <FlatList
                data={data.slice(0,20)}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <Movie
                        title={item.title}
                        releaseYear={item.releaseYear}  
                    />
                )}
            />

        </View>
    );
}

export default APIdemo;