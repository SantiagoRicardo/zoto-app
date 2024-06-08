import { Text } from "react-native";

export default function TitlePrimary({ title }) {
  return (
    <Text className="text-2xl font-extrabold text-left text-slate-900">
      {title}
    </Text>
  );
}
