import { createApp } from 'vue'
import App from './App.vue'
import MainCss from '@/assets/css/main.css'
import router from "@/router";
import { createPinia } from 'pinia';
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const pinia = createPinia();
const app = createApp(App);
    app
    .use(router)
    .use(MainCss)
    .use(pinia)
    .use(BootstrapVue3)
    .mount('#app');

const photos = [
    {
        src: [
            require('@/assets/images/bindal/1.jpg'),
            require('@/assets/images/bindal/2.jpg'),
            require('@/assets/images/bindal/3.jpg'),
        ],
        type: "M/V",
        name: "바다에 띄운 편지",
        clientType: "Artist",
        client: "반달",
        place: "포항 구룡포 해수욕장",
        date: "",
        videoUrl: "",
    },
    {
        src: [
            require('@/assets/images/thisMyDream/1.jpg'),
            require('@/assets/images/thisMyDream/2.jpg'),
            require('@/assets/images/thisMyDream/3.jpg'),
        ],
        type: "M/V",
        name: "영화처럼",
        clientType: "Band",
        client: "이리와 내 꿈에 태워줄게",
        place: "대구 시민생활스포츠센터",
        date: "2023.09.13",
        videoUrl: "https://www.youtube.com/embed/a9gRQBwnhHE",
    },
    {
        src: [
            require('@/assets/images/simsammyeong/1.jpg'),
            require('@/assets/images/simsammyeong/2.jpg'),
            require('@/assets/images/simsammyeong/3.jpg'),
        ],
        type: "M/V",
        name: "장난꾸러기",
        clientType: "Artist",
        client: "심상명",
        place: "이월드",
        date: "2024.01.31",
        videoUrl: "https://www.youtube.com/embed/_BTH2Jeo_7A",
    },
    {
        src: [
            require('@/assets/images/yazasu/1.jpg'),
            require('@/assets/images/yazasu/2.jpg'),
            require('@/assets/images/yazasu/3.jpg'),
        ],
        type: "M/V",
        name: "yaho!",
        clientType: "Band",
        client: "야지수",
        place: "부산 민락",
        date: "2023.04.17",
        videoUrl: "https://www.youtube.com/embed/CvLDqoO_c4o",
    },
    {
        src: [
            require('@/assets/images/jonheseo/1.jpg'),
            require('@/assets/images/jonheseo/2.jpg'),
            require('@/assets/images/jonheseo/3.jpg'),
        ],
        type: "Live",
        name: "clue + unrealesed",
        clientType: "Artist",
        client: "johnhasabigmouth",
        place: "세븐일레븐",
        date: "2023.05.19",
        videoUrl: "https://www.youtube.com/embed/rMIJHrE3EJA",
    },
    {
        src: [
            require('@/assets/images/igloo/1.jpg'),
            require('@/assets/images/igloo/2.jpg'),
            require('@/assets/images/igloo/3.jpg'),
        ],
        type: "Live",
        name: "우리는 빛으로",
        clientType: "Band",
        client: "이글루",
        place: "제임스레코드",
        date: "2023.06.28",
        videoUrl: "https://www.youtube.com/embed/Di0duCTBKKY",
    },
    {
        src: [
            require('@/assets/images/bindalLive/1.jpg'),
            require('@/assets/images/bindalLive/2.jpg'),
            require('@/assets/images/bindalLive/3.jpg'),
        ],
        type: "Live",
        name: "우울시계",
        clientType: "Artist",
        client: "빈달",
        place: "꼼지락발전소",
        date: "2023.08.26",
        videoUrl: "https://www.youtube.com/embed/0NcYGr1GCTk",
    },
    {
        src: [
            require('@/assets/images/enalchi/1.jpg'),
            require('@/assets/images/enalchi/2.jpg'),
            require('@/assets/images/enalchi/3.jpg'),
        ],
        type: "Live",
        name: "범 내려온다",
        clientType: "Band",
        client: "이날치",
        place: "꼬문",
        date: "2023.10.13",
        videoUrl: "https://www.youtube.com/embed/L9Wh9Wpto1c",
    },
    {
        src: [
            require('@/assets/images/regain/1.jpg'),
            require('@/assets/images/regain/2.jpg'),
            require('@/assets/images/regain/3.jpg'),
        ],
        type: "Brand",
        name: "리게인 프로젝트",
        clientType: "Client",
        client: "리게인 프로젝트 본점",
        place: "대구 중구 약령시",
        date: "2022.08.17",
        videoUrl: "https://www.youtube.com/embed/5blSVEGreM8",
    },
    {
        src: [
            require('@/assets/images/vans/1.jpg'),
            require('@/assets/images/vans/2.jpg'),
            require('@/assets/images/vans/3.jpg'),
        ],
        type: "Contents",
        name: "Vans Eco Theory",
        clientType: "Client",
        client: "동성로 반스",
        place: "동성로 반스",
        date: "2021.08.15",
        videoUrl: "",
    },
    {
        src: [
            require('@/assets/images/tamsson/1.jpg'),
            require('@/assets/images/tamsson/2.jpg'),
            require('@/assets/images/tamsson/3.jpg'),
        ],
        type: "Contents",
        name: "KOREAN CHEF II FAKE CF",
        clientType: "Artist",
        client: "탐쓴",
        place: "(구)꽃자리다방",
        date: "2023.04.24",
        videoUrl: "https://www.youtube.com/embed/Zozngs0oq48",
    },
    {
        src: [
            require('@/assets/images/wooseungyeon/1.jpg'),
            require('@/assets/images/wooseungyeon/2.jpg'),
            require('@/assets/images/wooseungyeon/3.jpg'),
        ],
        type: "Wedding",
        name: "야외결혼식",
        clientType: "Client",
        client: "우승연",
        place: "대구 웨딩스위치",
        date: "2023.06.03",
        videoUrl: "",
    },
    {
        src: [
            require('@/assets/images/drinking/1.jpg'),
            require('@/assets/images/drinking/2.jpg'),
            require('@/assets/images/drinking/3.jpg'),
        ],
        type: "Interview",
        name: "싱글발매기념 인터뷰",
        clientType: "Band",
        client: "드링킹소년소녀합창단",
        place: "대구 수성네거리",
        date: "2024.02.15",
        videoUrl: "https://www.youtube.com/embed/xIUaeeTRSLA",
    },
    {
        src: [
            require('@/assets/images/yukinion/1.jpg'),
            require('@/assets/images/yukinion/2.jpg'),
            require('@/assets/images/yukinion/3.jpg'),
        ],
        type: "Interview",
        name: "유키니언 오픈 인터뷰",
        clientType: "Band",
        client: "이글루",
        place: "제임스레코드",
        date: "2023.06.28",
        videoUrl: "https://www.youtube.com/embed/3JMjzFZ9F1s",
    },
    {
        src: [
            require('@/assets/images/reagainInterior/1.jpg'),
            require('@/assets/images/reagainInterior/2.jpg'),
            require('@/assets/images/reagainInterior/3.jpg'),
        ],
        type: "Interior",
        name: "리게인 프로젝트 강남",
        clientType: "Client",
        client: "리게인 프로젝트 본점",
        place: "리게인 프로젝트 강남 플래그쉽",
        date: "2023.04.04",
        videoUrl: "https://www.youtube.com/embed/BqqQ6GG-jfU",
    },
    {
        src: [
            require('@/assets/images/moreBeast/1.jpg'),
            require('@/assets/images/moreBeast/2.jpg'),
            require('@/assets/images/moreBeast/3.jpg'),
        ],
        type: "Product",
        name: "모어비스트",
        clientType: "Client",
        client: "리게인 프로젝트 본점",
        place: "리게인 프로젝트 본점",
        date: "2023.08.12",
        videoUrl: "https://www.youtube.com/embed/Os6hmZdYiIE",
    },
    {
        src: [
            require('@/assets/images/artFestival/1.jpg'),
            require('@/assets/images/artFestival/2.jpg'),
            require('@/assets/images/artFestival/3.jpg'),
        ],
        type: "Sketch",
        name: "대구독립예술제",
        clientType: "Client",
        client: "인디공오삼",
        place: "대구 동성로 28아트스퀘어",
        date: "2023.12.10",
        videoUrl: "",
    },
    {
        src: [
            require('@/assets/images/seamoon/1.jpg'),
            require('@/assets/images/seamoon/2.jpg'),
            require('@/assets/images/seamoon/3.jpg'),
        ],
        type: "Sketch",
        name: "댄서스나잇",
        clientType: "Client",
        client: "오터스맵",
        place: "서문시장",
        date: "2023.01.05",
        videoUrl: "https://www.youtube.com/embed/7qamlLeSbKs",
    },
];

app.config.globalProperties.$photos = photos;

