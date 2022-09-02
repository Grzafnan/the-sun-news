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
  console.log(cards);

  cards.forEach(card => {
    console.log(card);
  });

}

loadCard();
// loadCategory();

