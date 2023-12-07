const express=require('express');
const axios=require('axios');

const PORT=8000;
const app=express();

app.listen(PORT, ()=>{
    console.log(`App started on port ${PORT}`);
})

app.get('/', (req, res) => {
	res.send(`
		<a
			href="https://discord.com/api/oauth2/authorize?client_id=1179461821023912046&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fdiscord&scope=identify+email"
		> 

			Login ! 
		</a>
	`)
})

app.get('/auth/discord', (req, res) => { res.send('Vous etes connecté.e !')})