import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from "react-native";
import axios from 'axios';
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const MapScreen = () => {
    let map;
    const [coordinate, setCoordinate] = useState({
        latitude: 8.5241,
        longitude: 76.9366
    });
    const [region, setRegion] = useState({
        latitude: 8.5241,
        longitude: 76.9366,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009
    });

    const notifyChange = (loc) => {
        setCoordinate(loc);
    }

    useEffect(() => {
        const response = axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=Beng&key=AIzaSyA13eOM_9OptpsBP1pmHGsoFQYiRbdsuh4');
        console.log('locationData', response);
    },[]);

    return <View style={styles.parentContainer}>
        <View style={styles.searchBarContainer}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={2}
                autoFocus={true}
                returnKeyType={'search'}
                listViewDisplayed={false}
                fetchDetails={true}
                onPress={(data, details = null) => {
                    console.log(data, details);
                    notifyChange(details.geometry.location);
                }}
                query={{
                    key: "AIzaSyA13eOM_9OptpsBP1pmHGsoFQYiRbdsuh4",
                    language: 'en'
                }}
                debounce={200}
                GooglePlacesSearchQuery={{}}
            />
        </View>
        <View style={styles.mapContainer}>
            <MapView
                ref={(ref) => {
                    map = ref;
                }}
                style={{
                    flex: 1
                }}
                region={region}
                onRegionChangeComplete={region => setRegion(region)}
            >
                <Marker coordinate={coordinate} />
            </MapView>
        </View>
    </View>
};

const styles = StyleSheet.create({
    searchBar: {
        position: 'absolute'
    },
    parentContainer: {
        flex: 1
    },
    searchBarContainer: {
        flex: 0.4
    },
    mapContainer: {
        flex: 1
    }
});

export default MapScreen;