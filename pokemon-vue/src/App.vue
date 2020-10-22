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
import Card from "./components/Card";
export default {
  name: "App",

  components: {
    Card
  }
};
</script>
