import React,{useState} from 'react';
import {View, Button, Text} from 'react-native';

import CoinCount from './CoinCount';

const App = () => {
    const [change,setChange] = useState(0)

    return (
      <View>
            <Text style = {{fontSize: 40}}>
                U.S. Change Counter
            </Text>
            <Text style = {{fontSize: 20}}>
                {change}
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}} >
                <CoinCount coinName="Penny" coinValue={1} />
                <CoinCount coinName="Nickel" coinValue={5} />
                <CoinCount coinName="Dime" coinValue={10} />
                <CoinCount coinName="Quarter" coinValue={25} />
                <CoinCount coinName="Half Dollar" coinValue={50} />
                
            </View>
      </View>
    )
  }


export default App;
