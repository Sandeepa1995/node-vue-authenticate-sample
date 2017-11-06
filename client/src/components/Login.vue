<template>
  <div class="login container">

      <div class="col-sm-6 col-sm-offset-3">

        <h1><span class="fa fa-sign-in"></span> Login</h1>

        <!-- show any messages that come back with authentication -->
        <div  v-show="message.message.length>0" class="alert alert-warning">{{ message.message }}</div>
        <div  v-show="passer.message.length>0" class="alert alert-success">{{ passer.message }}</div>


        <!-- LOGIN FORM -->
        <form action="/login" method="post">
          <div class="form-group">
            <label>Email</label>
            <input v-model="user.email" type="email" class="form-control" name="email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input v-model="user.password" type="password" class="form-control" name="password">
          </div>

          <button type="button" v-on:click="login()" class="btn btn-warning btn-lg">Login</button>
        </form>

        <hr>
        <p>email: {{ user.email }}</p>
        <p>password: {{ user.password }}</p>

        <p>Need an account?  <router-link to="/signup" >Signup</router-link>
        <p>Or go <router-link to="/" >Home</router-link></p>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
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
        password:""
      }
    }
  },
  mounted(){
    this.passer.message=localStorage.getItem("message");
    localStorage.setItem("message","");
  },
  methods: {
    login() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/users/authenticate',
        data: {
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
          localStorage.setItem("user",JSON.stringify(response.data.user));
          localStorage.setItem("token",response.data.token);
          this.$router.push('/');
        }
      })
        .catch(function (error) {
          console.log(error);
        });
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
