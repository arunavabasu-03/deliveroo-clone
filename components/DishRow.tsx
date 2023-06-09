//@ts-nocheck
import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import { urlFor } from "../sanity";
import { MinusCircleIcon } from "react-native-heroicons/solid";
import { accentColor } from "../constant";
import { PlusCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItemsWithId,
} from "../features/basketSlice";
const DishRow = ({ id, name, description, price, image }) => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => selectBasketItemsWithId(state, id));
  // const items = useSelector(selectedBasketItems);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeItemFromBasket = () => {
    if (items.length === 0) return;
    dispatch(removeFromBasket({ id }));
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-2004 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <View className="flex-1 pr-2">
              <Text className="text-lg mb-1">{name}</Text>
              <Text className="text-gray-500">{description}</Text>
              <Text className="text-gray-400 mt-2">
                <Currency quantity={price} currency="INR" />
              </Text>
            </View>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: "#f3f3f4",
              }}
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4 ">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? accentColor : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={accentColor} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
