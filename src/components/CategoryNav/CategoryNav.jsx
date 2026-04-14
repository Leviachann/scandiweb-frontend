import { NavLink,useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { graphqlFetch } from "../../utils/graphql";
import './CategoryNav.css';

const CategoryNav = () => {
    const [categories, setCategories] = useState([]);
    const location = useLocation();

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
                data-testid={location.pathname === "/all" ? "active-category-link" : "category-link"}
            >
                All
            </NavLink>

            {/* The Dynamic links */}
            {categories.map((category) => {
                const path = `/${category.name.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                    <NavLink
                        key={category.name}
                        to={path}
                        className={isActive ? "active-link" : "link"}
                        data-testid={isActive ? "active-category-link" : "category-link"}
                    >
                        {capitalize(category.name)}
                    </NavLink>
                );
            })}
        </nav>
    );
};

export default CategoryNav;