import styled from "styled-components/native";


interface FullScreenColTypes {
  color?: string;
}
export const FullScreenCol = styled.SafeAreaView<FullScreenColTypes>`
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.color ? props.color : "#fff")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface ImgType {
  width: string;
  height: string;
}

export const Img = styled.Image<ImgType>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;



interface TypeSTCProps {
  size?: string;
  family?: string;
  gap?: string;
  color?: string;
}

export const TextSTC = styled.Text<TypeSTCProps>`
  font-size: ${(props) => (props.size ? props.size : "16px")};
  font-family: ${(props) => (props.family ? props.family : "norm")};
  margin: ${(props) => (props.gap ? props.gap : "0")};
  color: ${(props) => (props.color ? props.color : '#373729')};
`;
