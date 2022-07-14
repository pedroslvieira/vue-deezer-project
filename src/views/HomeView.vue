<script setup>
import { ref } from 'vue';
const windowWidth = ref();
const mobile = ref(false);

const checkScreen = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value < 800) {
    mobile.value = true;
    return;
  }
  mobile.value = false;
  return;
};
checkScreen();

window.addEventListener("resize", checkScreen);
</script>

<template>
  <div id="root" :class="{ 'root-big-screen': !mobile, 'root-mobile': mobile }">
    <div class="form-div">
      <div class="form-title">
        <h1>Sign-up</h1>
      </div>
      <form class="form" action="">
        <!-- <label for="first-name">First Name </label> -->
        <input name="first-name" type="text" placeholder=" John" />
        <br />
        <!-- <label for="last-name">Last Name </label> -->
        <input name="last-name" type="text" placeholder=" Doe" />
        <br />
        <!-- <label for="email">Email </label> -->
        <input name="email" type="text" placeholder=" johndoe@gmail.com" />
        <br />
        <!-- <label for="password">Password </label> -->
        <input name="password" type="text" placeholder=" ***********" />
      </form>
      <Router-Link class="tracks-button" to="/tracks"> Submit </Router-Link>
      </div>
  </div>
</template>

<style>
.tracks-button {
  background-color: black;
  border-radius: 5px;
  width: 300px;
  margin-top: 25px;
  text-align: center;
  padding: 5px;
  color: aliceblue;
}
.tracks-button:hover {
  background-color: darkgray;
}

.form-div {
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-weight: bold;
}

.form-title {
  border-bottom: solid 1px lightgray;
  width: 300px;
  margin-bottom: 25px;
  padding-bottom: 15px;
}

.form {
  width: 300px;
  display: flex;
  flex-direction: column;
}

input {
  /* margin-bottom: 20px; */
  height: 30px;
}
</style>
