import { filterByRange, filterByCategory } from "./filter.js";
import { products, categories } from "./productsData.js";
import { renderDarkMode, createCategoryButtons, renderFilterByCategory } from "./render.js";

createCategoryButtons(categories);
renderDarkMode();
renderFilterByCategory(products, categories);
filterByRange(products);