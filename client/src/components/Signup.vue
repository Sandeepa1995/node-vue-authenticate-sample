<template>
  <div class="signup container">
    <div class="col-sm-6 col-sm-offset-3">

      <h1><span class="fa fa-sign-in"></span> Signup</h1>

      <!-- show any messages that come back with authentication -->
      <div  v-show="message.message.length>0" class="alert alert-warning">{{ message.message }}</div>
      <div  v-show="passer.message.length>0" class="alert alert-success">{{ message.message }}</div>

      <!-- LOGIN FORM -->
      <form v-on:submit.prevent="signup()">
        <div class="form-group">
          <label>Name</label>
          <input v-model="user.name" type="text" class="form-control" name="name">
        </div>
        <div class="form-group">
          <label>Username</label>
          <input v-model="user.username" type="text" class="form-control" name="username">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input v-model="user.email" type="email" class="form-control" name="email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="user.password" type="password" class="form-control" name="password">
        </div>

        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
      </form>

      <hr>
      <p>email: {{ user.email }}</p>
      <p>name: {{ user.name }}</p>
      <p>username: {{ user.username }}</p>
      <p>password: {{ user.password }}</p>
      <!--<p>{{ message.message }}</p>-->

      <p>Already have an account? <router-link to="/login" >Login</router-link>
      <p>Or go <router-link to="/" >Home</router-link></p>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'signup',
  data () {
    return {
      message:{
        message:""
      },
      passer:{
        message:""
      },
      user:{
        email:"",
        password:"",
        name:"",
        username:""
      }
    }
  },
  mounted(){

  },
  methods: {
    signup() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/register',
        data: {
          name: this.user.name,
          username: this.user.username,
          email:this.user.email,
          password:this.user.password
        },
        headers: {'Content-Type': 'application/json'}
      }).then((response)=> {
        console.log(response.data);
        if(!response.data.success){
          this.message.message=response.data.msg;
        }
        else {
          localStorage.setItem("message",response.data.msg);
          this.$router.push('/login');
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}

// router.beforeEach((to,from,next)=>{
//   if(!to.meta.requiresAuth){
//     var loggeduser= localStorage.getItem("user");
//     if (loggeduser){
//       next({name:'Home'})
//     }
//     else {
//       next();
//     }
//   }
//   next();
// });


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
