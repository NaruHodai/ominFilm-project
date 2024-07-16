import { apiInstance } from './index.js';
import { useLoadingStore } from '@/store/loding'
const api = apiInstance();

/* 컨텐츠 ALL 불러오기*/
export const getContents = async () => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    try {
        const response = await api.get('/admin/project/all');
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('Failed to fetch projects(all):', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 하나 불러오기*/
export const getContent = async (id) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    try {
        const response = await api.get(`/admin/project?projectId=${id}`);
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('Failed to fetch projects(one):', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 순서 수정 */
export const updateContentOrder = async (contents) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    try {
        const response = await api.put(`/admin/project/all`, contents);
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('컨텐츠 순서 수정 실패:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 추가 */
export const postContent = async (content, imgSelect) => {
    const formData = new FormData();

    formData.append('projectDivi', content.projectDivi);
    formData.append('projectTitle', content.projectTitle);
    formData.append('clientDivi', content.clientDivi);
    formData.append('clientName', content.clientName);
    formData.append('projectPlace', content.projectPlace);
    formData.append('releaseDate', content.releaseDate);
    formData.append('youtubeSrcFirst', content.youtubeSrcFirst);
    formData.append('youtubeSrcSecond', content.youtubeSrcSecond);
    formData.append('youtubeSrcThird', content.youtubeSrcThird);
    formData.append('youtubeSrcFourth', content.youtubeSrcFourth);
    formData.append('youtubeSrcFifth', content.youtubeSrcFifth);

    if (imgSelect) {
        imgSelect.forEach((file) => {
            formData.append('imageSrc', file);
        });
    }

    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    try {
        const response = await api.post(`/admin/project`,formData);
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('컨텐츠 추가 실패:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 삭제*/
export const deleteContent = async (id) => {
    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);
    try {
        const response = await api.delete(`/admin/project?projectId=${id}`);
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('컨텐츠 삭제 실패:', error);
        throw error; // 에러를 다시 던져서 호출자가 처리할 수 있게 함
    }
}

/* 컨텐츠 수정*/
export const updateContent = async (content, deleteImageId, addImageFile) => {
    const formData = new FormData();

    formData.append('projectId', content.projectId);
    formData.append('projectDivi', content.projectDivi);
    formData.append('projectTitle', content.projectTitle);
    formData.append('clientDivi', content.clientDivi);
    formData.append('clientName', content.clientName);
    formData.append('projectPlace', content.projectPlace);
    formData.append('releaseDate', content.releaseDate);
    formData.append('youtubeSrcFirst', content.youtubeSrcFirst);
    formData.append('youtubeSrcSecond', content.youtubeSrcSecond);
    formData.append('youtubeSrcThird', content.youtubeSrcThird);
    formData.append('youtubeSrcFourth', content.youtubeSrcFourth);
    formData.append('youtubeSrcFifth', content.youtubeSrcFifth);

    formData.append('deleteImageId', JSON.stringify(deleteImageId));

    if (addImageFile) {
        addImageFile.forEach((file) => {
            formData.append('addImageFile', file);
        });
    }

    const loadingStore = useLoadingStore();
    loadingStore.setLoading(true);

    try {
        const response = await api.put(`/admin/project`, formData);
        loadingStore.setLoading(false);
        return response.data;
    } catch (error) {
        loadingStore.setLoading(false);
        console.error('프로젝트 수정 실패:', error);
        throw error;
    }
}