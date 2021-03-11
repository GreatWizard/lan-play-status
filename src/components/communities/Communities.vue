<template>
  <h2>{{ $t("communities.title") }}</h2>
  <table>
    <thead>
      <tr>
        <th>{{ $t("communities.table.name") }}</th>
        <th>{{ $t("communities.table.games") }}</th>
        <th>{{ $t("communities.table.languages") }}</th>
        <th>{{ $t("communities.table.links") }}</th>
      </tr>
    </thead>
    <tbody>
      <Community
        v-for="community in communities"
        :community="community"
        :key="`${community.discord}${community.whatsapp}`"
      />
    </tbody>
  </table>
  <em class="hide--on-mobile">
    {{ $t("communities.message") }}
  </em>
</template>

<script>
import Community from "@/components/communities/Community.vue";

export default {
  components: {
    Community
  },
  data() {
    return {
      communities: this.$store.state.communities
    };
  }
};
</script>
