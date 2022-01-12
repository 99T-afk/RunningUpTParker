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
  const heightTextChange = (newHeight) => {
    onChangeStepHeight(newHeight);
    context.changeStepHeight(parseInt(newHeight));
  };

    return (
      <DismissKeyboard>
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
        </View>
      </DismissKeyboard>
    );
  }


const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  buttonContainer: {
    marginTop: 28,
    flexDirection: "row",
  },
  inputIn: {
    fontSize: 22,
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