<template>
  <div class="home container">
    <div class="jumbotron text-center">
      <h1><span class="fa fa-lock"></span> Node Authentication</h1>

      <p>Login or Register with:</p>

      <router-link v-show="user.email.length==0" to="/login" class="btn btn-default"><span class="fa fa-user"></span>Login</router-link>
      <router-link v-show="user.email.length==0" to="/signup" class="btn btn-default"><span class="fa fa-user"></span>Signup</router-link>
    </div>
    <button v-show="user.email.length>0" type="button" v-on:click="logout()" class="btn btn-warning btn-lg">Logout</button>
    <p>email: {{ user.email }}</p>
    <p>name: {{ user.name }}</p>
    <p>username: {{ user.username }}</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'home',
  data () {
    return {
      token:localStorage.getItem("token"),
      user:{
        email:"",
        name:"User not logged in",
        username:""
      }
    }
  },
  mounted(){
    axios({
      method: 'get',
      url: 'http://localhost:3000/users/profile',
      headers: {'Content-Type': 'application/json','Authorization':this.token}
    }).then((response)=> {
      console.log(response.data);
      this.user.email=response.data.user.email;
      this.user.name=response.data.user.name;
      this.user.username=response.data.user.username;
    })
      .catch(function (error) {
        console.log("User not logged in");
      });
  },
  methods: {
    logout(){
      localStorage.setItem("token",null);
      localStorage.setItem("user",null);
      localStorage.clear();
      localStorage.setItem("message","User logged out");
      this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body
  {
    padding-top:80px;
  }

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


</style>
