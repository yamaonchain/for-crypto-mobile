import '@testing-library/jest-native/extend-expect';

// Mock expo-router
jest.mock('expo-router', () => ({
  Link: 'Link',
  useLocalSearchParams: () => ({ id: '1' }),
  router: {
    back: jest.fn(),
    navigate: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

// Mock @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

// Mock date-fns
jest.mock('date-fns', () => ({
  formatDate: (date, format) => '2024-01-15',
}));