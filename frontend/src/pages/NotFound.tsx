import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      gap={2}
    >
      <Typography variant="h3" color="error">
        404
      </Typography>
      <Typography variant="body1">
        Página não encontrada
      </Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Voltar para a página inicial
      </Button>
    </Box>
  );
};

export default NotFound;
