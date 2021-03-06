const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetails = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDetails.parentElement.classList.remove('showRecipe');
})

//get meal list that matches the ingredients
function getMealList(){
    let searchInputText = document.getElementById('search-input').value.trim()
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry we didn't find any meals!"
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    })
}

// get recipe for a meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

//create a modal
function mealRecipeModal(meal){
    meal = meal[0]
    console.log(meal)
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">Category: ${meal.strCategory}  <br> Area: ${meal.strArea}</p>
        <div class = "recipe-ingredient">
            <h3>Ingredients:</h3>
            <p>${meal.strIngredient1},
            ${meal.strIngredient2},
            ${meal.strIngredient3},
            ${meal.strIngredient4},
            ${meal.strIngredient5},
            ${meal.strIngredient6},
            ${meal.strIngredient7},
            ${meal.strIngredient8},
            ${meal.strIngredient9},
            ${meal.strIngredient10},
            ${meal.strIngredient11},
            ${meal.strIngredient12},
            ${meal.strIngredient13},
            ${meal.strIngredient14},
            ${meal.strIngredient15},
            ${meal.strIngredient16},
            ${meal.strIngredient17},
            ${meal.strIngredient18},
            ${meal.strIngredient19},
            ${meal.strIngredient20},
            </p>
        </div>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetails.innerHTML = html;
    mealDetails.parentElement.classList.add('showRecipe');
}