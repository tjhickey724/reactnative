// here is the starting code:
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';



const Exam3cStart = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);

    const getMeals = async () => {
        try {
          const url = "https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast"
          const response = await fetch(url);
          const json = await response.json();
          setData(json.meals); 
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };

    useEffect(() => {getMeals()}, [])

    return(
        <View>
            <Text>API Demo</Text>
            <Text>{JSON.stringify(data,null,5)}</Text>

        </View>
    );
}

export default Exam3cStart;