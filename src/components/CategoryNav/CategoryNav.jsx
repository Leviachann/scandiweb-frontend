import { NavLink } from "react-router-dom";
import './CategoryNav.css'

const CategoryNav = () => {
    const navLinks = [
        { path: "/category/all", name: "All" },
        { path: "/category/clothes", name: "Clothes" },
        { path: "/category/tech", name: "Tech" },
    ];

    return (
        <nav className="links-nav">
            {navLinks.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => (isActive ? "active-link" : "link")}
                >
                    {({ isActive }) => (
                        <span data-testid={isActive ? "active-category-link" : "category-link"}>
                            {link.name}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};

export default CategoryNav;