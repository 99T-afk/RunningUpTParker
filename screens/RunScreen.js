/**
 * @fileoverview - Returns the run screen, which renders components for tracking steps
 */
 import React, { useState, useContext } from 'react';
 import { StatusBar } from 'expo-status-bar';
 import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
 //import { TouchableOpacity } from "react-native-gesture-handler";
 import PedometerComp from '../components/PedometerComp';
 import { Context } from '../components/Context';
 import StepsHeightDisplay from '../components/StepsHeightDisplay';
import PedometerFunc from '../components/PedometerFunc';
import GoalsTracker from '../components/GoalsTracker'; 


 /**
  * TESTING SCREEN
  */
const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  /*
const AddSteps = () => {
  var newStepVerticalToday = (stepHeight * stepCount) / 100;
  var newStepCountToday = (stepCount * 2) + stepCount
  onChangeStepCountToday(newStepCountToday);
  onChangeStepVerticalToday(newStepVerticalToday);
}
*/

export default function RunScreen() {
  //const [context, setContext] = useContext(Context);
  const [recordingAction, recordingActionUpdate] = useState(true); //true = button
  const [stepHeight, onChangeStepHeight] = useState(20);
  const [stepCount, onChangeStepCount] = useState(5);
  const [stepVerticalToday, onChangeStepVerticalToday] = useState(0);
  const [stepCountToday, onChangeStepCountToday] = useState(0);
  const [context, setContext] = useContext(Context);

//<StepsHeightDisplay stepVerticalToday={stepVerticalToday} stepCountToday={stepCountToday}/>

     return (
      <DismissKeyboard>
       <View>
            <View style={styles.walkingText}>
              <Text style={styles.statisticText}>Steps from button: {stepCountToday}</Text>
              <Text style={styles.statisticText}>Steps from pedometer: {context}</Text>
              <Text style={styles.statisticText}>Total Steps: {stepCountToday + context}</Text>
              <Text style={styles.statisticText}>Height today: {stepVerticalToday}m</Text>        
            </View>
            <View>
            <View style={styles.topbar}>
            <GoalsTracker stepVerticalToday = {stepVerticalToday}/>
                <Text style={styles.titleStyle}>Select the recording action:</Text>
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
                            alert(
                              "Please note - this is currently only available on IOS."
                            );
                            recordingActionUpdate(false);
                          }}
                        >
                          <Text style={styles.textStyle}>Pedometer</Text>
                        </TouchableOpacity>               
                      </View>
                    </View>
                  </View>
                </View>          
              </View>
              </View>
              <View>{!recordingAction ? (<PedometerFunc></PedometerFunc>) : 
              <View style={{marginTop: 100}}><TouchableOpacity 
                style={styles.completedStepBox}
                onPress={() => {
                  var newStepVerticalToday = ((stepHeight / 100) * stepCount) + stepVerticalToday;
                  var newStepCountToday = (stepCount * 2) + stepCountToday;
                  onChangeStepCountToday(newStepCountToday);
                  onChangeStepVerticalToday(newStepVerticalToday);     
                }}
                >
              <Text style={styles.textStyle}>Completed a trip</Text>
              
            </TouchableOpacity></View> }</View>

            <View>
            
            <Text style={styles.inputIn}>Step height (cm): </Text>
            <TextInput
              style={styles.inputIn}
              onChangeText={stepHeight => onChangeStepHeight(stepHeight)}
              value={stepHeight.toString()}
              placeholder="Step Height (cm)"
              keyboardType="numeric"
            />
            <Text style={styles.inputIn}>Step count: </Text>
            <TextInput
              style={styles.inputIn}
              onChangeText={stepCount => onChangeStepCount(stepCount)}
              value={stepCount.toString()}
              placeholder="Step count"
              keyboardType="numeric"
            />    
            </View>
          </View>
      </DismissKeyboard>
     );
   }

const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 10,
  },
  container: {
    flex: 1,
    padding: 15,
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
    fontSize: 22,
  },
  outerBoxStyle: {
    backgroundColor: "#fffefc",
    flexDirection: "row",
    borderWidth: 3,
    borderRadius: 5,
    height: 66,
    width: "100%",
  },
  opacityStyle: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    height: 53,
  },
  titleStyle: {
    marginTop: 3,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 15,
  },
  completedStepBox: {
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    height: 200,
    paddingTop: 90,
  },
  walkingText: {
    marginTop: 28,   
  } 
});