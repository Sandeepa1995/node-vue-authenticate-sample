import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{requiresAuth:false}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta:{requiresAuth:true}
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta:{requiresAuth:true}
    }
  ]
});

router.beforeEach((to,from,next)=>{
  // console.log(to);
  if(to.meta.requiresAuth){
    var loggeduser= localStorage.getItem("user");
    console.log(loggeduser);
    if (loggeduser===null) {
      next();
    }
    else {
      console.log("A");
      next({path:'/'});
    }
    // next();
  }
  else {
      next();
  }
  next();
});


export default router;
