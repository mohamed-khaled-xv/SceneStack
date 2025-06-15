import React from 'react';
import { View } from 'react-native';

interface DotPaginationProps {
  currentIndex: number;
  total: number;
  className?: string;
}

const DotPagination = ({ currentIndex, total, className }: DotPaginationProps) => {
  return (
    <View className={`flex-row bg-inherit justify-center items-center py-4 ${className}`}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          className={`w-2 h-2 mx-1 rounded-full ${i === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
        />
      ))}
    </View>
  );
};

export default DotPagination;
