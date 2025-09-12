import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Divider,
  Badge,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import {
    useColorMode,
    Image,
    Spinner
} from '@chakra-ui/react';

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  SearchIcon,
  BellIcon, MoonIcon, SunIcon
} from '@chakra-ui/icons';

import { 
  FiHome, 
  FiUser, 
  FiBriefcase, 
  FiMail,
  FiGrid,
  FiUsers,
  FiMessageSquare,
  FiBarChart2,
  FiFileText,
  FiShoppingCart,
  FiSave,
  FiSettings,
  FiSun,
  FiMoon,
  FiSearch,
  FiDatabase,   // nuevo para informática
  FiDollarSign, // nuevo para finanzas
  FiTrendingUp, // nuevo para mercadeo
  FiLayers,      // nuevo para producciónh
  FiPhone
} from 'react-icons/fi';

import { toast } from "react-toastify";

import { keyframes } from '@emotion/react';
import { AppContext } from '../AppContext/AppContext';

import { useUsers } from '../../shared/hooks/User/useListUsers';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(3.5px); }
  50% { transform: translateY(-5px); }
`;

export const Navbar = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, setUser, refresh, triggerRefresh } = useContext(AppContext);


  const navigate = useNavigate();
  const location = useLocation();

  const { total, loading, error, fetchUsers } = useUsers();

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

  const routeToNav = {
    '/principalPage': 'Info. General',
    '/extencionesPage': 'Extenciones',
    '/userPage': 'Usuarios',
    '/productosPage': 'RRHH',
    '/ventasPage': 'Ventas',
    '/proyectosPage': 'Produccion',
    '/mensajesPage': 'Finanzas',
    '/ajustesPage': 'Mercadeo',
    '/ajustesPag': 'Informatica'
  };

  // Determina qué item está activo según la ruta
  const activeNavItem = routeToNav[location.pathname] || 'Info. General';

    useEffect(() => {
      fetchUsers({ limite: 10, desde: 0 });
    }, [fetchUsers, refresh]);


  // Efecto para scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para cerrar sesión
const handleLogout = () => {
  localStorage.removeItem("user"); // solo borramos user
  setUser(null); // actualizamos el contexto global
  navigate("/");
  triggerRefresh(); // cualquier componente dependiente de refresh se actualizará
  toast.success("Sesión cerrada correctamente");
};


  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.900")}
          backdropFilter="blur(20px)"
          borderBottom="1px solid"
          borderColor={useColorModeValue("rgba(226, 232, 240, 0.8)", "gray.700")}
          color={useColorModeValue("gray.800", "gray.100")}
          minH="70px"
          py={2.5}
          px={5}
          align="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          zIndex={1000}
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          transform={scrolled ? 'translateY(0)' : 'translateY(0)'}
          boxShadow={scrolled ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "0 1px 3px rgba(0, 0, 0, 0.05)"}
        >
          {/* Hamburger Menu */}
          <Flex align="center">
            <IconButton
              onClick={onDrawerOpen}
              icon={<HamburgerIcon w={7} h={7} />}
              variant="ghost"
              aria-label="Toggle Navigation"
              size="lg"
              borderRadius="xl"
              _hover={{
                bg: 'linear-gradient(45deg, #dc143c, #f75959ff, #dc143c)',
                color: 'white',
                transform: 'translateY(-1px)',
              }}
              transition="all 0.2s ease"
            />
          </Flex>

          {/* Logo con animación */}
          <Flex flex={1} pl={100} align="center">
            <HStack spacing={3} cursor="pointer" 
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.2s ease"
            >
            <Box
              w={12}
              h={12}
              bg="linear-gradient(135deg, #e53e3e 0%, #dd6b20 100%)"
              borderRadius="2xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0 10px 30px rgba(220, 20, 60, 0.3)" // sombra roja más intensa
              position="relative" // necesario para el pseudo-elemento
              animation={`${floatAnimation} 3s ease-in-out infinite`} // si quieres flotante
              _before={{
                content: '""',
                position: "absolute",
                top: "-2px",
                left: "-2px",
                right: "-2px",
                bottom: "-2px",
                background: "linear-gradient(45deg, #dc143c, #f75959ff, #dc143c)", // efecto rojo
                borderRadius: "2xl",
                zIndex: -1,
                opacity: 0.7,
              }}
              _hover={{
                boxShadow: "0 6px 20px rgba(229, 62, 62, 0.4)",
                transform: 'translateY(-2px)'
              }}
              transition="all 0.3s ease"
            >
              <Image
                src="/img/logosamboro.png"
                alt="Logo Samboro"
                boxSize={9} // ajusta según tu gusto
                objectFit="cover"
              />
            </Box>

              <VStack spacing={0} align="start">
                <Text
                  fontSize="2xl"
                  fontWeight="1000"
                  bgGradient={useColorModeValue(
                    "linear(to-r, #000000ff, #4b4b4bff, #979090ff)", // modo claro
                    "linear(to-r, #e7e7e7ff, #bdbdbdff, #9b9b9bff)"  // modo oscuro
                  )}
                  bgClip="text"
                  fontFamily="Libre Baskerville, serif"
                  letterSpacing="0.5px"
                >
                  SAMBORO
                </Text>
                <Text fontSize="xs" color={useColorModeValue("gray.700", "gray.100")} fontWeight="500" letterSpacing="2px">
                  PISOS • AZULEJOS • FACHALETAS
                </Text>
              </VStack>
            </HStack>
          </Flex>



          {/* Right Side Actions */}
          <Stack direction="row" spacing={4} align="center">
            {/* modo oscuro */}
            <Tooltip label="Modo Oscuro" hasArrow>
              <Box position="relative">
        <IconButton
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="ghost"
          size="lg"
          borderRadius="xl"
          _hover={{
            bg: "linear-gradient(135deg, #4256b3ff 0%, #28232cff 100%)",
            color: "white",
            transform: "translateY(-1px)",
          }}
          transition="all 0.2s ease"
        />
              </Box>
            </Tooltip>

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={Button}
                rounded="xl"
                variant="ghost"
                cursor="pointer"
                minW={0}
                p={1}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                transition="all 0.2s ease"
              >
                <HStack>
                  <Avatar
                    size="md"
                    src={user?.profilePhoto || "/img/logosamboro.png"}
                    border="2px solid"
                    borderColor="white"
                    boxShadow="0 2px 10px rgba(0,0,0,0.1)"
                  />
                  <VStack spacing={0} align="start" display={{ base: 'none', md: 'flex' }}>
                    <Text fontSize="sm" fontWeight="600" color={useColorModeValue("gray.700", "gray.100")}>
                      {user?.username || "Invitado"}
                    </Text>
                    <Text>
                      {roleNames[user?.role] || "Rol desconocido"}
                    </Text>
                  </VStack>
                  <ChevronDownIcon />
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.700")}
                border="none"
                boxShadow="0 10px 30px rgba(0,0,0,0.1)"
                borderRadius="xl"
                py={2}
                px={3}
              >
                <MenuItem borderRadius="lg" >
                  <Icon as={FiUser} mr={3} />
                  Mi Perfil
                </MenuItem>
                <MenuItem borderRadius="lg" >
                  <Icon as={FiSettings} mr={3} />
                  Configuración
                </MenuItem>
                <MenuDivider />
                <MenuItem borderRadius="lg" color="red.500" _hover={{ bg: 'red.200' }} onClick={handleLogout}>
                  Cerrar Sesión
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Flex>

        {/* Espaciador para el navbar fijo */}
        <Box h="70px" />
      </Box>

      {/* Sidebar Drawer Mejorado */}
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={onDrawerClose}
        size="md"
      >
        <DrawerOverlay backdropFilter="blur(4px)" />
        <DrawerContent 
          bg="linear-gradient(180deg, #1a202c 0%, #000000ff 100%)"
          color="white"
          borderTopRightRadius="2xl"
          borderBottomRightRadius="2xl"
        >
          <DrawerCloseButton 
            color="white" 
            size="lg"
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            borderRadius="lg"
          />
          
          <DrawerHeader borderBottomWidth="1px" borderColor="rgba(255,255,255,0.1)" pb={6}>
            <VStack spacing={4} align="start">
              <HStack spacing={3}>
                <Box
                  w={10}
                  h={10}
                  bg="linear-gradient(45deg, #dc143c, #f75959ff, #dc143c)"
                  borderRadius="xl"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 4px 15px rgba(229, 62, 62, 0.3)"
                  animation={`${floatAnimation} 3s ease-in-out infinite`}
                >
                  <Image
                    src="/img/logosamboro.png"
                    alt="Logo Samboro"
                    boxSize={7} // ajusta según tu gusto
                    objectFit="cover"
                  />
                </Box>
                <VStack align="start" spacing={0}>
                  <Text 
                    fontSize="30px"
                    fontWeight="1000"
                    bgGradient="linear(to-r, #ffffffff, #dfdfdfff, #8d8d8dff)"
                    bgClip="text"
                    fontFamily="Libre Baskerville, serif"
                    letterSpacing="0.5px"
                  >
                    SAMBORO
                  </Text>
                </VStack>
              </HStack>
              
              {/* Búsqueda móvil */}
              <InputGroup>
              <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Buscar..."
                bg="rgba(236, 230, 230, 0.1)"
                borderRadius="lg"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _focus={{
                  bg: "rgba(12, 11, 11, 0.15)",
                  borderColor: "gray.500",   // gris
                  boxShadow: "0 0 0 1px gray" // quita el celeste y lo hace gris
                }}
              />
            </InputGroup>

            </VStack>
          </DrawerHeader>

          <DrawerBody p={0}>
            <VStack spacing={1} align="stretch" py={4}>
              {loading && <Spinner />}
              {error && <Text color="red.500">{error}</Text>}
              <SidebarItem 
                icon={FiGrid} 
                label="Info. General" 
                isActive={activeNavItem === 'Info. General'}
                onClick={() => {
                  navigate("/principalPage")
                }}
              />
              <SidebarItem 
                icon={FiPhone} 
                label="Extenciones" 
                isActive={activeNavItem === 'Extenciones'}
                onClick={() => {
                  navigate("/ExtencionesPage")
                }}
              />
              <SidebarItem 
                icon={FiUsers} 
                label="Usuarios" 
                isActive={activeNavItem === 'Usuarios'}
                onClick={() => {
                  navigate("/userPage")
                }}
                badge={total ?? 0}
              />
              <SidebarItem 
                icon={FiBriefcase} 
                label="RRHH" 
                isActive={activeNavItem  === 'RRHH'}

              />
              <SidebarItem 
                icon={FiShoppingCart} 
                label="Ventas" 
                isActive={activeNavItem  === 'Ventas'}

              />
              <SidebarItem 
                icon={FiLayers} 
                label="Produccion" 
                isActive={activeNavItem  === 'Produccion'}
 
              />
              <SidebarItem 
                icon={FiDollarSign} 
                label="Finanzas" 
                isActive={activeNavItem  === 'Finanzas'}

              />
              <SidebarItem 
                icon={FiTrendingUp} 
                label="Mercadeo" 
                isActive={activeNavItem  === 'Mercadeo'}

              />
              <SidebarItem 
                icon={FiDatabase} 
                label="Informatica" 
                isActive={activeNavItem  === 'Informatica'}

              />
              
              <Divider borderColor="rgba(255,255,255,0.2)" my={4} />
              
              <Box px={2}>
                <Text fontSize="xs" color="gray.400" fontWeight="600" letterSpacing="wider" mb={3} px={4}>
                  CONFIGURACIÓN
                </Text>
                <VStack spacing={1}>
                  <SidebarItem 
                    icon={FiSettings} 
                    label="Ajustes" 
                    isActive={activeNavItem === 'Ajustes'}

                  />
                </VStack>
              </Box>
              
              <Box mt="auto" px={4} pb={4}>
                <Box
                  bg="rgba(255,255,255,0.1)"
                  p={4}
                  borderRadius="xl"
                  backdropFilter="blur(10px)"
                >
                  <HStack>
                    <Avatar
                      size="sm"
                      src={user?.profilePhoto || "/img/logosamboro.png"}
                    />
                    <VStack align="start" spacing={0}>
                      <Text fontSize="sm" fontWeight="600">
                        {user?.username || "Invitado"}
                      </Text>
                      <Text>
                        {roleNames[user?.role] || "Rol desconocido"}
                      </Text>
                    </VStack>
                  </HStack>
                </Box>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

// Componente mejorado para items del sidebar
const SidebarItem = ({ icon, label, isActive = false, onClick, badge }) => {
  return (
    <Box px={2}>
      <HStack
        px={4}
        py={3}
        cursor="pointer"
        bg={isActive ? 'rgba(229, 62, 62, 0.2)' : 'transparent'}
        color={isActive ? '#e53e3e' : 'gray.300'}
        _hover={{
          bg: isActive ? 'rgba(229, 62, 62, 0.3)' : 'rgba(255,255,255,0.1)',
          color: isActive ? '#e53e3e' : 'white',
          transform: 'translateX(4px)',
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        borderRadius="xl"
        position="relative"
        onClick={onClick}
        _before={isActive ? {
          content: '""',
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          w: '4px',
          h: '60%',
          bg: '#e53e3e',
          borderRadius: '0 4px 4px 0'
        } : {}}
      >
        <Icon as={icon} w={5} h={5} />
        <Text fontSize="sm" fontWeight={isActive ? '600' : 'normal'} flex={1}>
          {label}
        </Text>
        {badge && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
            minW="20px"
            h="20px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {badge}
          </Badge>
        )}
      </HStack>
    </Box>
  );
};