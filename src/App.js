import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu'
import Recipe from './components/Recipe'
import RecipeList from './components/RecipeList'
import Modal from 'react-modal';
import AddRecipeImage from './components/AddRecipeImage'
import NewRecipe from './components/NewRecipe'
import AddRecipeIngred from './components/AddRecipeIngred'
import { FirebaseContext, database } from './components/Firebase'

// import small from './images/small.jpg'
// import medium from './images/medium.jpg'
// import large from './images/large.jpg'

Modal.setAppElement('#root')\

// {
//   name: "pudding", 
//   viewRef: "#", 
//   viewTarget: "_blank",
//   addRef: "/",
//   addTarget: "_self",
//   image: small,
//   ingredients: [],
//   instructions: []
// },

function App() {
  const testRecipes = 
    [
      {
        name: "pudding", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: [],
        instructions: []
      }, 
      {
        name: "pudding2", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding3", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: [],
        instructions: []
      }, 
      {
        name: "pudding4", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding5", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding6", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding7", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding8", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      }, 
      {
        name: "pudding9", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      },
      {
        name: "pudding10", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      },
      {
        name: "pudding11", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      },
      {
        name: "pudding12", 
        viewRef: "#", 
        viewTarget: "_blank",
        addRef: "/",
        addTarget: "_self",
        ingredients: ["milk", "2 eggs", "sugar"],
        instructions: ["Add milk and eggs to a pot.", "Boil, stirring constantly", "Add flavoring"]
      },
    ]
  
    const testMenu = 
    [
      {
        day: "Sunday"
      }, 
      {
        day: "Monday"
      },
      {
        day: "Tuesday"
      },
      {
        day: "Wednesday",
        recipe: 
          {
            name: "pudding7", 
            viewRef: "#", 
            viewTarget: "_blank",
            addRef: "/",
            addTarget: "_self",
          }, 
      },
      {
        day: "Thursday"
      },
      {
        day: "Friday"
      },
      {
        day: "Saturday"
      },
    ]
  
  let customStyles = {
    content: {
      boxSizing: "border-box",
      width: "100%",
      maxWidth: "768px",
      right: "50%",
      left: "unset",
      transform: "translateX(50%)",
      overflow: "hidden",
      paddingTop: "52px"
    }
  }
  
    const [menu, setMenu] = React.useState(testMenu)
  
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [modalType, setModalType] = React.useState("recipe")
  const [modalRecipe, setModalRecipe] = React.useState(null)
  const [modalStyles, setModalStyles] = React.useState(customStyles)

  const addToMenu = (recipe, day) => {
    let newMenu = menu.map(item => {
      if(item.day !== day) return item 
      return {...item, recipe: recipe}
    })
    setMenu(newMenu)
  }

  const removeFromMenu = (e, id) => {
    let newMenu = menu.map((item, key) => {
      if(key !== id) return item
      delete item.recipe
      return {...item}
    })
    setMenu(newMenu)
  }

  const openRecipeModal = (title) => {
    let modalIndex = testRecipes.map(el => {
      return el.name
    }).indexOf(title)
    // console.log(modalRecipe)
    setModalRecipe(testRecipes[modalIndex])
  }

  const openMenuModal = (title) => {
    let modalIndex = testRecipes.map(el => {
      return el.name
    }).indexOf(title)
    // console.log(modalRecipe)
    setModalRecipe(testRecipes[modalIndex])
  }

  const openNewRecipeModal = (title) => {

  }

  const openModal = (title, id) => {
    switch (id) {
      case 0:
        setModalType("recipe")
        customStyles.content.maxWidth = "768px"
        setModalStyles(customStyles)
        openRecipeModal(title)
        break
      case 1:
        setModalType("menu")
        console.log(customStyles.content.maxWidth)
        customStyles.content.maxWidth = "1024px"
        setModalStyles(customStyles)
        console.log(customStyles.content.maxWidth)
        openMenuModal(title)
        break
      case 3: 
        setModalType("new")
        customStyles.content.maxWidth = "768px"
        setModalStyles(customStyles)
        openNewRecipeModal(title)
        break
      case 4: 
        setModalType("manual")
        customStyles.content.maxWidth = "768px"
        setModalStyles(customStyles)
        openNewRecipeModal(title)
        break
      case 5: 
        setModalType("newIngred")
        customStyles.content.maxWidth = "768px"
        setModalStyles(customStyles)
        break
    }
    // console.log(title, id)
    // let modalIndex = testRecipes.map(el => {
    //   return el.name
    // }).indexOf(title)
    // console.log(modalRecipe)
    // setModalRecipe(testRecipes[modalIndex])
    setIsOpen(true)
  }
  const closeModal = () => {
    setIsOpen(false)
  }
  const generateModalContent = () => {
    let recipe = modalRecipe
    console.log(modalIsOpen, modalType, recipe)
    if(modalIsOpen) {
      if(modalType === "recipe"){
        return(
          <div className="modalContent">
            <div className="modalHeader">
              <h2>{recipe.name}</h2>
                <button
                  className="modalClose"
                  onClick={closeModal}
                >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <Recipe recipe={recipe} />
          </div>
        )
      }
      else if(modalType === "menu") {
        return (
          <div className="modalContent">
            <div className="modalHeader">
              <h2>Menu</h2>
                <button
                  className="modalClose"
                  onClick={closeModal}
                >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <Menu 
              recipe={modalRecipe} 
              addToMenu={addToMenu} 
              removeFromMenu={removeFromMenu}
              menu={menu} />
          </div>
        )
      } else if (modalType === "new") {
          return (
            <div className="modalContent new">
              <div className="modalHeader">
                <h2>Step 1: Add an Image</h2>
                  <button
                    className="modalClose"
                    onClick={closeModal}
                  >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <AddRecipeImage 
                nextStep={openModal}/>
            </div>
          )
      } else if (modalType === "newIngred") {
        return (
          <div className="modalContent new">
            <div className="modalHeader">
              <h2>Step 2: Add Ingredients</h2>
                <button
                  className="modalClose"
                  onClick={closeModal}
                >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <AddRecipeIngred />
          </div>
        )
      } else if (modalType === "manual") {
          return (
            <div className="modalContent">
              <div className="modalHeader">
                <h2>Create a New Recipe</h2>
                  <button
                    className="modalClose"
                    onClick={closeModal}
                  >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <NewRecipe />
            </div>
          )
      }
    }
  }
  
    return (
    <FirebaseContext.Provider value={database}>
        <div className="App">
          {/* <Header>
            <Nav></Nav>
          </Header> */}
          {/* <Menu /> */}
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={modalStyles}
            contentLabel="Example Modal"
          >
            {generateModalContent()}
          </Modal>
          <RecipeList 
            recipes={testRecipes} 
            openModal={openModal}
            newRecipe={openModal} />
        </div>
    </FirebaseContext.Provider>
  );
}

export default App;
