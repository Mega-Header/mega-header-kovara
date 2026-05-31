import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface PostCardProps {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes?: number;
  isLoading?: boolean;
  onPress?: () => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  id,
  author,
  content,
  timestamp,
  likes = 0,
  isLoading = false,
  onPress,
}) => {
  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <View style={[styles.loadingBar, styles.authorLoading]} />
        <View style={[styles.loadingBar, styles.contentLoading]} />
        <View style={[styles.loadingBar, styles.timestampLoading]} />
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={`post-card-${id}`}
    >
      <View style={styles.header}>
        <Text style={styles.author}>{author}</Text>
        <Text style={styles.timestamp}>{timestamp}</Text>
      </View>
      <Text style={styles.content}>{content}</Text>
      <View style={styles.footer}>
        <Text style={styles.likes}>{likes} likes</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  content: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  likes: {
    fontSize: 12,
    color: '#666',
  },
  loadingBar: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  authorLoading: {
    height: 16,
    width: '40%',
  },
  contentLoading: {
    height: 14,
    width: '100%',
  },
  timestampLoading: {
    height: 12,
    width: '30%',
  },
});