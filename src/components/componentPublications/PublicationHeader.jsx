import React, { useContext } from "react";
import { Flex, HStack, VStack, Avatar, Text, Button, Icon, useColorModeValue } from "@chakra-ui/react";
import { FiPlus, FiX } from "react-icons/fi";
import { AppContext } from "../AppContext/AppContext";

export const PublicationsHeader = ({ isOpen, onOpen, onClose, accentColor, accentHover }) => {
  const textPrimary = useColorModeValue("gray.900", "whiteAlpha");
  const avatarRingColor = useColorModeValue(accentColor, accentColor);
  const { user } = useContext(AppContext);

  const roleNames = {
  DEVELOPER_ROLE: "Desarrollador",
  ADMIN_IT_ROLE: "Admin IT",
  ADMIN_MARKETING_ROLE: "Admin Marketing",
  ADMIN_RRHH_ROLE: "Admin RRHH",
  RRHH_ROLE: "RRHH",
  IT_ROLE: "IT",
  MARKETING_ROLE: "Marketing",
  USER_ROLE: "Usuario",
};

const canCreatePublication =
  user?.role === "DEVELOPER_ROLE" ||
  (Array.isArray(user?.permissions) &&
   (user.permissions.includes("CREATE_PUBLICATION") ||
    user.permissions.includes("PERMISSION_ADMIN")));

  return (
    <Flex
      maxW="600px"
      mx="auto"
      px={4}
      mt={8}
      mb={2}
      align="center"
      justify={canCreatePublication ? "space-between" : "center"}
    >
      <HStack spacing={4} align="center">
        <Avatar
          size="md"
          src={user?.profilePhoto || "/img/logosamboro.png"}
          ring="3px"
          ringColor={avatarRingColor}
          ringOffset="2px"
        />
        <VStack align="start" spacing={0}>
          <Text fontSize="lg" fontWeight="700" color={textPrimary}>
            Bienvenido, {user?.username}
          </Text>
          <Text>
            {roleNames[user?.role] || "Rol desconocido"}
          </Text>
        </VStack>
      </HStack>

      {/* Botón de crear publicación igual al que tenías */}
{canCreatePublication && (
  <Button
    size="md"
    bg={accentColor}
    color="white"
    rounded="full"
    w="55px"
    h="55px"
    onClick={isOpen ? onClose : onOpen}
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
    position="relative"
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
      animation: isOpen ? "none" : "shimmer 2s infinite",
    }}
    sx={{
      "@keyframes shimmer": {
        "0%": { left: "-100%" },
        "100%": { left: "100%" },
      },
    }}
  >
    <Icon
      as={isOpen ? FiX : FiPlus}
      w={8}
      h={8}
      transition="all 0.3s ease"
      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
    />
  </Button>
)}
    </Flex>
  );
};
