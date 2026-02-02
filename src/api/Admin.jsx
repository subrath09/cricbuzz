import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  getCountFromServer,
  getAggregateFromServer,
  sum,
  average,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";

const PAGE_SIZE = 10;

const Spinner = () => (
  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

const Admin = () => {
  const db = getFirestore();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [averagePrice, setAveragePrice] = useState(0);

  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [stats, setStats] = useState({
    above5K: 0,
    below5K: 0,
    above10K: 0,
    below10K: 0,
    above15K: 0,
    below15K: 0,
  });

  const statLabels = {
    above5K: "Products Above ₹5,000",
    below5K: "Products Below ₹5,000",
    above10K: "Products Above ₹10,000",
    below10K: "Products Below ₹10,000",
    above15K: "Products Above ₹15,000",
    below15K: "Products Below ₹15,000",
  };

  /* ---------------- QUERY BUILDER ---------------- */
    const baseQuery = () => {
      const coll = collection(db, "admin");

      if (categoryFilter == "all") return coll;

      if (categoryFilter == "Men's Wear") {
        return query(
          coll,
          where("category", "in", [ 
            "Men's Wear",
          ])
        );
      }

      if (categoryFilter == "Women's Wear") {
        return query(
          coll,
          where("category", "in", [
            "Women's Wear",
            
          ])
        );
      }
    };

  /* ---------------- FETCH PRODUCTS ---------------- */
  const fetchProducts = async (page = 0) => {
    const q = query(
      baseQuery(),
      orderBy("createdOn", "desc"),
      limit(PAGE_SIZE * (page + 1))
    );

    const snapshot = await getDocs(q);

    const allProducts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const start = page * PAGE_SIZE;
    setProducts(allProducts.slice(start, start + PAGE_SIZE));
    setCurrentPage(page);
  };

  /* ---------------- TOTAL PRODUCTS ---------------- */
  const fetchTotalProducts = async () => {
    const snapshot = await getCountFromServer(baseQuery());
    const count = snapshot.data().count ?? 0;

    setTotalProducts(count);
    setPageCount(Math.ceil(count / PAGE_SIZE));
  };

  /* ---------------- TOTAL & AVERAGE PRICE ---------------- */
  const fetchTotals = async () => {
    const snapshot = await getAggregateFromServer(baseQuery(), {
      total: sum("price"),
      avg: average("price"),
    });

    const data = snapshot.data();
    setTotalPrice(data.total ?? 0);
    setAveragePrice(Math.round(data.avg ?? 0));
  };

  /* ---------------- PRICE STATS ---------------- */
  const fetchAbove = async (price, operator) => {
    const q = query(baseQuery(), where("price", operator, price));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count ?? 0;
  };

  /* ---------------- INIT ---------------- */
  const init = async () => {
    await fetchProducts(0);
    await fetchTotalProducts();
    await fetchTotals();

    const values = {
      above5K: await fetchAbove(5000, ">="),
      below5K: await fetchAbove(5000, "<"),
      above10K: await fetchAbove(10000, ">="),
      below10K: await fetchAbove(10000, "<"),
      above15K: await fetchAbove(15000, ">"),
      below15K: await fetchAbove(15000, "<="),
    };

    setStats(values);
  };

  useEffect(() => {
    setCurrentPage(0);
    init();
  }, [categoryFilter]);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async (id) => {
    setDeleteLoadingId(id);
    await deleteDoc(doc(db, "admin", id));
    setDeleteLoadingId(null);
    init();
  };

  /* ---------------- PAGINATION ---------------- */
  const handlePageClick = (e) => {
    fetchProducts(e.selected);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-black text-white p-6 text-center font-semibold text-2xl">
        Admin Dashboard
      </div>

      {/* FILTER & STATS */}
      <div className="flex flex-wrap gap-4 mx-10 my-6 items-center">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-orange-200 px-6 py-4 rounded-xl font-bold"
        >
          <option value="all">All Products</option>
          <option value="Men's Wear">Men's Wear</option>
          <option value="Women's Wear">Women's Wear</option>
        </select>

        <div className="bg-yellow-200 px-6 py-4 rounded-xl font-bold">
          Total Products: {totalProducts}
        </div>

        <div className="bg-green-200 px-6 py-4 rounded-xl font-bold">
          Total Price: ₹ {totalPrice}
        </div>

        <div className="bg-sky-200 px-6 py-4 rounded-xl font-bold">
          Average Price: ₹ {averagePrice}
        </div>

        {Object.keys(stats).map((key) => (
          <div key={key} className="bg-red-200 px-6 py-4 rounded-xl font-bold">
            {statLabels[key]} : {stats[key]}
          </div>
        ))}

        <button
          onClick={() => navigate("/add-product")}
          className="mx-auto bg-green-600 text-white px-8 py-3 rounded-xl font-bold shadow-xl"
        >
          ADD PRODUCT
        </button>
      </div>

      {/* TABLE */}
      <div className="mx-8 bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-3">S.No</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Created</th>
              <th className="p-3">Edit</th>
              <th className="p-3">Delete</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item, index) => (
              <tr
                key={item.id}
                className="text-center border-b font-medium text-gray-800"
              >
                <td className="p-3">
                  {currentPage * PAGE_SIZE + index + 1}
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">₹ {item.price}</td>
                <td className="p-3">
                  {item.createdOn?.toDate().toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => navigate(`/edit-product/${item.id}`)}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deleteLoadingId === item.id}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    {deleteLoadingId === item.id ? <Spinner /> : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next →"
        previousLabel="← Prev"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        forcePage={currentPage}
        containerClassName="flex justify-center gap-3 py-8 "
        pageClassName="w-10 h-10 flex items-center justify-center rounded-full border-2 border-gray-300 cursor-pointer"
        activeClassName="bg-black text-white "
        nextClassName="border-2 border-gray-300 text-center flex items-center px-4 rounded-full "
        previousClassName="border-2 border-gray-300 text-center flex items-center px-4 rounded-full"
      />
    </div>
  );
};

export default Admin;
