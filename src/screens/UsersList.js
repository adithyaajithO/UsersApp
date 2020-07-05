import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Context as UsersContext } from '../context/UsersContext';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { FontAwesome } from '@expo/vector-icons';


const UsersList = ({ navigation }) => {
    const { state, deleteUser, getUsers } = useContext(UsersContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [sortFlag, setSortFlag] = useState(false);
    // const [currentUsers, setCurrentUsers] = useState(state.slice(indexOfFirstUser, indexOfLastUser));
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState('');

    // const setCurrentUsersFn = () => {
    //     return setCurrentUsers(() => {
    //         return state.slice(indexOfFirstUser, indexOfLastUser);
    //     })
    // }

    useEffect(() => {
        getUsers();
        const unsubscribe = navigation.addListener('focus', () => {
            getUsers();
            setSearchResults('');
        });

        return unsubscribe
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const compare = ( a, b ) => {
        if ( a.userName < b.userName ){
          return -1;
        }
        if ( a.userName > b.userName ){
          return 1;
        }
        return 0;
      }
    const compareReverse = ( a, b ) => {
        if ( a.userName > b.userName ){
            return -1;
        }
        if ( a.userName < b.userName ){
            return 1;
        }
        return 0;
    }
    const currentUsers = sortFlag ?
        state.sort(compare).slice(indexOfFirstUser, indexOfLastUser) :
        state.sort(compareReverse).slice(indexOfFirstUser, indexOfLastUser);

    if (state.length === 0) {
        return null;
    }

    return <View style={styles.containerStyle}>
        <SearchBar search={search}
            onSearch={(searchTerm) => {
                setSearch(searchTerm)
            }}
            onSearchSubmit={() => {
                setSearchResults(() => {
                    return state.filter((userName) => {
                        return userName.userName === search
                    }).length > 0 ?
                        state.filter((userName) => {
                            return userName.userName === search
                        }) :
                        currentUsers;
                })
                setSearch('');
            }} />
        <View style={styles.sortStyle}>
            <TouchableOpacity onPress={() => {
                setSortFlag(!sortFlag);
            }}>
                <FontAwesome size={20} name="sort-alpha-asc" />
            </TouchableOpacity>
        </View>
        <FlatList data={searchResults.length > 0 ? searchResults : currentUsers}
            keyExtractor={(users) => users.id.toString()}
            renderItem={({ item }) => {
                return <TouchableOpacity
                    onPress={() => navigation.navigate('Details', { id: item.id })}>
                    <View style={styles.flatListStyle}>
                        <Text style={styles.textStyle}>{item.userName}</Text>
                        <Text style={styles.textStyle}>{item.id}</Text>
                        <TouchableOpacity onPress={() => {
                            deleteUser(item.id);
                            setSearchResults('');
                        }}>
                            <Feather name="trash" style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            }}
            horizontal={false}
        />
        <Pagination usersPerPage={usersPerPage}
            totalUsers={state.length}
            paginate={(pageNumber) => {
                setCurrentPage(pageNumber);
                setSearchResults('');
            }} />
    </View>
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        paddingVertical: 30,
        backgroundColor: 'white'
    },
    flatListStyle: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#3798E9',
        padding: 10,
        marginTop: 4,
        marginHorizontal: 10,
        justifyContent: 'space-between',
        borderRadius: 4,
    },
    textStyle: {
        color: '#3798E9',
        fontSize: 16
    },
    iconStyle: {
        fontSize: 18,
        color: '#3798E9',
        alignSelf: 'center'
    },
    sortStyle: {
        flexDirection: 'row',
        padding: 10
    }
});

export default UsersList;