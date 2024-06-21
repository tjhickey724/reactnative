
import React,{useState, useEffect} from 'react';
import { SafeAreaView,StyleSheet, Text, Button, View } from 'react-native';
import moment from 'moment';

// may need to write preciseDiff(d1,d2) .... 

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function dateDiff(startingDate, endingDate) {
    let startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    let endDate = new Date(endingDate);
    if (startDate > endDate) {
      const swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    const startYear = startDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    let yearDiff = endDate.getFullYear() - startYear;
    let monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }
    let dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
  
    return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D';
  }

const ShowTime = ({startDate,now}) => {
    try {
            const starts = moment(startDate);
            const ends   = moment(now);
            const duration = moment.duration(ends.diff(starts));

        // with ###moment precise date range plugin###
        // it will tell you the difference in human terms

            // const diff = duration.preciseDiff(starts, ends, true); 
        // example: { "years": 2, "months": 7, "days": 0, "hours": 6, "minutes": 29, "seconds": 17, "firstDateWasLater":  false }

        return (
            <View style={{backgroundColor:'yellow',margin:10,padding:5}}>
                <Text>started at {startDate.toLocaleDateString("en-US")}</Text>
                <Text>seconds: {Math.round((now- startDate)/1000)}</Text>
                <Text>years: {Math.round((now-startDate)/(1000*60*60*24*365))}</Text>
                <Text>months: {monthDiff(startDate, now)}</Text>
                <Text>{JSON.stringify(dateDiff(startDate,now))}</Text>
            </View>
        )
}catch(e){
    console.log(e);
    return (<Text>Error:{JSON.stringify(e)}</Text>)
}
}

const Counter = ({children}) => {
  const [now,setNow] = useState(new Date())
  const [dates, setDates] = 
          useState(
            {a:new Date("6/1/2024"),
             b:new Date("1/1/2023")});
  const [changes,setChanges] = useState(0);
  const updateChanges = () => {
    console.log(`updating changes ${now} ${changes}`);
    setNow(new Date());
    setChanges(changes+1)

  }
  useEffect(() => {
     setInterval(updateChanges,1000);
  },
   [])


  return (
    <SafeAreaView style={styles.container}>
        <ShowTime startDate={dates.a} now={now} />
        <ShowTime startDate={dates.b} now={now} />

      <Text>This is Tim Hickey's Newer App</Text>
      <Text>dates: {JSON.stringify(dates)}</Text>
      <Text>A-now: {(now-dates.a)/(1000*60*60*24)}</Text>
      <Text>A-seconds: {Math.round((now-dates.a)/1000)}</Text>
      <Text>B-now: {(now-dates.b)/(1000*60*60*24)}</Text>
      <Text>B-months: {monthDiff(dates.b, new Date())}</Text>
      <Text>{changes}</Text>
      <Button title="reset a" 
           onPress={() => {
              console.log('a');
              aDate = new Date()
              setDates({...dates, a:aDate})
           }
           }/>
      <Button title="sub 1" 
           onPress={() => console.log('b')}/>
      {children}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//export {Counter};
export default Counter
