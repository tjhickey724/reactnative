import React,{useState,useContext} from 'react';
import {View,Text,Button} from 'react-native';
import UserNameContext from './UsernameContext';
import UsernameContext from './UsernameContext';

//const CoinCount = ({coinName,coinValue,updateTotal}) => {
const CoinCount = (props) => {
    // without destructuring looks like this ...
    const coinName = props.coinName;
    const coinValue = props.coinValue;
    const updateTotal = props.updateTotal;
    const username = useContext(UsernameContext);
    // const globalData = useContext(UsernameContext);

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
                <Text>owned by {username}</Text>
        </View>
    )
}
// owned by {globalData.username}
export default CoinCount;

