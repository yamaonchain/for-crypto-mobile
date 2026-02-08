import React from 'react';
import { render } from '@testing-library/react-native';

// Import the screens
import HomeScreen from '../app/(tabs)/index';
import SearchScreen from '../app/(tabs)/search';
import ProfileScreen from '../app/(tabs)/profile';
import ProductDetailScreen from '../app/product/[id]';

// Mock API client
jest.mock('../src/api/client', () => ({
  api: {
    getPost: jest.fn().mockResolvedValue({
      id: '1',
      title: 'Test Product',
      bio: 'Test description',
      description: 'Longer test description',
      price: '100',
      categoryId: '1',
      categoryName: 'Product',
      userId: 'user1',
      nickname: 'test.eth',
      avatarUrl: '',
      bannerUrl: '',
      commission: '10',
      walletAddress: '0x123',
      payoutChain: 'base',
      isDraft: false,
      isActive: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    }),
  },
}));

describe('Screen Smoke Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders HomeScreen without crashing', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Sell. Cosell.')).toBeTruthy();
    expect(getByText('For Crypto.')).toBeTruthy();
  });

  it('renders SearchScreen without crashing', () => {
    const { getByPlaceholderText } = render(<SearchScreen />);
    expect(getByPlaceholderText('Search listings...')).toBeTruthy();
  });

  it('renders ProfileScreen without crashing', () => {
    const { getByText } = render(<ProfileScreen />);
    // Should render either connected or unconnected state
    expect(
      getByText('Connect Wallet') || getByText('yama.eth')
    ).toBeTruthy();
  });

  it('renders ProductDetailScreen without crashing', async () => {
    const { findByText } = render(<ProductDetailScreen />);
    // Should eventually render the product title
    await expect(findByText('Test Product')).resolves.toBeTruthy();
  });

  it('HomeScreen displays correct sections', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check for main sections
    expect(getByText('Why Crypto?')).toBeTruthy();
    expect(getByText('How it works.')).toBeTruthy();
    expect(getByText('Cosell.')).toBeTruthy();
    expect(getByText('Sales Assets.')).toBeTruthy();
    expect(getByText('Backed by leading networks.')).toBeTruthy();
  });

  it('SearchScreen displays filter components', () => {
    const { getByText } = render(<SearchScreen />);
    
    // Check for filter/sort UI
    expect(getByText('Filter')).toBeTruthy();
    expect(getByText('Sort')).toBeTruthy();
    expect(getByText('Trending:')).toBeTruthy();
  });

  it('HomeScreen has featured listings section', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check for featured listings
    expect(getByText('Featured Listings')).toBeTruthy();
    expect(getByText('See all')).toBeTruthy();
  });

  it('HomeScreen has category chips', () => {
    const { getByText } = render(<HomeScreen />);
    
    // Check for category section
    expect(getByText('Browse by Category')).toBeTruthy();
    expect(getByText('Product')).toBeTruthy();
    expect(getByText('Service')).toBeTruthy();
  });

  it('ProfileScreen shows tab navigation', () => {
    const { getByText } = render(<ProfileScreen />);
    
    // Should show tabs (either in connected or mock state)
    const hasListingsTab = getByText('Listings (2)') || getByText('Connect Wallet');
    expect(hasListingsTab).toBeTruthy();
  });
});