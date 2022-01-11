import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Context } from '../components/Context';
import SQL_out from '../components/DB_Functions';

const UpdateStepsList = ({getData}) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    console.log("AddOrUpdateSteps called");
    
    //GET DATA HERE FROM CONTEXT
    var stepsToday = 100;
    var verticalToday = 60;

    var doesDateExistQ = false;
    for (let index = 0; index < getData.length; index++) {
        if(getData[index].dateStep == today){
        //is today, update
        var newSteps = getData[index].stepsTaken + stepsToday //<<<< ADD STEPS FROM CONTEXT
        var newHeight = getData[index].heightTaken + verticalToday //<<<< ADD HEIGHT FROM CONTEXT
        SQL_out.updateSteps(today, newSteps, newHeight);  
        doesDateExistQ = true;    
        }
    }

    //no record exists, create one for today
    if(doesDateExistQ == false){
        SQL_out.addNewSteps(today, stepsToday, verticalToday);
    }

    return(
        <View><Text>Updated entries!</Text></View>
    )
};


export default UpdateStepsList;
