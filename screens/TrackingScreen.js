/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import * as React from 'react';
 import { StatusBar } from 'expo-status-bar';
 import { StyleSheet, Text, View } from 'react-native';
 import PedometerComp from '../components/PedometerComp';
 
 /**
  * TESTING SCREEN
  */
export default function TrackingScreen() {
     return (
        <View style={styles.container}>
          <Text style={styles.statisticText}>Total Steps: </Text>
          <Text style={styles.statisticText}>Total Height: </Text>
        </View>
     );
   }

const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    marginTop: 28,
  },
  statisticText: {
    textAlign: "center",
    fontSize: 20,
  }
});