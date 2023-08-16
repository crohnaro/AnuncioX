import { useState } from "react";
import { useRouter } from "next/router";
import { IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import styles from "../../src/styles/SearchInput.module.css";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState();
  const handleSubmitSearch = () => {
    router.push({
      pathname: `/search/${search}`,
    });
  };
  return (
    <Paper className={styles.searchBox}>
      <InputBase
        placeholder="Ex.: Iphone 12 com garantia"
        fullWidth
        onChange={(e) => setSearch(e.target.value)}
      />
      <IconButton onClick={handleSubmitSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchInput;
