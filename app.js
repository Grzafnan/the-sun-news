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
  data.forEach(category => {
    const { category_id, category_name } = category;
    const categoryContainer = document.getElementById('category-container')
    const li = document.createElement('li');
    li.classList.add("font-semibold", "text-md", "lg:text-xl", "mx-auto")
    li.innerHTML = `
    <a onclick="loadCard(${category_id})" >${category_name}</a>
    `
    categoryContainer.appendChild(li);

  });

}

const loadCard = async (id) => {
  const spinner = document.getElementById('spinner');
  spinner.classList.remove('hidden');

  const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
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
  const cardContainer = document.getElementById('card-container');
  cardContainer.textContent = '';

  // No Found 
  const noFound = document.getElementById('no-found')
  noFound.classList.remove('hidden')
  // item count 
  const itemCount = document.getElementById('item-found');
  itemCount.innerText = cards.length;
  // spinner 
  const spinner = document.getElementById('spinner');
  if (cards.length === 0) {
    spinner.classList.add('hidden');
  }

  const sortViews = cards.sort((a, b) => {
    if (a.total_view < b.total_view) {
      return 1;
    } else {
      return -1;
    }
  });


  cards.forEach(card => {
    const { _id, title, thumbnail_url, details, author, total_view, rating, category_id } = card;
    const { name, published_date, img } = author;

    // spinner 
    const spinner = document.getElementById('spinner');
    spinner.classList.add('hidden');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add("card", "lg:card-side", "bg-base-100", "shadow-xl", "mb-5", "mx-auto", "w-11/12");
    cardDiv.innerHTML = `
    
    <img src="${thumbnail_url}" alt="Movie">
    <div class="card-body lg:w-3/4">
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
              <label for="my-modal-4" class="btn bg-purple-600 modal-button" onclick="showModal('${_id}')"><i class="fa-solid fa-arrow-right"></i></label>
              </div>
                        
            </div>
        </div>
    `
    cardContainer.appendChild(cardDiv);
  });
}

const showModal = async (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`
  const res = await fetch(url);
  const data = await res.json();
  const { image_url, details, title } = data.data[0];
  console.log(title);
  const modalBody = document.getElementById('modal-body');
  modalBody.textContent = "";
  modalBody.innerHTML = `
  <img src="${image_url ? image_url : 'image not found'}" />
  <h4 class="my-3 text-lg font-semibold"> ${title ? title : "Title not found"}</h4>
  <p class="mb-3 font-xl"> ${details ? details : 'published date not found'}</p>
`;
}

//Card Load By default
loadCard('2');

//load category
loadCategory();