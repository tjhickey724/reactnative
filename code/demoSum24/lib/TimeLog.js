/*
timelog maintains a history of the alarms that the user has set ..
*/

class TimeLog {
    constructor(alarm_list) {
      this.alarm_list=alarm_list
    }
    addAlarm(alarm) {
      this.alarm_list = this.alarm_list.concat(alarm)
    }
    alarmCount(){
     return(this.alarm_list.length)
    }
  }

  export default TimeLog;
  