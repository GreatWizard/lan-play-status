<template>
  <div>
    <h2>Communities</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Games</th>
          <th>Languages</th>
          <th>Link</th>
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
      These communities are not linked to this site. We list them to help you
      find other players who speak the same language.
    </em>
  </div>
</template>

<script>
import Community from "@/components/Community.vue";

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
