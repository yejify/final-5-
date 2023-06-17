import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MenuBar from '../../components/Common/MenuBar';
import { HomeNav } from '../../components/Common/TopNav';
import { UserAtom } from '../../Store/userInfoAtoms';
import { useRecoilState } from 'recoil';
import PostList from '../../components/Common/PostList/PostList';
import GetFollowPost from '../../api/GetFollowPost';
import { Link } from 'react-router-dom';
import HomeLogo from '../../assets/img/home-logo.svg';
import ButtonStyle from '../../components/Common/Button';

export default function Home({ to }) {
  const [userValue] = useRecoilState(UserAtom); // UserAtom값 불러오기
  const token = userValue.token; // token값 추출
  const [postData, setPostData] = useState(null);
  const [postCount, setPostCount] = useState(5);

  useEffect(() => {
    const response = async () => {
      const data = await GetFollowPost(postCount, token);
      setPostData(data);
      console.log(postData);
    };

    response();
  }, [postCount, postData, token]);

  console.log(token);
  console.log(postData);

  return (
    <HomeWrap>
      <HomeNav title='홈' to={to}></HomeNav>
      <MainWrap>
        {postData === null || postData.length === 0 ? (
          <>
            <img src={HomeLogo} alt='' />
            <p>유저를 검색해 팔로우 해보세요!</p>
            <Link to={to}>
              <ButtonStyle
                width='120px'
                height='44px'
                color='#fff'
                bg='#036635'
                br='44px'
              >
                검색하기
              </ButtonStyle>
            </Link>
          </>
        ) : (
          <ul>
            <PostList />
            <PostList />
          </ul>
        )}
      </MainWrap>
      <MenuBar />
    </HomeWrap>
  );
}
const HomeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: var(--font-md);
`;

const MainWrap = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
  height: calc(100% - 48px - 60px);
  padding: 0 16px;

  ul {
    overflow-y: scroll;
  }
  ul::-webkit-scrollbar {
    display: none;
  }
  /* p {
    padding: 10px 0 20px;
    color: var(--sub-font-color);
  } */
`;
