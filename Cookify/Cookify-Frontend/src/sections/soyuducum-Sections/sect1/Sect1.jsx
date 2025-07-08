import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { getReceptThunk } from "../../../redux/reducers/receptsReducer.js";
import { getComponentsThunk } from "../../../redux/reducers/componentsReducer.js";
import Intro from "../../../components/intro/Soyuducu-Intro.jsx";

const Sect1 = () => {
    const [input, setInput] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);

    const dispatch = useDispatch();
    const allIngredients = useSelector((state) => state.components.components);
    const loadingComp = useSelector((state) => state.components.loading);
    const errorComp = useSelector((state) => state.components.error);
    const recipes = useSelector((state) => state.recepts.recepts);
    const loadingRec = useSelector((state) => state.recepts.loading);
    const errorRec = useSelector((state) => state.recepts.error);

    useEffect(() => {
        dispatch(getReceptThunk());
        dispatch(getComponentsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (selectedIngredients.length === 0) {
            setFilteredRecipes([]);
            return;
        }

        const filtered = recipes.filter((recipe) =>
            selectedIngredients.every((ing) => recipe.components.includes(ing))
        );

        setFilteredRecipes(filtered);
    }, [selectedIngredients, recipes]);

    const handleSelectIngredient = (ingredientName) => {
        if (!selectedIngredients.includes(ingredientName)) {
            setSelectedIngredients([...selectedIngredients, ingredientName]);
            setInput("");
        }
    };

    const handleRemoveIngredient = (ingredientName) => {
        const updated = selectedIngredients.filter((ing) => ing !== ingredientName);
        setSelectedIngredients(updated);
    };

    const suggestions =
        allIngredients
            ?.filter(
                (item) =>
                    item?.name &&
                    item.name.toLowerCase().includes(input.toLowerCase()) &&
                    !selectedIngredients.includes(item.name)
            ) || [];

    if (loadingComp || loadingRec) {
        return (
            <div className="text-white text-center mt-5" style={{ minHeight: "100vh" }}>
                Yüklənir...
            </div>
        );
    }

    if (errorComp || errorRec) {
        return (
            <div className="text-danger text-center mt-5" style={{ minHeight: "100vh" }}>
                Xəta baş verdi.
            </div>
        );
    }

    return (
        <div
            className="container py-5 px-3 px-md-5"
            style={{ backgroundColor: "#063B14", minHeight: "100vh" }}
        >
            {/* Axtarış */}
            <div className="mb-4 position-relative">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Ərzaq axtar..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        backgroundColor: "#DFFFF0",
                        border: "none",
                        borderRadius: "1rem",
                        paddingLeft: "1.5rem",
                        fontSize: "1rem",
                        minHeight: "48px",
                    }}
                />
                {input && suggestions.length > 0 && (
                    <ul
                        className="list-group position-absolute w-100 mt-1 shadow"
                        style={{ maxHeight: "220px", overflowY: "auto", zIndex: 1050 }}
                    >
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className="list-group-item list-group-item-action"
                                onClick={() => handleSelectIngredient(item.name)}
                                style={{ cursor: "pointer" }}
                            >
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Seçilmiş ərzaqlar */}
            <div className="mb-4 d-flex flex-wrap gap-2">
                {selectedIngredients.map((item, index) => (
                    <span
                        key={index}
                        className="badge rounded-pill px-3 py-2 text-truncate"
                        style={{
                            backgroundColor: "#90E0B4",
                            color: "#063B14",
                            fontWeight: "bold",
                            cursor: "pointer",
                            maxWidth: "150px",
                            fontSize: "0.9rem",
                        }}
                        onClick={() => handleRemoveIngredient(item)}
                        title={item}
                    >
            {item} ❌
          </span>
                ))}
            </div>

            {/* Reseptlər */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-4">
                {selectedIngredients.length > 0 ? (
                    filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe, index) => (
                            <div className="col" key={index}>
                                <div
                                    className="card h-100 shadow"
                                    style={{
                                        backgroundColor: "#DFFFF0",
                                        color: "#063B14",
                                        borderRadius: "1rem",
                                    }}
                                >
                                    {recipe.image && (
                                        <img
                                            src={recipe.image}
                                            className="card-img-top"
                                            alt={recipe.name}
                                            style={{
                                                borderTopLeftRadius: "1rem",
                                                borderTopRightRadius: "1rem",
                                                maxHeight: "180px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5
                                            className="card-title"
                                            style={{ fontSize: "1.25rem", fontWeight: "700" }}
                                        >
                                            {recipe.name}
                                        </h5>
                                        <p style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>
                                            <strong>Tərkibi:</strong> {recipe.components.join(", ")}
                                        </p>
                                        <p style={{ fontSize: "0.9rem", marginBottom: 0 }}>
                                            <strong>Hazırlanma vaxtı:</strong> {recipe.time}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white text-center w-100 fs-5">Uyğun resept tapılmadı.</p>
                    )
                ) : (
                    <Intro />
                )}
            </div>
        </div>
    );
};

export default Sect1;

