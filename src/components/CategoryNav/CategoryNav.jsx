import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { graphqlFetch } from "../../utils/graphql";
import './CategoryNav.css';

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const query = `
                query {
                    categories {
                        name
                    }
                }
            `;
            const res = await graphqlFetch(query);
            setCategories(res.data.categories);
        };

        fetchCategories();
    }, []);

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <nav className="links-nav">
            <NavLink
                to="/all"
                className={({ isActive }) => (isActive ? "active-link" : "link")}
            >
                {({ isActive }) => (
                    <span data-testid={isActive ? "active-category-link" : "category-link"}>
                        All
                    </span>
                )}
            </NavLink>

            {categories.map((category) => (
                <NavLink
                    key={category.name}
                    to={`/${category.name.toLowerCase()}`}
                    className={({ isActive }) => (isActive ? "active-link" : "link")}
                >
                    {({ isActive }) => (
                        <span data-testid={isActive ? "active-category-link" : "category-link"}>
                            {capitalize(category.name)}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};

export default CategoryNav;