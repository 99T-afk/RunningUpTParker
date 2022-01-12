/**
 * @fileoverview Intialised a pedometer, which sends the data to a context.
 */
import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Context } from '../components/Context';

/**
 * PedometerFunc - the pedometer set up as a function.
 * @returns The pedometer step data, as it happens, to the context steps and height.
 */
export default function PedometerFunc() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const context = useContext(Context);

  let _subscription;

  const _subscribe = () => {
    _subscription = Pedometer.watchStepCount(result => {
      setCurrentStepCount(result.steps);
      
      //add steps to the context
      context.addStepsToday(result.steps);

      //add vertical height to the context
      var stepHeight = context.stepsHeightOfSteps
      context.addVerticalToday(result.steps, stepHeight);
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
      <View></View>
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
