import React from "react";
import { PostType } from "../types/post-reducer-types";
import { FlatList } from "react-native";
import { PostIMG } from "../styles/post.stc";

interface Props {
  posts: PostType[];
}
const PostGrid = ({ posts }: Props) => {
  const renderPost = ({ item }: { item: PostType }) => {
    if (item.post_type == "photo") {
      return <PostIMG source={{ uri: item.file_url }} />;
    } else {
      return <></>;
    }
  };
  return (
    <FlatList<PostType>
      style={{
        width: "100%",
        height: "30%",
        marginTop: 20,
      }}
      contentContainerStyle={{
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
      }} 
      data={posts}
      keyExtractor={(item, index) => item.id}
      renderItem={renderPost}
    />
  );
};

export default PostGrid;
