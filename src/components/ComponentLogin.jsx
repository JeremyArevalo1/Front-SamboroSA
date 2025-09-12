import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LightMode } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

import { useLogin } from "../shared/hooks/Auth/useLogin";

// Animaciones personalizadas
const shrinkAndSlide = keyframes`
  0% { width: 100%; }
  100% { width: 50%; }
`;

const slideInRight = keyframes`
  0% { transform: translateX(100%); opacity: 0; }
  100% { transform: translateX(0); opacity: 1; }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const ComponentLogin = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animationState, setAnimationState] = useState("initial"); // initial, shrinking, final

  const navigate = useNavigate();

  const { login, loading: loadingLogin } = useLogin();

  // 🔑 usar Chakra hook para detectar mobile/tablet/desktop
  const isMobileOrTablet = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationState("shrinking"), 2000);
    const timer2 = setTimeout(() => setAnimationState("final"), 3500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

const handleLogin = async (e) => {
  e.preventDefault();
  if (!identifier && !password) {
    toast.error("Debes ingresar email/usuario y contraseña");
    return;
  }

  const result = await login({
    email: identifier.includes("@") ? identifier : "",
    username: !identifier.includes("@") ? identifier : "",
    password
  });

  // Si login fue exitoso, redirige
  if (result?.success) {
    navigate("/principalPage"); // Cambia '/dashboard' por la ruta que quieras
  }
};


  return (
    <LightMode>
          <Flex minH="100vh" overflow="hidden" direction={{ base: "column", lg: "row" }}>
      {/* Panel izquierdo - Branding */}
      <Box
        position="relative"
        bg="linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="white"
        width={{ base: "100%", lg: animationState === "initial" ? "100%" : "50%" }}
        height={{ base: animationState === "final" ? "40vh" : "100vh", lg: "100vh" }}
        animation={{
          base: "none",
          lg: animationState === "shrinking" ? `${shrinkAndSlide} 1.5s ease-in-out` : "none"
        }}
        transition={animationState === "final" ? "all 0.3s ease" : "none"}
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(220, 20, 60, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(220, 20, 60, 0.15) 0%, transparent 50%),
            linear-gradient(45deg, transparent 30%, rgba(220, 20, 60, 0.05) 50%, transparent 70%)
          `,
          zIndex: 1
        }}
      >
        <VStack spacing={{ base: 3, md: 5, lg: 7 }} zIndex={2} px={4}>
          <Box
            bg="#dc143c"
            p={{ base: 4, md: 5, lg: 6 }}
            borderRadius="20px"
            boxShadow="0 10px 30px rgba(220, 20, 60, 0.3)"
            animation={`${floatAnimation} 3s ease-in-out infinite`}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              background: "linear-gradient(45deg, #dc143c, #f75959ff, #dc143c)",
              borderRadius: "22px",
              zIndex: -1,
              opacity: 0.7
            }}
          >
            <Image 
              src="/img/logosamboro.png"   // 👈 aquí usas tu ruta directa
              alt="Logo Samboro"
              boxSize={{ base: "30px", md: "40px", lg: "50px" }} // ajusta tamaño
              objectFit="contain"
            />
          </Box>

          <VStack spacing={{ base: 2, md: 3, lg: 4 }} textAlign="center">
            <Heading
              size={{ base: "xl", md: "2xl", lg: "3xl" }}
              fontWeight="800"
              bgGradient="linear(to-r, white, gray.200)"
              bgClip="text"
              letterSpacing="-0.05em"
              fontFamily="Playfair Display" 
            >
              SAMBORO
            </Heading>

            <Text
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              fontWeight="600"
              color="gray.300"
              letterSpacing={{ base: "1px", md: "2px", lg: "3px" }}
              opacity={0.9}
              fontFamily="Playfair Display" 
            >
              PISOS • AZULEJOS • FACHALETAS
            </Text>

            {animationState === "final" && (
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.400"
                maxW={{ base: "250px", md: "300px" }}
                lineHeight="1.6"
                animation={`${fadeIn} 1s ease-out 0.5s both`}
                display={{ base: "none", lg: "block" }}
                fontFamily="Playfair Display" 
              >
                Transformamos espacios con la más alta calidad en pisos y acabados
              </Text>
            )}
          </VStack>
        </VStack>
      </Box>


      {/* Panel derecho - Login Form */}
      {(animationState === "final" || isMobileOrTablet) && (
        <Box
          width={{ base: "100%", lg: "50%" }}
          height={{ base: "60vh", lg: "100vh" }}
          // Cambia esta línea por una imagen de fondo
          bg="linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
          // Reemplázala con:
          backgroundImage="url('/img/fondologin2.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          display="flex"
          alignItems="center"
          justifyContent="center"
          animation={{ base: "none", lg: `${slideInRight} 1s ease-out` }}
          position="relative"
          px={{ base: 4, md: 6, lg: 0 }}
          py={{ base: 8, lg: 0 }}
        >

          <Box
            w={{ base: "100%", sm: "400px", md: "450px", lg: "400px" }}
            maxW="400px"
            p={{ base: 6, md: 8, lg: 10 }}
            bg="rgba(255, 255, 255, 0.65)" // 90% opaco, 10% transparente
            borderRadius={{ base: "2xl", lg: "3xl" }}
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.15)"
            border="1px solid"
            borderColor="gray.100"
            zIndex={2}
            position="relative"
          >
            <VStack spacing={{ base: 6, md: 7, lg: 8 }} align="stretch">
              {/* Header del formulario */}
              <VStack spacing={3} textAlign="center">
                <Heading 
                  size={{ base: "lg", md: "xl" }}
                  color="#2d2d2d" 
                  fontWeight="700"
                  fontFamily="Playfair Display" 
                >
                  Bienvenido
                </Heading>
                <Text 
                color="gray.600" 
                fontSize={{ base: "sm", md: "md" }}
                fontFamily="Playfair Display" >
                  Inicia sesión para continuar
                </Text>
              </VStack>

              {/* Formulario */}
              <VStack spacing={{ base: 5, lg: 6 }} as="form" onSubmit={handleLogin}>
                <FormControl isRequired>
                  <FormLabel 
                    color="gray.700" 
                    fontWeight="600" 
                    fontSize={{ base: "sm", md: "sm" }}
                    fontFamily="Playfair Display" 
                  >
                    Email o Usuario
                  </FormLabel>
                  <Input
                    placeholder="Ingresa tu email o usuario"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    color="gray.800"
                    borderColor="gray.600"
                    borderRadius="lg"
                    size={{ base: "md", lg: "lg" }}
                    _focus={{ 
                      borderColor: "#dc143c", 
                      boxShadow: "0 0 0 1px #dc143c",
                      transform: "translateY(-2px)"
                    }}
                    _hover={{ borderColor: "gray.400" }}
                    transition="all 0.2s"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel 
                    color="gray.700" 
                    fontWeight="600" 
                    fontSize={{ base: "sm", md: "sm" }}
                    fontFamily="Playfair Display" 
                  >
                    Contraseña
                  </FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      color="gray.800"
                      borderColor="gray.600"
                      borderRadius="lg"
                      size={{ base: "md", lg: "lg" }}
                      _focus={{ 
                        borderColor: "#dc143c", 
                        boxShadow: "0 0 0 1px #dc143c",
                        transform: "translateY(-2px)"
                      }}
                      _hover={{ borderColor: "gray.400" }}
                      transition="all 0.2s"
                    />
                    <InputRightElement height="100%">
                      <IconButton
                        aria-label={showPassword ? "Ocultar" : "Mostrar"}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        color="gray.600"
                        _hover={{ color: "#dc143c" }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button 
                  type="submit" 
                  w="full" 
                  bg="#dc143c" 
                  color="white" 
                  size={{ base: "md", lg: "lg" }}
                  borderRadius="lg"
                  _hover={{ 
                    bg: "#b91c3c", 
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 25px rgba(220, 20, 60, 0.3)"
                  }}
                  _active={{ transform: "translateY(-1px)" }}
                  isLoading={loadingLogin}
                  loadingText="Iniciando sesión..."
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  fontWeight="600"
                  fontFamily="Playfair Display" 
                >
                  Iniciar Sesión
                </Button>
              </VStack>

              {/* Footer */}
              <Text 
                textAlign="center" 
                fontSize={{ base: "xs", md: "xs" }}
                color="gray.500"
                fontFamily="Playfair Display" 
              >
                ¿Olvidaste tu contraseña?{" "}
                <Text 
                  as="span" 
                  color="#dc143c" 
                  cursor="pointer" 
                  _hover={{ textDecoration: "underline" }}
                >
                  Recupérala aquí
                </Text>
              </Text>
            </VStack>
          </Box>
        </Box>
      )}
    </Flex>
    </LightMode>

  );
};