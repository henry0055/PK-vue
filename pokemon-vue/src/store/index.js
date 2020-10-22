import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Pokemons: [],
    SinglePokemon: [],
    seleccionado: false,
    result: { url: '', name: '', image: '' },
    optionAxios: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
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

          response.data.results.forEach((value, index) => {
            Pokemons.push(value);
          })
          commit('SetPokemons', Pokemons);
        });
    },
    FiltrarPokemons({ commit, state }, clave) {
      const Pokemons = [];
      axios.get('http://localhost:25575/api/Values/Filtrar/' + clave, state.optionAxios)
        .then((response) => {

          response.data.results.forEach((value, index) => {
            Pokemons.push(value);
          })
          commit('SetPokemons', Pokemons);
        });
    },
    GetSinglePokemon({ commit, state }, url) {

      const Pokemon = [];
      let objeto = { url: url, name: '', image: '' };
      objeto.url = url;

      axios.post('http://localhost:25575/api/Values/GetSingle/', objeto, state.optionAxios.headers)
        .then((response) => {
          Pokemon.push(response.data);
          commit('SetPokemon', Pokemon);
        });
    },

  },
  modules: {
  }
})
