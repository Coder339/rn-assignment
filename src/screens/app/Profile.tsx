import { Alert, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { globalStyles, SCREEN_WIDTH } from '../../styles/globalStyles';
import { APP_IMAGE } from '../../utils/constants';
import { fonts } from '../../styles/fonts';
import { scale } from '../../styles/metrics';
import { colors } from '../../styles/colors';
import { getData, removeData } from '../../utils/storage';
import { ContextProps, useTheme } from '../../components/ThemeContext';


interface ProfileProps {
    navigation: any
}

type SocialProps = {
    name: string,
    email: string,
    photo: string,
}

export default function Profile({ navigation }: ProfileProps) {

    const [currentUser, setCurrentUser] = useState<SocialProps | null>(null)
    const { isDarkMode, toggleTheme } = useTheme();


    console.log('isDarkMode', isDarkMode);


    const _signOut = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            await removeData('TOKEN')
            await removeData('CURRENT_USER')
            navigation.replace('Auth')
        } catch (error) {
            console.log('error', error);

        }
    };

    const getUserInfo = async () => {
        const getUser: any = await getData('CURRENT_USER')
        const parsedUser = JSON.parse(getUser)
        setCurrentUser(parsedUser)
    }

    useEffect(() => {
        getUserInfo()
    }, [])


    const ConfirmSignOutHandler = () => {
        Alert.alert('Logout', 'Are you sure?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => _signOut() }
        ]);
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: isDarkMode ? '#000' : '#fff' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 12, paddingTop: 24, flex: 1 }}
            >
                <View style={{ flexDirection: 'row', marginTop: 30, }}>
                    <View style={{ width: SCREEN_WIDTH / 2, paddingStart: 12 }}>
                        <Text style={{
                            fontFamily: fonts.semiBoldFont,
                            fontSize: scale(26),
                            color: isDarkMode ? '#fff' : '#000'
                        }}>A Brief History Of Creation</Text>
                    </View>
                    <View style={{
                        width: SCREEN_WIDTH / 2,
                        alignItems: "flex-end",
                        paddingEnd: 12,
                        justifyContent: 'flex-end'
                    }}>
                        <Image
                            source={{ uri: currentUser?.photo }}
                            style={styles.profileImg}
                        />
                    </View>
                </View>
                <View style={{ padding: 16, borderTopWidth: 0.5, marginTop: 20, borderTopColor: isDarkMode ? '#fff' : '#000' }}>
                    <Text style={{ ...globalStyles.semiBoldLargeText, fontSize: 20, color: isDarkMode ? '#fff' : '#000' }}>{currentUser?.name}</Text>
                    <Text style={{ ...globalStyles.regularLargeText, color: isDarkMode ? '#fff' : '#000' }}>{currentUser?.email}</Text>
                </View>
                <View style={{
                    ...styles.themeContainer,
                    borderColor: isDarkMode ? '#fff' : '#000'
                }}>
                    <Text style={{
                        ...globalStyles.semiBoldLargeText,
                        color: isDarkMode ? '#fff' : '#000'
                    }}>Dark Mode</Text>
                    <Switch value={isDarkMode} onValueChange={toggleTheme} />
                </View>
            </ScrollView>
            <Pressable
                onPress={ConfirmSignOutHandler}
                style={{
                    ...styles.signoutContainer,
                    borderColor: isDarkMode ? '#fff' : '#000'
                }}
            >
                <Text style={{ ...globalStyles.semiBoldLargeText, color: isDarkMode ? '#fff' : '#000' }}>S I G N  O U T</Text>
            </Pressable>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signoutContainer: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 8,
        marginBottom: 16,
        alignItems: "center",
        marginHorizontal: 12
    },
    themeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 4,
        marginTop: 12
    },
    profileImg: {
        width: scale(120),
        height: scale(120),
        borderRadius: 60,
        borderColor: colors.greyText,
        borderWidth: 4,
        backgroundColor: colors.greyText
    }
})