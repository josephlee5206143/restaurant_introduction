
const express = require('express') 
const app = express()
const port = 3000
const exphbs = require('express-handlebars') 
const restaurantList = require('./restaurant.json') 

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

app.get('/',(req,res)=>{
  res.render(`index`,{restaurants:restaurantList.results})
}) //引入api

app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(
    restaurant => restaurant.id.toString() === req.params.restaurant_id//items => items代指向資料庫的id並轉成string === req的變數的id
  )
  res.render('show', { restaurant: restaurant })//指定一個變數接住，{movie陣列（內部const）}
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword //req.query= {keyword:'string'}
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants,keyword:keyword })//後面導入keyword純粹是因為為了value
})


// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})