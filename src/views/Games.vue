<template>
  <div class="games">
    <h1>Games with LAN Mode</h1>
    <h2>(OFW and CFW compatible)</h2>
    <div class="cards">
      <Card
        title="ARMS"
        message="Press [L] + [R] + [Left Analog] on the main menu screen."
        image="switch/arms.jpg"
      />
      <Card
        title="Bayonetta 2"
        message="Enter tag climax and highlight local play. Press [Left Analog (hold down)] and press [L] + [R]."
        image="switch/bayonetta2.jpg"
      />
      <Card
        title="Mario Kart 8 Deluxe"
        message="Press [L] + [R] + [Left Analog] on the main menu screen."
        image="switch/mariokart8deluxe.jpg"
      />
      <Card
        title="Mario Tennis Aces"
        message="Select Free Play from the Main Menu. Press [Left Analog (hold down)] and press [L] + [R]."
        image="switch/mariotennisaces.jpg"
      />
      <Card
        title="Pokémon Shield"
        message=""
        image="switch/pokemonshield.jpg"
      />
      <Card title="Pokémon Sword" message="" image="switch/pokemonsword.jpg" />
      <Card
        title="Pokken Tournament DX"
        message="From the main screen select a game. Press [X] + [Dpad-Down] and press [L] + [R]."
        image="switch/pokkentournamentdx.jpg"
      />
      <Card
        title="Splatoon 2"
        message="Press [L] + [R] + [Left Analog] at the local play option. Hold down until the lan mode is activated."
        image="switch/splatoon2.jpg"
      />
      <Card title="Titan Quest" message="" image="switch/titanquest.jpg" />
    </div>
    <h1>Games with Wireless Mode</h1>
    <h2>(CFW only: it needs ldn_mitm kip)</h2>
    <div class="cards">
      <Card title="A.O.T 2" message="" image="switch/aot2.jpg" />
      <Card
        title="Diablo III: Eternal Collection"
        message=""
        image="switch/diabloiiieternalcollection.jpg"
      />
      <Card
        title="DRAGON BALL XENOVERSE 2"
        message=""
        image="switch/dragonballxenoverse2.jpg"
      />
      <Card title="FIFA 19" message="" image="switch/fifa19.jpg" />
      <Card
        title="Luigi's Mansion 3"
        message=""
        image="switch/luigismansion3.jpg"
      />
      <Card
        title="Monster Hunter Generations Ultimate"
        message=""
        image="switch/monsterhuntergenerationsultimate.jpg"
      />
      <Card title="Payday 2" message="" image="switch/payday2.jpg" />
      <Card
        title="Puyo Puyo Tetris"
        message=""
        image="switch/puyopuyotetris.jpg"
      />
      <Card title="Rocket League" message="" image="switch/rocketleague.jpg" />
      <Card
        title="Stardew Valley"
        message=""
        image="switch/stardewvalley.jpg"
      />
      <Card
        title="Super Smash Bros. Ultimate"
        message=""
        image="switch/supersmashbrosultimate.jpg"
      />
      <Card
        title="Ultra Street Fighter 2: The Final Challengers"
        message=""
        image="switch/ultrastreetfighter2thefinalchallengers.jpg"
      />
      <Card title="UNO" message="" image="switch/uno.jpg" />
      <Card title="Worms W.M.D." message="" image="switch/wormswmd.jpg" />
      <Card title="And so on..." message="" image="switch/etc.jpg" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  components: {
    Card
  }
};
</script>

<style lang="scss">
.cards {
  display: flex;
  justify-content: space-around;
  flex-flow: row wrap;
  max-width: 90%;
  margin: auto;
}
</style>
