import { Image, StyleSheet, Text, View } from 'react-native'
import React, { ReactNode } from 'react'
import { APP_IMAGE } from '../utils/constants'
import { scale } from '../styles/metrics'

interface Props {
    component: ReactNode
}

const IconWrapper = (props: Props) => {
    return (
        <View style={{
            backgroundColor: "#000",
            alignItems: "center",
            justifyContent: 'center',
            width: scale(40),
            height: scale(40),
            borderRadius: 20,
            marginEnd: 20
        }}>
            {props.component}
        </View>
    )
}

export default IconWrapper

const styles = StyleSheet.create({})