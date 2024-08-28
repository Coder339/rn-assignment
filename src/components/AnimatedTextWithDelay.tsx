import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Animated, {
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { fonts } from '../styles/fonts';

const DURATION = 1000;
const DELAY = 500;

const text = ["Plan.", "Act.", "Achieve."];

interface AppProps {
    width: number;
}

export default function AnimatedTextWithDelay({ width }: AppProps) {
    const [isShown, setShown] = useState<boolean>(false);

    const opacity1 = useSharedValue<number>(0);
    const opacity2 = useSharedValue<number>(0);
    const opacity3 = useSharedValue<number>(0);

    useEffect(() => {
        if (isShown) {
            opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
            opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
        } else {
            opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
            opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
        }

        setShown(!isShown);
    }, [])

    // prettier-ignore
    // const show = () => {
    //     if (isShown) {
    //         opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
    //         opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
    //         opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
    //     } else {
    //         opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
    //         opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
    //         opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
    //     }

    //     setShown(!isShown);
    // };

    return (
        <View style={styles.container}>

            <Animated.Text style={{ ...styles.label, opacity: opacity1 }}>
                {text[0]}
            </Animated.Text>
            <Animated.Text style={{ ...styles.label, opacity: opacity2 }}>
                {text[1]}
            </Animated.Text>
            <Animated.Text style={{ ...styles.label, opacity: opacity3 }}>
                {text[2]}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12
    },
    label: {
        fontSize: 22,
        textAlign: 'center',
        // fontWeight: 'bold',
        marginRight: 8,
        color: '#fff',
        fontFamily: fonts.regularFont
    },
});
