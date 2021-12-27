/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import * as React from 'react';
 import { StatusBar } from 'expo-status-bar';
 import { StyleSheet, Text, View } from 'react-native';
 
 /**
  * TESTING SCREEN
  */
 export default function RunScreen() {
     return (
        <View style={styles.container}>
            <Text>Hey!</Text>
        </View>
     );
   }

const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    marginTop: 48,
    flex: 1,
    backgroundColor: "#fff333",
  }
});