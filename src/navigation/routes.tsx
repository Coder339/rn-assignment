import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Splash from '../screens/auth/Splash';

import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/app/Home';
import AppStack from './appRoutes';
import { NavigatorScreenParams } from '@react-navigation/native';
import AuthStack, { AuthStackParamList } from './authRoutes';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export type RootStackParamList = {
    Auth: NavigatorScreenParams<AuthStackParamList>;
    App: undefined;
    Splash: undefined;
    Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStackScreen() {


    GoogleSignin.configure({
        webClientId: '100607428143-psojtktl2spo6s9bm1rtv6f7d9umvltn.apps.googleusercontent.com',
    });

    return (
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Auth"
                component={AuthStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="App"
                component={AppStack}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    );
}
