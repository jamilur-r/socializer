import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { FullScreenCol, ButtonSTC, TextSTC } from "../../styles/global.stc";
import { HomeRouteType } from "../../types/route-types";
import ProfileCompletion from "../../widgets/ProfileCompletion";
import { StatusBar } from "react-native";

interface Props extends RXProps {
  navigation: BottomTabNavigationProp<HomeRouteType, "feed">;
}
const Root = ({ logout, navigation }: Props) => {
  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <FullScreenCol>
        <ProfileCompletion navigation={navigation} />
        <ButtonSTC onPress={() => logout()}>
          <TextSTC>LOGOUT</TextSTC>
        </ButtonSTC>
      </FullScreenCol>
    </>
  );
};
const mapDispatch = {
  logout: () => ({
    type: "logout",
  }),
};

const connector = connect(null, mapDispatch);
type RXProps = ConnectedProps<typeof connector>;

export default connector(Root);
