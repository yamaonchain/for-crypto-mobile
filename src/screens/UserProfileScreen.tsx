import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  id: string;
  nickname: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  website?: string;
  socials: {
    x?: { nickname: string };
    instagram?: { nickname: string };
  };
  meta: {
    ratings: {
      average: number;
      total: number;
    };
    sales: number;
  };
  about?: string;
}

interface Post {
  id: string;
  title: string;
  price: string;
  image: string;
}

// Mock data - in real app this would come from API
const mockUser: UserProfile = {
  id: '1',
  nickname: 'cryptoseller',
  bio: 'Digital product creator. Building the future of commerce.',
  avatarUrl: 'https://placehold.co/80x80',
  bannerUrl: 'https://placehold.co/400x100',
  website: 'https://example.com',
  socials: {
    x: { nickname: 'cryptoseller' },
    instagram: { nickname: 'cryptoseller' },
  },
  meta: {
    ratings: { average: 4, total: 127 },
    sales: 89,
  },
  about: 'Welcome to my profile! I create digital products and love helping others succeed in the crypto space.',
};

const mockPosts: Post[] = [
  { id: '1', title: 'Digital Marketing Course', price: '$49', image: 'https://placehold.co/200x200' },
  { id: '2', title: 'Crypto Trading Signals', price: '$29', image: 'https://placehold.co/200x200' },
  { id: '3', title: 'NFT Design Template', price: '$19', image: 'https://placehold.co/200x200' },
];

export default function UserProfileScreen({ route }: { route: any }) {
  const { userId } = route.params || { userId: '1' };
  const [activeTab, setActiveTab] = useState<'listings' | 'collection' | 'bookmarks' | 'about'>('listings');
  
  // In real app, fetch user data based on userId
  const user = mockUser;
  const posts = mockPosts;

  const openURL = (url: string) => {
    Linking.openURL(url);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? 'star' : 'star-outline'}
        size={16}
        color={index < rating ? '#000' : '#ccc'}
      />
    ));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'listings':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Listings</Text>
            {posts.map(post => (
              <View key={post.id} style={styles.postCard}>
                <Image source={{ uri: post.image }} style={styles.postImage} />
                <View style={styles.postInfo}>
                  <Text style={styles.postTitle}>{post.title}</Text>
                  <Text style={styles.postPrice}>{post.price}</Text>
                </View>
              </View>
            ))}
          </View>
        );
      case 'collection':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Collection</Text>
            <Text style={styles.emptyText}>No items in collection</Text>
          </View>
        );
      case 'bookmarks':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>Bookmarks</Text>
            <Text style={styles.emptyText}>No bookmarks yet</Text>
          </View>
        );
      case 'about':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.tabTitle}>About</Text>
            <Text style={styles.aboutText}>{user.about}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        {user.bannerUrl && (
          <Image source={{ uri: user.bannerUrl }} style={styles.banner} />
        )}

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <Text style={styles.nickname}>{user.nickname}</Text>
          
          {/* Ratings */}
          <View style={styles.ratingsContainer}>
            <View style={styles.stars}>
              {renderStars(user.meta.ratings.average)}
            </View>
            <Text style={styles.ratingsText}>{user.meta.ratings.total} Total Ratings</Text>
          </View>

          {/* Sales */}
          <Text style={styles.salesText}>{user.meta.sales} Total Sales</Text>

          {/* Bio */}
          <Text style={styles.bio}>{user.bio}</Text>

          {/* Social Links */}
          <View style={styles.socialLinks}>
            {user.website && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openURL(user.website!)}
              >
                <Ionicons name="globe-outline" size={20} color="#000" />
              </TouchableOpacity>
            )}
            
            {user.socials.x && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openURL(`https://x.com/${user.socials.x!.nickname}`)}
              >
                <Ionicons name="logo-twitter" size={20} color="#000" />
              </TouchableOpacity>
            )}
            
            {user.socials.instagram && (
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => openURL(`https://instagram.com/${user.socials.instagram!.nickname}`)}
              >
                <Ionicons name="logo-instagram" size={20} color="#000" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="copy-outline" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          {(['listings', 'collection', 'bookmarks', 'about'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 32,
  },
  banner: {
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  nickname: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingsText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  salesText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#000',
  },
  tabContent: {
    padding: 16,
  },
  tabTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginBottom: 16,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
  },
  postInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  postTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
  },
  postPrice: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 32,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});