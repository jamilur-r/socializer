import React from "react";
import { ProfileEditCon, Header } from "../../styles/profile.stc";
import { TextSTC } from "../../styles/global.stc";
import { TouchableOpacity } from "react-native";
import { ButtonsContainer } from "../../styles/profile.stc";

const ProfileEdit = () => {
  return (
    <ProfileEditCon>
      <Header>
        <TextSTC size="24px" family="semi">
          Update Profile
        </TextSTC>
        <TouchableOpacity>
          <TextSTC color="#ff2d55" family="bold">
            Save
          </TextSTC>
        </TouchableOpacity>
      </Header>
      <ButtonsContainer>
        
      </ButtonsContainer>
    </ProfileEditCon>
  );
};

export default ProfileEdit;
