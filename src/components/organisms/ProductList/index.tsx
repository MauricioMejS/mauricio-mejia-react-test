import React, { useEffect, useState } from "react";
import Pagination from "@/components/molecules/Pagination";
import styles from "./ProductList.module.scss";
import Icon from "@/components/atoms/Icon";
import Button from "@/components/atoms/Button";
import { useRouter } from "next/router";
import { deleteProduct, setProducts } from '@/store/productSlice';
import { RootState } from '@/store';
import Edit from "@/assets/svg/edit.svg";
import Delete from "@/assets/svg/delete.svg";
import { useDispatch, useSelector } from "react-redux";


interface ProductsPageProps {
}

const ProductsPage: React.FC<ProductsPageProps> = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [loading, setLoading] = useState(true);
  

  console.log(products);

  const itemsPerPage = 8;

  
  useEffect(() => {
    if(products.length === 0){
      fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data));
        setLoading(false);
      })
      .catch((err) => console.error(err));
    }
    if(products.length > 0){
      setLoading(false);
    }
  }, [dispatch]);

  const router = useRouter();

  const handleRowClick = (id: number) => {
    router.push(`/products/${id}`);
  };
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedProducts = [...filteredProducts].sort((a: any, b: any) => {
    if (!sortedColumn) return 0;
    const valueA = a[sortedColumn];
    const valueB = b[sortedColumn];
    if (sortDirection === "asc") return valueA > valueB ? 1 : -1;
    return valueA < valueB ? 1 : -1;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column: string) => {
    if (sortedColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(column);
      setSortDirection("asc");
    }
  };

  const handlerDelete = (id: number) => {
    dispatch(deleteProduct(id));
  }

  return (
    <>
      <h1 className={styles.header}>Products</h1>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={() => router.push("/users")}>
            <span>Edit User</span>
          </Button>
          <Button onClick={() => router.push("/products/create")}>
            <span>Add Product</span>
          </Button>
        </div>

        <table className={styles.tableContainer}>
          <thead>
            <tr>
              <th className={styles.id} onClick={() => handleSort("id")}>
                ID
              </th>
              <th className={styles.title} onClick={() => handleSort("title")}>
                Title
              </th>
              <th className={styles.price} onClick={() => handleSort("price")}>
                Price
              </th>
              <th className={styles.actions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Cargando...</td>
              </tr>
            ) : paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <tr key={product.id}>
                  <td onClick={() => handleRowClick(product.id)} className={styles.id}>{product.id}</td>
                  <td onClick={() => handleRowClick(product.id)} className={styles.title}>{product.title}</td>
                  <td onClick={() => handleRowClick(product.id)} className={styles.price}>{"$ " + product.price}</td>
                  <td className={styles.actions}>
                    
                    <Button onClick={() => router.push(`/products/${product.id}/edit`)}>
                      <Icon>
                        <Edit />
                      </Icon>
                    </Button>
                    <Button onClick={() => handlerDelete(product.id)}>
                      <Icon>
                        <Delete />
                      </Icon>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>No hay productos</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ProductsPage;
