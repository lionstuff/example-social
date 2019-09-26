<template>
  <v-timeline
    dense
    :class='["primary"]'
    :dark='dark'
  >
    <v-timeline-item>
      <template
        #icon
        v-if='itemsLength'
      >
        <v-btn
          icon
          small
          :class='[itemsLength ? `${fold ? "primary" : "info"}` : `primary`]'
          @click='fold = !fold;'
        >
          <v-icon>
            {{ fold ? 'mdi-menu-down' : 'mdi-menu-up' }}
          </v-icon>
        </v-btn>
      </template>
      <v-layout
        @click='fold = !fold;'
        fluid
      >
        <v-flex xs12 text-xs-left px-0 mx-0>
          <v-chip
            class='accent--text text-uppercase'
            color='primary lighten-1'
            disabled
            label
            small
          >
            {{ getItemTitle }}
          </v-chip>
        </v-flex>
        <v-flex xs5 text-xs-right px-0 mx-0>
          <v-chip
            class='accent--text'
            color='primary lighten-1'
            disabled
            label
            small
          >
            {{ itemsLength }}
          </v-chip>
        </v-flex>
      </v-layout>
    </v-timeline-item>

    <v-slide-y-transition
      group
      key='timelineItemTransition'
      mode='out-in'
    >
      <timeline-item
        :item='item'
        :key='`timelineItem${i}`'
        :v-once='true'
        v-for='(item, i) in getItemsReverse'
        v-if='!fold'
      />
    </v-slide-y-transition>
  </v-timeline>
</template>

<script scoped>
  export default {
    props: ['dark', 'items'],
    data: () => ({
      fold: true,
    }),
    created() {
    },
    mounted() {
    },
    watch: {
    },
    computed: {
      getItemTitle() {
        const options = {year: 'numeric', month: 'long'};
        return new Date(parseInt(Object.keys(this.items).reverse()[0])).toLocaleDateString('ru-RU', options);
      },
      itemsLength() { // [OK]
        return Object.keys(this.items).length;
      },
      getItemsReverse() { // [OK]
        // Object.values(this.items).reverse().forEach((value) => {
        //   if (acc !== null) {
        //     if (acc.meta === value.meta) {
        //       // [TODO] Delete current item from this.items
        //       const ticket = {
        //         type: 'text', // 'admin', 'user', 'action', 'event', 'task', 'text'
        //         title: 0,
        //       };
        //       Object.values(acc.tickets).push(ticket);
        //       ticket.title = acc.tickets[2] !== undefined ? acc.tickets[2].title++ : 1;
        //       console.log(ticket);
        //       Object.assign(value, acc);
        //     }
        //   }
        //   acc = value;
        //   console.log(acc);
        // });
        return Object.values(this.items).reverse();
      }
    },
  };
</script>
