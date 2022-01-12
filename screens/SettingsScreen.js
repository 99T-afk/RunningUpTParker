/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
 import React, { useState, useEffect, useContext } from 'react';
 import { View, Text, Button, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Alert, BackHandler, Platform } from 'react-native';
 import { Context } from '../components/Context';
 import { StatusBar } from 'expo-status-bar';
 import SQL_out from '../components/DB_Functions';

/**
 * A function which enables the user to "tap off" the keyboard to close it.  Useful as iphone keyboards do not have a return button.
 * @param {*} children - all child props inside the component.
 * @returns 
 */
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

/**
 * SettingsScreen - Displays settings and a small tutorial on how to use the app.
 * @returns A screen giving the option to change step count and height, as well as instructions on using the app.
 */
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

  function clearData(){
    SQL_out.clearDB()
    BackHandler.exitApp();
    context.addVerticalToday(0, 0);
    context.addStepsToday(0);
    console.log("All data cleared.");
  }

  const clearDataAlert = () =>
  Alert.alert(
    "Clear all data",
    "This option will clear all data, are you sure you want to proceed?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => clearData()}
    ]
  );

    return (
      <DismissKeyboard>
        <ScrollView>
        <View style={{paddingTop: 4,}}>
          <Text style={styles.headerText}>Change the number of steps below: </Text>
          <View style={styles.topbar}>
            <View>
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
            {Platform.OS === 'android' ? <View  style={{marginTop: 15, paddingRight: 10, right: 60}}><Button title="Update" onPress={() => alert("Configuration saved!")}></Button></View> 
            : <TouchableOpacity style={{marginLeft: 80, marginTop: 10, height: 50, width: 70, justifyContent: "center", backgroundColor: "#ff7c3b", borderRadius: 5}} onPress={() => alert("Configuration saved!")}>
            <Text style={{alignSelf: "center"}}>Update</Text>
          </TouchableOpacity>}
            
            
          </View>
          
            <View>
            <Text style={styles.headerText}>Welcome!</Text>
            <Text style={styles.bodyText}>Thank you for downloading RunningUp. The purpose of this app is to make exercise fun by using stairs, measuring the vertical increase and comparing it to real landmarks!  With this app, you can walk the height of Everest from the comfort of your own home! </Text>
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
            <View style={{marginTop: 30, height: 90}}>
              <TouchableOpacity
                style={styles.buttonClear}
                onPress={clearDataAlert}
              >
                <Text style={{fontSize: 30, justifyContent: "center", alignSelf: "center", paddingTop: 20}}>Clear all data</Text>
              </TouchableOpacity>
            </View>
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
    borderRadius: 5,
    marginTop: 5,
    flexDirection: "row"
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
    fontWeight: 'bold',
    paddingLeft: 2,
  },
  buttonClear: {
    backgroundColor: "#de0012",
    height: 90
  },
  bodyText: {
    fontSize: 16,
    paddingLeft: 4,
  }
});