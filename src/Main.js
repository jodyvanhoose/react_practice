import axios from 'axios'

function Main(){
  // animiate input and show cancel btn
  const showCancelBtn = () =>{
    document.getElementById('clear-btn').style.display = 'block'
  }

  

  // cancels and clears input
  const cancelBtn = () =>{
    document.querySelector('input').value = ''
    document.getElementById('clear-btn').style.display = 'none'
  }

  

  
  // get long and lat
  const getLongLat = async (e) => {
    e.preventDefault()

    // get location api
    const endpoint = 'mapbox.places'
    const search_text = document.querySelector('input').value
    const ACCESS_TOKEN = ''


    let response = await fetch(`https://api.mapbox.com/geocoding/v5/${endpoint}/${search_text}.json?access_token=${ACCESS_TOKEN}`)
    let place = await response.json()
    console.log(place.features[0].place_name)
    // console.log(place.features[0].center[0])
    // console.log(place.features[0].center[1])
    let locationText = document.querySelector('.location-text')
    let something = place.features[0].place_name
    locationText.textContent = place.features[0].place_name.split(' ').slice(0, -2).join(' ').replace(',','').replace(',','')
    console.log(place.features[0].place_name.split(' ').slice(0, -2).join(' ').replace(',','').replace(',','')
    )
    
    // longitude and latitude variables for pollen api lookup
    let long = place.features[0].center[0]
    let lat = place.features[0].center[1]


    //  get pollen api 
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
      }
    };

  const res = await fetch(`https://air-quality.p.rapidapi.com/current/airquality?lon=${long}&lat=${lat}`, options)
  let pollen = await res.json()
  console.log(pollen.data[0])
  let pollenLevelGrass = pollen.data[0].pollen_level_grass
  let pollenLevelWeed = pollen.data[0].pollen_level_weed
  let pollenLevelTree = pollen.data[0].pollen_level_tree
  let predominantPollenType = pollen.data[0].predominant_pollen_type
  let moldLevel = pollen.data[0].mold_level

  let treePollenText = document.getElementById('tree-box')
  let weedPollenText = document.getElementById('weed-box')
  let grassPollenText = document.getElementById('grass-box')

  // set pollen count to text description low, mod, high, v high
  const pollenMap = new Map()
  pollenMap.set(0, 'None')
  pollenMap.set(1, 'Low')
  pollenMap.set(2, 'Moderate')
  pollenMap.set(3, 'High')
  pollenMap.set(4, 'Very High')

  treePollenText.textContent = pollenMap.get(pollenLevelTree)
  // treePollenText.textContent = pollenLevelTree
  weedPollenText.textContent = pollenMap.get(pollenLevelWeed)
  grassPollenText.textContent = pollenMap.get(pollenLevelGrass)

  

  
   
}
  

  


  return(
    <main>
      <div className="row">
        
        <form onSubmit={getLongLat} className="search-bar column" action="">
          <input onMouseDown={showCancelBtn} name="city" placeholder="City" type="text" autoComplete="true address-level2 address-level1"/>

          <a onClick={cancelBtn} id="clear-btn" className="cancel-btn" href="#">Cancel</a>
        

          
        </form>
        
        <p className="location-text">Check your location's pollen count</p>
      </div>
      

      
      

      <div className="display-wrap">
        <div className="pollen-display tree">
          <h1>Tree</h1>
          <div className="pollen-count">
            <p></p>
            <p className="num"></p>
          </div>
          
          <div>
            <h1 id='tree-box' className="box">Low</h1>
            <div className="color-box">
              <div className="color"></div>
              <div className="indicator tree-indicator"></div>
            </div>
          </div>
        </div>

        <div className="pollen-display weed">
          <h1>Weeds</h1>
          <div className="pollen-count">
            <p>Pollen Count</p>
            <p className="num">120</p>
          </div>
          
          <div>
            <h1 id='weed-box' className="box">Mild</h1>
            <div className="color-box">
              <div className="color"></div>
              <div className="indicator weed-indicator"></div>
            </div>

          </div>
        </div>

        <div className="pollen-display grass">
          <h1>Grass</h1>
          <div className="pollen-count">
            <p>Pollen Count</p>
            <p className="num">185</p>
          </div>
          
          <div>
            <h1 id='grass-box' className="box">High</h1>
            <div className="color-box">
              <div className="color"></div>
              <div className="indicator grass-indicator"></div>
            </div>
          </div>
        </div>

      </div>
    </main>
    )
}

export default Main;