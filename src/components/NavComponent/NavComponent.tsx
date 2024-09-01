import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { User } from "firebase/auth";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

interface INavComponent {
  isLogin: boolean;
  handleLoginModal: () => void;
  handleLogout: () => void;
  user: User | undefined;
}

export default function NavComponent({
  isLogin,
  handleLoginModal,
  handleLogout,
  user,
}: INavComponent) {
  const longText =
    "Tryb Gościa: Kalendarz jest dostępny dla każdego użytkownika, bez potrzeby logowania. Tryb Zalogowany: Kalendarz jest prywatny i dostępny wyłącznie po zalogowaniu";
  return (
    <>
      <AppBar position="static">
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                variant="h6"
                component="a"
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                }}
              >
                Scheduler
              </Typography>

              <Typography
                component="a"
                sx={{
                  textDecoration: "none",
                }}
              >
                {user ? `Cześć, ${user.email}` : "Tryb gościa"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Tooltip title={longText}>
                <HelpOutlineOutlinedIcon />
              </Tooltip>

              {isLogin ? (
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                  Wyloguj się
                </Button>
              ) : (
                <Button sx={{ color: "#fff" }} onClick={handleLoginModal}>
                  Zaloguj się
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
