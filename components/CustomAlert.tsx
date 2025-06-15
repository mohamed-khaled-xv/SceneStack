// components/CustomAlert.tsx
import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface CustomAlertProps {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
  confirmText?: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title = 'Alert',
  message,
  onClose,
  confirmText = 'OK',
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-[#1C1C1E] p-6 rounded-2xl w-72 shadow-md">
          <Text className="text-white text-lg font-bold mb-2">{title}</Text>
          <Text className="text-gray-300 text-base mb-4">{message}</Text>
          <TouchableOpacity
            className="bg-[#FF8700] px-4 py-2 rounded-xl items-center"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">{confirmText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
