/**
 * @fileoverview Displays a persistent header in the app, showing the logo and settings.
 */
 import * as React from "react";
 import {
   View,
   StyleSheet,
   Image,
   TouchableOpacity,
 } from "react-native";
 import { useNavigation } from "@react-navigation/native";

 export default function TopBar() {
    const navigation = useNavigation();
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.imageStyle}
          onPress={() => {
            navigation.navigate("Tab");
          }}
        >
          <Image
            style={styles.imageStyle}
            source={require("../assets/logo.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "flex-start",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    imageStyle: {
      width: 140,
      height: 46,
      marginLeft: 7,
      padding: 4,
      resizeMode: 'contain'
    },
    settingIcon: {
      justifyContent: "space-between",
      marginRight: "2%",
      marginTop: "1%",
    },
  });
  