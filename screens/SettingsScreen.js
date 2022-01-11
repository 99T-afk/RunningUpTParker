/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import React, { useState, useEffect, useContext } from 'react';
 import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
 //import PedometerComp from '../components/PedometerComp';

 /**
  * TESTING SCREEN
  */
export default function SettingsScreen() {
  const [recordingAction, recordingActionUpdate] = useState(false);
    return (
      <View>
        
      </View>
    );
  }


const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 28,
    flexDirection: "row",
  },
  buttonSwitch: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DDDDDD",
    width: "50%",
    height: 60,
    textAlign: "center",
  },
});