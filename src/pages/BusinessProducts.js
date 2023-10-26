import MyProducts from "../components/MyProducts";
import FilterBarProducts from "../components/FilterBarProducts";

export default function BusinessProducts() {
  return (
    <div>
        <FilterBarProducts></FilterBarProducts>
        <MyProducts></MyProducts>
    </div>
  );
}