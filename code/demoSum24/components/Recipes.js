import React, { useState, useEffect } from 'react';
import { Text, FlatList, View, Image, TextInput } from 'react-native';

const Recipes = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredient, setIngredient] = useState('');
  const [clubs,setClubs] = useState([]);
  const clubURL = "https://raw.githubusercontent.com/tjhickey724/reactnative/main/code/clubs.json";

  const getClubs = async () => {
    try {
      const url = clubURL;
      const response = await fetch(url);
      console.log('response ='+JSON.stringify(response))
      const json = await response.json();
      setClubs(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMeals = async () => {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
      const response = await fetch(url);
      const json = await response.json();
      setData(json.meals);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMeals();
  }, []);


  useEffect(() => {
    getClubs();
  }, []);

  const handleSearch = () => {
    setLoading(true);
    getMeals();
    getClubs();
  };

  const renderMeal = ({ item }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <View
        style={{
          backgroundColor: 'peachpuff',
          borderWidth: 2,
          borderColor: 'black',
          borderRadius: 1,
          padding: 5,
          width: 600,
          height: 320,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Text style={{ marginRight: 5, marginLeft: 10, flex: 1, marginTop: -50 }}>{item.strMeal}</Text>
        <Image
          source={{ uri: item.strMealThumb }}
          style={{ width: 250, height:250, marginRight: 50 }}
        />
      </View>

    </View>
  );

  return (
    <View>
            <Text>{JSON.stringify(clubs)}</Text>
      <Text style={{ color: 'black', fontSize: 70, textAlign: 'left', marginBottom: 10 }}>Meal Finder</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        placeholder="Enter main ingredient..."
        value={ingredient}
        onChangeText={(text) => setIngredient(text)}
        onSubmitEditing={handleSearch} // Trigger search when the Enter key is pressed
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderMeal}
        />
      )}

    </View>
  );
};

export default Recipes;