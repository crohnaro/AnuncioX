import { Button, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useSession } from 'next-auth/react'

export default function AnnounceButton() {
  const { data: session, status } = useSession();
  return (
    <Button
      href={session ? "/user/publish" : "/auth/signin"}
      color="button"
      variant="contained"
      endIcon={<AddShoppingCartIcon sx={{ color: "#303134" }} />}
    >
      <Typography color="#303134" variant="body2">
        Anunciar e Vender
      </Typography>
    </Button>
  );
}
