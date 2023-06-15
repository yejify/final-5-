import axios from 'axios';
import styled from 'styled-components';
import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../Store/userInfoAtoms';
import ArrowImg from '../../assets/img/icon-arrow-left.svg';
import DisabledButtonImg from '../../assets/img/L-Disabled-button(clay).svg';
import ButtonImg from '../../assets/img/L-button(clay).svg';
export default function Login() {
  const [token, setToken] = useRecoilState(tokenState);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [pwErrorMessage, setPwErrorMessage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [buttonImg, setButtonImg] = useState(DisabledButtonImg);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }; // 이후 리팩토링 시 공통 컴포넌트로 분리 예정

  //input 값이 있을때 or 없을때 달라지는 버튼 색 변경함수
  // 입력란 값 변경 시 실행되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 입력란 값 변경
    if (name === 'email') {
      setEmail(value.trim());
    } else if (name === 'password') {
      setPassword(value.trim());
    }

    handleActiveButton();
    // 두 입력란에 값이 모두 존재할 경우 버튼 활성화 함수 실행
  };

  const handleActiveButton = () => {
    if (email !== '' && password !== '') {
      setButtonImg(ButtonImg);
    } else {
      setButtonImg(DisabledButtonImg);
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    //정규 표현식을 사용한 이메일, 비밀번호 유효성 검사
    const emailPattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(email)) {
      setEmailErrorMessage('*올바른 이메일 양식을 입력해주세요');
    } else {
      setEmailErrorMessage('');
    }

    const passwordPattern =
      /^(?=.*[!@#$%^&()_+=-])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      // setPwErrorMessage(
      //   '*비밀번호는 8자 이상 특수문자와 대문자를 포함해야 합니다!',
      // );
      // return;
    } else {
      setPwErrorMessage('');
    }

    try {
      const data = {
        user: {
          email: email,
          password: password,
        },
      };
      console.log(data);
      const response = await axios.post(
        'https://api.mandarin.weniv.co.kr/user/login',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.status === 422) {
        setLoginErrorMessage('*이메일  또는 비밀번호가 일치하지 않습니다.');
      } else if (response.data.user) {
        setToken(response.data.user.token);
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginWrap>
      <LoginHeader>
        <button onClick={goBack}>
          <img src={ArrowImg} alt='' />
        </button>
        <h1>로그인</h1>
      </LoginHeader>
      <LoginForm onSubmit={handleLoginSubmit}>
        <InputDiv>
          <Label>이메일</Label>
          <InputBox
            className='email-input'
            name='email' // 입력란 식별을 위해 name 속성 추가
            width='322px'
            height='48px'
            padding='15px'
            onChange={handleInputChange}
            placeholder='이메일을 입력해주세요'
            brColor={emailErrorMessage ? 'var(--error-color)' : '#dbdbdb'}
          />
        </InputDiv>

        {emailErrorMessage && <ErrorMessage>{emailErrorMessage}</ErrorMessage>}

        <InputDiv>
          <Label>비밀번호</Label>
          <InputBox
            className='pw-input'
            name='password' // 입력란 식별을 위해 name 속성 추가
            width='322px'
            height='48px'
            onChange={handleInputChange}
            type='password'
            placeholder='비밀번호를 입력하세요'
            brColor={pwErrorMessage ? 'red' : '#dbdbdb'}
          />
        </InputDiv>
        {(pwErrorMessage && <ErrorMessage>{pwErrorMessage}</ErrorMessage>) ||
          (loginErrorMessage && (
            <ErrorMessage>{loginErrorMessage}</ErrorMessage>
          ))}
        <button type='submit'>
          <img src={buttonImg} alt='' />
        </button>
      </LoginForm>
      <MoveSingUp to='/signup'>이메일로 회원가입</MoveSingUp>
    </LoginWrap>
  );
}
const MoveSingUp = styled(Link)`
  display: block;
  color: var(--sub-font-color);
  font-size: var(--font-sm);
  text-align: center;
`;

const LoginWrap = styled.div`
  font-size: var(--font-md);
  a {
    display: block;
    color: var(--sub-font-color);
    font-size: var(--font-sm);
    text-align: center;
  }
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: var(--font-mds);

  button {
    margin: 16px 0 8px;
  }
`;

export const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 28px;
`;
export const Label = styled.label`
  font-family: var(--font--Bold);
  margin-bottom: 9px;
  font-weight: 700;
  color: #767676;
  font-size: 12px;
`;

export const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid ${(props) => props.brColor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  margin-bottom: 6px;
  &::placeholder {
    color: var(--border-color);
  }
  &:focus {
    border-color: var(--main-color);
  }
`;

export const LoginHeader = styled.header`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 33px 34px 40px;

  button {
    position: absolute;

    left: 34px;
  }
`;

const ErrorMessage = styled.div`
  padding-left: 34px;
  align-self: stretch;
  color: var(--error-color);
  font-size: var(--font-sm);
`;
