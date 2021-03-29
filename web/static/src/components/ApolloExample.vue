<script>

import gql from "graphql-tag";

export const GET_DEALS = gql`
  query getDeals {
    deals {
    userName
    stage
    }
 }`


export default {
  data () {
    return {
      deals: []
    }
  },

  apollo: {

    deals: {
      query: GET_DEALS,
      pollInterval: 1000
    },

  },

  computed: {

  },

  methods: {

  }
}
</script>

<template>
  <div>
  <div v-for="deal in deals" :key="deal.userName + deal.stage">
    <p> {{ deal }}  </p>
  </div>
  </div>
</template>
