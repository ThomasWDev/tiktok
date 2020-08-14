/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React, {useState} from 'react';
import {View, Text} from "react-native";
import Layout from "../../components/Layout";

const Message = (props) => {

    return (
        <Layout>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Message</Text>
            </View>
        </Layout>
    );
};

export default Message;