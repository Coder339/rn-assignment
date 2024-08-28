/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
	Button,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	View,
	useColorScheme,
} from 'react-native';

import { addTodoItem, getTodoItems } from './helper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import RootStackScreen from './src/navigation/routes';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ThemeProvider } from './src/components/ThemeContext';

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<View style={{ flex: 1 }}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<ThemeProvider>
					<NavigationContainer>
						<RootStackScreen />
					</NavigationContainer>
				</ThemeProvider>
			</GestureHandlerRootView>
		</View>
	);
}

const styles = StyleSheet.create({

});

export default App;
