import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Grid
} from "@chakra-ui/react";
import { FaEnvelope } from "react-icons/fa";
import { keyframes } from "@emotion/react";

// Animación sutil de flotación
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-1px); }
`;

export const UsersListView = ({ users, onSelectUser }) => {
  const bgItem = useColorModeValue("gray.50", "gray.700");
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.500", "gray.300");

  const [hovered, setHovered] = useState(null);

  return (
    <VStack spacing={0.5} w="100%"> {/* separación mínima */}
      {users.map((user) => (
        <Box
          key={user.uid}
          bg={hovered === user.uid ? hoverBg : bgItem}
          borderRadius="md"
          w="100%"
          cursor="pointer"
          px={5}
          py={1}
          onMouseEnter={() => setHovered(user.uid)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onSelectUser(user.uid)}
          transition="all 0.2s"
          animation={hovered === user.uid ? `${float} 2s ease-in-out infinite` : "none"}
          _hover={{
            transform: "translateX(2px)",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            bg: hoverBg,
          }}
        >
<Flex align="center" justify="space-between">
  <HStack spacing={20} align="center">
    <Avatar
      src={user.profilePhoto || "/img/logosamboro.png"}
      name={user.username || user.name}
      size="sm"
    />
    {/* Contenedor horizontal username + email */}
<Grid templateColumns="250px 1fr" gap={1} alignItems="center">
      <Text
        fontWeight="600"
        color={textPrimary}
        fontSize="sm"
        minW="90px"  // 👈 ancho fijo para que todos los emails empiecen alineados
      >
        {user.username || user.name || "Usuario"}
      </Text>
      <Flex align="center" gap={1} color={textSecondary} fontSize="xs">
        <Icon as={FaEnvelope} boxSize={2} />
        <Text noOfLines={1} maxW="170px" fontSize="xs">
          {user.email}
        </Text>
      </Flex>
    </Grid>
  </HStack>

  <Box color={textSecondary} fontSize="xs" fontWeight="500">
    {user.role}
  </Box>
</Flex>

        </Box>
      ))}
    </VStack>
  );
};
