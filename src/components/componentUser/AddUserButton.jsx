import { Button, Icon } from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const AddUserButton = () => {
  const navigate = useNavigate();

  const accentColor = "#FF5E4D";
  const accentHover = "#e14b3b";

  return (
    <Button
      size="md"
      bg={accentColor}
      color="white"
      rounded="full"
      w="55px"
      h="55px"
      onClick={() => navigate("/register-user")} // 👈 redirección
      _hover={{
        bg: accentHover,
        transform: "scale(1.1) rotate(90deg)",
        shadow: `0 20px 40px ${accentColor}60`,
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      shadow={`0 10px 30px ${accentColor}40`}
      position="fixed"       // 👈 flotante
      bottom="30px"          // 👈 separado del fondo
      right="30px"           // 👈 separado del borde derecho
      zIndex={1000}
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        top: "0",
        left: "-100%",
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
        animation: "shimmer 2s infinite",
      }}
      sx={{
        "@keyframes shimmer": {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },
      }}
    >
      <Icon as={FiPlus} w={8} h={8} transition="all 0.3s ease" />
    </Button>
  );
};
