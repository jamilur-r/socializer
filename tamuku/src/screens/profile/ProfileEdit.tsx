import React, { useState } from "react";
import { ProfileEditCon, Header } from "../../styles/profile.stc";
import { TextSTC, InputSTC } from "../../styles/global.stc";
import { TouchableOpacity } from "react-native";
import { ButtonsContainer } from "../../styles/profile.stc";
import { View } from "react-native";
import { AppState } from "../../store";
import { connect, ConnectedProps } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UserType } from "../../types/auth-reducer-types";
import { updateUser } from "../../store/actions/auth-actions";

interface Props extends RXProps {}

const ProfileEdit = ({ user, updateData, token }: Props) => {
  const [inputs, setInputs] = useState({
    first: user?.name.first,
    last: user?.name.last,
    dob: user?.date_of_birth ? new Date(user.date_of_birth) : new Date(),
  });

  const [pickerShow, setShow] = useState(false);

  const [isDisabled, setisDisabled] = useState(
    inputs.last != user?.name.last ||
      inputs.first != user?.name.first ||
      inputs.dob != new Date(user?.date_of_birth)
  );
  // console.log(user);

  const handleSave = async () => {
    try {
      const result = await updateUser({ ...inputs, id: user?.id }, token);
      if (result) {
        console.log('result');
        
        updateData(result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <ProfileEditCon>
      <Header>
        <TextSTC size="24px" family="semi">
          Update Profile
        </TextSTC>
        <TouchableOpacity
          disabled={!isDisabled}
          onPress={async () => await handleSave()}
        >
          <TextSTC color="#ff2d55" family="bold">
            Save
          </TextSTC>
        </TouchableOpacity>
      </Header>
      <ButtonsContainer>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <TextSTC family="med">Email</TextSTC>
          <TextSTC>{user?.email}</TextSTC>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <TextSTC family="med">Username</TextSTC>
          <TextSTC>#{user?.username}</TextSTC>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <TextSTC family="med">First Name</TextSTC>
          <InputSTC
            style={{ width: "45%" }}
            value={inputs.first}
            onChangeText={(text) => setInputs({ ...inputs, first: text })}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <TextSTC family="med">Last Name</TextSTC>
          <InputSTC
            style={{ width: "45%" }}
            value={inputs.last}
            onChangeText={(text) => setInputs({ ...inputs, last: text })}
          />
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            padding: 20,
            justifyContent: "space-between",
          }}
        >
          <TextSTC family="med">Birth Day</TextSTC>
          {pickerShow && (
            <DateTimePicker
              testID="dateTimePicker"
              value={inputs.dob}
              mode="date"
              is24Hour={true}
              display="calendar"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || inputs.dob;
                setShow(false);
                setInputs({ ...inputs, dob: currentDate });
              }}
            />
          )}
          <TouchableOpacity onPress={() => setShow(true)}>
            <TextSTC>{inputs.dob.toISOString().substring(0, 10)}</TextSTC>
          </TouchableOpacity>
        </View>
      </ButtonsContainer>
    </ProfileEditCon>
  );
};

const mapState = (state: AppState) => ({
  user: state.auth.user,
  token: state.auth.token,
});

const mapDispatch = {
  updateData: (data: UserType) => ({
    type: "update_user",
    payload: data,
  }),
};
const connector = connect(mapState, mapDispatch);

type RXProps = ConnectedProps<typeof connector>;

export default connector(ProfileEdit);
