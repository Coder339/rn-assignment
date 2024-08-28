import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-simple-toast';


export const ToastMessage = (message:string): void =>
  Toast.show(message, Toast.SHORT);

// export const ToastMessage = (message:string): void =>
//   Toast.show(message, Toast.SHORT, [
//     'RCTModalHostViewController',
//     'UIAlertController',
// ]);
