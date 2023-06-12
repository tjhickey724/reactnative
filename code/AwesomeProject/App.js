import React from 'react';
import {View,Text} from 'react-native';

import RealApp from './components/StackDemo';

const App = () => {
    return (
        <View style={{flex:1}}>
            <Text style={{textAlign:'center',fontSize:40}}>StackDemo</Text>
            <RealApp/>
        </View>

    )
}
export default App
