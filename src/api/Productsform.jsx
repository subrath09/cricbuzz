import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";

const createDefaultVariant = () => ({
  color: "#000000",
  newSize: "",
  sizes: {
    S: { selected: true, additionalPrice: "", quantity: "" },
    M: { selected: false, additionalPrice: "", quantity: "" },
    L: { selected: false, additionalPrice: "", quantity: "" },
    XL: { selected: false, additionalPrice: "", quantity: "" },
  },
});

function Productsform() {
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [regularPrice, setRegularPrice] = useState("");
  const [variants, setVariants] = useState([createDefaultVariant()]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();
  const navigate = useNavigate();

  /* FETCH PRODUCT */
  useEffect(() => {
    if (!isEdit) return;

    const fetchProduct = async () => {
      const snap = await getDoc(doc(db, "admin", id));
      if (snap.exists()) {
        const data = snap.data();
        setName(data.name);
        setCategory(data.category);
        setPrice(data.price);
        setRegularPrice(data.regularPrice);
        setVariants(data.variants || [createDefaultVariant()]);
      }
    };

    fetchProduct();
  }, [id]);

  /* VARIANT HANDLERS */
  const updateVariant = (index, key, value) => {
    const updated = [...variants];
    updated[index][key] = value;
    setVariants(updated);
  };

  const toggleSize = (vIndex, size) => {
    const updated = [...variants];
    updated[vIndex].sizes[size].selected =
      !updated[vIndex].sizes[size].selected;
    setVariants(updated);
  };

  const updateSizeField = (vIndex, size, key, value) => {
    const updated = [...variants];
    updated[vIndex].sizes[size][key] = value;
    setVariants(updated);
  };

  const addSize = (vIndex) => {
    const updated = [...variants];
    const sizeName = updated[vIndex].newSize;

    if (!sizeName) return;

    updated[vIndex].sizes[sizeName] = {
      selected: true,
      additionalPrice: "",
      quantity: "",
    };

    updated[vIndex].newSize = "";
    setVariants(updated);
  };

  const removeSize = (vIndex, size) => {
    const updated = [...variants];

    if (Object.keys(updated[vIndex].sizes).length === 1) return;

    delete updated[vIndex].sizes[size];
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, createDefaultVariant()]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category || !price || !regularPrice) {
      return setError("All fields are required!");
    }

    if (
      variants.some((v) =>
        Object.values(v.sizes).some(
          (s) => s.selected && (s.additionalPrice === "" || s.quantity === "")
        )
      )
    ) {
      return setError("Fill all selected size fields!");
    }

    setError("");
    setLoading(true);

    const payload = {
      name,
      category,
      price: Number(price),
      regularPrice: Number(regularPrice),
      variants,
    };

    try {
      if (isEdit) {
        await updateDoc(doc(db, "admin", id), payload);
        alert("Product Updated Successfully");
      } else {
        await addDoc(collection(db, "admin"), {
          ...payload,
          createdOn: Timestamp.now(),
        });
        alert("Product Added Successfully");
      }
      navigate("/admin");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-8">
      <div className="bg-white w-full max-w-6xl rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          {isEdit ? "Update Product" : "Add Product"}
        </h2>

        {/* BASIC DETAILS */}
        <label className="text-sm font-medium text-gray-700">
          Product Name
          <input
            className="border p-2 w-full rounded-xl mb-4"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Category
          <select
            className="border p-2 w-full rounded-xl mb-4"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="Men's Wear">Men's Wear</option>
            <option value="Women's Wear">Women's Wear</option>
          </select>
        </label>
        <label className="text-sm font-medium text-gray-700">
          Price
          <input
            className="border p-2 w-full rounded-xl mb-4"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-gray-700">
          Regular Price
          <input
            className="border p-2 w-full rounded-xl mb-4"
            type="number"
            placeholder="Regular Price"
            value={regularPrice}
            onChange={(e) => setRegularPrice(e.target.value)}
          />
        </label>

        {/* VARIANTS */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">Variants</h3>

          {variants.map((variant, index) => (
            <div key={index} className="flex gap-16 mb-6">
              {/* COLOR */}
              <div className="flex flex-col items-center gap-4">
                <input
                  type="color"
                  value={variant.color}
                  onChange={(e) =>
                    updateVariant(index, "color", e.target.value)
                  }
                />
                <button
                  onClick={() => removeVariant(index)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>

              <div className="border-l-4 border-red-500"></div>

              {/* SIZES */}
              <div className="flex-1">
                {Object.keys(variant.sizes).map((size) => (
                  <div key={size} className="mb-4 ">
                    <div className="flex justify-between">
                      <label className="flex gap-2 items-center  mb-2">
                        <input
                          type="checkbox"
                          checked={variant.sizes[size].selected}
                          onChange={() => toggleSize(index, size)}
                        />
                        Size ({size})
                      </label>
                      <button
                        type="button"
                        onClick={() => removeSize(index, size)}
                        className=" bg-red-500 text-white rounded-full px-2 text-xs font-medium"
                      >
                        Delete Size
                      </button>
                    </div>

                    {variant.sizes[size].selected && (
                      <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-700">
                        <label>
                          Additional price
                          <input
                            className="border-2  p-2 rounded-xl flex w-full"
                            type="number"
                            placeholder="Additional Price"
                            value={variant.sizes[size].additionalPrice}
                            onChange={(e) =>
                              updateSizeField(
                                index,
                                size,
                                "additionalPrice",
                                e.target.value
                              )
                            }
                          />
                        </label>

                        <label>
                          Quantity
                          <input
                            className="border-2 p-2 rounded-xl flex w-full"
                            type="number"
                            placeholder="Quantity"
                            value={variant.sizes[size].quantity}
                            onChange={(e) =>
                              updateSizeField(
                                index,
                                size,
                                "quantity",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </div>
                    )}
                  </div>
                ))}

                {/* ADD SIZE */}
                <div className="flex gap-3 mt-4">
                  <input
                    className="border p-2 rounded-xl"
                    placeholder="New Size (ex: XS, 4XL)"
                    value={variant.newSize}
                    onChange={(e) =>
                      updateVariant(index, "newSize", e.target.value)
                    }
                  />
                  <button
                    onClick={() => addSize(index)}
                    className="bg-blue-600 text-white px-4 rounded-xl"
                  >
                    ADD SIZE
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button onClick={addVariant} className="text-green-600 font-medium">
            + ADD VARIANT
          </button>
        </div>

        {error && <div className="text-red-600 text-center mt-4">{error}</div>}

        <div className="flex justify-center mt-8">
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-600 text-white px-8 py-3 rounded-xl flex items-center gap-3 disabled:opacity-60"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {isEdit ? "UPDATE PRODUCT" : "ADD PRODUCT"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productsform;
