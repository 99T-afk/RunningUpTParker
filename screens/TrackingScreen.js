/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PreviousStepsList from '../components/PreviousStepsList';
import * as SQLite from 'expo-sqlite';
import SQL_out from '../components/DB_Functions';
 
const db = SQLite.openDatabase("db.db");

function getAllPreviousStepsDB() {
  const [allData, onChangeAllData] = useState("cats");

  useEffect(() => {
    db.transaction((tx) => {tx.executeSql('SELECT * FROM previousSteps', null, (txObj, data ) => {onChangeAllData(data.rows._array)},
    () => {console.log("Error - Select all failed")},
    )});
  }, []);

  return allData;
}

export default function TrackingScreen() {
  //SQL_out.createDatabase();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  var stepsTaken = 666;
  var heightTaken = 666;

  //SQL_out.clearDB();

  //SQL_out.addNewSteps(today, stepsTaken, heightTaken);

  //SQL_out.getAllPreviousStepsDB();
  var previousData = getAllPreviousStepsDB();
  //console.log("Previous data: " + previousData);
  //console.log(previousData[0].heightTaken);

  console.log("lists: " + previousData.length);
  //does the list exist already
  var wasNotPresentQ = true;

  
  for (let index = 0; index < previousData.length; index++) {
    if(previousData[index].dateStep == today){
      SQL_out.updateSteps(stepsTaken, heightTaken, today);
      wasNotPresentQ = false;
    }
  }

  if(wasNotPresentQ == true){
    //SQL_out.addNewSteps(today, 0, 0);
  }
  


  /*
  previousData.forEach(element => {
    if(previousData.dateStep == today){
      SQL_out.updateSteps(stepsTaken, heightTaken, today);
      wasPresentQ = true;
    }
  });

  
  

  if(wasPresentQ == false){
    SQL_out.addNewSteps(today, 0, 0);
  }

  */


  SQL_out.getAllPreviousStepsDB();
  //


     return (
       <View>
          <View style={styles.container}>
            <Text style={styles.statisticText}>Total Steps: </Text>
            <Text style={styles.statisticText}>Total Height: </Text>        
          </View>
          <View style={{height: "80%"}}>
            <PreviousStepsList></PreviousStepsList>
          </View>
        </View>
     );
   }

const styles = StyleSheet.create({
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    marginTop: 28,
  },
  statisticText: {
    textAlign: "center",
    fontSize: 20,
  }
});