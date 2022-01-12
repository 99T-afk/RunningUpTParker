/**
 * @fileoverview - A flatlist component which displays the result of the SELECT ALL query
 */
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';

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
    <View style={styles.itembox}>
      <Text style={[styles.title, textColor]}>{item.dateStep}</Text>
      <Text style={[styles.title, textColor]}>{item.heightTaken}m</Text>
      <Text style={[styles.title, textColor]}>{item.stepsTaken} steps</Text>
    </View>
  </TouchableOpacity>
);

/**
 * PreviousStepsList - Contains the code for defining and rendering a flatlist
 * @returns A flatlist component.
 */
const PreviousStepsList = ({allData}) => {
  const [selectedId, setSelectedId] = useState(null);
  console.log("allData in steplist: " + allData);


  /**
   * A function that handles updating the global context and changing the navigation 
   * @param {*} item object that contains data on the location tapped
   */
  function OnPressHandle(item) {
    //alert("pressed!");
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
        data={allData}
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
  itembox: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  title: {
    fontSize: 19,
  },
  weatherIcon: {
    marginRight: "2%",
    marginTop: "2%",
  },
});

export default PreviousStepsList;
