import React from 'react';
import {View,Image} from 'react-native';

const App = () => {
    return(
        <View>
            <Image
                style={{width: 500, height: 500}}
                source={require('../assets/icon.png')}
            />
        </View>
    )

    }
export default App;
