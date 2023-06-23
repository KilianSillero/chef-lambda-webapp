import ReactMarkdown from 'react-markdown'


function ShowRecipe({ recipeText }) {


  return (
    <ReactMarkdown children={recipeText}/>
  );
}

export default ShowRecipe;
