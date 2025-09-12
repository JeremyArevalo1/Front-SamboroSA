import React, { useState, useContext } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Textarea,
  Button,
  Image,
  useColorModeValue,
  Icon,
  Flex,
  Progress,
  Avatar,
  Badge,
  Tooltip,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
  Select
} from "@chakra-ui/react";
import { 
  FiUploadCloud, 
  FiImage, 
  FiX, 
  FiCheck, 
  FiCamera,
  FiEdit3,
  FiSend
} from "react-icons/fi";

import { keyframes } from "@emotion/react";
import { BsCloudUpload, BsMagic } from "react-icons/bs";
import { useCreatePublication } from "../../shared/hooks/Publications/useAddPublications";
import { AppContext } from "../AppContext/AppContext";
import { toast } from "react-toastify";

// Animaciones dinámicas
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(229, 62, 62, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

export const CreatePublication = () => {
  const { user } = useContext(AppContext);
  // ✅ TODOS LOS HOOKS AL INICIO
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [area, setArea] = useState("");

  // ✅ Hook personalizado también al inicio
  const { loading, error, success, handleCreatePublication } = useCreatePublication();



  // ✅ Todos los hooks de Chakra UI al inicio
  const bgPrimary = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const textMuted = useColorModeValue("gray.500", "gray.500");
  const accentColor = useColorModeValue("#E53E3E", "#E53E3E");
  const accentHover = useColorModeValue("#C53030", "#C53030");
  const dragActiveBg = useColorModeValue("red.50", "red.900");
  const dragActiveBorder = useColorModeValue("red.300", "red.600");
  const gradientBg = useColorModeValue(
    "linear(135deg, red.400, pink.400, purple.500)",
    "linear(135deg, red.500, pink.500, purple.600)"
  );
  const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)");
  const progressBg = useColorModeValue("red.100", "red.900");


  // ✅ Funciones después de los hooks
  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Por favor, sube solo archivos de imagen');
        return;
      }
      
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const clearImage = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!preview) {
      toast.warning("¡Agrega una imagen para hacer tu publicación más atractiva!");
      return;
    }
     const payload = user?.role === "DEVELOPER_ROLE" 
      ? { description, image: preview, area }
      : { description, image: preview };
    handleCreatePublication(payload);
    setDescription("");
    setPreview(null);
    setArea("");
    clearImage();
  };

  const getFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1048576) return `${Math.round(size / 1024)} KB`;
    return `${Math.round(size / 1048576)} MB`;
  };

  return (
    <Box bg={bgPrimary} minH="100vh" py={8} px={4}>
      <Box maxW="600px" mx="auto">
        <VStack spacing={8} align="stretch">

           {/* ✅ Select condicional DESPUÉS de todos los hooks */}
          {user?.role === "DEVELOPER_ROLE" && (
            <Select
              placeholder="Selecciona un área"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              size="lg"
              borderRadius="xl"
              borderColor={cardBorder}
              _focus={{ borderColor: accentColor, shadow: `0 0 0 2px ${accentColor}55` }}
            >
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
              <option value="RRHH">Recursos Humanos</option>
            </Select>
          )}
          
          {/* Header impresionante */}
          <Box textAlign="center" mb={4}>
            <VStack spacing={3}>
              <Box
                position="relative"
                display="inline-block"
                animation={`${floatAnimation} 3s ease-in-out infinite`}
              >
                <Image
                  src={"/img/logosamboro.png"}
                  w={12}
                  h={12}
                  color={accentColor}
                  filter="drop-shadow(0 4px 8px rgba(229, 62, 62, 0.3))"
                />
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="60px"
                  h="60px"
                  bg={accentColor}
                  rounded="full"
                  opacity="0.1"
                  animation={`${pulseGlow} 2s infinite`}
                />
              </Box>
              
              <VStack spacing={2}>
                <Text
                  fontSize="3xl"
                  fontWeight="800"
                  bgGradient={gradientBg}
                  bgClip="text"
                  textAlign="center"
                >
                  Crear Publicación
                </Text>
                <Text color={textSecondary} fontSize="lg" fontWeight="500">
                  Comparte momentos increíbles con tu comunidad
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Formulario principal */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg={cardBg}
            shadow={`0 20px 40px ${shadowColor}`}
            borderRadius="3xl"
            p={8}
            border="1px solid"
            borderColor={cardBorder}
            position="relative"
            overflow="hidden"
          >
            
            {/* Efecto de brillo de fondo */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              h="2px"
              bgGradient={gradientBg}
              opacity="0.8"
            />

            <VStack spacing={6} align="stretch">
              
              {/* Header del usuario */}
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  src={user?.profilePhoto || "/img/logosamboro.png"}
                  ring="3px"
                  ringColor={accentColor}
                  ringOffset="2px"
                />
                <VStack align="start" spacing={1}>
                  <Text fontWeight="700" fontSize="lg" color={textPrimary}>
                    {user?.username}
                  </Text>
                  <Badge colorScheme="red" rounded="full" px={3} py={1}>
                    Creando publicación
                  </Badge>
                </VStack>
              </HStack>

              {/* Textarea elegante */}
              <Box position="relative">
                <Textarea
                  placeholder="¿Qué quieres compartir hoy? Escribe algo increíble..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  size="lg"
                  minH="50px"
                  resize="none"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  border="2px solid transparent"
                  borderRadius="2xl"
                  fontSize="lg"
                  fontWeight="500"
                  _focus={{
                    bg: cardBg,
                    borderColor: accentColor,
                    shadow: `0 0 0 3px ${accentColor}33`,
                  }}
                  _placeholder={{
                    color: textMuted,
                    fontSize: "md"
                  }}
                  transition="all 0.3s ease"
                />
                <Icon
                  as={FiEdit3}
                  position="absolute"
                  top="16px"
                  right="16px"
                  color={textMuted}
                  w={5}
                  h={5}
                />
              </Box>

              {/* Zona de Drag & Drop impresionante */}
              <Box position="relative">
                <Box
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  w="full"
                  h={preview ? "auto" : "300px"}
                  border="3px dashed"
                  borderColor={
                    dragging ? dragActiveBorder : 
                    isHovering ? accentColor : 
                    cardBorder
                  }
                  borderRadius="3xl"
                  bg={
                    dragging ? dragActiveBg :
                    isHovering ? `${accentColor}08` :
                    "transparent"
                  }
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  transform={dragging ? "scale(1.02)" : "scale(1)"}
                  _hover={{
                    borderColor: accentColor,
                    bg: `${accentColor}05`,
                    transform: "scale(1.01)"
                  }}
                  onClick={() => document.getElementById('file-input').click()}
                >
                  
                  {/* Input oculto */}
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: 'none' }}
                  />

                  {preview ? (
                    // Vista previa de la imagen
                    <Box position="relative" animation={`${bounceIn} 0.5s ease-out`}>
                      <Image
                        src={preview}
                        alt="Vista previa"
                        w="full"
                        maxH="400px"
                        objectFit="cover"
                        borderRadius="2xl"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.02)" }}
                      />
                      
                      {/* Overlay con información */}
                      <Box
                        position="absolute"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        bg="blackAlpha.600"
                        borderRadius="2xl"
                        opacity="0"
                        transition="opacity 0.3s"
                        _hover={{ opacity: "1" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <VStack spacing={3}>
                          <Icon as={FiCamera} w={8} h={8} color="white" />
                          <Text color="white" fontWeight="600" fontSize="lg">
                            Cambiar imagen
                          </Text>
                          {file && (
                            <Text color="whiteAlpha.800" fontSize="sm">
                              {getFileSize(file.size)} • {file.type.split('/')[1].toUpperCase()}
                            </Text>
                          )}
                        </VStack>
                      </Box>

                      {/* Botón eliminar */}
                      <Tooltip label="Eliminar imagen" placement="left">
                        <IconButton
                          position="absolute"
                          top="12px"
                          right="12px"
                          icon={<FiX />}
                          size="sm"
                          colorScheme="red"
                          rounded="full"
                          onClick={(e) => {
                            e.stopPropagation();
                            clearImage();
                          }}
                          _hover={{ transform: "scale(1.1)" }}
                          transition="transform 0.2s"
                        />
                      </Tooltip>
                    </Box>
                  ) : (
                    // Zona de drop vacía
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      h="full"
                      p={8}
                    >
                      <VStack spacing={6}>
                        <Box
                          position="relative"
                          animation={dragging ? `${floatAnimation} 1s ease-in-out infinite` : "none"}
                        >
                          <Icon
                            as={dragging ? BsCloudUpload : FiUploadCloud}
                            w={16}
                            h={16}
                            color={dragging ? accentColor : textMuted}
                            transition="all 0.3s"
                          />
                          {dragging && (
                            <Box
                              position="absolute"
                              top="50%"
                              left="50%"
                              transform="translate(-50%, -50%)"
                              w="80px"
                              h="80px"
                              border="2px solid"
                              borderColor={accentColor}
                              rounded="full"
                              opacity="0.3"
                              animation={`${pulseGlow} 1.5s infinite`}
                            />
                          )}
                        </Box>
                        
                        <VStack spacing={2} textAlign="center">
                          <Text
                            fontSize="xl"
                            fontWeight="700"
                            color={dragging ? accentColor : textPrimary}
                            transition="color 0.3s"
                          >
                            {dragging ? "¡Suelta aquí tu imagen!" : "Arrastra tu imagen aquí"}
                          </Text>
                          <Text color={textSecondary} fontSize="md">
                            o haz clic para seleccionar
                          </Text>
                          <HStack spacing={2} color={textMuted} fontSize="sm">
                            <Icon as={FiImage} />
                            <Text>PNG, JPG, GIF hasta 50MB</Text>
                          </HStack>
                        </VStack>

                        {!dragging && (
                          <Button
                            size="lg"
                            colorScheme="red"
                            variant="outline"
                            rounded="full"
                            leftIcon={<FiCamera />}
                            _hover={{
                              bg: accentColor,
                              color: "white",
                              transform: "scale(1.05)"
                            }}
                            transition="all 0.2s"
                          >
                            Seleccionar archivo
                          </Button>
                        )}
                      </VStack>
                    </Flex>
                  )}
                </Box>
              </Box>

              {/* Barra de progreso durante carga */}
              {loading && (
                <Box>
                  <Progress
                    size="lg"
                    colorScheme="red"
                    isIndeterminate
                    borderRadius="full"
                    bg={progressBg}
                  />
                  <Text mt={2} textAlign="center" color={textSecondary} fontSize="sm">
                    Subiendo tu publicación...
                  </Text>
                </Box>
              )}

              {/* Mensajes de estado */}
              {success && (
                <Alert
                  status="success"
                  borderRadius="xl"
                  bg={bgPrimary}
                  border="1px solid"
                  borderColor="green.200"
                  animation={`${bounceIn} 0.5s ease-out`}
                >
                  <AlertIcon />
                  <Box>
                    <AlertTitle bg={bgPrimary}>¡Publicación creada!</AlertTitle>
                    <AlertDescription>
                      Tu contenido se ha compartido exitosamente.
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

              {error && (
                <Alert
                  status="error"
                  borderRadius="xl"
                  bg={bgPrimary}
                  border="1px solid"
                  borderColor="red.200"
                  animation={`${bounceIn} 0.5s ease-out`}
                >
                  <AlertIcon />
                  <Box>
                    <AlertTitle >Error al publicar</AlertTitle>
                    <AlertDescription >{error}</AlertDescription>
                  </Box>
                </Alert>
              )}

              {/* Botón de envío espectacular */}
              <Button
                type="submit"
                size="xl"
                h="60px"
                w="full"
                bg={accentColor}
                color="white"
                fontSize="lg"
                fontWeight="800"
                rounded="2xl"
                leftIcon={<Icon as={FiSend} w={5} h={5} />}
                isLoading={loading}
                loadingText="Publicando..."
                _hover={{
                  bg: accentHover,
                  transform: "translateY(-2px)",
                  shadow: `0 10px 25px ${accentColor}40`,
                }}
                _active={{
                  transform: "translateY(0)",
                }}
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                position="relative"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "0",
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                }}
              >
                {loading ? "Creando magia..." : "Compartir con la comunidad"}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};