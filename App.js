/**
 * @fileoverview App.js - default entry point for the application.
 */
import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Context } from "./components/Context.js";
import { AntDesign, Feather, FontAwesome5, Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from '@react-navigation/native';
import TrackingScreen from "./screens/TrackingScreen";
import RunScreen from "./screens/RunScreen";
import SettingsScreen from "./screens/SettingsScreen";
import PedometerScreen from "./screens/PedometerScreen";


const Tab = createMaterialTopTabNavigator();
const StackNav = createNativeStackNavigator();

/**
 * MyTabs - A function that initialises the bottom tag navigator.
 * @returns 
 */
function MyTabs() {
  return (
    <Tab.Navigator
      activeColor="#ff7c3b"
      inactiveColor="#ffffff"
      tabBarPosition="bottom"
      barStyle={{ backgroundColor: "#ff7c3b" }}
      screenOptions={{
        tabBarItemStyle: { height: 60 },
      }}
      >
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Run",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="running" size={24} color="#ff7c3b" />
          ),
        }}
        name="Run"
        component={RunScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: "Track",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="linechart" size={24} color="#ff7c3b" />
          ),
        }}
        name="Track"
        component={TrackingScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="cog" size={24} color="#ff7c3b" />
          ),
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </Tab.Navigator>
  );
}

/**
 * StackNav - a function that defines the stack navigator that encapsulates the entire project.
 * @returns 
 */
 const StackNavComponent = () => {
  return (
    <StackNav.Navigator initialRouteName={{ MyTabs }}>
      <StackNav.Screen
        name="Tab"
        component={MyTabs}
        options={{
          headerShown: false,
          marginTop: StatusBar.currentHeight || 0,
        }}      
      />
            <StackNav.Screen
        name="TrackingScreen"
        component={TrackingScreen}
        options={{
          headerShown: false,
          marginTop: StatusBar.currentHeight || 0,
        }}
      />
      <StackNav.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          headerShown: false,
          marginTop: StatusBar.currentHeight || 0,
        }}
      />    
    </StackNav.Navigator>
  );
};

export default function App() {
  const [context, setContext] = useState(0); //was 0

  const [stepsToday, setStepsToday] = useState(0);
  const [stepVerticalToday, setVerticalToday] = useState(0);
  const [stepsHeightOfSteps, updateStepHeight] = useState(20);

  const contextObject = {
    stepsToday: stepsToday,
    addStepsToday: (addition) => {
      addition += stepsToday;
      setStepsToday(addition);
    },
    stepVerticalToday: stepVerticalToday,
    addVerticalToday: (verticalAdd, height) => {
      verticalAdd = stepVerticalToday + (verticalAdd * (height / 100));
      setVerticalToday(Math.round(verticalAdd * 100) / 100)
    },
    stepsHeightOfSteps: stepsHeightOfSteps,
    changeStepHeight: (stepIn) => {
      updateStepHeight(stepIn);
    },
    stepsCount: 0,
    
  }

  return (
    <Context.Provider value={contextObject}>     
      <NavigationContainer>
        <View style={styles.topbar}>
        </View>
        <StackNavComponent/>
      </NavigationContainer>     
    </Context.Provider>  
  );
}


const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLogo: {
    width: 150,
    height: 40,
    alignItems: "flex-start",
  },
});


/*



      */