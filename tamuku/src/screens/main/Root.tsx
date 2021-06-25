import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { FullScreenCol, ButtonSTC, TextSTC } from "../../styles/global.stc";

interface Props extends RXProps {}
const Root = ({ logout }: Props) => {
  return (
    <FullScreenCol>
      <ButtonSTC onPress={() => logout()}>
        <TextSTC>LOGOUT</TextSTC>
      </ButtonSTC>
    </FullScreenCol>
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
