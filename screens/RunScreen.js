/**
 * @fileoverview - Returns the run screen, which renders components for tracking steps
 */
import React, { useState, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button, Platform } from 'react-native';
import { Context } from '../components/Context';
import PedometerFunc from '../components/PedometerFunc';
import GoalsTracker from '../components/GoalsTracker'; 


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
 * RunScreen - Main functionality of the program.
 * @returns A screen showing the step count, vertical distance covered, goals, and button input.
 */
export default function RunScreen() {
  const [recordingAction, recordingActionUpdate] = useState(false); //true = button
  const [stepHeight, onChangeStepHeight] = useState(20);
  const [stepCount, onChangeStepCount] = useState(5);
  const [stepVerticalToday, onChangeStepVerticalToday] = useState(0);
  const [stepCountToday, onChangeStepCountToday] = useState(0);
  const context = useContext(Context);

  return (
    <DismissKeyboard>
      <View>
        <View style={styles.bumperTopBar}></View>
      <View style={{justifyContent: 'space-evenly', flexDirection: "row"}}>
            <Text style={styles.statisticText}>Total Steps:</Text>
            <Text style={styles.statisticText}>Height today:</Text>   
        </View>
      <View style={styles.containerSettings}>
        
                  <View
                    style={[
                      styles.container,
                      {
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={styles.outerBoxStyle}>
                      <View
                        style={
                          (styles.opacityStyle, { flex: 1, height: 60 })}
                      >
                        <TouchableOpacity
                          theme="Button"
                          style={{ height: "100%" }}
                        >
                          <Text style={styles.textStyle}>{context.stepsToday}</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={
                          (styles.opacityStyle, { flex: 1, height: 60 })}                      
                      >
                        <TouchableOpacity
                          theme="Pedometer"
                          style={{ height: "100%" }}                        
                        >
                          <Text style={styles.textStyle}>{context.stepVerticalToday}m</Text>
                        </TouchableOpacity>               
                      </View>
                    </View>
                  </View>
                </View> 

            
              <View style={styles.topbar}>
              <View style={{marginLeft: 5, marginRight: 5}}>
              <GoalsTracker stepVerticalToday = {context.stepVerticalToday}/>
              </View>
                  <Text style={styles.titleStyle}>Select the recording action:</Text>              
                  <View style={styles.buttonContainer}>        
                    <TouchableOpacity
                      style={styles.buttonSwitch}
                      onPress={() => {
                        recordingActionUpdate(false);
                        console.log("touchable btn pressed");
                      }}>
                    <Text style={{fontSize: 18}}>Button</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.buttonSwitch}
                      onPress={() => {
                        recordingActionUpdate(true);
                        if(Platform.OS === 'android'){
                          alert("Error - Sorry, but at this time, the pedometer function is only supported on IOS devices. ")
                        }
                        console.log("touchable pedometer pressed");
                      }}>
                    <Text style={{fontSize: 18}}>Pedometer</Text>
                    </TouchableOpacity>
                  </View>     
            </View>
              
              <View>{recordingAction ? (
                <View style={{marginTop: "5%", padding: 5}}>
                  <PedometerFunc></PedometerFunc>
                  <TouchableWithoutFeedback 
                  style={styles.completedStepBoxPedometer}
                  >
                    <Text style={styles.textStyle}>Pedometer active, start walking!</Text>
                    
                  </TouchableWithoutFeedback>
                  <Image
                      style={styles.imageStyle}
                      source={require("../assets/walkingUpGuy.png")}
                    />
                  </View>) : 
                <View style={{marginTop: "5%", padding: 5}}>
                  <TouchableOpacity 
                  style={styles.completedStepBox}
                  onPress={() => {
                    context.addVerticalToday((context.stepsCount * 2), context.stepsHeightOfSteps);
                    context.addStepsToday((context.stepsCount * 2));
                  }}
                  >
              <Text style={styles.textStylePedometer}>Completed a trip!</Text>
              
            </TouchableOpacity><Text style={{marginTop: 2}}>Note - Number of steps and the height can be changed in settings.</Text></View>}</View>
          </View>
      </DismissKeyboard>
    );
  }

const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 100,
  },
  bumperTopBar: {
    marginTop: 20
  },
  imageStyle: {
    width: 100,
    height: 100,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    padding: 5,
  },
  containerSettings: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
  inputIn: {
    flexDirection: "row"
  },
  statisticText: {
    fontSize: 16,
  },
  outerBoxStyle: {
    backgroundColor: "#fffefc",
    flexDirection: "row",
    borderWidth: 3,
    borderRadius: 5,
    height: 70,
    width: "100%",
  },
  opacityStyle: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    height: 40,
  },
  titleStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 34,
    marginTop: 15,
  },
  textStylePedometer: {
    textAlign: "center",
    fontSize: 30,
    color: 'white',
    marginTop: 15,
  },
  completedStepBox: {
    backgroundColor: "#ff7c3b",
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    height: 170,
    paddingTop: 40,
  },
  completedStepBoxPedometer: {
    backgroundColor: "#b8b8b8",
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    height: 170,
    paddingTop: 40,
  },
  walkingText: {
    marginTop: 28,   
  },
  buttonContainer: {
    marginTop: 10,
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

/*
<View style={styles.containerSettings}>
                  <View
                    style={[
                      styles.container,
                      {
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <View style={styles.outerBoxStyle}>
                      <View
                        style={
                          (styles.opacityStyle,
                          { flex: 1, height: 50 },
                          recordingAction == false
                            ? { backgroundColor: "#fff", flex: 1, height: 60 }
                            : { backgroundColor: "#ff7c3b", flex: 1, height: 60 })
                        }
                      >
                        <TouchableOpacity
                          theme="Button"
                          style={{ height: "100%" }}
                          onPress={() => {
                            recordingActionUpdate(true);
                          }}
                        >
                          <Text style={styles.textStyle}>Button</Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={
                          (styles.opacityStyle,
                          { flex: 1, height: 50 },
                          recordingAction == true
                            ? { backgroundColor: "#fff", flex: 1, height: 60 }
                            : { backgroundColor: "#ff7c3b", flex: 1, height: 60 })
                        }
                      >
                        <TouchableOpacity
                          theme="Pedometer"
                          style={{ height: "100%" }}
                          onPress={(theme) => {
                            if(Platform.OS === "android"){
                              alert(
                                "Please note - this is currently only available on IOS."
                              );
                            } else {
                              recordingActionUpdate(false);
                            }
                            recordingActionUpdate(false);
                            
                          }}
                        >
                          <Text style={styles.textStyle}>Pedometer</Text>
                        </TouchableOpacity>               
                      </View>
                    </View>
                  </View>
                </View> 




                ////////////////////// OLD STEP COUNTERS:
                <View style={styles.walkingText}>
                  <Text style={styles.statisticText}>Steps from button: {stepCountToday}</Text>
                  <Text style={styles.statisticText}>Steps from pedometer: {context.stepsToday}</Text>
                  <Text style={styles.statisticText}>Total Steps: {stepCountToday + context.stepsToday}</Text>
                  <Text style={styles.statisticText}>Height today: {context.stepVerticalToday}m</Text>        
                </View>

                //////////////////// OLD BUTTON ONPRESS:
                                  /*
                  var newStepVerticalToday = ((stepHeight / 100) * stepCount) + stepVerticalToday;
                  var newStepCountToday = (stepCount * 2) + stepCountToday;
                  onChangeStepCountToday(newStepCountToday);
                  onChangeStepVerticalToday(newStepVerticalToday);     
                  */
                
                //////////// OLD RECORDING ACTION TEXT
                //{!recordingAction ? <Text>Using Button!</Text> : <Text>Using Pedometer!</Text> }

                //////////////// updated walking text:
            //     <View style={styles.walkingText}>
            //   <Text style={styles.statisticText}>Total Steps: {context.stepsToday}</Text>
            //   <Text style={styles.statisticText}>Height today: {context.stepVerticalToday}m</Text>        
            // </View>
