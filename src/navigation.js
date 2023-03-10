let page = 1;
let infinityScroll;
let maxPage;

searchFormBtn.addEventListener("click", () => {
  
  location.hash = "#search=" + searchFormInput.value
})

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends"
})

arrowBtn.addEventListener("click", () => {
  history.back();
})

window.addEventListener("DOMContentLoaded", navigatorHash, false)
window.addEventListener("hashchange", navigatorHash, false);
window.addEventListener("scroll", infinityScroll, false);


function navigatorHash() {

  if(infinityScroll) {
    window.removeEventListener("scroll", infinityScroll, { passive: false});
    infinityScroll = undefined;
  }
  if (location.hash.startsWith("#trends")) {
    trendsPage()
  } else if (location.hash.startsWith("#search=")) {
    searchPage()
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage()
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage()
  } else {
    homePage()
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if(infinityScroll) {
    window.addEventListener("scroll", infinityScroll);
  }
}

function homePage() {
  console.log("Home!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  likedMoviesSection.classList.remove("inactive")
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add ("inactive");
  movieDetailSection.classList.add("inactive");
  

  getTrendingMoviesPreview()
  getCategoriesPreview()
  getLikedMovies();

  
}
function categoriesPage() {
  console.log("Categories!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  const [categoryID, categoryName] = categoryData.split("-");

  headerCategoryTitle.innerHTML = categoryName;
  getMoviesByCategory(categoryID);
  infinityScroll = getPaginatedMoviesByCategory(categoryID)
  window.scrollTo( 0, 0);
}
function movieDetailsPage() {
  console.log("Movie!!");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId)
}
function searchPage() {
  console.log("Search!!");

  
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");
  getMoviesBySearch(query);

  infinityScroll = getPaginatedMoviesBySearch(query);

}
function trendsPage() {
  console.log("TRENDS!!");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  likedMoviesSection.classList.add("inactive")
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  headerCategoryTitle.innerHTML = "Tendencias"

  getTrendingMovies();

  infinityScroll = loadNextPage;
}