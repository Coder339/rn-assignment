import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { colors } from '../styles/colors'
import { fonts } from '../styles/fonts'
import { scale } from '../styles/metrics'
import LinearGradient from 'react-native-linear-gradient'
import { SCREEN_HEIGHT, SCREEN_WIDTH, globalStyles } from '../styles/globalStyles';


interface propStyle {
    text: string,
    onPress: () => void,
    disabled?: boolean,
    textStyle?: object,
    style?: object,
    gradient1?: string,
    gradient2?: string,
}

export default function GradientButton(props: propStyle) {
    const { text, onPress, disabled = false, textStyle, style, gradient1 = '#000428', gradient2 = '#004e92' } = props
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
        >
            <LinearGradient
                style={{ ...styles.button, ...style }}
                colors={[gradient1, gradient2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
                <Text style={{ ...styles.buttonText, ...textStyle }}>{text}</Text>
            </LinearGradient>

        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: scale(12),
        paddingHorizontal: scale(20),
        borderRadius: scale(4),
    },
    buttonText: {
        ...globalStyles.semiBoldLargeText,
        color: '#fff',
        fontSize: scale(18)
    },


})