import React from 'react';
import renderer from 'react-test-renderer';
import { PostCard } from '../PostCard';

describe('PostCard Snapshots', () => {
  const defaultProps = {
    id: 'post-123',
    author: 'john.doe',
    content: 'This is a sample post content that demonstrates the PostCard component functionality.',
    timestamp: '2h ago',
    likes: 42,
  };

  it('renders default state correctly', () => {
    const tree = renderer.create(<PostCard {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders loading state correctly', () => {
    const tree = renderer.create(<PostCard {...defaultProps} isLoading={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with zero likes correctly', () => {
    const tree = renderer.create(<PostCard {...defaultProps} likes={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with long content correctly', () => {
    const longContent = 'This is a very long post content that spans multiple lines and demonstrates how the PostCard component handles longer text content. It should wrap properly and maintain good readability across different screen sizes.';
    const tree = renderer.create(
      <PostCard {...defaultProps} content={longContent} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with onPress handler correctly', () => {
    const mockOnPress = jest.fn();
    const tree = renderer.create(
      <PostCard {...defaultProps} onPress={mockOnPress} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});