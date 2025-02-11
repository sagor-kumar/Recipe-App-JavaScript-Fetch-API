const searchMeal = document.getElementById("input");
const search = document.getElementById("search");

search.addEventListener("click", fetchMeal);

function fetchMeal() {
    if (searchMeal.value) {
        console.log(searchMeal.value);
        let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMeal.value}`;
        fetch(URL)
            .then((res) => res.json())
            .then((meal) => showMeal(meal.meals));
        document.getElementById("noMeal").style.display = "none";
        document.querySelector(".meal-wrapper").innerHTML = "";
    } else {
        alert("Please Search for a Food!");
        document.getElementById("noMeal").style.display = "block";
    }
}

function showMeal(meals) {
    // console.log("showMeal:", meals)

    // meals.forEach(meal => {
    //     console.log(meal);
    // })

    for (let meal of meals) {
        console.log(meal);
        document.querySelector(".meal-wrapper").innerHTML += `
         <div class="meal-box border border-gray-500 rounded-xl">
                <img class="rounded-xl h-[250px] w-full object-cover p-2"
                    src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="p-3">
                    <h3 class="heading">${meal.strMeal}</h3>
                    <p class="text-gray-400 py-2 pr-2">${meal.strInstructions.slice(0, 100)}....
                    </p>
                    <p class="italic text-gray-500" <span class="pr-4">${meal.strArea}</span> <span>${meal.strCategory}</span></p>
                    <div class="my-4">
                        <a class="btn inline-block" target="_blank" href="${meal.strYoutube}">Watch</a>
                        <button onclick="fetchMealDetails(${meal.idMeal})" class="cursor-pointer px-3 hover:text-[#c5c3c3] text-white">View Recipe</button>
                    </div>
                </div>
            </div>`;
    }
}

function fetchMealDetails(idMeal) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then((response) => response.json())
        .then((mealDetails) => showMealDetails(mealDetails.meals[0]));
}

function showMealDetails(meal) {
    console.log(meal);
    let overlay = document.querySelector(".overlay");
    overlay.classList.remove("hidden");
    overlay.classList.add("flex");
    overlay.innerHTML = `<div class="w-1/2 min-h-[500px] p-5 bg-white z-50 flex flex-col gap-5">
                                    <img class="w-[300px] h-[300px] object-cover" src="${meal.strMealThumb}" alt="${meal.strMeal}">
                                     <h3 class="text-3xl text-black">${meal.strMeal}</h3>
                                    <p>${meal.strInstructions}</p>
                               <div class="flex gap-2">
                                    <a class="btn inline-block" target="_blank" href="${meal.strYoutube}">Watch Video</a>
                                    <button onclick="closeMealDetails()" class="inline-block cursor-pointer bg-red-800 hover:bg-red-950 text-white px-4 py-2 rounded">Close</button>
                               </div>
                            </div>`
}

function closeMealDetails() {
    let overlay = document.querySelector(".overlay");
    overlay.classList.remove("flex");
    overlay.classList.add("hidden");
}



