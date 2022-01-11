/**
 * @fileoverview - Returns the homescreen, which calls a flatlist component to render.
 */
import React, { useState, useEffect, useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import PreviousStepsList from '../components/PreviousStepsList';
import * as SQLite from 'expo-sqlite';
import { Context } from "../components/Context.js";
import SQL_out from '../components/DB_Functions';
import GoalsTracker from '../components/GoalsTracker';
//import UpdateStepsList from '../components/UpdateStepsList';
 
const db = SQLite.openDatabase("db.db");


function getTodayFormatted(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  return today = dd + '/' + mm + '/' + yyyy;
}


/*
function getAllPreviousStepsDB() {
  const [allData, onChangeAllData] = useState("caffts");

  useEffect(() => {
    db.transaction((tx) => {tx.executeSql('SELECT * FROM previousSteps', null, (txObj, data ) => {onChangeAllData(data.rows._array)},
    () => {console.log("Error - Select all failed")},
    )});
  }, []);

  return allData;
}
*/


export default function TrackingScreen() {
  const context = useContext(Context);

  //SQL_out.clearDB();

  
  SQL_out.createDatabase();

  var today = getTodayFormatted();

  var stepsTaken = 3;
  var heightTaken = 4;


  const [allData, onChangeAllData] = useState("allDataDefault");
  console.log(allData);
  if (allData == "allDataDefault") { //will only run once
    SQL_out.getAllPreviousStepsDB(onChangeAllData);
  }
  console.log(allData);










  //get all records, if today is blank, create a row
  //if today is present, update with current data IF new data is greater.
  const AddOrUpdateSteps = (allData) => {
  console.log("AddOrUpdateSteps called");
  
  //GET DATA HERE FROM CONTEXT
  var stepsToday = 170;
  var verticalToday = 90;

  var today = getTodayFormatted();

  var doesDateExistQ = false;
  for (let index = 0; index < allData.length; index++) {
    if(allData[index].dateStep == today){
      //is today, update
      var newSteps = allData[index].stepsTaken + stepsToday //<<<< ADD STEPS FROM CONTEXT
      var newHeight = allData[index].heightTaken + verticalToday //<<<< ADD HEIGHT FROM CONTEXT
      SQL_out.updateSteps(today, newSteps, newHeight);  
      doesDateExistQ = true;    
    }
  }

  //no record exists, create one for today
  if(doesDateExistQ == false){
    SQL_out.addNewSteps(today, stepsToday, verticalToday);
  }

  //reset the steps added?
  }

  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.statisticText}>Total Steps:</Text>
        <Text style={styles.statisticText}>Total Height: </Text>        
      </View>
      <Button
        title="Add data from today"
        onPress={() => AddOrUpdateSteps(allData)}
      />
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



/*
//console.log("alldata length: " + allData.length)
  try{
    if (allData.length == 0) { //empty
      SQL_out.addNewSteps(today, 0, 0);
      SQL_out.getAllPreviousStepsDB(onChangeAllData);
    }
  }catch{
    SQL_out.addNewSteps(today, 0, 0);
    SQL_out.getAllPreviousStepsDB(onChangeAllData);
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


*/