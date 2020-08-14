/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from "react-native";

const Layout = (props) => {

    return (
        <>
            <SafeAreaView style={styles.container} emulateUnlessSupported>
                {props.children}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
    },
});

export default Layout;