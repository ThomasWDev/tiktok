/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CommentItem = ({ item, comment, author, avatar, likes }) => (
    <View style={styles.commentItem}>
        <View style={styles.commentAvatar}>
            <Image style={styles.commentAvatarImg} source={{uri: avatar}}/>
        </View>
        <View style={styles.commentContent}>
            <Text style={styles.commentAuthor}>{author}</Text>
            <Text style={styles.comment}>{comment}</Text>
        </View>
        <View style={styles.commentActions}>
            <Icon name="heart-o" size={20} color="#989898"/>
            <Text style={styles.likes}>{likes}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    commentItem: {
        padding: 5,
        minHeight: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5
    },
    commentAvatar: {
        width: '10%'
    },
    commentAvatarImg: {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    commentContent: {
        width: '70%'
    },
    commentAuthor: {
        color: '#989898',
        fontSize: 12
    },
    comment: {
        color: '#000',
        fontSize: 15
    },
    commentActions: {
        width: '20%',
        alignItems: 'center'
    },
    likes: {
        color: "#989898",
        fontSize: 12
    },
});

export default CommentItem;