# CitationsAVMA
-, Valentin DEBONNEFOY, Andrey DEMIDOV, Mélissa MARCO 

Citations project, React/Express

 ==================================== COMMANDS ====================================

All commands are prefixed by "²" (they're note case sensitive).

  - [   addQuote  ]   =>    add a quote (write your code after the command)
ex : ²addQuote there is more water in a watermelon than in a human.
  - [  seeQuotes  ]   =>    see all quotes.
ex : ²seeQuotes
  - [ seeQuotes @ ]   =>    see an user quote.
ex : ²seeQuotes @Aloo_
  - [  favorites  ]   =>    see your favorites.
ex : ²favorites

  ==================================== LAUNCH ====================================

Pour lancer le projet (à faire dans deux console différentes):
  -à la racine : npm start
  -depuis le dossier Client : npm run dev

 ==================================== INSTALLS ====================================

commandes d'installation :
  - npm install
  - npm install discord.js
  - npm install vite          (dans Client)
  - npm install nodemon
  - npm install axios

 ====================================    NOTES   ====================================
 
 quasiment tous les paramètres de connexion à discord sont en durs et complexes à
 modifier, dans l'idéal il faudrait en faire des constantes.
 l'url localhost apprait en dur dans
  - utilisateur_controlleur.js => userController.loginRedirect        (1 fois)
  - TopPage.jsx                                                       (1 fois)


 ==================================== RESSOURCES ====================================

Connexion via discord :
  https://medium.com/fourscouts/spring-boot-oauth2-with-discord-as-provider-fbe81ba2a721
  https://github.com/fourscouts/blog/tree/master/oauth2-discord
id discord / id secret :
  https://support.heateor.com/discord-client-id-discord-client-secret/

Vidéo d'explication sur la mise en place de la connexion via discord :
  https://www.youtube.com/watch?v=WgyCcXotReU

  Résumé : on configure le bot pour qu'en appelant une url donnée on obtienne un code, après
  être passés par l'url nous sommes renvoyés sur note site avec un passe droit (le code).

  Notre site -> appui sur le bouton connexion -> passage par discord (via notre bot)
  -> retour sur notre site avec notre code -> récupération des données de l'utilisateur
  grâce à l'autorisation fournie par le code

