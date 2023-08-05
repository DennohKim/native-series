import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronDown,
  User2Icon,
  SearchIcon,
  SlidersHorizontal,
} from "lucide-react-native";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <SafeAreaView className='bg-white pt-5'>
      <View className='flex-row pb-3 items-center mx-4 space-x-2 px-4'>
        {/* header */}
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80',
          }}
          className='h-7 w-7 bg-gray-300 p-4 rounded-full'
        />
        <View className='flex-1'>
          <Text className='font-bold text-gray-400 text-xs'>Deliver Now</Text>
          <Text className='font-bold text-xl'>
            Current Location
            <ChevronDown size={20} color='#00CCBB' />
          </Text>
        </View>
        <User2Icon size={25} color='#00CCBB' />
      </View>
      {/* Search */}

      <View className='flex-row items-center space-x-2 pb-2 mx-4'>
        <View className='flex-row items-center space-x-2 flex-1 bg-gray-200 p-3 rounded-md'>
          <SearchIcon color='gray' size={20} />
          <TextInput
            placeholder='Restaurants and cuisines'
            keyboardType='default'
          />
        </View>
        <SlidersHorizontal color='#00CCBB' />
      </View>
      {/* Scroll view */}

      <ScrollView className='bg-gray-100'>
        {/* categories */}
        <Categories />

        {/* Featured rows */}
        <FeaturedRow
          id='123'
          title='Featured'
          description='Paid placement from our partners'
        />
        <FeaturedRow
          id='1234'
          title='Tasty Discounts'
          description='Everyone been enjoying these juicy discounts!'
        />
        <FeaturedRow
          id='12345'
          title='Offers near you'
          description='Why not support your local restaurant tonight'
        />

        {/* categories */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
