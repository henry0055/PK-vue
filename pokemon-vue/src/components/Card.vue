<template>
    <div>
     <v-card class="mx-auto" max-width="544" outlined >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="overline mb-4">
                {{SinglePokemon[0].name}}
            </div>
            <v-list-item-title class="headline mb-1">
                {{SinglePokemon[0].name}}
            </v-list-item-title>
            <v-row justify="center">
                <v-col>Altura : {{SinglePokemon[0].height}}ft</v-col>
                <v-col>Peso :{{SinglePokemon[0].weight}}kg </v-col>
            </v-row>
        </v-list-item-content>
        <v-avatar size="120">
        <img :src="''+SinglePokemon[0].sprites.front_default">
            </v-avatar>
        </v-list-item>
        <v-btn class="light-green--text text--darken-1" rounded text > Habilidades :  </v-btn>
        <v-btn  v-for="(item,index) in SinglePokemon[0].abilities" :key="index" rounded text>{{item.ability.name}} </v-btn>
        <br>
        <v-btn class="red--text text--darken-1" rounded text  > Especies :  </v-btn>
        <v-btn  rounded text>{{SinglePokemon[0].species.name}} </v-btn>
        <br>
        <v-btn sm="8" class="indigo--text text--darken-1" rounded text  > Tipo :  </v-btn>
        <v-btn  v-for="(item,i) in SinglePokemon[0].types" :key="'A'+i" rounded text>{{item.type.name}} </v-btn>
        <br>
        <v-btn sm="8" class="orange--text text--darken-1" rounded text  > Stats :  </v-btn>
        <v-btn  v-for="(item,r) in SinglePokemon[0].stats" :key="'B'+r" rounded text>{{item.stat.name}}<a>{{item.base_stat}}</a> </v-btn>
            
        <v-row justify="center">
        <v-col></v-col>
        <v-col></v-col>
        <v-col></v-col>
        <v-col><v-btn v-on:click="save(SinglePokemon[0].name,SinglePokemon[0])" >Guardar</v-btn></v-col>
        </v-row>
     </v-card>
 </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  methods: {
    ...mapActions(["GetSinglePokemon"]),

    save: function(filename, data) {
      var Pokemon = this.SinglePokemon[0];
      var newText = "";
      var divisor =
        "\n_____________________________________________________________________________\n";
      var salto = "\n";
      newText = "Nombre: " + Pokemon.name + divisor;
      newText =
        newText +
        "Altura: " +
        Pokemon.height +
        "ft    " +
        "Peso: " +
        Pokemon.weight +
        "kg" +
        divisor;
      newText = newText + "Especie: " + Pokemon.species.name + divisor;
      newText = newText + "Habilidades: ";
      Pokemon.abilities.forEach((value, index) => {
        newText = newText + value.ability.name + ",";
      });
      newText = newText + divisor + "Tipos: ";
      Pokemon.types.forEach((value, index) => {
        newText = newText + value.type.name + ",";
      });
      newText = newText + divisor + "Stats: ";
      Pokemon.stats.forEach((value, index) => {
        newText = newText + value.stat.name + " " + value.base_stat + ",";
      });
      newText = newText + divisor + "Movimientos: ";
      Pokemon.moves.forEach((value, index) => {
        newText = newText + " [" + value.move.name + "]";
        if ((index + 1) % 7 === 0) {
          newText = newText + salto;
        }
      });

      var blob = new Blob([newText], { type: "text", endings: "native" });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        var elem = window.document.createElement("a");
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    }
  },
  computed: {
    ...mapState(["SinglePokemon"])
  }
};
</script>