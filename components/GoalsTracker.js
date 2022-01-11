import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import getGoals from './goals';

let goalData = getGoals();

export default function GoalsTracker({stepVerticalToday}){
    console.log("Goal tracker ran!")
    var nextGoalLocation = "";
    var nextGoalElevation = 0;

    for (let index = 0; index < goalData.length; index++) {
        if(goalData[index].elevation > stepVerticalToday){
            nextGoalLocation = goalData[index].name;
            nextGoalElevation = goalData[index].elevation;
            break;
        }              
    }

    return(
        <View>
            <Text>Your next goal: {nextGoalLocation} is {nextGoalElevation}m tall!</Text>
        </View>
    )
}