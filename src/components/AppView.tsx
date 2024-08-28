import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	Image,
	Platform,
	StatusBar,
	KeyboardAvoidingView,
} from 'react-native';
import React, { ReactNode } from 'react';
import { colors } from '../styles/colors';
import ScrollContainer from './ScrollContainer';
import Loader from './Loader';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../styles/globalStyles';


interface AppviewProps {
	customContainerStyle?: object,
	isLoading?: boolean,
	scrollContainerRequired?: boolean,
	isScrollEnabled: boolean,
	scrollStyle?: object
	header?: React.JSX.Element,
	showSafeView?: boolean,
	handleRefresh?: () => void,
	refreshing: boolean,
	shouldRefresh?: boolean,
	children: ReactNode,
	avoidingView?: boolean,
	keyboardShouldPersistTaps?: "always" | "never" | "handled",
}

export default function AppView(props: AppviewProps) {
	const {
		customContainerStyle,
		isLoading,
		scrollContainerRequired,
		isScrollEnabled,
		scrollStyle,
		header,
		showSafeView = true,
		handleRefresh,
		refreshing,
		shouldRefresh,
		avoidingView = true,
		keyboardShouldPersistTaps = 'handled'
	} = props;
	return (
		<KeyboardAvoidingView
			enabled={avoidingView}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			style={{ ...styles.container, ...customContainerStyle }}>
			{showSafeView && <SafeAreaView style={{ flex: 0 }} />}
			{/* {header && header()} */}
			{header}
			<ScrollContainer
				scrollContainerRequired={scrollContainerRequired}
				isScrollEnabled={isScrollEnabled}
				keyboardShouldPersistTaps={keyboardShouldPersistTaps}
				refreshing={refreshing}
				handleRefresh={handleRefresh}
				shouldRefresh={shouldRefresh}
				scrollStyle={scrollStyle}
			>
				{props.children}
			</ScrollContainer>
			{isLoading && <Loader visible={isLoading} />}
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		// zIndex: -1
	},
});
