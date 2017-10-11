<template>
  <div class="station" @click="expand = !expand">
    <h3>{{ station.name }} <span class="favoriteButton" @click.stop="toggleFavorite"><icon :name="favoriteClass" scale="2"></icon></span></h3>
    <div class="details" v-show="this.expand">
      <b-table striped hover :items="tableData"></b-table>
    </div>
  </div>
</template>

<script>
import {HTTP} from '../http-common'

export default {
  props: ['station', 'collapsed', 'favorite'],

  data () {
    return {
      expand: !this.collapsed,
      connections: []
    }
  },

  computed: {
    tableData () {
      return this.connections.map(connection => {
        return {
          departure: connection.departure.toLocaleTimeString(),
          name: `${connection.category} ${connection.number}`,
          direction: connection.direction
        }
      })
    },
    favoriteClass () { return this.favorite ? 'star' : 'star-o' }
  },

  watch: {
    expand () {
      if (this.connections.length !== 0) return
      this.loadStationBoard()
    }
  },

  methods: {
    loadStationBoard () {
      HTTP.get('/stationboard', { params: { id: this.station.id, type: 'departure', limit: 10 } })
      .then(response => {
        this.connections = response.data.stationboard
          .map(result => {
            return {
              id: result.name + result.stop.departureTimestamp,
              name: result.name,
              category: result.category,
              number: result.number,
              direction: result.to,
              departure: new Date(result.stop.departure)
            }
          })
      })
      .catch(error => {
        console.log(`Error while loading stationboard: ${error}`)
        this.connections = []
      })
    },
    toggleFavorite () {
      this.$emit('toggleFavorite', this.station, this.favorite)
    }
  }
}

</script>

<style>
  .station {
    border: 1px solid black;
    border-radius: 5px;
    margin-top: 5px;
    padding: 10px;
  }

  .favoriteButton {
    float: right;
    visibility: hidden;
  }

  .station:hover .favoriteButton {
    visibility: visible;
  }
</style>

