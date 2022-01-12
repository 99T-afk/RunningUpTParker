/**
 * @fileoverview Gets and diplays the next goal to be reached.
 */
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native';
import getGoals from './goals';

let goalData = getGoals();

/**
 * GoalsTracker - gets the goal data, and checks current stepdata against it.
 * @param {*} stepVerticalToday The current height to be measured/
 * @returns Displays text stating the next goal.
 */
export default function GoalsTracker({stepVerticalToday}){
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
        <View style={styles.goalContainer}>
            <Text style={styles.textStyle}>Your next goal: {nextGoalName}, located in {nextGoalLocation}, is <Text style={{fontWeight: 'bold'}}>{nextGoalElevation}m tall!</Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({
    goalContainer: {
        padding: 5,
        borderRadius: 5,
        borderWidth: 3
    },
    textStyle: {
      fontSize: 20,
    }
})