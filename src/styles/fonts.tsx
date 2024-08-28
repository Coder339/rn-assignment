import React from 'react'
import { Platform, } from 'react-native'


export const fonts = {
    regularFont: Platform.OS === 'ios' ? 'FiraCode-Regular' : 'FiraCode-Regular',
    lightFont: Platform.OS === 'ios' ? 'FiraCode-Light' : 'FiraCode-Light',
    standardFont: Platform.OS === 'ios' ? 'FiraCode-Medium' : 'FiraCode-Medium',
    boldFont: Platform.OS === 'ios' ? 'FiraCode-Bold' : 'FiraCode-Bold',
    semiBoldFont: Platform.OS === 'ios' ? 'FiraCode-SemiBold' : 'FiraCode-SemiBold',
}


