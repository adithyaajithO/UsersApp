import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { SearchBar, Text, Button } from 'react-native-elements';
import here from '../api/here';
import MapView, { Marker } from "react-native-maps";
import { AuthContext } from '../context/AuthContext';
import { Context as UserAddressContext } from '../context/UserAddressContext';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const MapScreen = ({ navigation, route }) => {
    let map;
    const params = route.params.user;
    const id = params[0];
    const userName = params[1];

    const auth = useContext(AuthContext);
    const { state, clearAddress, getAddress, saveAddress } = useContext(UserAddressContext);

    // const [coordinate, setCoordinate] = useState({
    //     latitude: 8.5241,
    //     longitude: 76.9366
    // });
    // const [region, setRegion] = useState({
    //     latitude: 8.5241,
    //     longitude: 76.9366,
    //     latitudeDelta: 0.009,
    //     longitudeDelta: 0.009
    // });
    const [coordinate, setCoordinate] = useState(null);
    const [region, setRegion] = useState(null);
    const [locationList, setlocation] = useState(null);
    const [searchTerm, setSearch] = useState('');


    const notifyChange = (loc) => {
        setCoordinate(loc);
    }

    const searchLocation = async (value) => {
        try {
            let response;
            if (value.length <= 2) {
                setlocation(null);
            }
            else {
                response = await here.get('/geocode.json', {
                    params: {
                        languages: 'en-US',
                        maxresults: 4,
                        searchtext: value,
                        apiKey: 'aXh6SHpznevXN3623Xijpkj-7AX1ASy8EgkSZ07pNNo'
                    }
                });
                response.data.Response.View[0] ?
                    setlocation(response.data.Response.View[0].Result) :
                    null;
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        // const response = axios.get('https://maps.googleapis.com/maps/api/place/queryautocomplete/json?input=Beng&key=AIzaSyDElNm6Gxci6jFX2sjmmeDL-_-G-zbbWiQ');
        // response.then((loc) => {
        //     console.log('locationData', loc);
        // })
        // clearAddress();
        // getAddress(id, auth.state.token, callback);

        const unsubscribe = navigation.addListener('focus', () => {
            clearAddress();
            getAddress(id, auth.state.token);

        });

        return unsubscribe
    }, []);

    useEffect(() => {
        if (state) {
            setCoordinate(state.coordinate);
            setRegion({
                ...state.coordinate,
                latitudeDelta: 0.009,
                longitudeDelta: 0.009
            });
        }
        else {
            setCoordinate(null);
            setRegion(null);
        }
    }, [state]);

    return <View style={styles.parentContainer}>
        {/* <View style={styles.searchBarContainer}> */}
        <SearchBar
            style={styles.searchBar}
            value={searchTerm}
            onChangeText={(value) => {
                setSearch(value);
                searchLocation(value);
            }}
            placeholder="Search.."
        />
        {/* </View> */}
        {locationList ?
            <View style={styles.flatListContainer}>
                <FlatList
                    keyExtractor={(result) => result.Location.LocationId}
                    data={locationList}
                    renderItem={({ item }) => {
                        return <TouchableOpacity onPress={() => {
                            setRegion({
                                latitude: item.Location.DisplayPosition.Latitude,
                                longitude: item.Location.DisplayPosition.Longitude,
                                latitudeDelta: 0.009,
                                longitudeDelta: 0.009
                            });
                            setCoordinate({
                                latitude: item.Location.DisplayPosition.Latitude,
                                longitude: item.Location.DisplayPosition.Longitude
                            });
                        }}>
                            <View style={styles.itemContainer}>
                                <Text>{item.Location.Address.Label}</Text>
                            </View>
                        </TouchableOpacity>

                    }}
                />
            </View> :
            null
        }
        <View style={styles.mapContainer}>
            <MapView
                ref={(ref) => {
                    map = ref;
                }}
                style={{
                    flex: 1
                }}
                region={region ?
                    region :
                    {
                        latitude: 0.0,
                        longitude: 0.0,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009
                    }}
                onRegionChangeComplete={region => {
                    setRegion(region);
                    map.animateToRegion(region, 300);
                }}
            >
                {coordinate ?
                    <Marker coordinate={coordinate ?
                        coordinate :
                        {
                            latitude: 0.0,
                            longitude: 0.0
                        }} /> :
                    null}

            </MapView>
            <Button
                style={styles.buttonStyle}
                title="Save"
                onPress={() => {
                    saveAddress(id, token, userName, coordinate);
                }} />
        </View>

        {/* <GooglePlacesAutocomplete
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
                    key: "AIzaSyDElNm6Gxci6jFX2sjmmeDL-_-G-zbbWiQ",
                    language: 'en'
                }}
                debounce={200}
            /> */}

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
        flex: 1
    },
    mapContainer: {
        flex: 1
    },
    itemContainer: {
        borderColor: 'black',
        borderBottomWidth: 1,
        padding: 10
    },
    flatListContainer: {
        backgroundColor: '#ededed'
    },
    buttonStyle: {
        position: 'absolute'
    }
});

export default MapScreen;