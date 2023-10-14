import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Marcas from "../components/Marcas";
import { LeftSidebarFilter } from "../leftSidebarFilter";
import BusinessImage from "../components/BusinessImage";

export default function HomeBusiness() {
  return (
    <div>
       <BusinessImage />
      <Stack direction="row" sx={{ gap: 3 }}>
        <LeftSidebarFilter />
        <Marcas />
      </Stack>
    </div>
  );
}