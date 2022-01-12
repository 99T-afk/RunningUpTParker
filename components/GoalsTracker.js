import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import getGoals from './goals';

let goalData = getGoals();

export default function GoalsTracker({stepVerticalToday}){
    console.log("Goal tracker ran!")
    var nextGoalName = "";
    var nextGoalElevation = 0;
    var nextGoalLocation = "";

    for (let index = 0; index < goalData.length; index++) {
        if(goalData[index].elevation > stepVerticalToday){
            nextGoalName = goalData[index].name;
            nextGoalElevation = goalData[index].elevation;
            nextGoalLocation = goalData[index].location;
            break;
        }              
    }

    return(
        <View>
            <Text>Your next goal: {nextGoalName}, located in {nextGoalLocation}, is {nextGoalElevation}m tall!</Text>
        </View>
    )
}