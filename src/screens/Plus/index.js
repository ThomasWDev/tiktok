/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React, {useState} from 'react';
import {View, Text} from "react-native";
import Layout from "../../components/Layout";

const Plus = (props) => {

    return (
        <Layout>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Plus</Text>
            </View>
        </Layout>
    );
};

export default Plus;