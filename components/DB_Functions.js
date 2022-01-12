import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

//the DB connection
const db = SQLite.openDatabase("db.db");


/**
 * Class - SQL_functions contains all CRUD functionality for interacting with a database.
 */
class SQL_functions{  
    /**
     * createDatabase - creates the database.
     */
    createDatabase(){
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS previousSteps (id INTEGER PRIMARY KEY AUTOINCREMENT, dateStep TEXT, stepsTaken INT, heightTaken INT)', null,
            () => {console.log("Success - Database exists or Created DB")},
            () => {console.log("Error")},
            )
        })
    }

    /**
     * createDatabase - Runs a SELECT * query on the DB.
     * @param setNewData - sends the result of this select * to an object.
     */
    getAllPreviousStepsDB(setNewData){
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM previousSteps', null, (txObj, data ) => {setNewData(data.rows._array)},
            () => {console.log("Error - Select all failed")},
            )           
        });
    } 

    /**
     * addNewSteps - add new step data to the program.
     * @param {*} dateStep Takes the date of the data, usually today.
     * @param {*} stepsTaken Takes the steps in
     * @param {*} heightTaken Takes the height (vertical distance covered)
     */
    addNewSteps(dateStep, stepsTaken, heightTaken){
        db.transaction(tx => {
            tx.executeSql('INSERT INTO previousSteps (dateStep, stepsTaken, heightTaken) values (?, ?, ?)', [dateStep, stepsTaken, heightTaken], (txObj, data ) => {console.log("added row: " + data)},
            () => {console.log("addNewSteps Error")},
            )
        });
    } 

    /**
     * updateSteps - Updates the step data based on the date provided.
     * @param {*} dateStep Takes the date of the data, usually today.
     * @param {*} stepsTaken Takes the steps in
     * @param {*} heightTaken Takes the height (vertical distance covered)
     */
    updateSteps(dateStep, stepsTaken, heightTaken){
        db.transaction(tx => {
            tx.executeSql('UPDATE previousSteps SET stepsTaken = ?, heightTaken = ? WHERE dateStep = ?', [stepsTaken, heightTaken, dateStep], (txObj, data) => {console.log(data.rows._array)},
            () => {console.log("updateSteps Error")},
            )
        });
    }

    /**
     * clearDB - function to clear the database by dropping table.
     */
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