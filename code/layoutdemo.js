import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// const App = () => {...}
export default function App() {
  return (
    <View style={styles.container}>
      <View style={{flex:1, flexDirection:'column',
              alignItems:'center',justifyContent:'space-around',backgroundColor:'yellow',}}>
          <Text style={{fontSize:24}}>
              Flex Demo 2
          </Text>
          <Text style={{fontSize:14, backgroundColor:'white', padding:20}}>
              Second text object
          </Text>
      </View>
      <View style={{flex:2, flexDirection:'column'}}>
        <View style={{flex:1, backgroundColor:'red'}}>
          <Text style={{fontSize:32, }}> Left</Text>
        </View>
        <View style={{flex:9, backgroundColor:'aqua'}}>
          <Text style={{fontSize:32, }}>
              <Text style={{fontSize:64}}> Right.</Text>
              The header and footer all take 10% of the vertical screen space.
              The sidebar takes 1/3 of the horizontal space.
          </Text>
        </View>
        <View style={{flex:1, alignItems:'center',backgroundColor:'mauve',}}>
            <Text style={{fontSize:64}}>
                Footer
            </Text>
        </View>
      </View>


    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'stretch',
    flexDirection:'row',
  },
});
