import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SCREEN_HEIGHT, globalStyles } from '../styles/globalStyles'
import { scale } from '../styles/metrics'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function AppHeader(props: any) {
    const insets = useSafeAreaInsets()
    const { leftPress, titleBox, rightIcon, leftIcon, rightPress, titleStyle, style } = props
    return (
        <View style={{ ...styles.container, ...style }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                {leftIcon ?
                    <Pressable hitSlop={30} onPress={leftPress}>
                        {leftIcon}
                    </Pressable>
                    :
                    <View />
                }
                {titleBox}
            </View>
            {rightIcon ?
                <Pressable onPress={rightPress} hitSlop={30}>
                    {rightIcon}
                </Pressable>
                :
                <View />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(16),
        // backgroundColor: 'blue',
        paddingBottom: scale(8),
        borderBottomWidth: 0.5,
        borderBottomColor: 'rgba(0,0,0,0.2)',
        marginTop: SCREEN_HEIGHT > 667 ? 0 : 20
        // width: '100%'
    }
})