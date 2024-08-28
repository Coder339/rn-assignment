import React, { ReactNode } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, RefreshControl } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface ScrollProps {
    scrollContainerRequired?: boolean
    isScrollEnabled: boolean,
    scrollStyle?: object,
    shouldRefresh?: boolean,
    refreshing: boolean,
    handleRefresh?: () => void,
    children: ReactNode,
    NULL?: undefined,
    keyboardShouldPersistTaps?: "always" | "never" | "handled"
}

// const NULL: null = null

export default function ScrollContainer(props: ScrollProps) {
    return (
        <View style={{ flex: 1 }}>
            {props.scrollContainerRequired ?
                <KeyboardAwareScrollView
                    // automaticallyAdjustContentInsets={true}
                    nestedScrollEnabled={true}
                    // extraHeight={140}
                    scrollEnabled={props.isScrollEnabled}
                    keyboardShouldPersistTaps={props.keyboardShouldPersistTaps}
                    showsVerticalScrollIndicator={false}
                    enableOnAndroid={true}
                    contentContainerStyle={{ ...props.scrollStyle, ...styles.keyboard, }}
                    // refreshing={props.refreshing ? props.refreshing : false}

                    refreshControl={
                        props.shouldRefresh ?
                            <RefreshControl
                                refreshing={props.refreshing}
                                onRefresh={props.handleRefresh}
                            />
                            :
                            props.NULL  // might create issue with undefined 
                    }
                // style={{ flex: 1 }}
                >
                    {props.children}
                </KeyboardAwareScrollView>
                :
                <View style={{ flex: 1, ...props.scrollStyle }}>
                    {props.children}
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    keyboard: {
        // height:scaleHeight('100%'),
        flexGrow: 1,
        // flex: 1
    }
})
