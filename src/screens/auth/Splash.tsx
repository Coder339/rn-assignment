import { Image, StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Animatable from 'react-native-animatable';
import GradientView from '../../components/GradientView';
import AnimatedTextWithDelay from '../../components/AnimatedTextWithDelay';
import { globalStyles } from '../../styles/globalStyles'
import Animated, { FadeIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { getData } from '../../utils/storage';


interface SplashProps {
    navigation: any
}
export default function Splash(props: SplashProps) {

    const getToken = async () => {
        const token = await getData('TOKEN')
        // console.log('token', token);

        setTimeout(async () => {

            if (token) {
                props.navigation.replace('App');
                return
            }
            props.navigation.replace('App');

        }, 3000);
    }

    useEffect(() => {
        getToken()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <GradientView style={styles.container}>
                <Animated.Text
                    entering={FadeInRight.delay(400).duration(2000)}
                    style={styles.title}>T O D O</Animated.Text>
                {<AnimatedTextWithDelay width={400} />}
            </GradientView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        ...globalStyles.semiBoldLargeText,
        color: '#fff',
        fontSize: 28
    },
    headline: {
        marginTop: 8,
        fontSize: 20,
        color: '#fff',
    }
})