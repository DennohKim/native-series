import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import Currency from 'react-currency-formatter';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from '../features/basketSlice';

const DishRow = ({ id, image, name, description, price }) => {
  const [isPressed, setIsPressed] = useState(true);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));

  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket({ id, image, name, description, price }));
  };
  console.log(items);

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className='bg-white border p-4 border-gray-200'
      >
        <View className='flex-row '>
          <View className='flex-1 pr-2'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400 '>{description}</Text>
            <Text className='text-gray-400 '>
              <Currency quantity={price} currency='GBP' />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4',
              }}
              source={{
                uri: urlFor(image).url(),
              }}
              className='h-20 w-20 bg-gray-300 p-4'
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className='bg-white px-4 '>
          <View className='flex-row items-center space-x-4 py-3'>
            <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={30} />
            </TouchableOpacity>
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color='#00CCBB' size={30} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
