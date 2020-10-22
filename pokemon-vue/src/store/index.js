import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pokemons: [],
    SinglePokemon: [],
    seleccionado: false,
    result: { url: 'dd', name: '', image: '' },
    optionAxios: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        "crossorigin": "true",
        "crossOrigin": "true",
        "CrossOrigin": "true",
        'crossDomain': 'true',
        'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE'
      }
    }
  },
  mutations: {
    SetPokemons(state, Pokemons) {
      state.Pokemons = Pokemons
      state.seleccionado = false;
    },
    SetPokemon(state, Pokemon) {
      state.SinglePokemon = Pokemon;
      state.seleccionado = true;
    }
  },
  actions: {
    GetRootObject({ commit, state, dispatch }) {
      const Pokemons = [];
      axios.get('http://localhost:25575/api/Values/GetAll', null, state.optionAxios)
        .then((response) => {
          console.log("GetRootObject :");
          console.log(response.data);

          response.data.results.forEach((value, index) => {
            Pokemons.push(value);
          })
          console.log(Pokemons);
          commit('SetPokemons', Pokemons);
        });
    },
    FiltrarPokemons({ commit, state }, clave) {
      const Pokemons = [];
      axios.get('http://localhost:25575/api/Values/Filtrar/' + clave, state.optionAxios)
        .then((response) => {
          console.log("GetRootObject :");
          console.log(response.data);

          response.data.results.forEach((value, index) => {
            Pokemons.push(value);
          })
          console.log(Pokemons);
          commit('SetPokemons', Pokemons);
        });
    },
    GetSinglePokemon({ commit, state }, url) {
      console.log(url);
      const Pokemon = [];
      let objeto = { url: url, name: 'ss', image: 'ss' };
      objeto.url = url;
      console.log(objeto)
      axios.post('http://localhost:25575/api/Values/GetSingle/', objeto, state.optionAxios.headers)
        .then((response) => {
          console.log("GetRootObject :");
          console.log(response.data);

          Pokemon.push(response.data);

          commit('SetPokemon', Pokemon);
        });
    },

  },
  modules: {
  }
})
