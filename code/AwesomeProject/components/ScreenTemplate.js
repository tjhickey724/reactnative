import React from "react";
import { SafeAreaView, View} from 'react-native'
const ScreenTemplate = ({header,footer,children}) => {
  return (
    <SafeAreaView style={{flex:1,padding:10,margin:0,backgroundColor:'#eca'}}>
      {header}
      <View style={{flex:1, backgroundColor:"#eee",margin:20}}>
            {children}
      </View>
      {footer}
    </SafeAreaView>
  )
}
export default ScreenTemplate
