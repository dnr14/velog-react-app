import React from 'react';
import * as Styled from '../style';

function PostModal(props) {
  return (
    <Styled.PostModal className="postModal">
      <Styled.InnerModal>
        <div>
          <h3>포스트 삭제</h3>
          <div style={{ margin: '20px 0', fontSize: '0.9rem' }}>
            정말로 삭제하시겠습니까?
          </div>
          <Styled.ButtonWrap style={{ marginTop: '32px' }}>
            <button
              type="button"
              className="cancelBtn"
              onClick={() => {
                props.setOpenModalHandler();
              }}
            >
              취소
            </button>
            <button
              type="button"
              className="insertBtn"
              onClick={() => {
                props.confirmEvent();
              }}
            >
              확인
            </button>
          </Styled.ButtonWrap>
        </div>
      </Styled.InnerModal>
    </Styled.PostModal>
  );
}

export default PostModal;
