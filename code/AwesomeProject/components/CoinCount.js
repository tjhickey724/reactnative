import React,{useState} from 'react';
import {View,Text,Button} from 'react-native';

//const CoinCount = ({coinName,coinValue,updateTotal}) => {
const CoinCount = (props) => {
    // without destructuring looks like this ...
    const coinName = props.coinName;
    const coinValue = props.coinValue;
    const updateTotal = props.updateTotal;

    const [value,setValue] = useState(0);
    return (
        <View style={{flex: 1, 
                      flexDirection: 'row',
                      margin:10,
                      borderWidth:2,
                      borderColor:'blue'}} >
                
                <Button
                    title={coinName}
                    onPress = {() => {
                                         setValue(value+coinValue);
                                         updateTotal(coinValue);
                                     }
                            }
                />
                <Text> value={value}</Text>
        </View>
    )
}

export default CoinCount;

