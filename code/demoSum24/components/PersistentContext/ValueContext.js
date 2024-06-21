/*
This implements a value context which allows a component to
access a globally available JSON object (currentValue) and to
change it using setCurrentValue. Moreover, the currentValue
is initiallized with Persistent storage and every call to 
setCurrentValue stores the new value in local memory.

*/
import React, { useState, useEffect, useContext, createContext } from "react";
import regeneratorRuntime from "regenerator-runtime";
import storage from './Storage';    

export const ValueContext = createContext(null)

export const ValueProvider = ({value, children}) => {
  const [currentValue,setCurrentValue] = useState(value);
  const [firstCall, setFirstCall] = useState(true);

// to clear the data, uncomment the next line and comment out the one after
// load the app, then return to this state and the memory will be cleared
  //  useEffect(() => {clearAll()})
  useEffect(() => {getData(currentValue,setCurrentValue);setFirstCall(false)},[]) 
  
  // this stores the currentValue whenever there is a change
  // except when the app is first loaded, then getData stores the
  // initial value...
  useEffect(() => {firstCall || storeData(currentValue)},[currentValue])


  return (
    <ValueContext.Provider
        value={{currentValue,setCurrentValue}} >
      {children}
    </ValueContext.Provider>
   )
}


/*
We manipulate the local storage with three functions:
getData(currentValue, setCurrentValue)
   -- this looks in memory for the key "sharedData" and id "1"
   if it is not found, then it stores the currentValue in memory
   if it is found, then it calls setCurrentValue 
*/

  const getData = async (currentValue,setCurrentValue) => {
        try {
             storage
                .load({
                    key: 'sharedData',
                    id: '1'
                })
                .then(ret => {
                    // found data goes to then()
                    if (ret==undefined) {
                      store_data(currentValue);
                      console.log('storing initial value in memory')
                    } else {
                      console.log('getting data from memory')
                      console.dir(ret)
                      setCurrentValue(ret);
                    }
                    }
                    

                )
                .catch(err => {
                    // any exception including data not found
                    // goes to catch()
                    console.dir(err)
                    console.warn(err.message);
                    switch (err.name) {
                    case 'NotFoundError':
                        // if data is not found, initialize it
                        // with the currentValue
                        storeData(currentValue)
                        console.log('NotFoundError');
                        break;
                    case 'ExpiredError':
                        // TODO
                        console.log('ExpiredError');
                        break;
                    }
                });
                
        } catch (e) {
            console.log("error in getData ")
            console.dir(e)
            // error reading value
        }
      }

  const storeData = async (value) => {
        try {
            await storage.save({
                key: 'sharedData', // Note: Do not use underscore("_") in key!
                id: '1', // Note: Do not use underscore("_") in id!
                data: value,
                expires: null  //  0 = never expires, 1000ms * 60 = 1min
              });
          const jsonValue = JSON.stringify(value)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
          // saving error
        }
  }

  
  const clearAll = async () => {
        try {
          console.log('in clearData')
          await storage.clearMapForKey('sharedData');
        } catch(e) {
          console.log("error in clearAll ")
          console.dir(e)
          // clear error
        }
  }



export default ValueProvider
export const useValue = () => useContext(ValueContext)