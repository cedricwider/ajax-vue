<template>
  <div class="container">
    <div class="form">
      <b-form @submit="onSubmit">
        <b-form-input v-model="query" placeholder="Station Name"></b-form-input>
      </b-form>
    </div>
    <p class="error" v-show="error && error.length">{{ error }}</p>

    <div class="favorites-list">
      <c-station :station="station" :collapsed="true" v-for="station in favoritedStations" v-bind:key="station.id" v-on:toggleFavorite="toggleFavorite" v-bind:favorite="isFavorite(station.id)"></c-station>
    </div>

    <div class="result-list" v-show="stations && stations.length">
      <h1>Stations</h1>
      <c-station :station="station" :collapsed="true" v-for="station in stations" v-bind:key="station.id" v-on:toggleFavorite="toggleFavorite" v-bind:favorite="isFavorite(station.id)"></c-station>
    </div>

  </div>
</template>

<script>
import {HTTP} from '../http-common'
import _ from 'lodash'
import Station from './Station'

export default {
  components: {
    cStation: Station
  },

  data () {
    return {
      query: '',
      stations: [],
      error: null,
      favoritedStations: []
    }
  },

  watch: {
    query: _.debounce(function () {
      if (!this.query || this.query.length === 0) this.stations = []
      else this.queryLocations(this.query)
    }, 500)
  },

  methods: {
    isFavorite (stationId) {
      return !!_.find(this.favoritedStations, favoritedStation => favoritedStation.id === stationId)
    },
    onSubmit (event) {
      this.queryLocations(this.query)
    },
    queryLocations (query) {
      if (query.length < 3) { return }
      this.error = null

      HTTP.get('/locations', {params: {query}})
      .then(response => {
        this.stations = response.data.stations
      })
      .catch(error => {
        console.log(`Error while fetching locations: ${error}`)
        this.error = error
        this.stations = []
      })
    },
    toggleFavorite (station, isFavorite) {
      if (!isFavorite) {
        if (!_.find(this.favoritedStations, favoritedStation => favoritedStation.id === station.id)) {
          this.favoritedStations.push(station)
        }
      } else {
        this.favoritedStations = _.reject(this.favoritedStations, favoritedStation => favoritedStation.id === station.id)
      }
    }
  }
}
</script>

<style>
  h1 {
    margin-top: 50px;
  }
  .result-list {
    margin-top: 20px;
  }
</style>

