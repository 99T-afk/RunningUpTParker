/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import React, { useState, useEffect, useContext } from 'react';
 import { View, Text, Button, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
 import { Context } from '../components/Context';
 import { StatusBar } from 'expo-status-bar';

 /**
  * TESTING SCREEN
  */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);


export default function SettingsScreen() {
  const context = useContext(Context);
  const [stepHeight, onChangeStepHeight] = useState(context.stepsHeightOfSteps);
  const [stepCount, onChangeStepCount] = useState(context.stepsCount)

  const heightTextChange = (newHeight) => {
    onChangeStepHeight(newHeight);
    context.changeStepHeight(parseInt(newHeight));
  };
  const stepCountChange = (newStepCount) => {
    onChangeStepCount(newStepCount);
    context.updateStepCount(parseInt(newStepCount));
  };

    return (
      <DismissKeyboard>
        <View style={{paddingTop: 4,}}>
          <Text style={{fontSize: 18, paddingLeft: 3}}>Change the number of steps below: </Text>
          <View style={styles.topbar}>
            <View style={styles.buttonContainer}>
              <Text style={styles.inputIn}>Step height (cm): </Text>
              <TextInput
                    style={styles.inputIn}
                    onChangeText={stepHeight => heightTextChange(stepHeight)}
                    value={stepHeight.toString()}
                    placeholder="Step Height (cm)"
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.buttonContainer}>
              <Text style={styles.inputIn}>Number of Steps: </Text>
              <TextInput
                  style={styles.inputIn}
                  onChangeText={stepCount => stepCountChange(stepCount)}
                  value={stepCount.toString()}
                  placeholder="Number of steps"
                  keyboardType="numeric"
                />
            </View>
          </View>
        </View>
      </DismissKeyboard>
    );
  }


const styles = StyleSheet.create({
  topbar: {
    height: 90,
    borderWidth: 3,
    borderRadius: 5
  },
  buttonContainer: {
    marginTop: 7,
    flexDirection: "row",
  },
  inputIn: {
    fontSize: 22,
    paddingLeft: 4,
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