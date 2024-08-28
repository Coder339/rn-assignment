import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image, } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// import {useRoute} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { APP_IMAGE } from '../utils/constants';
import Home from '../screens/app/Home';
import { scale } from '../styles/metrics';
import Profile from '../screens/app/Profile';
import { colors } from '../styles/colors';
import { SCREEN_HEIGHT } from '../styles/globalStyles';


export type AppStackParamList = {
    Home: undefined;
    TabStack: undefined;
    Profile: undefined;

};

export type TabStackParamList = {
    HomeStack: undefined,
    ProfileStack: undefined

};

const Stack = createStackNavigator<AppStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}



function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile">
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

let _screenOptions = {
    tabBarStyle: {
        height: SCREEN_HEIGHT > 667 ? 90 : 60,
        paddingTop: SCREEN_HEIGHT > 667 ? 10 : 0,
        // position: "absolute",
        backgroundColor: '#fff',
        borderTopWidth: 0.5,
    },
    tabBarActiveTintColor: '#000',
    tabBarInactiveTintColor: '#fff',

    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true
}


function TabStack() {
    const insets = useSafeAreaInsets();
    // const routeTab = useRoute();
    return (
        <View style={{ flex: 1, backgroundColor: colors.blue1, borderRadius: 30 }}>

            <Tab.Navigator
                initialRouteName="HomeStack"
                screenOptions={_screenOptions}
            >
                <Tab.Screen
                    name={'HomeStack'}
                    component={HomeStack}
                    options={{
                        tabBarIcon: ({ focused, color, size }: any) => (
                            <View>
                                <Image
                                    style={styles.icon}
                                    source={focused ? APP_IMAGE.homeActive : APP_IMAGE.homeInActive}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                    }}
                />
                <Tab.Screen
                    name={'ProfileStack'}
                    component={ProfileStack}
                    options={{
                        tabBarIcon: ({ focused, color, size }: any) => (
                            <View>
                                <Image
                                    style={{ ...styles.icon, width: scale(30), height: scale(30) }}
                                    source={focused ? APP_IMAGE.profileActive : APP_IMAGE.profileInActive}
                                    resizeMode='contain'
                                />
                            </View>
                        ),
                        // tabBarLabel:i18n.t('tabs.more')
                    }}
                />
            </Tab.Navigator>
        </View>
    )
}



function AppStack() {
    return (
        <Stack.Navigator initialRouteName="TabStack">
            <Stack.Screen
                name="TabStack"
                component={TabStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AppStack;

const styles = StyleSheet.create({
    tabBarIconWrapper: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        // backgroundColor:'red'
        // resizeMode: 'contain',
    },
});