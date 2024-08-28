import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import * as Animatable from 'react-native-animatable';
import GradientView from '../../components/GradientView';
import AnimatedTextWithDelay from '../../components/AnimatedTextWithDelay';
import { globalStyles } from '../../styles/globalStyles'
import Animated, { FadeIn, FadeInLeft, FadeInRight, FlipInEasyX } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { setData } from '../../utils/storage';
import { APP_IMAGE } from '../../utils/constants';
import AppView from '../../components/AppView';
import AppHeader from '../../components/AppHeader';
import { colors } from '../../styles/colors';
import AuthSvgOne from '../../assets/svgs/AuthSvgOne';
import { scale } from '../../styles/metrics';
import GradientButton from '../../components/GradientButton';
import IconWrapper from '../../components/IconWrapper';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CountryPicker from 'react-native-country-picker-modal';
import { ToastMessage } from '../../components/toastMessage';

interface LoginProps {
    navigation: any
}

export default function Login({ navigation }: LoginProps) {

    const [confirmResult, setConfirmResult] = useState<any>(null);
    const [user, setUser] = useState<any>(null)
    const [verificationCode, setVerificationCode] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [countryCode, setCountryCode] = useState('91')
    const [svg, setSvg] = useState<ReactNode>(<AuthSvgOne />)
    const [step, setStep] = useState(1)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [idToken, setIdToken] = useState<any>(null)
    const otpInputRef = useRef(null);

    const getPhoneNumber = (text: string) => {
        setPhoneNumber(text)
    }

    const onBlurPhoneNumber = () => {
        const temp = phoneNumber
        setPhoneNumber(temp.trim())
    }


    async function onGoogleSignin() {
        console.log('1111');

        try {

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const userInfo = await GoogleSignin.signIn();
            console.log('idToken', userInfo);
            setIdToken(userInfo.idToken)
            setUser(userInfo?.user)
            setStep((prev) => prev + 1)

        } catch (error: any) {

            if (isErrorWithCode(error)) {
                console.log('error', error.message);
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        setTimeout(() => {
                            Alert.alert('cancelled');
                        }, 500);
                        break;
                    case statusCodes.IN_PROGRESS:
                        Alert.alert(
                            'in progress',
                            'operation (eg. sign in) already in progress',
                        );
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // android only
                        Alert.alert('Play services not available or outdated');
                        break;
                    default:
                        Alert.alert('Something went wrong: ', error.toString());
                }
            } else {
                console.log('ERROR', error);
            }

        }
    }

    // Phone Sign-In
    async function signInWithPhoneNumber() {
        if (phoneNumber === '') {
            ToastMessage('Please add contact before proceeding.')
            return
        }
        else if (phoneNumber.length < 10) {
            ToastMessage('Contact number must be of minimum 10 numbers')
            return
        }
        else if (phoneNumber.includes('.')) {
            ToastMessage('Please enter a valid contact number.')
            return
        }

        try {

            const confirmation = await auth().signInWithPhoneNumber(`+${countryCode + phoneNumber}`);
            console.log('confirmation', confirmation);

            setConfirmResult(confirmation);
            setStep((prev) => prev + 1)
        } catch (error) {
            console.log('error', error);

        }
    }

    async function confirmCode() {
        if (verificationCode === '') {
            ToastMessage(`Please add code sent to ${phoneNumber}`)
            return
        }
        else if (verificationCode.length < 6) {
            ToastMessage('Otp must be of 6 numbers.')
            return
        }
        try {
            const userInfo = await confirmResult.confirm(verificationCode);
            console.log('userInfo==', userInfo);

            setData('TOKEN', JSON.stringify(idToken))
            setData('CURRENT_USER', JSON.stringify(user))
            navigation.replace('App')

            //   setUser(user);
        } catch (error) {
            console.log('Invalid code.', error);
        }
    }

    const stepHandler = (step: number) => {

        switch (step + 1) {
            case 1:
                console.log(step);
                break;
            case 2:
                onGoogleSignin()
                break;
            case 3:
                signInWithPhoneNumber()
                break;
            case 4:
                confirmCode()
                break;
            default:
                break;
        }
    }

    function OtpVerification() {

        return (

            <OTPInputView
                ref={otpInputRef}
                style={styles.otpContainer}
                pinCount={6}
                code={verificationCode}
                onCodeChanged={e => setVerificationCode(e)}
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                    console.log(`Code is ${code}, you are good to go!`);
                }}
            />

        )
    }


    const SigninFirstComponent = () => {
        return (
            <>
                <Animated.Text
                    entering={FadeInRight.delay(400).duration(2000)}
                    style={styles.title}>S O C I A L  L O G I N</Animated.Text>
                <Pressable
                    style={styles.socialContainer}
                    onPress={() => onGoogleSignin()}
                >
                    <Image
                        source={APP_IMAGE.googleImage}
                        style={{ width: 20, height: 20, marginEnd: 12 }}
                        resizeMode='contain'
                    />
                    <Text style={{ ...globalStyles.semiBoldMediumText, color: '#fff' }}>Signin with Google</Text>
                </Pressable>
            </>
        )
    }

    function SigninSecondComponent() {

        return (
            <>
                <View style={{
                    ...styles.inputWrapper,
                    marginVertical: scale(16)
                }}>
                    <Pressable
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => setPickerVisible(true)}
                    >
                        <Text style={styles.countryCode}>+{countryCode}</Text>
                        <Image
                            source={APP_IMAGE.dropdown}
                            style={styles.dropdownIcon} />
                    </Pressable>
                    <View style={styles.separator} />
                    <TextInput
                        placeholder='Please add your phone number'
                        placeholderTextColor={colors.grey1}
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={getPhoneNumber}
                        onBlur={onBlurPhoneNumber}
                        keyboardType='numeric'

                    />
                </View>
            </>
        )
    }


    return (
        <AppView
            scrollContainerRequired={true}
            isScrollEnabled={true}
            refreshing={false}
            customContainerStyle={{ backgroundColor: colors.primary }}
            scrollStyle={{ paddingHorizontal: scale(40) }}
            header={<AppHeader
                leftIcon={step !== 1 && <IconWrapper component={<Image
                    source={APP_IMAGE.back}
                    style={{
                        width: scale(16),
                        height: scale(16)
                    }}
                />} />}
                leftPress={() => {
                    if (step !== 1) {
                        setStep(step - 1)
                        return
                    }
                    navigation.goBack()
                }}
                titleBox={<Text style={{ ...globalStyles.semiBoldLargeText, color: '#fff' }}>{step === 1 ? 'Social Sign In' : 'OTP Verification'}</Text>}
                titleStyle={styles.headerTitleStyle}
            />}
            avoidingView={false}
        >
            <View style={{ flex: 1 }}>
                <Animated.View
                    entering={FlipInEasyX.delay(200)}
                    style={styles.svgContainer}
                >
                    {svg}
                </Animated.View>

                {step === 1 ? SigninFirstComponent() :
                    step === 2 ? SigninSecondComponent() :
                        OtpVerification()
                }
                {step !== 1 &&
                    <GradientButton
                        text={
                            step === 2 ? 'Verify now' : 'Enter'
                        }
                        onPress={() => stepHandler(step)}
                    />
                }
            </View>
            {pickerVisible &&
                <CountryPicker
                    withFilter
                    withFlag
                    withEmoji
                    withFlagButton={true}
                    onClose={() => setPickerVisible(false)}
                    onSelect={country => {
                        setCountryCode(country.callingCode[0])
                    }}
                    visible={pickerVisible}
                    countryCode={'IN'}
                />
            }
        </AppView>
    )
}

const styles = StyleSheet.create({
    container: {
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    title: {
        ...globalStyles.semiBoldLargeText,
        color: '#fff',
        fontSize: 22,
        textAlign: 'center'
    },
    socialContainer: {
        marginHorizontal: 20,
        padding: 16,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },


    headerTitleStyle: {
        ...globalStyles.boldLargeText,
        fontSize: scale(22),
        color: '#fff'
    },
    svgContainer: {
        alignItems: "center",
        marginVertical: scale(44)
    },
    input: {
        paddingVertical: scale(20),
        marginStart: scale(12),
        flex: 1,
        ...globalStyles.regularLargeText,
        color: '#fff'
    },
    inputWrapper: {
        backgroundColor: colors.secondary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(22),
        borderRadius: scale(26)
    },
    footerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: scale(30)
    },
    description: {
        ...globalStyles.regularLargeText,
        color: colors.greyText,
        textAlign: 'center',
        lineHeight: 22
    },
    underlineStyleBase: {
        width: scale(50),
        height: scale(50),
        borderRadius: scale(25),
        backgroundColor: colors.secondary,
        color: '#fff',
        borderWidth: 0
    },

    underlineStyleHighLighted: {
        borderColor: colors.tertiary,
    },

    dropdownIcon: {
        width: 12,
        height: 6,
        marginHorizontal: scale(12)
    },
    countryCode: {
        ...globalStyles.regularLargeText,
        color: '#fff'
    },
    separator: {
        height: 32,
        width: 1,
        backgroundColor: "rgba(255,255,255,0.4)"
    },

    otpContainer: {
        width: '100%',
        height: scale(66),
        marginVertical: scale(16)
    },
    codeContainer: {
        marginTop: scale(12),
        marginBottom: scale(40)
    },
    codeResend: {
        ...globalStyles.regularMediumText,
        color: '#fff'
    },
    timer: {
        ...globalStyles.semiBoldLargeText,
        color: colors.tertiary,
        textAlign: "center",
        marginTop: scale(12)
    },


})