import { Image, Pressable, StyleSheet, Text, View, TextInput, Alert, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Modal from 'react-native-modal';
import ScrollContainer from './ScrollContainer';
import { APP_IMAGE } from '../utils/constants';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';
import { useTheme } from '@react-navigation/native';
import { globalStyles, SCREEN_WIDTH } from '../styles/globalStyles';

const { width, height } = Dimensions.get('screen');

export default function EditTodoModal(props: any) {
    const { isDarkMode }: any = useTheme();
    const { visible, setVisible, onPress, onCancel, input, setInput } = props



    return (
        <Modal
            avoidKeyboard
            isVisible={visible}
            onBackdropPress={() => {
                setVisible(false);
            }}
            style={{
                margin: 0,
                flex: 1,
                // justifyContent:'flex-end'
            }}
        >
            <ScrollContainer scrollContainerRequired={true} isScrollEnabled={false} refreshing={false} scrollStyle={{ justifyContent: 'flex-end' }}>
                <View style={{
                    backgroundColor: '#fff',
                    marginHorizontal: 16,
                    padding: 18,
                    borderTopStartRadius: 8,
                    borderTopEndRadius: 8,
                    // height: 100
                }}>
                    <TextInput
                        placeholder='Input...'
                        placeholderTextColor={colors.greyText}
                        style={{ ...styles.input, color: '#000' }}
                        onChangeText={(text) => setInput((prev: any) => ({ ...prev, title: text }))}
                        value={input?.title}
                    />
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                        <Pressable style={{
                            ...styles.optionContainer,
                            marginEnd: 8
                        }}
                            onPress={onCancel}
                        >
                            <Text style={styles.option}>Cancel</Text>
                        </Pressable>
                        <Pressable style={{
                            ...styles.optionContainer,
                            marginStart: 8
                        }}
                            onPress={onPress}
                        >
                            <Text style={styles.option}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollContainer>
        </Modal>
    )
}

const styles = StyleSheet.create({
    input: {
        paddingVertical: 14,
        paddingHorizontal: 8,
        marginVertical: 16,
        borderWidth: 1,
        flex: 1,
        borderRadius: 4,
        ...globalStyles.regularLargeText
    },
    optionContainer: {
        width: SCREEN_WIDTH / 2 - 32 - 9,
        height: 40,
        borderWidth: 1,
        borderColor: colors.primary,
        alignItems: "center",
        justifyContent: 'center',
        borderRadius: 4,
    },
    option: {
        color: colors.text,
        fontFamily: fonts.regularFont,
        fontSize: 12
    }
})