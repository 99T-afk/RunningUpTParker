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
  const [allData, onChangeAllData] = useState("caffts");

  useEffect(() => {
    db.transaction((tx) => {tx.executeSql('SELECT * FROM previousSteps', null, (txObj, data ) => {onChangeAllData(data.rows._array)},
    () => {console.log("Error - Select all failed")},
    )});
  }, []);

  return allData;
}

export default function TrackingScreen() {
  
  //SQL_out.clearDB();
  
  //SQL_out.createDatabase();

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = dd + '/' + mm + '/' + yyyy;

  var stepsTaken = 1111;
  var heightTaken = 2222;


  //SQL_out.addNewSteps(today, stepsTaken, heightTaken);



  const [allData, onChangeAllData] = useState("allDataDefault");
  console.log(allData);
  if (allData == "allDataDefault") { //will only run once
    SQL_out.getAllPreviousStepsDB(onChangeAllData);
  }

  console.log("alldata length: " + allData.length)
  
  if (allData.length == 0) { //empty
    SQL_out.addNewSteps(today, 0, 0);
  }

  //does the list exist already
  var wasNotPresentQ = true;

  //search to see if exists, if it does, update
  for (let index = 0; index < allData.length; index++) {
    console.log("Loop " + index + " - allData: " + allData[index].dateStep + "  |||| today: " + today);
    if(allData[index].dateStep == today && wasNotPresentQ == true){
      console.log("IF HIT : Loop " + index)
      SQL_out.updateSteps(today, stepsTaken, heightTaken);
      wasNotPresentQ = false;
    }
  }

  //if it doesnt exist, create new
  if(wasNotPresentQ == true){
    
  }
  
/*
  for (let index = 0; index < allData.length; index++) {
    if(allData[index].dateStep == today){
      SQL_out.addNewSteps(today, 3333, 4444);
      console.log("IF HIT : Loop " + index)
      SQL_out.updateSteps(stepsTaken, heightTaken, today);
      wasNotPresentQ = false;
    }
  }
  


  /*
  previousData.forEach(element => {
    if(previousData.dateStep == today){
      SQL_out.updateSteps(stepsTaken, heightTaken, today);
      wasPresentQ = true;
    }
  });

  */
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.statisticText}>Total Steps: </Text>
        <Text style={styles.statisticText}>Total Height: </Text>        
      </View>
      <View style={{height: "80%"}}>
        {allData == "allDataDefault" ? <Text>No data to load!</Text> : <PreviousStepsList allData={allData}/>}
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