import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProductCards from "../components/ProductCards";
import BusinessImage from "../components/BusinessImage";
import { LeftSidebarFilter } from "../leftSidebarFilter";

export default function HomeBusiness() {
  return (
    <div>
       <BusinessImage />
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <ProductCards />
      </Stack>
    </div>
  );
}