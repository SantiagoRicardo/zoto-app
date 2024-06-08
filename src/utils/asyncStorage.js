import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(keyName, value) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(keyName, jsonValue);
  } catch (error) {
    console.log(error);
  }
}

export async function getData(keyName) {
  try {
    const jsonValue = await AsyncStorage.getItem(keyName);
    return jsonValue !== null ? jsonValue : null;
  } catch (error) {
    console.log(error);
  }
}

export async function clearData(keyName) {
  try {
    await AsyncStorage.removeItem(keyName);
  } catch (error) {
    console.log(error);
  }
}
