/*
 *
 *  Created By: Thomas Woodfin
 *
 *
 */

import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
    FlatList,
    TextInput
} from "react-native";
import Modal from 'react-native-modal';
import Icon from "react-native-vector-icons/FontAwesome";

import TextTicker from "react-native-text-ticker";
import ViewPager from '@react-native-community/viewpager';
import * as Animatable from 'react-native-animatable';
import iconPlus from "../../../assets/iconplus.png";
import whiteHeart from "../../../assets/white-heart-fill.png";
import redHeart from "../../../assets/red-heart.png";
import comment from "../../../assets/comment.png";
import iconMusic from "../../../assets/music.png";
import share from "../../../assets/share.png";
import disk from "../../../assets/disk-circle.png";

import feeds from "../../../server.json"

import { Video } from "expo-av";
import CommentItem from "../../components/CommentItem";
const { width, height = height - 50 } = Dimensions.get("window");

const Feed = (props) => {
    const [feed, setfeed] = useState([]);
    const [liked, setLiked] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);

    const [commentModalVisible, setCommentModalVisible] = useState(false);

    const [comments, setComments] = useState([
        {
            id: "0",
            comment: "Hello",
            author: "Tom Woodfin",
            likes: 50,
            avatar: "https://img.icons8.com/bubbles/2x/user.png"
        },
        {
            id: "1",
            comment: "Awesome Code",
            author: "Tom Woodfin",
            likes: 4,
            avatar: "https://img.icons8.com/bubbles/2x/user.png"
        },
        {
            id: "2",
            comment: "Nice",
            author: "Tom Woodfin",
            likes: 7,
            avatar: "https://img.icons8.com/bubbles/2x/user.png"
        },
        {
            id: "3",
            comment: "Its just Awesome",
            author: "Tom Woodfin",
            likes: 1,
            avatar: "https://img.icons8.com/bubbles/2x/user.png"
        },
    ]);
    const [commentValue, onCommentValueChange] = React.useState("");

    const handleLike = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        async function LoadFeed() {
            try {
                setfeed(feeds.feed);
            } catch (error) {
                console.log("No feed found: " + error);
            }
        }

        LoadFeed();
    }, []);

    return (
        <SafeAreaView>
            <View style={[{ zIndex: 7 }, styles.header]}>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textLeftHeader}>Following</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.spanCenterHeader}>|</Text>
                <View>
                    <TouchableOpacity>
                        <Text style={styles.textRightHeader}>For you</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <ViewPager
                    style={{flex: 1}}
                    initialPage={0}
                    orientation="vertical"
                    onPageScroll={(e) => {
                        // console.log('e: ', e.nativeEvent.position);
                        setCurrentPage(e.nativeEvent.position);
                    }}
                >
                    {feed.map((item, index) => (
                        <View key={item.id} style={[styles.page_container, styles.post]}>
                            <View style={styles.video}>
                                <Video
                                    source={{
                                        uri: item.video_url
                                    }}
                                    rate={1.0}
                                    volume={1.0}
                                    isMuted={false}
                                    resizeMode="contain"
                                    shouldPlay={index === currentPage}
                                    bounce={false}
                                    isLooping
                                    style={styles.videoPlayer}
                                    useNativeControls={false}
                                />
                            </View>
                            <View style={styles.content}>
                                <View style={styles.InnerContent}>
                                    <TouchableOpacity>
                                        <Text style={styles.name}>{item.author.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Text style={styles.description} numberOfLines={5}>
                                            {item.description}
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={styles.hashtags}>{item.hashtags}</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.translate}>{item.place}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.componentMusic}>
                                        <View style={styles.imageIconMusic}>
                                            <Image style={styles.iMusic} source={iconMusic} />
                                        </View>
                                        <TextTicker
                                            style={styles.nameMusic}
                                            duration={4000}
                                            loop
                                            bounce={false}
                                            repeatSpacer={70}
                                            marqueeDelay={1000}
                                            shouldAnimateTreshold={40}
                                        >
                                            I Don’t Care - Ed Sheeran Part Justin Bieber
                                        </TextTicker>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.contentIcon}>
                                <View style={styles.contentIconProfile}>
                                    <TouchableOpacity>
                                        <Image
                                            source={{ uri: item.author.avatar }}
                                            style={styles.iconProfile}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={iconPlus} style={styles.iconPlusProfile} />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.iconsAction}>
                                    <View style={styles.contentIconAction}>
                                        <TouchableOpacity onPress={handleLike}>
                                            <Image
                                                source={liked ? redHeart : whiteHeart}
                                                style={styles.iconAction}
                                            />
                                        </TouchableOpacity>
                                        <Text style={styles.textActions}>153.1K</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={styles.contentIconAction}
                                        onPress={() => {
                                            setCommentModalVisible(true);
                                        }}
                                    >
                                        <Image source={comment} style={styles.iconAction} />
                                        <Text style={styles.textActions}>208</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.contentIconAction}>
                                        <Image source={share} style={styles.iconShare} />
                                        <Text style={styles.textActions}>Share</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.iconsMusic}>
                                    <TouchableOpacity>
                                        <Animatable.Image
                                            animation="rotate"
                                            iterationCount="infinite"
                                            duration={4000}
                                            style={styles.iconMusic}
                                            source={disk}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </ViewPager>
            </View>
            <Modal
                isVisible={commentModalVisible}
                onBackdropPress={() => setCommentModalVisible(false)}
                animationIn='slideInUp'
                animationInTiming={500}
                animationOutTiming={500}
                style={styles.modalView}
            >
                <View style={styles.modalInner}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalHeaderText}>{comments.length} Comments</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.modalCloseBtn}
                        onPress={() => {
                            setCommentModalVisible(false);
                        }}
                    >
                        <Icon name="close" size={14}/>
                    </TouchableOpacity>
                    <View style={styles.comments}>
                        <FlatList
                            scrollEnabled={true}
                            data={comments}
                            renderItem={({item}) => <CommentItem {...item}/>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                    <View style={styles.commentBox}>
                        <TextInput
                            style={styles.commentBoxInput}
                            onChangeText={text => onCommentValueChange(text)}
                            value={commentValue}
                            placeholder="Add Comment . . ."
                            onSubmitEditing={() => {
                                let lastCommentid = comments[comments.length-1].id;
                                let newComments = comments.concat({
                                    id: `${parseInt(lastCommentid)+1}`,
                                    comment: commentValue,
                                    author: "Tom Woodfin",
                                    likes: 0,
                                    avatar: "https://img.icons8.com/bubbles/2x/user.png"
                                });
                                setComments(newComments);
                                onCommentValueChange("");
                            }}
                        />
                        <View style={styles.commentBoxActions}>
                            <TouchableOpacity>
                                <Icon style={styles.commentBoxActionsIcon} name='at' size={25}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Icon style={styles.commentBoxActionsIcon} name='smile-o' size={25}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height,
        backgroundColor: "black",
        zIndex: 1,
        alignSelf: "stretch"
    },
    post: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        zIndex: 2,
        alignSelf: "stretch",
        position: "relative",
        bottom: 0
    },
    page_container: {
        flex: 1,
        width,
        height
    },
    video: {
        width: "100%",
        flex: 1,
        zIndex: 2
    },
    videoPlayer: {
        width: "100%",
        zIndex: 2,
        flex: 1
    },
    header: {
        flexDirection: "row",
        position: "absolute",
        top: 40,
        left: 75,
        alignItems: "center"
    },
    spanCenterHeader: {
        color: "#fff",
        fontSize: 10
    },
    textLeftHeader: {
        color: "grey",
        paddingHorizontal: 10,
        fontSize: 20
    },

    textRightHeader: {
        color: "white",
        paddingHorizontal: 10,
        fontSize: 23,
        fontWeight: "bold"
    },
    content: {
        width: "75%",
        position: "absolute",
        left: 0,
        bottom: 40,
        zIndex: 3,
    },
    InnerContent: {
        width: "100%",
        position: "relative",
        bottom: 0,
        justifyContent: "flex-end",
        paddingHorizontal: 10,
        flexDirection: "column"
    },

    name: {
        color: "#fff",
        marginVertical: 3,
        fontSize: 15,
        fontWeight: "bold"
    },
    description: {
        color: "#fff",
        marginTop: 2,
        fontSize: 15
    },
    hashtags: {
        color: "#fff",
        fontWeight: "bold"
    },
    componentMusic: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        width: 190
    },
    imageIconMusic: {
        marginRight: 15
    },
    iMusic: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    nameMusic: {
        color: "white",
        fontSize: 15
    },
    translate: {
        fontWeight: "bold",
        color: "white",
        marginVertical: 5
    },
    contentIcon: {
        width: "20%",
        position: "absolute",
        bottom: 50,
        right: 0,
        alignItems: "center",
        zIndex: 3,
    },
    contentIconProfile: {
        alignItems: "center",
        marginBottom: 2
    },

    iconProfile: {
        width: 50,
        height: 50,
        resizeMode: "cover",
        borderRadius: 25,
        borderColor: "white",
        borderWidth: 1
    },
    iconPlusProfile: {
        height: 35,
        width: 25,
        position: "relative",
        bottom: 20,
        zIndex: 5,
        resizeMode: "contain"
    },
    iconsAction: {
        alignItems: "center",
        marginBottom: 10
    },
    contentIconAction: {
        alignItems: "center",
        marginBottom: 13
    },
    iconAction: {
        height: 30,
        width: 30
    },
    iconShare: {
        height: 30,
        width: 30,
        resizeMode: "cover",
        borderRadius: 20
    },
    textActions: {
        color: "#fff",
        fontSize: 12,
        textAlign: "center",
        width: 54
    },
    iconMusic: {
        width: 50,
        height: 50,
        resizeMode: "cover",
        borderRadius: 30
    },

    modalView: {
        margin: 0,
        justifyContent: 'flex-end'
    },
    modalInner: {
        backgroundColor: "#fff",
        position: 'relative',
        minHeight: 400,
    },
    modalHeader: {
       padding: 5,
       height: 40,
       justifyContent: 'center',
       alignItems: 'center'
    },
    modalHeaderText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 12
    },
    modalCloseBtn: {
        position: 'absolute',
        right: 5,
        top: 5,
        width: 20,
        height: 20
    },
    comments: {
        flex: 1
    },
    commentBox: {
        position: 'relative'
    },
    commentBoxInput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: .5,
        paddingLeft: 10,
        paddingRight: 70,
    },
    commentBoxActions: {
        position: 'absolute',
        right: 0,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        width: 70,
        height: 50,
    },
    commentBoxActionsIcon: {
        fontWeight: 'bold',
        color: '#999'
    },
});

export default Feed;
