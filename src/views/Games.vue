<template>
  <div class="games">
    <h1>Games with LAN Mode</h1>
    <h2>(OFW and CFW compatible)</h2>
    <div class="cards">
      <Card
        title="ARMS"
        message="Press [L] + [R] + [Left Analog] on the main menu screen."
      />
      <Card
        title="Bayonetta 2"
        message="Enter tag climax and highlight local play. Press [Left Analog (hold down)] and press [L] + [R]."
      />
      <Card
        title="Mario Kart 8 Deluxe"
        message="Press [L] + [R] + [Left Analog] on the main menu screen."
      />
      <Card
        title="Mario Tennis Aces"
        message="Select Free Play from the Main Menu. Press [Left Analog (hold down)] and press [L] + [R]."
      />
      <Card title="Pokémon Shield" lang="enGB" />
      <Card title="Pokémon Sword" lang="enGB" />
      <Card
        title="Pokkén Tournament DX"
        message="From the main screen select a game. Press [X] + [Dpad-Down] and press [L] + [R]."
      />
      <Card title="SAINTS ROW: THE THIRD - THE FULL PACKAGE" />
      <Card
        title="Splatoon 2"
        message="Press [L] + [R] + [Left Analog] at the local play option. Hold down until the lan mode is activated."
      />
      <Card title="Titan Quest" />
    </div>
    <h1>Games with Wireless Mode</h1>
    <h2>(CFW only: it needs ldn_mitm kip)</h2>
    <div class="cards">
      <Card
        title="Animal Crossing: New Horizons"
        message="Switch MTU: 1500 — LanPlay PMTU: 500"
      />
      <Card title="A.O.T 2" />
      <Card title="Diablo III: Eternal Collection" />
      <Card title="DRAGON BALL FighterZ" />
      <Card title="DRAGON BALL XENOVERSE 2" />
      <Card title="Dragon Quest Builders 2" />
      <Card title="Fast RMX" ds="true" />
      <Card title="EA SPORTS FIFA 19" />
      <Card title="EA SPORTS FIFA 20 Nintendo Switch Legacy Edition" />
      <Card title="Luigi's Mansion 3" />
      <Card title="Marvel Ultimate Alliance 3: The Black Order" />
      <Card title="Monster Hunter Generations Ultimate" />
      <Card title="Payday 2" />
      <Card title="Portal Knights" />
      <Card title="Puyo Puyo Tetris" />
      <Card title="Rocket League" ds="true" />
      <Card title="Snack World" lang="enGB" />
      <Card title="Stardew Valley" ds="true" />
      <Card title="Super Mario Maker 2" />
      <Card title="Super Smash Bros. Ultimate" />
      <Card title="Ultra Street Fighter 2: The Final Challengers" />
      <Card title="UNO" ds="true" />
      <Card title="Worms W.M.D." ds="true" />
      <Card title="And so on..." asset="etc.jpg" />
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
