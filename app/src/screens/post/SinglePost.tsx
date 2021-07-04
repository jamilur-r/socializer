import React from "react";
import { TextSTC } from "../../styles/global.stc";
import { PostType } from "../../types/post-reducer-types";
import {
  ActionButtonWrap,
  BodyWrap,
  ImageBG,
  UserDP,
  UserInfo,
} from "../../styles/post.stc";
import { View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { formatNumbers } from "../../utils/utils";
import { UserType } from "../../types/auth-reducer-types";
import { connect, ConnectedProps } from "react-redux";
import { io } from "socket.io-client";
import { POST_SERVER } from "../../configs/constants";
import { addLike } from "../../store/actions/post-action";
import { AppState } from "../../store/index";
import { useState } from "react";
import AddComment from "../../widgets/AddComment";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileRouteType } from "../../types/route-types";
import { RouteProp } from "@react-navigation/native";
import { Video, AVPlaybackStatus } from "expo-av";
import { useRef } from "react";



interface Props extends RXProps {
  navigation: StackNavigationProp<ProfileRouteType, "single_post">;
  route: RouteProp<ProfileRouteType, "single_post">;
}
const SinglePost = ({ addOrRmLike, uppost, token, route }: Props) => {
  const socket = io(POST_SERVER, {
    reconnectionAttempts: 15,
  });
  const post = route.params.post;
  const user = route.params.user;
  const [status, setStatus] = useState({});
  const video = useRef(null);

  
  const [showComment, setShowC] = useState<boolean>(false);

  const handleLike = async () => {
    const result = await addLike(
      {
        pid: post.id,
        uid: user?.id,
      },
      token
    );
    if (result == 200) {
      addOrRmLike({ post_id: post.id, uid: user?.id, type: "add" });
      socket.emit("get-posts");
      socket.on("get-posts", (data) => {
        uppost(data);
      });
    } else {
      addOrRmLike({ post_id: post.id, uid: user?.id, type: "rm" });
      socket.emit("get-posts");
      socket.on("get-posts", (data) => {
        uppost(data);
      });
    }
  };
  if (post.post_type == "photo") {
    return (
      <ImageBG source={{ uri: post.file_url }} style={{ height: "100%" }}>
        <UserInfo>
          <UserDP source={{ uri: post.uid.profile_picture }} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 25,
            }}
          >
            <TextSTC family="bold" size="20px" color="#fff">
              {post?.uid.name.first} {post?.uid.name.last}
            </TextSTC>
            <TextSTC family="norm" size="14px" color="#fff">
              #{post.uid.username}
            </TextSTC>
          </View>
          {post.uid.username === user?.username ? (
            <></>
          ) : (
            <TouchableOpacity>
              <Feather name="plus-square" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </UserInfo>
        <ActionButtonWrap>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleLike}
          >
            <Feather
              name="heart"
              size={24}
              color={
                user?.id && post.likes.includes(user?.id) ? "#ff2d55" : "#fff"
              }
            />
            <TextSTC color="#fff" family="semi">
              {formatNumbers(post.likes.length)}
            </TextSTC>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowC(true)}
          >
            <Feather name="message-square" size={24} color="#fff" />
            <TextSTC color="#fff" family="semi">
              {formatNumbers(post.comments.length)}
            </TextSTC>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="share-2" size={24} color="#fff" />
          </TouchableOpacity>
        </ActionButtonWrap>

        <BodyWrap>
          <TextSTC color="#fff" family="med" size="15px">
            {post.body}
          </TextSTC>
        </BodyWrap>
        <AddComment
          post={post}
          comments={post.comments}
          visiblity={{
            getter: showComment,
            setter: setShowC,
          }}
        />
      </ImageBG>
    );
  } else {
    return (
      <>
        <Video
          ref={video}
          source={{ uri: post.file_url }}
          useNativeControls
          resizeMode="cover"
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(status)}
          style={{
            width: "100%",
            height: 800,
            position: "relative",
          }}
        />
        <UserInfo>
          <UserDP source={{ uri: post.uid.profile_picture }} />
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              marginRight: 25,
            }}
          >
            <TextSTC family="bold" size="20px" color="#fff">
              {post?.uid.name.first} {post?.uid.name.last}
            </TextSTC>
            <TextSTC family="norm" size="14px" color="#fff">
              #{post.uid.username}
            </TextSTC>
          </View>
          {post.uid.username === user?.username ? (
            <></>
          ) : (
            <TouchableOpacity>
              <Feather name="plus-square" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </UserInfo>
        <ActionButtonWrap>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleLike}
          >
            <Feather
              name="heart"
              size={24}
              color={
                user?.id && post.likes.includes(user.id) ? "#ff2d55" : "#fff"
              }
            />
            <TextSTC color="#fff" family="semi">
              {formatNumbers(post.likes.length)}
            </TextSTC>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setShowC(true)}
          >
            <Feather name="message-square" size={24} color="#fff" />
            <TextSTC color="#fff" family="semi">
              {formatNumbers(post.comments.length)}
            </TextSTC>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="share-2" size={24} color="#fff" />
          </TouchableOpacity>
        </ActionButtonWrap>

        <BodyWrap>
          <TextSTC color="#fff" family="med" size="15px">
            {post.body}
          </TextSTC>
        </BodyWrap>
        <AddComment
          post={post}
          comments={post.comments}
          visiblity={{
            getter: showComment,
            setter: setShowC,
          }}
        />
      </>
    );
  }
};

const mapDispatch = {
  addOrRmLike: (data: {
    post_id: string;
    uid: string | undefined;
    type: string;
  }) => ({
    type: "like-post",
    payload: data,
  }),
  uppost: (data: PostType[]) => ({
    type: "up-post-list",
    payload: data,
  }),
};

const mapState = (state: AppState) => ({
  token: state.auth.token,
});

const connector = connect(mapState, mapDispatch);

type RXProps = ConnectedProps<typeof connector>;

export default connector(SinglePost);
