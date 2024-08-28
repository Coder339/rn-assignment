import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import { globalStyles } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
import { Item } from '../../screens/app/Home';

interface ItemProps {
    item: Item,
    index: number,
    isDarkMode?: boolean,
    ConfirmDeletionHandler: (id: string) => void,
    setSelectedItem: Dispatch<SetStateAction<Item | null>>,
    setModalVisible: Dispatch<SetStateAction<boolean>>
}

const TodoItem: React.FC<ItemProps> = ({ item, index, isDarkMode, ConfirmDeletionHandler, setSelectedItem, setModalVisible }) => {
    return (
        <View style={{
            padding: 20,
            borderWidth: 1,
            borderColor: isDarkMode ? '#fff' : '#000',
            borderRadius: 4,
            justifyContent: "space-between",
            flexDirection: 'row',
            marginBottom: 12
        }}>
            <Text style={{
                ...globalStyles.regularLargeText,
                fontSize: 18,
                color: isDarkMode ? "#fff" : '#000',
                flex: 1
            }}>{item?.title}</Text>
            <View style={{ flexDirection: 'row', marginTop: 4 }}>
                <Pressable
                    style={{ marginEnd: 12 }}
                    onPress={() => ConfirmDeletionHandler(item.id)}
                >
                    <Image
                        source={APP_IMAGE.delete}
                        style={{ width: 18, height: 18 }}
                    />
                </Pressable>
                <Pressable onPress={() => {
                    console.log('item', item);

                    setSelectedItem(item)
                    setModalVisible(true)
                }}>
                    <Image
                        source={isDarkMode ? APP_IMAGE.editWhite : APP_IMAGE.edit}
                        style={{ width: 18, height: 18 }}
                    />
                </Pressable>
            </View>
        </View>
    )
}

export default TodoItem

const styles = StyleSheet.create({})