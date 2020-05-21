<template>
  <div class="games">
    <h1>Games with LAN Mode</h1>
    <h2>(OFW and CFW compatible)</h2>
    <div class="cards">
      <Card v-for="game in ofw" :game="game" :key="game.title" />
    </div>
    <h1>Games with Wireless Mode</h1>
    <h2>(CFW only: it needs ldn_mitm kip)</h2>
    <div class="cards">
      <Card v-for="game in cfw" :game="game" :key="game.title" />
    </div>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";

const sortByTitle = function(a, b) {
  let aTitle = a.title.toLowerCase();
  let bTitle = b.title.toLowerCase();
  return aTitle > bTitle ? 1 : bTitle > aTitle ? -1 : 0;
};

let ofw = [
  {
    title: "ARMS",
    message: "Press [L] + [R] + [Left Analog] on the main menu screen."
  },
  {
    title: "Bayonetta 2",
    message:
      "Enter tag climax and highlight local play. Press [Left Analog (hold down)] and press [L] + [R]."
  },
  { title: "Mario & Sonic at the Olympic Games Tokyo 2020", lang: "enGB" },
  {
    title: "Mario Kart 8 Deluxe",
    message: "Press [L] + [R] + [Left Analog] on the main menu screen."
  },
  {
    title: "Mario Tennis Aces",
    message:
      "Select Free Play from the Main Menu. Press [Left Analog (hold down)] and press [L] + [R]."
  },
  { title: "Pokémon Shield", lang: "enGB" },
  { title: "Pokémon Sword", lang: "enGB" },
  {
    title: "Pokkén Tournament DX",
    message:
      "From the main screen select a game. Press [X] + [Dpad-Down] and press [L] + [R]."
  },
  { title: "SAINTS ROW: THE THIRD - THE FULL PACKAGE" },
  {
    title: "Splatoon 2",
    message:
      "Press [L] + [R] + [Left Analog] at the local play option. Hold down until the lan mode is activated."
  },
  { title: "Titan Quest" }
];
ofw.sort(sortByTitle);

let cfw = [
  { title: "A.O.T 2" },
  { title: "Ace of Seafood", ds: true },
  {
    title: "Animal Crossing: New Horizons",
    message: "Switch MTU: 1500 — LanPlay PMTU: 500"
  },
  { title: "ARK: Survival Evolved" },
  { title: "Art of Balance", ds: true },
  { title: "Battlezone Gold Edition", ds: true },
  { title: "Bloody Zombies", ds: true },
  { title: "Brawlout", ds: true },
  { title: "Broforce", ds: true },
  { title: "CAPCOM BEAT 'EM UP BUNDLE", ds: true },
  { title: "Chiki-Chiki Boxy Pro Wrestling", ds: true },
  { title: "Chiki-Chiki Boxy Racers", ds: true },
  {
    title: "Chou Tousouchuu & Chou Sentouchuu Double Pack (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/15331f273dd82cfa2b7381e31455fb3a70d158525625fa750b2ceefcee9693eb.jpg?w=1000"
  },
  { title: "Contra: Rogue Corps" },
  { title: "DAEMON X MACHINA" },
  { title: "Diablo III: Eternal Collection" },
  { title: "Disc Jam", ds: true },
  { title: "DRAGON BALL FighterZ" },
  { title: "DRAGON BALL XENOVERSE 2" },
  { title: "Dragon Marked for Death: Advanced Attackers" },
  { title: "Dragon Marked for Death: Frontline Fighters" },
  { title: "DRAGON QUEST BUILDERS 2" },
  { title: "Duck Game", ds: true },
  { title: "FAST RMX", ds: true },
  { title: "Fate/Extella Link" },
  { title: "EA SPORTS FIFA 18" },
  { title: "EA SPORTS FIFA 19" },
  { title: "EA SPORTS FIFA 20 Nintendo Switch Legacy Edition" },
  { title: "Flip Over Frog", ds: true },
  { title: "Flip Wars", ds: true },
  {
    title: "Football Heroes Turbo",
    source:
      "https://www.nintendo.com/content/dam/noa/en_US/games/switch/f/football-heroes-turbo-switch/football-heroes-turbo-switch-hero.jpg"
  },
  { title: "Freecell Battle King", ds: true },
  { title: "Full Metal Furies", ds: true },
  {
    title: "Gesshizu: Gajigaji Nakama wo Sodateyou (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/ff7bb4a2e6ac1b299ad173f7e238861f97bfcfa4a2a850ea63044ff0f0c6841e.jpg?w=1000"
  },
  {
    title: "Ginsei Mahjong (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/5448db27bb751f7c4daa999120cc517f775ed64a4a7a71edbc4daf4fdc410307.jpg?w=1000"
  },
  {
    title: "GIRLS und PANZER Dream Tank Match DX (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/0e03d81e30a16a7a52e1478cbdc0e7f6a96b29577daf9a5fa9af286a626f4480.jpg?w=1000"
  },
  { title: "GO Vacation" },
  { title: "God Eater 3" },
  { title: "Goonya Fighters", ds: true },
  { title: "Hammerwatch", ds: true },
  { title: "Human Fall Flat", ds: true },
  { title: "Just Shapes & Beats", ds: true },
  {
    title: "Kamen Rider Climax Scramble (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/fa85b59fdb799e8d06303beff4b03d63c0ac22d24c303e981f1a8f2c5471d5b4.jpg?w=1000"
  },
  { title: "Korg Gadget for Nintendo Switch", ds: true },
  { title: "Luigi's Mansion 3" },
  { title: "Mantis Burn Racing", ds: true },
  { title: "Marvel Ultimate Alliance 3: The Black Order" },
  { title: "Mercenary Kings: Reloaded Edition", ds: true },
  { title: "Minecraft" },
  {
    title: "Minna de Daifugo (JP)",
    source:
      "https://img-eshop.cdn.nintendo.net/i/1b77d2ae95d80724ea4b32f3f85303f6341d7a5fec10b98d6f9f899da8fd61f7.jpg?w=1000"
  },
  { title: "Monster Energy Supercross - The Official Videogame" },
  { title: "Monster Energy Supercross - The Official Videogame 2" },
  { title: "Monster Energy Supercross - The Official Videogame 3" },
  { title: "Monster Hunter Generations Ultimate" },
  { title: "Morphies Law", ds: true },
  { title: "Mortal Kombat 11" },
  { title: "Moto GP 18" },
  { title: "Moto GP 19" },
  { title: "Moto GP 20", ds: true },
  { title: "Ms. Splosion Man", ds: true },
  { title: "Namco Museum", ds: true },
  { title: "NBA 2K18" },
  { title: "NBA 2K19" },
  { title: "NBA 2K20" },
  { title: "Nine Parchments", ds: true },
  { title: "Overcooked 2" },
  { title: "Party Arcade", ds: true },
  { title: "Payday 2" },
  {
    title: "Pikachin-Kit: Game de Pirameki Daisakusen (JP)",
    asset: "pikachin-kit-game-de-pirameki-daisakusen.jpg"
  },
  { title: "PixARK" },
  { title: "Poisoft Thud Card", ds: true },
  { title: "Portal Knights" },
  {
    title: "Pro Yakyuu Famista Evolution (JP)",
    asset: "pro-yakyuu-famista-evolution.jpg"
  },
  { title: "Puyo Puyo Champions", ds: true },
  { title: "Puyo Puyo Tetris" },
  { title: "Ragtag Adventurers", ds: true },
  { title: "Rayman Legends: Definitive Edition" },
  { title: "Red Faction Guerrilla Re-Mars-tered" },
  { title: "Resident Evil Revelations", ds: true },
  { title: "Resident Evil Revelations 2", ds: true },
  { title: "Rocket League", ds: true },
  { title: "Risk of Rain 2" },
  { title: "Sid Meier's Civilization VI" },
  { title: "Snack World", lang: "enGB" },
  { title: "Sniper Elite V2 Remastered" },
  { title: "SNK Heroines Tag Team Frenzy" },
  { title: "SOLITAIRE BATTLE ROYAL", ds: true },
  { title: "Spintires: MudRunner - American Wilds" },
  { title: "Stardew Valley", ds: true },
  { title: "Super Beat Sports", ds: true },
  { title: "Super Bomberman R" },
  { title: "SUPER DRAGON BALL HEROES WORLD MISSION" },
  { title: "Super Mario Maker 2" },
  { title: "Super Mario Party" },
  { title: "Super Smash Bros. Ultimate" },
  { title: "SWORD ART ONLINE: Hollow Realization Deluxe Edition" },
  { title: "Taiko no Tatsujin Drum'n'Fun!" },
  { title: "Team Sonic Racing" },
  { title: "Tennis", ds: true },
  { title: "Terraria", ds: true },
  { title: "Torchlight 2", ds: true },
  { title: "Trine Enchanted Edition", ds: true },
  { title: "Trine 2: Complete Story", ds: true },
  { title: "Trivial Pursuit Live!", ds: true },
  { title: "Ultra Street Fighter 2: The Final Challengers" },
  { title: "UNO", ds: true },
  { title: "Windjammers", ds: true },
  { title: "Word Search by POWGI", ds: true },
  { title: "Worms W.M.D.", ds: true },
  { title: "Xenon Racer" },
  { title: "Yu-Gi-Oh! Legacy of the Duelist: Link Evolution" }
];
cfw.sort(sortByTitle);
cfw.push({ title: "And so on...", asset: "etc.jpg" });

export default {
  components: {
    Card
  },
  data: function() {
    return {
      ofw,
      cfw
    };
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
