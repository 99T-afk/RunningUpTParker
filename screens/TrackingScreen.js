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
import { TouchableOpacity } from 'react-native-gesture-handler';
//import UpdateStepsList from '../components/UpdateStepsList';
import getGoals from '../components/goals';
 
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

  const [allData, onChangeAllData] = useState("allDataDefault");
  const [updateData, changeUpdateData] = useState(true);

  console.log(allData);

  var TotalStepCount = 0;
  var TotalHeight = 0;

  var nextGoalName = "";
  var nextGoalElevation = 0;
  var nextGoalLocation = "";

  var PreviousGoalName = "";
  var PreviousGoalElevation = 0;
  var PreviousGoalLocation = "";


  if (updateData) { //will only run once
    console.log/("updated data!");
    SQL_out.getAllPreviousStepsDB(onChangeAllData);
    changeUpdateData(false);
    
  }
  console.log(allData);


  for (let index = 0; index < allData.length; index++) {
    TotalStepCount += allData[index].stepsTaken;
    TotalHeight += allData[index].heightTaken;         
  }







  //get all records, if today is blank, create a row
  //if today is present, update with current data IF new data is greater.
  const AddOrUpdateSteps = (allData) => {
    console.log("AddOrUpdateSteps called");
    
    //GET DATA HERE FROM CONTEXT
    var stepsToday = context.stepsToday;
    var verticalToday = context.stepVerticalToday;

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

    changeUpdateData(true);
    SQL_out.getAllPreviousStepsDB(onChangeAllData);
  }

  let goalData = getGoals();

  const getTheGoals = () => {
    console.log("ran!");
    for (let index = 0; index < goalData.length; index++) {
      if(goalData[index].elevation > TotalHeight){
        if(index == 0){
          PreviousGoalName = "N/A";
          PreviousGoalElevation = 0;
          PreviousGoalLocation = "N/A";
        }
        else{
          PreviousGoalName = goalData[index - 1].name;
          PreviousGoalElevation = goalData[index - 1].elevation;
          PreviousGoalLocation = goalData[index - 1].location;
        }
        nextGoalName = goalData[index].name;
        nextGoalElevation = goalData[index].elevation;
        nextGoalLocation = goalData[index].location;
        break;
      }              
    }
  }
  
  getTheGoals();

    

  return (
    <View>
      <TouchableOpacity onPress={() => getTheGoals()}>
      <View style={styles.container}>
        <Text style={styles.statisticText}>Total Steps: <Text style={{fontWeight: 'bold'}}>{TotalStepCount}</Text></Text>
        <Text style={styles.statisticText}>Total Height: <Text style={{fontWeight: 'bold'}}>{TotalHeight}m</Text></Text>        
      </View>
      <View style={styles.goalBox}>
      <Text style={styles.textStyle}>You've just passed: <Text style={{fontWeight: 'bold'}}>{PreviousGoalName}</Text>, located in {PreviousGoalLocation}, and is <Text style={{fontWeight: 'bold'}}>{PreviousGoalElevation}m tall!</Text></Text>
      <Text style={styles.textStyle}>Your next goal: <Text style={{fontWeight: 'bold'}}>{nextGoalName}</Text>, located in {nextGoalLocation}, is <Text style={{fontWeight: 'bold'}}>{nextGoalElevation}m tall!</Text></Text>
      </View>
      <Button
        title="Add data from today"
        onPress={() => AddOrUpdateSteps(allData)}
      />      
      <View style={{height: "60%"}}>
        {allData == "allDataDefault" ? <Text>No data to load!</Text> : <PreviousStepsList allData={allData}/>}
      </View>
      </TouchableOpacity>
    </View>
     );
   }

const styles = StyleSheet.create({
  textStyle:{
    fontSize: 20,
  },
  topbar: {
    marginTop: StatusBar.currentHeight || 0,
  },
  container: {
    padding: 11,
  },
  statisticText: {
    textAlign: "center",
    fontSize: 24,
    
  },
  goalBox: {
    borderRadius: 5,
    borderWidth: 3,
    margin: 2,
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