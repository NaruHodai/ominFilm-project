import { apiInstance } from './index.js';
const api = apiInstance();

/* 컨텐츠 ALL 불러오기*/
export const getContents = async () => {
    try {
        const response = await api.get('/admin/project/all');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 하나 불러오기*/
export const getContent = async (id) => {
    try {
        const response = await api.get(`/admin/project?projectId=${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 추가 */
export const postContent = async (content) => {
    console.log(content);
    const formData = new FormData();

    formData.append('projectDivi', content.projectDivi);
    formData.append('projectTitle', content.projectTitle);
    formData.append('clientDivi', content.clientDivi);
    formData.append('clientName', content.clientName);
    formData.append('projectPlace', content.projectPlace);
    formData.append('releaseDate', content.releaseDate);
    // formData.append('imageSrc', content.imageSrc);
    // formData.append('youtubeSrc', content.youtubeSrc);

    if (content.imageSrc) {
        content.imageSrc.forEach((file) => {
            formData.append('imageSrc', file);
        });
    }

    if (content.youtubeSrc) {
        content.youtubeSrc.forEach((url) => {
            if (url) {
                formData.append('youtubeSrc', url);
            }
        });
    }
    for(const value of formData.values()) {
        console.log("멀티폼데이터:", value);
    }

    try {
        const response = await api.post(`/admin/project`,formData);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 삭제*/
export const deleteContent = async (id) => {
    try {
        const response = await api.delete(`/admin/project?projectId=${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch projects:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}