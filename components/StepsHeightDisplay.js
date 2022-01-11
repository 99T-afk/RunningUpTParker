import React, { useState, useContext } from 'react';


export default function StepsHeightDisplay({stepVerticalToday}, {stepCountToday}){
    const [context, setContext] = useContext(Context);

    return(
        <View style={styles.walkingText}>
            <Text style={styles.statisticText}>Steps today: {stepCountToday + context}</Text>
            <Text style={styles.statisticText}>Height today: {stepVerticalToday}m</Text>        
        </View>
    )

}