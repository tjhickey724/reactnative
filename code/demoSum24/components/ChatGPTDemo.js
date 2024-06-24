/*
This is a demo of the OpenAI API in React Native
*/

import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View } from 'react-native';
import axios from 'axios';  // make sure you npm install axios    
import open_api_key from './open_api_key';  // this is in .gitignore don't push to github


/*
open_api_key.js has the form
export default "your key here";
and .gitignore has the line 
   open_api_key.js
as you don't want to put your API key into github!
*/



const APIdemo = () => {
    const [data,setData] = useState([]);
    const [promptText,setPromptText] = useState("");
    const [prompt,setPrompt] = useState("what is three times five?");
    const [loading,setLoading] = useState(true);

    const getResponse = async () => {
        try {
            const url = 'https://api.openai.com/v1/chat/completions'
            const config = {headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                Authorization: 'Bearer '+open_api_key,
              },}
            const msg_data = {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
              }
            const response =
                await axios.post(url,msg_data,config)


          const result = await response.data;  // don't need await??
          setLoading(false);
          setData(result);
        } catch (error) {
          console.error(error);
        } finally {
            setLoading(false);
        }
      };


    useEffect(() => {getResponse()}, [prompt])

    const ChatReponse = ({role,content}) => (
        <View style={{backgroundColor:'lightblue',margin:10,padding:20,}}>
            <Text>ChatGPT Response to the prompt is:</Text>
            <Text style={{backgroundColor:'white'}}>{content}</Text>
        </View>
    );

    const debugging = true;
    return(
        <SafeAreaView style={{flex:1, fontSize:24,margin:30}}>
            <Text>API Demo</Text>
            <Text style={{marginTop:30}}>Prompt: </Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding:10, margin:10 }}
                onChangeText={text => setPromptText(text)}
                value={promptText}
            />

            <Button
                onPress={() => {setLoading(true); setData({choices:[]}); setPrompt(promptText);}}
                title={loading?'awaiting response':"Ask GPT"}
                color="#841584"
                accessibilityLabel="Send"
            />

            
            {debugging && 
            <Text>
                {JSON.stringify(data.choices) }
            </Text>}
            
            
            <FlatList
                data={data.choices}
                keyExtractor={({ index }) => index}
                renderItem={({item}) => (
                    <ChatReponse {...item.message} />
                   
                    
                )}
            />
                

        </SafeAreaView>
    );
}

export default APIdemo;