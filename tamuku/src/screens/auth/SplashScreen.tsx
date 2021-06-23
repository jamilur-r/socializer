import React from "react";
import { FullScreenCol, Img, TextSTC } from "../../styles/global.stc";
import { ButtonSPLASH } from "../../styles/splash-screen.stc";
const SplashScreen = () => {
  return (
    <FullScreenCol>
      <Img
        source={require("../../images/splash_logo.png")}
        width="90%"
        height="209px"
      />
      <ButtonSPLASH>
        <TextSTC color='#fff' family='bold'>GET STARTED</TextSTC>
      </ButtonSPLASH>
    </FullScreenCol>
  );
};

export default SplashScreen;
