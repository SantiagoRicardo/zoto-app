import { View, Text, TextInput } from "react-native";

export default function InputBasic({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  error = ''
}) {
  return (
    <View className="my-2">
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className="
          border border-primary text-[16px] text-primary rounded-md px-12 py-2 w-full focus:border-secundary
        "
      />

      {error ? (
        <Text className="pl-3 text-[13px] text-red-700 font-semibold mt-1">
          {error}
        </Text>
      ) : null}
    </View>
  );
}
