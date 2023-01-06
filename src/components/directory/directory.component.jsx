import CategoryItem from '../catrgory-item/category-item.component.jsx';
import "./directory.styles.scss";
const Directory = ({categories}) => {
    return (
        <div className='directory-container'>
        {
            categories.map((category)=>{
                console.log(categories);
                console.log(category);
                return (
                    <CategoryItem key={category.id} category={category} />
                )
            }
            )
        }
        </div>
    )
}

export default Directory;