import React from "react";
import styles from './Profile.module.css'
import PostListContainer from "./PostList/PostListContainer";
import ProfileItemContainer from "./ProfileItem/ProfileItemContainer";

const Profile = () => {

    return (
            <div className={styles.main}>
                <ProfileItemContainer/>
                <PostListContainer/>
            </div>
        )

}
export default Profile;

/*const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching
    }
}

export default connect(mapStateToProps, null)(Profile)*/

/*export default function StoryTray({stories}) {


    return (
        <ul>
            {
                stories.map(story => (
                        <li key={story.id}>
                            {story.label}
                        </li>
                    )
                )
            }
            <li>Create Story</li>
        </ul>
    );
}*/


/*
const recipes = [{
    id: 'greek-salad',
    name: 'Greek Salad',
    ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta']
}, {
    id: 'hawaiian-pizza',
    name: 'Hawaiian Pizza',
    ingredients: ['pizza crust', 'pizza sauce', 'mozzarella', 'ham', 'pineapple']
}, {
    id: 'hummus',
    name: 'Hummus',
    ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini']
}];

const poem = {
    lines: [
        'I write, erase, rewrite',
        'Erase again, and then',
        'A poppy blooms.'
    ]
};


export default function Poem() {
    return (
        <article>
            {poem.lines.map((line, index) =>
                <Fragment key={index}>
                    <p >
                        {line}
                    </p>
                    {(index > 0 || index !== poem.lines.length-1) && <hr/>}
                </Fragment>
            )}
        </article>
    );
}*/
/*
const RecipeListItem = ({recipe}) => {

    return (
        recipe.ingredients.map(ingredient => {

            return <li key={ingredient}>
                {ingredient}
            </li>
        })
    )
}

export default function Settings() {
    return (
        <div>
            <h1>Recipes</h1>
            { recipes.map(recipe => {
                    return <div key={recipe.id}>
                        <h2>{recipe.name}</h2>
                        <ul>
                            <RecipeListItem recipe={recipe}/>
                        </ul>
                    </div>
                })
            }
        </div>
    );
}*/


/*
function Item({name, isPacked}) {

//1) drawback: duplication of code (Conditionally returning JSX )
/!*if (isPacked) {
return <li className="item">{name + ' ✔'}</li>;
}
return <li className="item">{name}</li>;*!/

// 2)drawback: Good for simple conditions (Conditionally including JSX: (ternary) operator (? :))
/!* return <li className="item">{
isPacked ?
(<del>{name + ' ✔'}</del>)
: name
}</li>*!/

//3)drawback: cannot be used with numbers, since they are always true (Conditionally including JSX: Logical AND operator (&&)  )
/!*return <li className="item">
{name} {isPacked && ' ✔'}
</li>;*!/

//4)drawback:This style is the most verbose, but it’s also the most flexible (Conditionally assigning JSX to a variable)
let itemContent = name;

if (isPacked) {
itemContent += ' ✔'
}
return <li className="item">{itemContent}</li>;

}

export default function PackingList() {
return (
<section>
<h1>Sally Ride's Packing List</h1>
<ul>
<Item
isPacked={true}
name="Space suit"
/>
<Item
isPacked={true}
name="Helmet with a golden leaf"
/>
<Item
isPacked={false}
name="Photo of Tam"
/>
</ul>
</section>
);
}*/



