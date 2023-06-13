import React,{useState} from 'react';
import {SafeAreaView,View, Button, Text} from 'react-native';

import CoinCount from './CoinCount';

const App = () => {
    const [change,setChange] = useState(0)

    const updateTotal = (val) => {
        setChange(change+val);
    }
    return (
      <SafeAreaView style={{flex:1,}}>
            <Text style = {{fontSize: 40}}>
                U.S. Change Counter
            </Text>
            <Text style = {{fontSize: 20}}>
                total value is {change}
            </Text>
            <View style={{flex: 1, flexDirection: 'column'}} >
                <CoinCount coinName="Penny" coinValue={1} updateTotal={updateTotal}/>
                <CoinCount coinName="Nickel" coinValue={5} updateTotal={updateTotal} />
                <CoinCount coinName="Dime" coinValue={10} updateTotal={updateTotal} />
                <CoinCount coinName="Quarter" coinValue={25} updateTotal={updateTotal} />
                <CoinCount coinName="Half Dollar" coinValue={50} updateTotal={updateTotal} />
                
            </View>
      </SafeAreaView>
    )
  }


export default App;
