/*
This is a demo of a screen that has a header and a footer
and that uses the ScreenTemplate component to provide the
app with a consistent look and feel.
*/

import React from 'react';
import { Text, View, Image} from 'react-native';
import ScreenTemplate from './ScreenTemplate';

const Header=()=>{
    return(
        <Text style={{fontSize:32,fontWeight:'bold', textAlign:'center'}}>this is the header </Text>
    )
};

const Footer=()=>{
    return(
        <Text style={{fontSize:32, fontStyle:'italic', textAlign:'center'}}>this is the footer </Text>
    )
};


const PhotoID=({name,imageurl})=>{
    return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center',}}>
            <Text>Name: {name}</Text>
            <Image source={{uri:imageurl}} style={{width:300,height:400}} />
        </View>
    )
};



const App=()=>{
    return(
        <ScreenTemplate
            header={<Header />}
            footer={<Footer />}
        >
            <Text style={{fontSize:60,textAlign:'center'}}>Screen Demo</Text>
            <PhotoID 
                name="Tim Hickey" 
                imageurl="https://www.brandeis.edu/precollege/images/tim-hickey-speaking"
            />
        </ScreenTemplate>
    )
}

export default App;

