import { ActivityIndicator, Alert, Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { addTodoItem, deleteTodoItem, getTodoItems, updateTodoItem } from '../../../helper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppView from '../../components/AppView';
import AppHeader from '../../components/AppHeader';
import { globalStyles, SCREEN_HEIGHT } from '../../styles/globalStyles';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../../navigation/appRoutes';
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../styles/colors';
import GradientButton from '../../components/GradientButton';
import { useTheme } from '../../components/ThemeContext';
import EditTodoModal from '../../components/EditTodoModal';
import TodoItem from '../../components/items/todoItem';

export type Item = {
    id: string;
    title: string;
    done: boolean;
};


type HomeNavigationProp = StackNavigationProp<AppStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<AppStackParamList, 'Home'>;


interface HomeScreenProps {
    navigation: HomeNavigationProp;
    route: HomeScreenRouteProp;
}



export default function Home({ navigation, route }: HomeScreenProps) {

    // const isDarkMode = useColorScheme() === 'dark';
    const { isDarkMode } = useTheme();

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    const [todoItems, setTodoItems] = useState<Item[]>([]);
    const [newTodoItem, setNewTodoItem] = useState('');
    const [loading, setLoading] = useState(false)

    // const [editInput, setEditInput] = useState('')
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [modalVisible, setModalVisible] = useState(false)
    const [page, setPage] = useState(0);

    useEffect(() => {
        setLoading(true)
        getTodoItems(page, 10).then((items) => {
            setLoading(false)
            setTodoItems(items)
            setPage(page + 1)
        });
    }, []);

    const loadTodos = async (page: number) => {

        setLoading(true);

        try {

            getTodoItems(page, 10).then(items => {
                if (page === 0) {
                    setTodoItems(items)
                } else {
                    setTodoItems((prevTodos: Array<Item>) => [...prevTodos, ...items]);
                }
                console.log('items', items);
                if (items.length !== 0) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    const Header = () => {
        return (
            <AppHeader
                leftIcon={<Pressable onPress={() => navigation.goBack()}>
                    <Text style={{ ...globalStyles.boldLargeText, fontSize: 30, color: isDarkMode ? "#fff" : '#000' }}>TODO</Text>
                </Pressable>
                }
                style={{ borderBottomColor: 'transparent', marginTop: 16 }}
            />
        )
    }

    const ConfirmDeletionHandler = (id: string) => {
        Alert.alert('Delete', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => DeleteTodo(id) }
        ]);
    }


    const DeleteTodo = async (id: string) => {
        setLoading(true)
        const updatedtodoItems = await deleteTodoItem(id, setLoading)

        console.log('todoItems', updatedtodoItems);
        if (updatedtodoItems) {
            setTodoItems(updatedtodoItems)
        }

    }

    const editItemHandler = () => {

        if (selectedItem?.title.trim() === '') {
            Alert.alert('Please add some context')
            return
        }
        if (selectedItem) {
            updateTodoItem(selectedItem, setLoading).then((items) => {
                getTodoItems(0, (page) * 10).then(items => {
                    setTodoItems(items);
                });
            });
        }

        setModalVisible(false)
        // setEditInput('')
        setSelectedItem(null)
    }

    const onCancelHandler = () => {
        setModalVisible(false)
    }


    const ListHeader = () => {
        return (
            <View style={styles.sectionContainer}>
                <TextInput
                    style={{
                        ...styles.input,
                        borderColor: isDarkMode ? '#fff' : '#000',
                        color: isDarkMode ? "#fff" : '#000'
                    }}
                    placeholder="Add your todo item"
                    onChangeText={(text) => setNewTodoItem(text)}
                    value={newTodoItem}
                    placeholderTextColor={colors.greyText}

                />
                <GradientButton
                    text='Add'
                    gradient1='grey'
                    gradient2='#000'
                    style={{ marginStart: 12 }}
                    onPress={() => {
                        setLoading(true)
                        addTodoItem(newTodoItem, setLoading).then(() => {
                            getTodoItems(0, 10).then(items => {
                                setTodoItems(items);
                            });
                            setPage(1)
                        });
                        setNewTodoItem('')
                    }}
                />
            </View>
        )
    }

    const _emlptyComponent = () => {
        return (
            <View style={{ marginTop: SCREEN_HEIGHT / 3, alignItems: 'center' }}>
                <Text style={{ ...globalStyles.semiBoldLargeText, color: isDarkMode ? "#fff" : '#000' }}>Add your first Todo here</Text>
            </View>
        )
    }


    const handleLoadMore = () => {

        if (!loading) {
            loadTodos(page)
            console.log('PAGE', page);
        }
    };

    const renderFooter = () => {
        return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
    };

    return (
        <AppView
            keyboardShouldPersistTaps='handled'
            refreshing={false}
            isScrollEnabled={false}
            header={<Header />}
            isLoading={loading}
            customContainerStyle={{ backgroundColor: isDarkMode ? '#000' : '#fff' }}
        >
            {ListHeader()}
            <FlatList
                data={todoItems}
                keyExtractor={(item, index) => item.id}
                renderItem={({ item, index }) =>
                    <TodoItem
                        item={item}
                        index={index}
                        isDarkMode={isDarkMode}
                        ConfirmDeletionHandler={ConfirmDeletionHandler}
                        setSelectedItem={setSelectedItem}
                        setModalVisible={setModalVisible}
                    />
                }
                contentContainerStyle={{ marginHorizontal: 20, paddingTop: 20 }}
                ListEmptyComponent={_emlptyComponent}
                onEndReached={handleLoadMore}
                ListFooterComponent={renderFooter}
            />
            <EditTodoModal
                visible={modalVisible}
                setVisible={setModalVisible}
                onPress={editItemHandler}
                onCancel={onCancelHandler}
                input={selectedItem}
                setInput={setSelectedItem}
            />
        </AppView>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 20,
        marginBottom: 0
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    input: {
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        ...globalStyles.regularLargeText
    },
    sectionDescription: {
        // marginTop: 8,
        fontSize: 18,
    },
    highlight: {
        fontWeight: '700',
    },
    todoItem: {
        fontSize: 18,
        fontWeight: '400',
        borderBottomWidth: 1,
        padding: 8,
        borderBottomColor: 'gray',
    },
})