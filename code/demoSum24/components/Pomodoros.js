import React, { useState, useEffect }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';

import regeneratorRuntime from "regenerator-runtime";
import storage from './Storage';         

storage.sync = {
    // sync method takes two parameters
    // first param is the name of the sync method
    // the second param is the sync function
    async pomodoros(params) {
      try {
        console.log('in storage.sync.pomodoros');
         
        } catch (err) {
            console.log('error in pomodoros.sync');
        }
    
    }
}

const Pomodoros = () => {
  const [dateTime,setDateTime] = useState("")
  const [goal,setGoal] = useState("")
  const [result,setResult] = useState("")
  const [pomodoros,setPomodoros]= useState([])

  // this loads in the data after the app has been rendered
  useEffect(() => {getData()},[])

  

  const getData = async () => {
        try {
             storage
                .load({
                    key: 'pomodoros',
                    id: '1'
                })
                .then(ret => {
                    // found data goes to then()
                    if (ret==undefined) {
                        ret = []
                    }
                    setPomodoros(ret);
                    setDateTime("")
                    setGoal("")
                    setResult("")   
                    console.log('just read'+JSON.stringify(ret));
                })
                .catch(err => {
                    // any exception including data not found
                    // goes to catch()
                    console.warn(err.message);
                    switch (err.name) {
                    case 'NotFoundError':
                        // if data is not found, initialize it
                        setPomodoros([])
                        setDateTime("")
                        setGoal("")
                        setResult("")   
                        console.log('NotFoundError');
                        break;
                    case 'ExpiredError':
                        // TODO
                        console.log('ExpiredError');
                        break;
                    }
                });
                
        } catch (e) {
            console.log("error in getData ")
            console.dir(e)
            // error reading value
        }

  }

  const storeData = async (value) => {
        try {
            await storage.save({
                key: 'pomodoros', // Note: Do not use underscore("_") in key!
                id: '1', // Note: Do not use underscore("_") in id!
                data: value,
                expires: 1000 * 60  // 1000ms * 60 = 1min
              });
          const jsonValue = JSON.stringify(value)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  
  const clearAll = async () => {
        try {
          console.log('in clearData')
          await storage.clearMapForKey('pomodoros');
        } catch(e) {
          console.log("error in clearAll ")
          console.dir(e)
          // clear error
        }
  }


// Each Pomorodo in the FlatList will be rendered as follows:
  const renderPomodoro = ({item}) => {
    return (
      <View style={styles.pomodoro}>
           <Text>{item.dateTime}</Text>
           <Text>{item.goal} </Text>
           <Text>{item.result} </Text>
      </View>
    )
  }

// We can set debug to true if we want to see all of the state variables
  let debug=true
  const debugView =
    (<View>
      <Text style={styles.headerText}>
        DEBUGGING INFO
      </Text>
      <Text>
         dateTime is ({dateTime})
      </Text>
      <Text>
         goal is ({goal})
      </Text>
      <Text>
         result is ({result})
      </Text>
      <Text>
         pomodoros is {JSON.stringify(pomodoros)}
      </Text>
  </View>);

  // here is where we render the app
  return (

    <View style={styles.container}>
      <Text style={styles.headerText}>Pomodoros</Text>
      <Text style={{fontSize:12}}>
          Enter the info for your current pomodoro below
      </Text>

      <View style={{flexDirection:'row',
                    margin:20,
                    justifyContent:'space-around'}}>
            <TextInput // for the date/time
              style={{fontSize:10}}
              placeholder="Date/Time"
              onChangeText={text => {
                   setDateTime(text);
                 }}
              value = {dateTime}
            />

            <TextInput // for the goal
              style={{fontSize:12}}
              placeholder="Goal"
              onChangeText={text => {
                   setGoal(text);
                 }}
              value = {goal}
            />

            <TextInput // for the result
              style={{fontSize:12}}
              placeholder="Result"
              onChangeText={text => {
                   setResult(text);
                 }}
              value = {result}
            />
        </View>
        <View style={{flexDirection:'row',
                      justifyContent:'space-around'}}>
        <Button
               title={"Record"}
               color="blue"
               onPress = {() => 
                {
                 const newPomodoros =
                   pomodoros.concat(
                     {'dateTime':dateTime,
                      'goal':goal,
                      'result':result,
                      'completed':new Date()
                   })
                 setPomodoros(newPomodoros)
                 storeData(newPomodoros)
                 setDateTime("")
                 setGoal("")
                 setResult("")
               }}
               />
        <Button
                title={"Clear"}
                color="red"
                onPress = {() => {
                  clearAll()
                  setPomodoros([])
                }}
                />

      </View>
      <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'lightgray'}}>
        <Text style={{fontSize:20,
                      color:'green',backgroundColor:'lightgray'}}>
              History of Pomodoros
         </Text>
      </View>

      <FlatList
        data={pomodoros}
        renderItem={renderPomodoro}
        keyExtractor={item => item.dateTime}
      />

      {debug?debugView: <Text></Text>}

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#eee',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  pomodoro:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'#aaa',
    fontSize: 32,
    padding:10,
    color: 'blue'
  },

});


export default Pomodoros;