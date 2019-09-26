<template>
  <v-timeline-item
    small
    :color='getStatus'
    :hide-dot='!item.status || item.status === "none"'
  >
    <v-layout row fluid>
      <v-flex
        :xs4='$vuetify.breakpoint.smAndDown'
        text-xs-left
        px-0
        mx-0
      >
        <v-chip
          class='accent--text text-capitalize'
          color='primary lighten-1'
          disabled
          label
          small
        >
          {{ getLocaleDateTime(item.timestamp, 'date') }}
        </v-chip>
          <!-- :class='item.type === "action" ? item.status : "primary"' -->
        <v-chip
          :class='getStatus'
          :color='`primary`'
          :disabled='ticket.type === "text"/*privat policity*/'
          :key='`ticket${t}`'
          @click='navigateTo(ticket)'
          label
          small
          v-for='(ticket, t) in item.tickets'
        >
          <v-avatar v-if='ticket.icon'>
            <v-icon>{{ ticket.icon }}</v-icon>
          </v-avatar>
          {{ ticket.title }}
        </v-chip>
      </v-flex>
      <v-layout align-center fluid text-xs-left ma-0 pa-0 px-0 mx-0>
        {{ item.description }}
        <v-flex text-xs-right px-0 mx-0>
          <v-chip
            class='accent--text'
            disabled
            color='primary lighten-1'
            label
            small
          >
            {{ getLocaleDateTime(item.timestamp, 'time') }}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-timeline-item>
</template>

<script scoped>
  export default {
    props: ['item'],
    data: () => ({
    }),
    methods: {
      getLocaleDateTime(value = Date.now(), type) {
        const options = type === 'date' ? {weekday: 'long'} : {hour: '2-digit', minute: '2-digit', second: '2-digit'};
        const date = new Date(value);
        return type === 'date' ? date.toLocaleDateString('ru-RU', options) : date.toLocaleTimeString('ru-RU', options);
      },
      navigateTo(ticket) {
        this.$router.push({path: ticket.to, query: {lat: ticket.params.lat, lng: ticket.params.lng}});
      },
    },
    computed: {
      getStatus() {
        return this.item.status === 'active' ? 'info' : this.item.status !== 'none' ? this.item.status : 'primary';
      },
    },
  };
</script>
