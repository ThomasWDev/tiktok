/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React, {useState} from 'react';
import {View, Text} from "react-native";
import Layout from "../../components/Layout";

const Profile = (props) => {

    return (
        <Layout>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Profile</Text>
            </View>
        </Layout>
    );
};

export default Profile;