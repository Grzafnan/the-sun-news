const loadCategory = async () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
  }
  catch (error) {
    console.log(error);
  }
}

const displayCategory = async (data) => {
  console.log(data);
  data.forEach(category => {
    // console.log(category);
    const { id, category_name } = category;
    // console.log(category_name);

    const categoryContainer = document.getElementById('category-container')
    const li = document.createElement('li');
    li.classList.add("font-semibold", "text-md", "lg:text-xl")
    li.innerHTML = `
    <a>${category_name}</a>
    `
    categoryContainer.appendChild(li);

  });

}



const loadCard = async () => {
  const url = `https://openapi.programming-hero.com/api/news/category/01`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCard(data.data);
  }
  catch (error) {
    console.log(error);
  }
}

const displayCard = async (cards) => {
  // console.log(cards);
  cards.forEach(card => {
    // console.log(card);
    const { title, thumbnail_url, details, author, total_view, rating, category_id } = card;
    // const { image_url, thumbnail_url, title, details, author, total_view, } = card;
    const { name, published_date, img } = author;
    const cardContainer = document.getElementById('card-container');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card", "card-side", "bg-base-100", "shadow-xl", "mb-5");
    cardDiv.innerHTML = `
    <figure class="w-1/4"><img src="${thumbnail_url}" alt="Movie"></figure>
                    <div class="card-body w-3/4">
                      <h2 class="card-title">${title}</h2>
                      <p>${details.length > 400 ? details.slice(0, 400) + " ....." : details}</p>
                      <div class="card-actions justify-between items-center">                   
                        <div class="flex">
                            <div class="mr-3">
                                <img class="w-[40px] rounded-full" src="${img ? img : "img not found"}" alt="">
                            </div>
                            <div >
                                <h4 class="font-bold text-xl">${name ? name : "name not found"}</h4>
                            <h5>${published_date ? published_date : "published date not found"}</h5>
                            </div>
                        </div>
                
                        <div class="flex" >
                           <div>
                            <img src="img/icons8-eye-24.png" alt="">
                           </div>
                                <div class="flex ml-3 items-center">
                                    <h1><span>${total_view ? total_view : "no views"}</span> M</h1> 
                                </div>                                                      
                        </div>

                         <div class="text-yellow-500">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                         </div>


                        <div>
                            <button class="btn bg-blue-600"><i class="fa-solid fa-arrow-right"></i></button>
                        </div>
                        
                      </div>
                    </div>
    
    `
    cardContainer.appendChild(cardDiv);


  });

}

loadCard();
// loadCategory();

