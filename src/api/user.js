import api from './interceptor';

// * 유저정보조회 api, method : get, url : /api/mypage/user
export const getUserInfo = () => {
  return api
    .get(`/api/mypage/user`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 마이코멘트 페이지 위스키 코멘트 조회
export const getUserComment = (id) => {
  return api
    .get(`/api/review/${id}`)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

// * 유저가 작성한 위스키 코멘트 등록
export const setUserComment = ({ id, content }) => {
  return api
    .post(`/api/review/${id}`, content)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 유저가 작성한 위스키 코멘트 수정
export const setEditUserComment = (comment) => {
  const content = { content: comment.content };
  const { id } = comment;
  return api
    .put(`/api/review/${id}`, content)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

// * 유저가 작성한 위스키 코멘트 삭제
export const setDeleteUserComment = (id) => {
  return api
    .delete(`/api/review/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
