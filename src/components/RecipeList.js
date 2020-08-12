import React, {useContext} from 'react';
import Card from './Card'
import './RecipeList.css'
import { FirebaseContext } from './Firebase'
import { CloudinaryContext } from './Cloudinary'
import axios from 'axios'


const RecipeList = props => {
  const database = useContext(FirebaseContext)
  const CloudinaryCore = useContext(CloudinaryContext)
  console.log(database, CloudinaryCore)

  const addToMenu = (userId, name, email) => {
    console.log('pressed')
    database.ref('users/' + userId).set({
      username: name,
      email: email
    });
  }

  const cloudinaryUpload = () => {

    console.log(CloudinaryCore)
  
    const file = 'https://img.pngio.com/ocean-io-ecosia-oceans-png-1920_1200.png'
    // CloudinaryCore.v2.uploader.upload(file,  function(error, result) {console.log(result, error); });
    var url = `https://api.cloudinary.com/v1_1/da8ekwkyg/upload`;
    var fd = new FormData();
    fd.append("upload_preset", 'ehwjpqxl');
    fd.append("tags", "browser_upload"); // Optional - add tag for image admin in Cloudinary
    fd.append("file", file);
    const config = {
       headers: { "X-Requested-With": "XMLHttpRequest" },
    };
    axios.post(url, fd, config)
     .then(function (res) {console.log(res)})
     .catch(function (err) {console.log(err)});
  
  // axios.post('https://api.cloudinary.com/v1_1/da8ekwkyg/upload', {
  //     file: file,
  //     upload_preset: 'ehwjpqxl'
  //   }).then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

    // axios.get('/uploadConfig')
    //   .then((response) => {
    //     console.log(response)
    //     axios.post(response.uploadURL, {
    //         file: file,
    //         public_id: "test",
    //         timestamp: response.timestamp,
    //         signature: response.signature
    //       })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   }).catch((error) => {
    //     console.log(error)
    //   })
  
  }

  const recipes = props.recipes
  // const {viewRef, viewTarget, addRef, addTarget, name, image} = props
  const recipeActions = {
    number: 2,
    actions: [
      {
        name: "view",
        label: "View Recipe",
        onClick: props.openModal
      },
      {
        name: "add",
        label: "Add to Menu",
        onClick: props.openModal
      }
    ]
  }

  const recipeList = recipes.map((recipe, id) => 
    <Card 
      title={recipe.name} 
      type={"recipe"} 
      actions={recipeActions} 
      key={id}
      openModal={props.openModal}
      image={recipe.image}>
    </Card>
  )

  return(
    <div>
      <div className="recipe-list">
        {recipeList}
        <Card
          title={"Add"}
          type={"add"}>
            <button 
              className="addButton"
              onClick={() => props.newRecipe("New Recipe", 3)}>
                <i className="fas fa-plus" />
            </button>
        </Card>
        <button
          className="firebaseTest"
          onClick={() => addToMenu(1, "matt", "test@test.com")}>

        </button>
        <button
          className="cloudinaryTest"
          onClick={() => cloudinaryUpload()}>

        </button>
      </div>
    </div>
  )
}

export default RecipeList