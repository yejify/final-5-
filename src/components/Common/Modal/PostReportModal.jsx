import styled from 'styled-components';
import { UserAtom } from '../../../Store/userInfoAtoms';
import { useRecoilValue } from 'recoil';
import PostReportPost from '../../../api/PostReportPost';
import { ModalOverlay, ModalWrap } from './ModalStyle';
export default function PostReportModal({ data, setModalOpen, category }) {
  const userInfo = useRecoilValue(UserAtom);
  const token = userInfo.token;
  const postId = data.id;
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      setModalOpen(false);
    }
  };

  const handleReportSubmit = async () => {
    const response = await PostReportPost(postId, token); // Call the API component
    if (response) {
      alert(`해당 ${category}이 신고되었습니다.`);
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalWrap>
        <div></div>
        <ul>
          <li>
            <button onClick={handleReportSubmit}>신고하기</button>
          </li>
        </ul>
      </ModalWrap>
    </ModalOverlay>
  );
}
