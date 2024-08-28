import React from 'react'
import { Dimensions, Platform, StyleSheet, I18nManager } from 'react-native'
import { scale } from './metrics'
import { fonts } from './fonts'
import { colors } from './colors'

export const SCREEN_WIDTH = Dimensions.get('screen').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
// export const INSETS = useSafeAreaInsets()


export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    // for text
    regularSmallText: {
        fontFamily: fonts.regularFont,
        fontSize: scale(12),
        color: colors.text
    },
    regularMediumText: {
        fontFamily: fonts.regularFont,
        color: colors.text,
        fontSize: scale(14),
    },
    regularLargeText: {
        fontFamily: fonts.regularFont,
        fontSize: scale(16),
        color: colors.text
    },
    lightSmallText: {
        fontFamily: fonts.lightFont,
        fontSize: scale(12),
        color: colors.text
    },
    lightMediumText: {
        fontFamily: fonts.lightFont,
        color: colors.text,
        fontSize: scale(14),
    },
    lightLargeText: {
        fontFamily: fonts.lightFont,
        fontSize: scale(16),
        color: colors.text
    },

    standardSmallText: {
        fontFamily: fonts.standardFont,
        fontSize: scale(12),
        color: colors.text
    },
    standardMediumText: {
        fontFamily: fonts.standardFont,
        color: colors.text,
        fontSize: scale(14),
    },
    standardLargeText: {
        fontFamily: fonts.standardFont,
        fontSize: scale(16),
        color: colors.text
    },

    boldSmallText: {
        fontFamily: fonts.boldFont,
        fontSize: scale(12),
        color: colors.text
    },
    boldMediumText: {
        fontFamily: fonts.boldFont,
        color: colors.text,
        fontSize: scale(14),
    },
    boldLargeText: {
        fontFamily: fonts.boldFont,
        fontSize: scale(16),
        color: colors.text
    },

    semiBoldSmallText: {
        fontFamily: fonts.semiBoldFont,
        fontSize: scale(12),
        color: colors.text
    },
    semiBoldMediumText: {
        fontFamily: fonts.semiBoldFont,
        color: colors.text,
        fontSize: scale(14),
    },
    semiBoldLargeText: {
        fontFamily: fonts.semiBoldFont,
        fontSize: scale(16),
        color: colors.text
    },



})