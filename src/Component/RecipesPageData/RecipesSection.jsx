import { useState } from "react";
import { ArrowDown, ArrowUp, Clock3, Sparkles } from "lucide-react";
import { Recipes02, Recipes03, Recipes04, Recipes010 } from "../images";

const recipes = [
  {
    title: "Jaggery Breakfast Pancakes",
    category: "A SLOW MORNING",
    time: "20 min",
    image: Recipes02,
    description: "Fluffy, golden pancakes with the mellow sweetness of jaggery.",
    ingredients: "Flour, milk, one egg, baking powder, and 2 tbsp jaggery powder.",
    method: "Whisk the ingredients into a smooth batter. Cook small rounds on a warm, lightly greased pan until golden on both sides.",
  },
  {
    title: "Everyday Gur Chai",
    category: "A CUP OF COMFORT",
    time: "10 min",
    image: Recipes03,
    description: "A warming cup of spiced tea, finished with a little natural sweetness.",
    ingredients: "2 cups water, 1 cup milk, tea leaves, crushed ginger, cardamom, and jaggery to taste.",
    method: "Simmer water with ginger, cardamom, and tea. Add milk and bring to a gentle boil. Strain, then stir in jaggery to taste.",
  },
  {
    title: "Coconut Gur Laddoos",
    category: "A LITTLE TREAT",
    time: "25 min",
    image: Recipes04,
    description: "Soft coconut bites made for sharing after a meal.",
    ingredients: "2 cups desiccated coconut, ½ cup jaggery, ¼ cup warm milk, and a pinch of cardamom.",
    method: "Warm jaggery and milk until dissolved. Stir in coconut and cardamom, cool until easy to handle, then roll into small laddoos.",
  },
  {
    title: "Golden Jaggery Smoothie",
    category: "A BRIGHT START",
    time: "5 min",
    image: Recipes010,
    description: "A quick banana and date smoothie with a hint of jaggery.",
    ingredients: "1 banana, 2 dates, 1 cup chilled milk, 1 tsp jaggery powder, and a pinch of cinnamon.",
    method: "Blend all ingredients until smooth. Taste, add a little more jaggery if you like, and serve chilled.",
  },
];

function RecipesSection() {
  const [openRecipe, setOpenRecipe] = useState(null);

  return (
    <>
      <section className="recipes-hero">
        <div className="container">
          <p className="recipes-eyebrow">GOOD FOOD, MADE WITH GUR</p>
          <h1>A little sweetness.<br />A lot of inspiration.</h1>
          <p className="recipes-hero-copy">
            Bring the warmth of jaggery to your everyday kitchen with simple,
            feel-good recipes made to be shared.
          </p>
          <a className="recipes-hero-link" href="#recipe-collection">
            Find your next favourite <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <section className="recipes-collection" id="recipe-collection">
        <div className="container">
          <header className="recipes-section-heading">
            <div>
              <p className="recipes-eyebrow">FROM OUR KITCHEN TO YOURS</p>
              <h2>Crack. Cook. Create.</h2>
            </div>
            <p>
              Simple ideas, familiar ingredients, and the deep, honest sweetness
              of gur. Pick a recipe and make it your own.
            </p>
          </header>

          <div className="recipes-grid">
            {recipes.map((recipe, index) => {
              const isOpen = openRecipe === index;

              return (
                <article className="recipe-card" key={recipe.title}>
                  <div className="recipe-card-image">
                    <img src={recipe.image} alt={recipe.title} />
                    <span><Sparkles size={14} /> {recipe.category}</span>
                  </div>
                  <div className="recipe-card-content">
                    <p className="recipe-time"><Clock3 size={15} /> {recipe.time}</p>
                    <h3>{recipe.title}</h3>
                    <p>{recipe.description}</p>
                    <button
                      type="button"
                      className="recipe-toggle"
                      aria-expanded={isOpen}
                      onClick={() => setOpenRecipe(isOpen ? null : index)}
                    >
                      {isOpen ? "Close recipe" : "See the recipe"}
                      {isOpen ? <ArrowUp size={17} /> : <ArrowDown size={17} />}
                    </button>
                    {isOpen && (
                      <div className="recipe-details">
                        <h4>What you’ll need</h4>
                        <p>{recipe.ingredients}</p>
                        <h4>Let’s make it</h4>
                        <p>{recipe.method}</p>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default RecipesSection;
