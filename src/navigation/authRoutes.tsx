import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert } from 'react-native';
import Login from '../screens/auth/Login';
// import Register from '../screens/auth/Register';

import { createStackNavigator } from '@react-navigation/stack';


export type AuthStackParamList = {
    Login: { isLogin: boolean } | undefined;
};
const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {

    return (
        <Stack.Navigator
            initialRouteName={'Login'}
            screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;
