require ('dotenv').config();
const {Router} = require("express");
const GetAllGames = require("../routes/videogames.con");
const { API_KEY } = process.env;
const axios = require("axios");
const {Videogame , Genres} = require ('../db.js');
const router = Router(); 

//router.get('/videogames',async(req,res)=>{
//    const allG = await GetAllGames()
//    res.json(allG);
//})

router.get('/videogames' ,async (req, res) => {
    try {
      const name = req.query.name;
      const videogamesTotal = await GetAllGames();
      if (name) {
        const videogameName = videogamesTotal.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        videogameName.length
          ? res.status(200).send(videogameName)
          : res.status(404).send("No videogame with that name was found!!'");
      } else {
        res.status(200).send(videogamesTotal);
      }
    } catch (error) {
      console.log(error);
    }
  });


//  router.get("/videogames/:id", async (req, res) => {
//      const id = req.params.id;
//      const totalGames = await GetAllGames()
//      if (id){
//          const GamesId = await totalGames.filter(e => e.id == id)
//          GamesId.length?
//          res.json(GamesId) :
//          res.status(404).send('There is no game with the entered ID!!')
//      }
//  })

router.get("/videogames/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (id.length<10) {
      const ID = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=a00293488b2c45e682939739dd2ff8ca`
      );
      const videogameInfo = {
        id: ID.data.id,
        name: ID.data.name,
        background_image: ID.data.background_image,
        description: ID.data.description,
        genres: ID.data.genres?.map((e) => e.name).join(", "),
        released: ID.data.released,
        rating: ID.data.rating,
        platforms: ID.data.parent_platforms?.map(
          (e) => e.platform.name
        ).join(", "),
      };
      videogameInfo
        ? res.status(200).send(videogameInfo)
        : res.status(404).send("There is no game with the entered ID!!");
    } else {
      const IDDB = await Videogame.findByPk(id, {
        include: Genres,
      });
      const videogameIdDb = {
        id: IDDB.id,
        name: IDDB.name,
        background_image: IDDB.background_image,
        genres: IDDB.genres?.map((e) => e.name).join(", "),
        description: IDDB.description,
        released: IDDB.released,
        rating: IDDB.rating,
        platforms: IDDB.platforms.join(", "),
      };
      console.log(IDDB.name)
      videogameIdDb
        ? res.status(200).send(videogameIdDb)
        : res.status(404).send("There is no game with the entered ID!!");
    }
  } catch (error) {
    console.log(error);
  }
});


  router.get('/genres', async (req, res) => {
    try{
        const genresAPI = (await axios.get('https://api.rawg.io/api/genres?key=a00293488b2c45e682939739dd2ff8ca')).data.results
       // console.log(genresAPI)
       const AGenres = genresAPI.map(e => e.name) 
       console.log(AGenres)
       AGenres.forEach(e => {
            Genres.findOrCreate({
              where: { name: e }
            })
        })
        const genresDB = await Genres.findAll()
        res.send(genresDB)
    } catch (error) {
        res.status(404).json({ error })
    }
})


router.post('/videogame', async (req,res) =>{
    let {name, description, background_image, released, rating, platforms, genres} = req.body;
    let videogameCreated = await Videogame.create({name, description, background_image, released, rating, platforms})
    //console.log(videogameCreated)
    let BdVideogame = await Genres.findAll({ where: {name : genres}})
    console.log(BdVideogame)
    videogameCreated.addGenres(BdVideogame)

    res.send('Videogame created succesfully!')
    });


module.exports = router;
