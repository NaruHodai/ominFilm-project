<script>

import {ref} from "vue";
import { useAdminStore } from "@/store/admin";
import Routes from "@/router/routes";
import {useRouter} from "vue-router";

const PASSWORD = "0125";
export default {
  name: "LoginView",
  setup() {
    const router = useRouter();
    const adminStore = useAdminStore();

    const password = ref("");

    const loginCheck = () => {
      if (PASSWORD === password.value) {
        adminStore.login();
        router.push({
          name:Routes.AdminPage,
        });
      } else {
        alert("비밀번호가 맞지 않습니다.");
      }
    }

    return {
      password,
      loginCheck,
    };
  }
}
</script>

<template>
  <div class="admin-wrap">
    <div class="container">
      <h1>ADMIN SIGN IN</h1>
      <div class="form">
        <div class="input__block">
          <input type="password" maxlength="4" placeholder="Password" class="input" id="password" v-model="password"/>
        </div>
        <button class="signin__btn" @click="loginCheck">
          Sign in
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container{
  display:block;
  max-width:680px;
  width:80%;
  margin:200px auto;
}

h1{
  color:RGB(225,53,48);
  font-size:48px;
  letter-spacing:-3px;
  text-align:center;
  margin:0px 0 80px 0 ;
  transition:.2s linear;
}

.form{
  width:100%;
  max-width:680px;
  margin:40px auto 10px;
  .input__block{
    margin:20px auto;
    display:block;
    position:relative;
    input{
      display:block;
      width:90%;
      max-width:680px;
      height:50px;
      margin:0 auto;
      border-radius:8px;
      border:none;
      padding:0 0 0 15px;
      font-size:14px;
      font-family: 'Montserrat', sans-serif;
    }
  }

  .signin__btn{
    background:RGB(225,53,48);
    color:white;
    display:block;
    width:92.5%;
    max-width:680px;
    height:50px;
    border-radius:8px;
    margin:0 auto;
    border:none;
    cursor:pointer;
    font-size:14px;
    font-family: 'Montserrat', sans-serif;
    transition:.2s linear;
  }
}

@media screen and (max-width: 768px){
  .container {
    margin: 100px auto;
  }
  h1 {
    margin: 40px 0 80px 0;
    font-size:38px;
  }
}
</style>