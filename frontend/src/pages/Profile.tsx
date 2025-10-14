import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearUser } from "../store/slices/userSlice";

const Profile = () => {

   const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      sx={{
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <Avatar
        src={user.avatarUrl}
        alt={user.name}
        sx={{ width: 120, height: 120, mb: 2 }}
      />

      <Typography variant="h6" fontWeight="bold">
        {user.name || "Usuário Anônimo"}
      </Typography>
    <Button
        variant="contained"
        color="success"
        onClick={handleLogout}
        sx={{
          mt: 2,
          borderRadius: "20px",
          textTransform: "none",
          px: 4,
        }}
      >
        Sair
      </Button>
    </Box>
  );
};

export default Profile;
