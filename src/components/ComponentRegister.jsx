import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  HStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Select,
  Grid,
  GridItem,
  Tag,
  TagLabel,
  TagCloseButton,
  useBreakpointValue,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ViewIcon, ViewOffIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useRegisterUser } from "../shared/hooks/Auth/useRegister";

// Animaciones suaves
const slideInRight = keyframes`
  0% { transform: translateX(30px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;
const slideInLeft = keyframes`
  0% { transform: translateX(-30px); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const ROLES = [
  "DEVELOPER_ROLE",
  "ADMIN_IT_ROLE",
  "ADMIN_MARKETING_ROLE",
  "ADMIN_RRHH_ROLE",
  "RRHH_ROLE",
  "IT_ROLE",
  "MARKETING_ROLE",
  "OPERADOR_ROLE",
];
const PERMISSIONS = ["CREATE_PUBLICATION", "PERMISSION_ADMIN", "REGISTER_USER"];

export const ComponentRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    role: "",
    permissions: [],
  });
  const [showPassword, setShowPassword] = useState(false);

  const { register, loading } = useRegisterUser();

  const navigate = useNavigate();

  const handleInputChange = (field, value) =>
    setFormData((p) => ({ ...p, [field]: value }));
  
  const handlePermissionChange = (permissions) =>
    setFormData((p) => ({ ...p, permissions }));

  const removePermission = (permissionToRemove) => {
    setFormData((p) => ({
      ...p,
      permissions: p.permissions.filter(perm => perm !== permissionToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.surname ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.role
    ) {
      console.error("Todos los campos obligatorios deben ser completados");
      return;
    }
    await register(formData);
  };

  // Colores adaptados a modo claro/oscuro
  const bgColorForm = useColorModeValue("white", "gray.900");
  const bgColorInput = useColorModeValue("gray.50", "gray.700");
  const borderColorInput = useColorModeValue("gray.200", "gray.600");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const textColorSecondary = useColorModeValue("gray.600", "gray.300");
  const bgColorLeftBox = useColorModeValue(
    "url('https://www.samboro.com/wp-content/uploads/2025/02/CANTABRIA-AZUL-AMB-uai-576x720.jpg')",
    "url('https://www.samboro.com/wp-content/uploads/2025/02/CANTABRIA-AZUL-AMB-uai-576x720.jpg')"
  );

  const formatPermissionName = (permission) => {
    return permission
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <Box overflowX="hidden" minH={{ base: "auto" }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        minH={{ base: "auto" }}
        w="100%"
        overflow="hidden"
      >
        {/* IZQUIERDO - imagen y texto */}
        <Box
          w={{ base: "100%", lg: "40%" }}
          flex={{ base: "0 0 auto", lg: "0 0 40%" }}
          minH="100vh"
          position={{ base: "relative", lg: "fixed" }}
          top="0"
          left="0"
          backgroundImage={bgColorLeftBox}
          backgroundSize="cover"
          backgroundPosition="center"
          animation={`${slideInLeft} 0.8s ease-out`}
          overflow="hidden"
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: useColorModeValue(
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.5)"
            ),
            zIndex: 1,
          }}
        >
          <VStack
            position="relative"
            zIndex={2}
            h="100vh"
            justify="center"
            align={{ base: "center", lg: "flex-start" }}
            px={{ base: 4, md: 6, lg: 8 }}
            py={{ base: 6, lg: 8 }}
            color="white"
            spacing={6}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Box animation={`${fadeIn} 1s ease-out 0.5s both`}>
              <Heading
                fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                fontWeight="700"
                lineHeight="1.2"
                fontFamily="Playfair Display"
                mb={4}
              >
                Únete a SAMBORO
              </Heading>

              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                fontWeight="500"
                opacity={0.9}
                maxW={{ base: "100%", md: "400px" }}
                lineHeight="1.6"
                fontFamily="Playfair Display"
              >
                Transforma espacios con la mejor calidad en pisos y acabados
              </Text>
            </Box>

            <Box
              mt={8}
              animation={`${fadeIn} 1s ease-out 1s both`}
              display={{ base: "none", lg: "block" }}
            >
              <Text
                fontSize="lg"
                fontWeight="600"
                opacity={0.8}
                fontFamily="Playfair Display"
              >
                SAMBORO
              </Text>
              <Text
                fontSize="sm"
                opacity={0.7}
                letterSpacing="2px"
                fontFamily="Playfair Display"
              >
                PISOS • AZULEJOS • FACHALETAS
              </Text>
            </Box>
          </VStack>
        </Box>

        {/* DERECHO - formulario */}
        <Box
          position={{ base: "static", lg: "fixed" }}
          top="0"
          right="0"
          w={{ base: "100%", lg: "60%" }}
          h="100vh"
          bg={bgColorForm}
          display="flex"
          alignItems="center"
          justifyContent="center"
          px={{ base: 4, md: 6, lg: 8 }}
          py={{ base: 6, lg: 8 }}
          animation={`${slideInRight} 0.8s ease-out`}
          overflow="auto"
        >
          <Box
            pt="55px"
            w="100%"
            maxW={{ base: "100%", md: "500px" }}
            animation={`${fadeIn} 1s ease-out 0.3s both`}
          >
            <VStack spacing={5} mb={6}>
              <Heading
                size="xl"
                color={textColor}
                fontFamily="Playfair Display"
                textAlign={{ base: "center", lg: "left" }}
              >
                Create an account
              </Heading>
            </VStack>

            <Box as="form" onSubmit={handleSubmit}>
              <VStack spacing={5}>
                {/* Grid para Nombre y Apellido */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4} w="full">
                  <GridItem>
                    <FormControl isRequired>
                      <Input
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        bg={bgColorInput}
                        border="1px solid"
                        borderColor={borderColorInput}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _focus={{
                          borderColor: "#8b5cf6",
                          bg: useColorModeValue("white", "gray.700"),
                          boxShadow: "0 0 0 1px #8b5cf6",
                        }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>
                  </GridItem>

                  <GridItem>
                    <FormControl isRequired>
                      <Input
                        placeholder="Apellido"
                        value={formData.surname}
                        onChange={(e) => handleInputChange("surname", e.target.value)}
                        bg={bgColorInput}
                        border="1px solid"
                        borderColor={borderColorInput}
                        color={textColor}
                        _placeholder={{ color: placeholderColor }}
                        _focus={{
                          borderColor: "#8b5cf6",
                          bg: useColorModeValue("white", "gray.700"),
                          boxShadow: "0 0 0 1px #8b5cf6",
                        }}
                        _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                        size="md"
                        borderRadius="md"
                      />
                    </FormControl>
                  </GridItem>
                </Grid>

                <FormControl isRequired>
                  <Input
                    placeholder="Usuario"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    bg={bgColorInput}
                    border="1px solid"
                    borderColor={borderColorInput}
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                    _focus={{
                      borderColor: "#8b5cf6",
                      bg: useColorModeValue("white", "gray.700"),
                      boxShadow: "0 0 0 1px #8b5cf6",
                    }}
                    _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    bg={bgColorInput}
                    border="1px solid"
                    borderColor={borderColorInput}
                    color={textColor}
                    _placeholder={{ color: placeholderColor }}
                    _focus={{
                      borderColor: "#8b5cf6",
                      bg: useColorModeValue("white", "gray.700"),
                      boxShadow: "0 0 0 1px #8b5cf6",
                    }}
                    _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                    size="md"
                    borderRadius="md"
                  />
                </FormControl>

                <FormControl isRequired>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      bg={bgColorInput}
                      border="1px solid"
                      borderColor={borderColorInput}
                      color={textColor}
                      _placeholder={{ color: placeholderColor }}
                      _focus={{
                        borderColor: "#8b5cf6",
                        bg: useColorModeValue("white", "gray.700"),
                        boxShadow: "0 0 0 1px #8b5cf6",
                      }}
                      _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      size="md"
                      borderRadius="md"
                    />
                    <InputRightElement height="100%">
                      <IconButton
                        aria-label={showPassword ? "Ocultar" : "Mostrar"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        color={placeholderColor}
                        _hover={{ color: textColor }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <FormControl isRequired>
                  <Select
                    placeholder="Seleccionar Rol"
                    value={formData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    bg={bgColorInput}
                    border="1px solid"
                    borderColor={borderColorInput}
                    color={textColor}
                    _focus={{
                      borderColor: "#8b5cf6",
                      bg: useColorModeValue("white", "gray.700"),
                      boxShadow: "0 0 0 1px #8b5cf6",
                    }}
                    _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                    size="md"
                    borderRadius="md"
                    sx={{
                      "> option": {
                        bg: useColorModeValue("white", "gray.700"),
                        color: textColor,
                      },
                    }}
                  >
                    {ROLES.map((role) => (
                      <option key={role} value={role}>
                        {role
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {/* Select múltiple para permisos */}
                <FormControl w="full">
                  <Menu closeOnSelect={false}>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      w="full"
                      textAlign="left"
                      bg={bgColorInput}
                      border="1px solid"
                      borderColor={borderColorInput}
                      color={formData.permissions.length > 0 ? textColor : placeholderColor}
                      _focus={{
                        borderColor: "#8b5cf6",
                        bg: useColorModeValue("white", "gray.700"),
                        boxShadow: "0 0 0 1px #8b5cf6",
                      }}
                      _hover={{ borderColor: useColorModeValue("gray.300", "gray.500") }}
                      size="md"
                      borderRadius="md"
                      fontWeight="400"
                    >
                      {formData.permissions.length > 0 
                        ? `${formData.permissions.length} permiso${formData.permissions.length > 1 ? 's' : ''} seleccionado${formData.permissions.length > 1 ? 's' : ''}`
                        : "Seleccionar permisos (Opcional)"
                      }
                    </MenuButton>
                    <MenuList 
                      bg={useColorModeValue("white", "gray.700")}
                      borderColor={borderColorInput}
                    >
                      <MenuOptionGroup 
                        type="checkbox" 
                        value={formData.permissions}
                        onChange={handlePermissionChange}
                      >
                        {PERMISSIONS.map((permission) => (
                          <MenuItemOption 
                            key={permission} 
                            value={permission}
                            color={textColor}
                            _hover={{ bg: useColorModeValue("gray.50", "gray.600") }}
                          >
                            {formatPermissionName(permission)}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>

                  {/* Tags para mostrar permisos seleccionados */}
                  {formData.permissions.length > 0 && (
                    <Flex mt={3} wrap="wrap" gap={2}>
                      {formData.permissions.map((permission) => (
                        <Tag
                          key={permission}
                          size="md"
                          colorScheme="purple"
                          borderRadius="full"
                        >
                          <TagLabel fontSize="xs">
                            {formatPermissionName(permission)}
                          </TagLabel>
                          <TagCloseButton
                            onClick={() => removePermission(permission)}
                          />
                        </Tag>
                      ))}
                    </Flex>
                  )}
                </FormControl>

                <HStack w="full" spacing={4} mt={2}>
                  <Button
                    type="submit"
                    w="full"
                    bg="#8b5cf6"
                    color="white"
                    size="md"
                    borderRadius="md"
                    _hover={{
                      bg: "#7c3aed",
                      transform: "translateY(-1px)",
                    }}
                    _active={{ transform: "translateY(0px)" }}
                    isLoading={loading}
                    loadingText="Creando cuenta..."
                    transition="all 0.2s"
                    fontWeight="600"
                    h="50px"
                  >
                    Create account
                  </Button>

                  <Button
                    w="full"
                    variant="outline"
                    colorScheme="purple"
                    size="md"
                    borderRadius="md"
                    h="50px"
                    onClick={() => navigate(-1)}
                  >
                    Cancelar
                  </Button>
                </HStack>

              </VStack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};