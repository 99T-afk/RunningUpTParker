/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import React, { useState, useContext } from "react";
 import { View, Text } from 'react-native';
 import PedometerComp from '../components/PedometerComp';
 import PedometerFunc from '../components/PedometerFunc';
 import { Context } from '../components/Context.js';

 /**
  * TESTING SCREEN
  */
export default function PedometerScreen() {
  const [context, setContext] = useContext(Context);
    return (
      <View style={{ flex: 1}}>
        <PedometerFunc></PedometerFunc>
        <Text>Steps via context: {context}</Text>
      </View>
    );
  }