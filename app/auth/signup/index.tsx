// app/auth/signup/index.tsx
import { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import DotPagination from '../../../components/DotPagination';
import StepName from './StepName';
import StepEmail from './StepEmail';
import StepPassword from './StepPassword';
import StepGender from './StepGender';
import StepGenres from './StepGenres';
import StepLanguage from './StepLanguage';
import { useRouter } from 'expo-router';
import { setUserMetadata } from '@/services/firebase/users';
import { auth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import CustomAlert from '@/components/CustomAlert';

const SignupFlow = () => {
  const layout = useWindowDimensions();
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'name', title: 'Name' },
    { key: 'email', title: 'Email' },
    { key: 'password', title: 'Password' },
    { key: 'gender', title: 'Gender' },
    { key: 'genres', title: 'Genres' },
    { key: 'language', title: 'Language' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Prefer not to say',
    email: '',
    password: '',
    preferredGenres: [],
    language: 'en',
  });

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [onAlertClose, setOnAlertClose] = useState<() => void>(() => () => {});

  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setOnAlertClose(() => onClose || (() => setAlertVisible(false)));
    setAlertVisible(true);
  };

  const handleSubmit = async () => {
    const { email, password, name, preferredGenres, language } = formData;

    if (!email || !password || !name) {
      return showAlert('Missing Fields', 'Please fill in all required fields.');
    }

    if (preferredGenres.length === 0) {
      return showAlert('No Genres Selected', 'Please select at least one preferred genre.');
    }

    if (!['English', 'Arabic'].includes(language)) {
      return showAlert('Invalid Language', 'Please select a valid language.');
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await setUserMetadata(formData);

      showAlert(
        'Welcome to Scene Stack!',
        'Your account has been created successfully.\nWould you like to log in now?',
        () => {
          setAlertVisible(false);
          router.replace('/auth');
        }
      );
    } catch (error) {
      console.error(error);
      showAlert('Signup Failed', 'Failed to sign up. Please try again.');
    }
  };

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'name':
        return <StepName formData={formData} setFormData={setFormData} next={() => setIndex(1)} />;
      case 'email':
        return <StepEmail formData={formData} setFormData={setFormData} next={() => setIndex(2)} />;
      case 'password':
        return <StepPassword formData={formData} setFormData={setFormData} next={() => setIndex(3)} />;
      case 'gender':
        return <StepGender formData={formData} setFormData={setFormData} next={() => setIndex(4)} />;
      case 'genres':
        return <StepGenres formData={formData} setFormData={setFormData} next={() => setIndex(5)} />;
      case 'language':
        return <StepLanguage formData={formData} setFormData={setFormData} submit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        swipeEnabled
        renderTabBar={() => null}
      />
      <DotPagination className="bg-[#1C1C1E]" currentIndex={index} total={routes.length} />

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        confirmText="OK" 
        onClose={onAlertClose}
      />
    </View>
  );
};

export default SignupFlow;
