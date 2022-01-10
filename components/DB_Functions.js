import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
// // Database objects are returned by calls to SQLite.openDatabase()
// // represents a connection to a database on your device.
const db = SQLite.openDatabase("db.db");


//SQLite
//https://brightspace.bournemouth.ac.uk/d2l/le/content/249807/viewContent/1523108/View
class SQL_functions{  
    createDatabase(){
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS previousSteps (id INTEGER PRIMARY KEY AUTOINCREMENT, dateStep TEXT, stepsTaken INT, heightTaken INT)', null,
            () => {console.log("Success - Database exists or Created DB")},
            () => {console.log("Error")},
            )
        })
    }

    getAllPreviousStepsDB(setNewData){
        console.log("func")
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM previousSteps', null, (txObj, data ) => {console.log("here");setNewData(data.rows._array)},
            () => {console.log("Error - Select all failed")},
            )           
        });
    } 

    addNewSteps(dateStep, stepsTaken, heightTaken){
        db.transaction(tx => {
            tx.executeSql('INSERT INTO previousSteps (dateStep, stepsTaken, heightTaken) values (?, ?, ?)', [dateStep, stepsTaken, heightTaken], (txObj, data ) => {console.log(data)},
            () => {console.log("addNewSteps Error")},
            )
        });
    } 

    updateSteps(dateStep, stepsTaken, heightTaken){
        db.transaction(tx => {
            tx.executeSql('UPDATE previousSteps SET stepsTaken = ?, heightTaken = ? WHERE dateStep = ?', [stepsTaken, heightTaken, dateStep], (txObj, data) => {console.log(data.rows._array)},
            () => {console.log("updateSteps Error")},
            )
        });
    }

    clearDB(){
        db.transaction(tx => {
            tx.executeSql('DROP TABLE previousSteps', null, (txObj, data) => {console.log(data.rows._array)},
            () => {console.log("clearDB Error")},
            )
        });
    }
}

const SQL_out = new SQL_functions();

export default SQL_out;