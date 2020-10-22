<template>
  <div class="home">
   <v-container  align="center" justify="center">
    <v-container class="white lighten-5 mb-1">
      <v-row  no-gutters style="height: 45px;" justify="center">
        <h1>Poke Busqueda</h1>
      </v-row>
    </v-container>

    <v-container class="white lighten-5 mb-6">
      <v-row no-gutters style="height: 100px;" >
        <v-text-field v-model="busqueda" class="centered-input text--darken-  v-text-field"mt="0" hide-details="auto"></v-text-field>
        <v-btn v-on:click="FiltrarPokemons(busqueda)" large color="info">Buscar</v-btn>
      </v-row>
      <v-container justify="center">
        <a v-if="!seleccionado" v-on:click="Seleccionar(item.url)" style="float:left" v-for="(item,n) in Pokemons" :key="n">
          <img :src="''+item.image">
          <br>
          <a justify="center">{{item.name}}</a>
        </a>
    
        <Card v-if="seleccionado"></Card>
      </v-container>
    </v-container>
   </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Card from "@/components/Card.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Home",
   components: {
    HelloWorld,
    Card
  },
  created() {
    this.GetRootObject();
   
  },
  data() {
    return {
      busqueda: "",
     
    };
  },
  methods: {
    ...mapActions(["GetRootObject", "FiltrarPokemons","GetSinglePokemon"]),
    Seleccionar: function(url) {
      this.GetSinglePokemon(url) ;
      this.seleccionado = true;
      
    }
  },
  computed: {
    ...mapState(["Pokemons","SinglePokemon","seleccionado"])
  }
};
</script>


<style scoped>
.centered-input>>>input {
  text-align: center;
}
.v-text-field>>>input {
  font-size: 2.6em;
  height: 2.6em;
  font-weight: 100;
  text-transform: capitalize;
}
</style>
