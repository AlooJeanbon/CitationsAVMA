# CitationsAVMA
Citations project, Srping Boot/js



Connexion via discord :
  https://medium.com/fourscouts/spring-boot-oauth2-with-discord-as-provider-fbe81ba2a721
  https://github.com/fourscouts/blog/tree/master/oauth2-discord
id discord / id secret :
  https://support.heateor.com/discord-client-id-discord-client-secret/




## Premier Commit. Bases pour se connecter via Discord
(Il n'y a pas les node modules etc car trop lourd. J'ai utilisé npm i express axios)
-Créer un bot Discord.
-Dans OAuth2 donner un lien de redirection (lorsque la personne se connectera, elle sera redirigée vers ce lien.)
	(Typiquement 'lienserveur/accueil')
-Aller dans URL Generator et séléctionner ce que vous voulez utilisez comme informations et sur quel lien de redirection
	-Ca génére une URL, gardez la
-Ensuite, emmené vers ce lien, via un clic ou alors automatiquement dès la rentrée sur la page

Tada ! Tout n'est pas clair dans ce README, lisez juste ça sinon : https://stateful.com/blog/discord-oauth
