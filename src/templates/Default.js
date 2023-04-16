import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Default = ({ children }) => {
  return (
    <>
      <Header />
        <Box sx={{marginTop: '100px'}}>
            {children}
        </Box>
      <Footer />
    </>
  );
};

export default Default;
