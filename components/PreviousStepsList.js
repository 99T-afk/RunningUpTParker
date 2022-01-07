import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import * as SQLite from 'expo-sqlite';
import getLocations from "./Places";

//SQL_lite DB for persistent data access
//

// Calls data, returns object of locations and their ID
let data = getLocations();

/**
 * Item - a component that renders each location on the flatlist
 * @param {*} item - an object that contains information on the location
 * @param {*} OnPress - information on what was pressed
 * @param {*} backgroundColor - styling for the view
 * @param {*} textColor - styling for the text
 * @returns A touchable view containing information on the item
 */
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <View>
      <Text style={[styles.title, textColor]}>{item.name}</Text>
      <Text style={[styles.smalltext, textColor]}>{item.distance}</Text>
    </View>
    <View style={styles.weatherIcon}>
      <Text>{data[item.id]["temp"]} °C</Text>
    </View>
  </TouchableOpacity>
);

/**
 * PreviousStepsList - Contains the code for defining and rendering a flatlist
 * @returns A flatlist component.
 */
const PreviousStepsList = () => {
  const [selectedId, setSelectedId] = useState(null);

  /**
   * A function that handles updating the global context and changing the navigation 
   * @param {*} item object that contains data on the location tapped
   */
  function OnPressHandle(item) {
    alert("pressed!");
  }

  /**
   * renderItem function that initialises the render of the Item component.
   * @param {*} item prop that holds data on the location tapped
   * @returns an item component inside a view
   */
  const renderItem = ({ item }) => {
    const backgroundColor = "#ebecef";
    const color = "black";

    return (
      <View>
        <Item
          item={item}
          onPress={() => OnPressHandle(item)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        persistentScrollbar={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f7fbff",
    paddingTop: 5,
  },
  item: {
    flex: 1,
    padding: 15,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    height: "10%",
    elevation: 4,
    marginBottom: 5,
  },
  smalltext: {
    fontSize: 12,
  },
  title: {
    fontSize: 23,
  },
  weatherIcon: {
    marginRight: "2%",
    marginTop: "2%",
  },
});

export default PreviousStepsList;
