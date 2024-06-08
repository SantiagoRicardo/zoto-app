import { Image } from "react-native";
import logo from "../../assets/favicon.png";

export default function LogoApp({ width, height }) {
  return (
    <Image source={logo} style={{width, height}} />
  );
}
