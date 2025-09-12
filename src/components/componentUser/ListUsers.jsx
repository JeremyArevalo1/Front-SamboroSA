import React, { useEffect, useState } from "react";
import { useUsers } from "../../shared/hooks/User/useListUsers";
import {
  Box,
  Spinner,
  Text,
  Image,
  VStack,
  HStack,
  Badge,
  useColorModeValue,
  Icon,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Flex,
  Divider,
  SimpleGrid,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
  FaCrown,
  FaUser,
  FaCode,
  FaShieldAlt,
  FaBullhorn,
  FaUserCog,
  FaChartLine,
  FaCog,
  FaEnvelope,
  FaServer,
  FaLaptopCode,
  FaUserShield,
  FaUsers,
  FaDesktop,
  FaCogs,
  FaSyncAlt,
  FaThList, 
  FaThLarge,
  FaEdit
} from "react-icons/fa";
import { UserDetail } from "./UsersDetails";
import { SearchBar } from "./SearchUsers";
import { UsersListView } from "./UserViewListSimple";
import { AddUserButton } from "./AddUserButton";

// Animaciones elegantes y sutiles
const gentleFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-2px); }
`;

const smoothGlow = keyframes`
  0%, 100% { box-shadow: 0 4px 15px rgba(255, 94, 77, 0.1); }
  50% { box-shadow: 0 8px 25px rgba(255, 94, 77, 0.2); }
`;

const slideInLeft = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-30px);
  }
  to { 
    opacity: 1; 
    transform: translateX(0);
  }
`;

const borderShine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 100% 0; }
`;

const pulseRing = keyframes`
  0% { transform: scale(0.8); opacity: 1; }
  100% { transform: scale(2.4); opacity: 0; }
`;

export const ListUsers = () => {
  const { users, total, loading, error, fetchUsers } = useUsers();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // "grid" = tarjetas, "list" = lista simple

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Colores elegantes para modo claro/oscuro
  const bgColor = useColorModeValue("white", "gray.900");
  const listBg = useColorModeValue("white", "gray.800");
  const itemBg = useColorModeValue("gray.50", "gray.700");
  const modalBg = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const textPrimary = useColorModeValue("#1e293b", "#f1f5f9");
  const textSecondary = useColorModeValue("#64748b", "#94a3b8");
  const accentGlow = useColorModeValue(
    "rgba(255, 94, 77, 0.1)",
    "rgba(255, 94, 77, 0.2)"
  );
  const hoverBg = useColorModeValue("gray.100", "gray.600");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading) {
    return (
      <Center minH="400px" bg={bgColor}>
        <VStack spacing={4}>
          <Spinner size="lg" color="#FF5E4D" thickness="3px" speed="0.8s" />
          <Text color="#FF5E4D" fontWeight="medium">
            Cargando equipo...
          </Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={12} bg={bgColor}>
        <Text color="red.400" fontSize="lg">
          {error}
        </Text>
      </Center>
    );
  }

  const displayedUsers = searchResults ?? users;
  
  const getRoleBadge = (role) => {
    const roleConfig = {
      DEVELOPER_ROLE: {
        bg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        icon: FaLaptopCode,
      },
      ADMIN_IT_ROLE: {
        bg: "linear-gradient(135deg, #f43f5e, #f97316)",
        icon: FaCode,
      },
      ADMIN_MARKETING_ROLE: {
        bg: "linear-gradient(135deg, #f59e0b, #eab308)",
        icon: FaBullhorn,
      },
      ADMIN_RRHH_ROLE: {
        bg: "linear-gradient(135deg, #10b981, #34d399)",
        icon: FaUserCog,
      },
      RRHH_ROLE: {
        bg: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
        icon: FaUsers,
      },
      IT_ROLE: {
        bg: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
        icon: FaDesktop,
      },
      MARKETING_ROLE: {
        bg: "linear-gradient(135deg, #8b5cf6, #6366f1)",
        icon: FaChartLine,
      },
      OPERADOR_ROLE: {
        bg: "linear-gradient(135deg, #64748b, #94a3b8)",
        icon: FaUser,
      },
    };

    const config = roleConfig[role] || {
      bg: "gray",
      icon: FaUser,
    };

    return (
      <Box
        background={config.bg}
        borderRadius="full"
        px={3}
        py={1}
        display="flex"
        alignItems="center"
        gap={1}
        transition="all 0.2s ease"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Icon as={config.icon} boxSize={3} color="white" />
        <Text fontSize="xs" fontWeight="600" color="white">
          {role}
        </Text>
      </Box>
    );
  };

  return (
    <Box bg={bgColor} minH="100vh" pt={2} pb={10}>
      {/* Header minimalista y elegante */}
      <VStack spacing={2} mb={8} textAlign="center">
        <Text color={textSecondary} fontSize="lg">
          {displayedUsers.length} Usuarios
        </Text>
          <AddUserButton/>
  <HStack spacing={2} justify="center" w="100%" maxW="400px">
    {/* Barra de búsqueda */}
    <SearchBar onResults={setSearchResults} allUsers={users} />

    {/* Botón de refrescar */}
    <IconButton
      aria-label="Refrescar usuarios"
      icon={<FaSyncAlt />}
      size="sm"
      colorScheme="orange"
      onClick={() => {
        fetchUsers();        // vuelve a cargar los usuarios
        setSearchResults([]); // limpia resultados de búsqueda
      }}
    />

      <IconButton
    aria-label="Cambiar vista"
    icon={viewMode === "grid" ? <FaThList /> : <FaThLarge />}
    size="sm"
    colorScheme="teal"
    onClick={() =>
      setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
    }
  />
  </HStack>
      </VStack>

      {/* Lista de usuarios elegante */}
      <Box maxW="1250px" mx="auto" px={2}>
        {viewMode === "grid" ? (
        <SimpleGrid
          columns={{ base: 1, md: 2 }} // 👈 1 columna en móviles, 2 en pantallas medianas+ // espacio entre items
          spacingY={1}   // 👈 controla solo la separación vertical
          spacingX={6}
        >
          {displayedUsers.map((user, index) => (
            <Box key={user.uid} w="100%">
              <Box
                animation={`${slideInLeft} 0.6s ease-out ${index * 0.1}s both`}
                onMouseEnter={() => setHoveredItem(user.uid)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => {
                  setSelectedUserId(user.uid);
                  onOpen();
                }}
                cursor="pointer"
                position="relative"
              >
                {/* Item de lista principal */}
                <Box
                  bg={hoveredItem === user.uid ? hoverBg : itemBg}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor={
                    hoveredItem === user.uid ? "#FF5E4D" : borderColor
                  }
                  overflow="hidden"
                  position="relative"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  transform={
                    hoveredItem === user.uid
                      ? "translateX(8px)"
                      : "translateX(0)"
                  }
                  boxShadow={
                    hoveredItem === user.uid
                      ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
                  }
                  _hover={{
                    animation: `${smoothGlow} 2s ease-in-out infinite`,
                  }}
                  p={2}
                  px={6}
                  py={2}
                  mb={1}
                >
                  {/* Borde animado sutil */}
                  {hoveredItem === user.uid && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      borderRadius="inherit"
                      background={`linear-gradient(90deg, 
                        transparent 0%, 
                        rgba(255, 94, 77, 0.1) 25%, 
                        rgba(255, 94, 77, 0.2) 50%, 
                        rgba(255, 94, 77, 0.1) 75%, 
                        transparent 100%)`}
                      backgroundSize="200% 100%"
                      animation={`${borderShine} 2s ease-in-out infinite`}
                      pointerEvents="none"
                    />
                  )}

                  {/* Contenido del item */}
                  <Flex align="center" gap={6}>
                    {/* Avatar con efectos */}
                    <Box position="relative">
                      <Box
                        animation={
                          hoveredItem === user.uid
                            ? `${gentleFloat} 3s ease-in-out infinite`
                            : "none"
                        }
                        position="relative"
                      >
                        {/* Anillo de pulso cuando está en hover */}
                        {hoveredItem === user.uid && (
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="60px"
                            h="60px"
                            border="2px solid"
                            borderColor="#FF5E4D"
                            borderRadius="full"
                            animation={`${pulseRing} 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite`}
                          />
                        )}

                        <Image
                          src={user.profilePhoto || "/img/logosamboro.png"}
                          alt={user.username || user.name}
                          boxSize="60px"
                          borderRadius="full"
                          objectFit="cover"
                          border="3px solid"
                          borderColor={listBg}
                          boxShadow="0 4px 12px rgba(0, 0, 0, 0.15)"
                          bg="white"
                        />

                        {/* Indicador de estado */}
                        <Box
                          position="absolute"
                          bottom={0}
                          right={0}
                          w="18px"
                          h="18px"
                          bg="#10b981"
                          borderRadius="full"
                          border="3px solid"
                          borderColor={listBg}
                          boxShadow="0 0 0 2px rgba(16, 185, 129, 0.2)"
                        />
                      </Box>
                    </Box>

                    {/* Información principal */}
                    <Flex
                      flex={1}
                      justify="space-between"
                      align="center"
                      wrap="wrap"
                      gap={2}
                    >
                      {/* Columna izquierda: Nombre y email */}
                      <VStack align="start" spacing={2} flex={1} minW="200px">
                        <Text
                          fontSize="lg"
                          fontWeight="600"
                          color={textPrimary}
                          letterSpacing="tight"
                        >
                          {user.username || user.name || "Usuario"}
                        </Text>

                        <HStack color={textSecondary} fontSize="sm" spacing={2}>
                          <Icon as={FaEnvelope} boxSize={3} />
                          <Text noOfLines={1} maxW="250px" title={user.email}>
                            {user.email}
                          </Text>
                        </HStack>
                      </VStack>

                      {/* Columna derecha: Badge del rol */}
<Flex align="center" gap={2}>
  {getRoleBadge(user.role)}
  <Tooltip label="Editar" hasArrow bg="orange.500" color="white">
    <IconButton
      aria-label="Editar usuario"
      icon={<FaEdit />}
      size="sm"
      variant="ghost"
      colorScheme="orange"
      _hover={{ bg: "orange.100", transform: "scale(1.1)" }}
      onClick={(e) => {
        e.stopPropagation(); // evita que se dispare el modal de detalles
        setSelectedUserId(user.uid);
        onOpen();
      }}
    />
  </Tooltip>
</Flex>

                    </Flex>
                  </Flex>

                  {/* Línea decorativa sutil en la parte inferior */}
                  <Box
                    position="absolute"
                    bottom={0}
                    left="50%"
                    transform="translateX(-50%)"
                    w={hoveredItem === user.uid ? "80%" : "0%"}
                    h="2px"
                    bgGradient="linear(90deg, transparent, #FF5E4D, transparent)"
                    transition="width 0.3s ease"
                  />
                </Box>
              </Box>

              {/* Separador sutil entre items */}
              {index < users.length - 1 && (
                <Box mt={3} h="1px" bg={borderColor} opacity={0.12} />
              )}
            </Box>
          ))}
        </SimpleGrid>
          ) : (
                <UsersListView
      users={displayedUsers}
      onSelectUser={(uid) => {
        setSelectedUserId(uid);
        onOpen();
      }}
    />
  )}
      </Box>

      {/* Modal sin cambios */}
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent bg={modalBg} borderRadius="2xl" maxW="600px" w="90%">
          <ModalHeader>Detalles del Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <UserDetail userId={selectedUserId} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Estado vacío elegante */}
      {users.length === 0 && (
        <Center py={16}>
          <VStack spacing={4}>
            <Box
              w="80px"
              h="80px"
              borderRadius="full"
              bg={accentGlow}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaUser} boxSize={8} color="#FF5E4D" opacity={0.6} />
            </Box>
            <Text fontSize="lg" color={textSecondary}>
              No hay usuarios registrados
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
};
