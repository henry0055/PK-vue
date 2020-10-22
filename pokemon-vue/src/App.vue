<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
   </v-app-bar>

    <v-main>
     <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Card from "./components/Card";
export default {
  name: "App",

  components: {
    HelloWorld,
    Card
  },

  data: () => ({
    //
  })
};
</script>
