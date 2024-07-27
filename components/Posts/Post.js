import PropTypes from 'prop-types';
import React, { useRef, useEffect, useState } from 'react';
import styled from '@emotion/styled';
const { v4: uuidv4 } = require('uuid');
const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  scrollSnapType: 'x mandatory',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
  position: 'relative',
}));

const ProfileSection = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  backgroundColor: '#f9f9f9',
}));

const ProfileInfo = styled.div(() => ({
  fontSize: '14px',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
  transition: 'background-color 0.3s ease',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current && carouselRef.current.children.length > 0) {
      setItemWidth(carouselRef.current.children[0].offsetWidth);
    }
  }, [carouselRef]);

  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemWidth,
        behavior: 'smooth',
      });
    }
  };

  const name = post.userName || 'Undefined';
  const nameParts = name.split(' ');
  const totalName =
    nameParts.length > 1
      ? `${nameParts[0][0].toUpperCase()}${nameParts[1][0].toUpperCase()}`
      : nameParts[0].slice(0, 2).toUpperCase();

  return (
    <PostContainer>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map(image => (
            <CarouselItem key={uuidv4()}>
              <ProfileSection>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div
                    style={{
                      borderRadius: '50px',
                      backgroundColor: '#8a817c',
                      width: '50px',
                      height: '50px',
                      textAlign: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <h2 style={{ color: 'white' }}>{totalName}</h2>
                  </div>

                  <ProfileInfo>
                    <div style={{ color: '#000000', fontWeight: 'bold' }}>
                      <p style={{ text: 'small' }}>{post.userName}</p>
                    </div>
                    <div>{post.email}</div>
                  </ProfileInfo>
                </div>
              </ProfileSection>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
      }),
    ).isRequired,

    userName: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;
