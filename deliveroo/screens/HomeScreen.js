import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ChevronDown,
  User2Icon,
  SearchIcon,
  SlidersHorizontal,
} from 'lucide-react-native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == 'featured']{
  ...,
  restaurants[]-> {
    ...,
    dishes[]->
  }
  
}
		
		`
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);
  console.log(featuredCategories);

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
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}

        {/* categories */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
