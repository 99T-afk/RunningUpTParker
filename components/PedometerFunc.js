import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Context } from '../components/Context';

export default function PedometerFunc() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [context, setContext] = useContext(Context);

  let _subscription;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
      //if breaks, setContext(result.steps)
      setContext(result.steps)
      /*
      var tempArr = context;
      console.log("tempArr: " + tempArr);
      tempArr.stepsToday = result.steps;
      console.log("tempArr: " + tempArr);
      setContext(tempArr);
      */
    });

    Pedometer.isAvailableAsync().then(
      result => {
        setIsPedometerAvailable(result);
      },
      error => {
        setIsPedometerAvailable('Could not get isPedometerAvailable: ' + error);
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        setPastStepCount(result.steps);
      },
      error => {
        setPastStepCount('Could not get stepCount: ' + error);
      }
    );
  };

  const _unsubscribe = () => {
    _subscription && _subscription.remove();
    _subscription = null;
  };


  useEffect(()=>{
    _subscribe();
    return ()=> _unsubscribe();
  },[])

    return (
      <View style={styles.container}>
        <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
        <Text>Steps taken in the last 24 hours: {pastStepCount}</Text>
        <Text>Walk! And watch this go up: {currentStepCount}</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
