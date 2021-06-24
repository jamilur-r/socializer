import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { API_ENDPOINT } from "../../configs/constants";
import {
  FullScreenCol,
  TextSTC,
  InputSTC,
  ButtonSTC,
} from "../../styles/global.stc";
import { BaseRouteType } from "../../types/route-types";

interface Props {
  navigation: StackNavigationProp<BaseRouteType, "signup">;
}
const Signup = ({ navigation }: Props) => {
  const [username, setUsername] = useState<string>("");
  const validateUsername = async () => {
    const url = API_ENDPOINT + `auth/validate-username/${username}`

    try {
      const check = await axios.get(url)
      if(!check){
        
      }
    } catch (error) {
      throw error
    }
  }
  return (
    <FullScreenCol>
      <TextSTC color="#272729" size="48px" family="bold">
        SIGN UP
      </TextSTC>
      <InputSTC
        gap="20px 0"
        value={username}
        onChangeText={(text) => setUsername(text)}
        placeholder="Choose username"
      />
      <ButtonSTC>
        <TextSTC color="#fff" family="bold" size="18px">
          Next
        </TextSTC>
      </ButtonSTC>
    </FullScreenCol>
  );
};

export default Signup;
