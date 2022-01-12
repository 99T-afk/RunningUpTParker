/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import React, { useState, useEffect, useContext } from 'react';
 import { View, Text, Button, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
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
        <ScrollView>
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
          
            <View>
            <Text style={styles.headerText}>Welcome!</Text>
            <Text style={styles.bodyText}>Thank you for downloading RunningUp. The purpose of this is to make exercise fun by using stairs, measuring the vertical increase and comparing it to real landmarks!  With this app, you can walk the height of Everest from the comfort of your own home! </Text>
            <Text style={styles.headerText}>How to use:</Text>
            <Image
              style={styles.imageStyleOut}
              source={require("../assets/explainOne.png")}
            />
            <Text style={styles.bodyText}>When using the button input, press the orange button after you have gone up and down the stairs once, which constitutes a single trip.</Text>
            <Text style={styles.headerText}>Tips:</Text>
            <Text style={styles.bodyText}>- Using the button mode allows you to put your phone down, useful if you get tired of carrying it!</Text>
            <Text style={styles.bodyText}>- Always hold the handrail if one is available.</Text>
            <Text style={styles.bodyText}>- Remember to take frequent breaks.</Text>
            <Text style={styles.bodyText}>- Don't forget to update your tracking on the Track page when you're finished!</Text>
            </View>
          
        </View>
        </ScrollView>
      </DismissKeyboard>
    );
  }


const styles = StyleSheet.create({
  containerS: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
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
  imageStyleOut: {
    width: 400,
    height: 150,
    padding: 2,
    resizeMode: 'contain',
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  bodyText: {
    fontSize: 16,
    paddingLeft: 4,
  }
});