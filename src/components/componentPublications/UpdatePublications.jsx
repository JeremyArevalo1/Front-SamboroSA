import React, { useState, useEffect, useContext } from "react";
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
} from "@chakra-ui/react";
import {
  FiUploadCloud,
  FiImage,
  FiX,
  FiCamera,
  FiEdit3,
  FiSend,
} from "react-icons/fi";

import { keyframes } from "@emotion/react";
import { BsCloudUpload } from "react-icons/bs";
import { useUpdatePublication } from "../../shared/hooks/Publications/useUpdatePublications";
import { toast } from "react-toastify";
import { AppContext } from "../AppContext/AppContext";

// Animaciones (igual que en CreatePublication)
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.4); }
  70% { box-shadow: 0 0 0 20px rgba(229, 62, 62, 0); }
  100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
`;

const bounceIn = keyframes`
  0% { transform: scale(0.3); opacity: 0; }
  50% { transform: scale(1.05); }
  70% { transform: scale(0.9); }
  100% { transform: scale(1); opacity: 1; }
`;

const EditPublication = ({ publication, onClose }) => {
  // publication: objeto con { _id, description, image, ... }

  const [description, setDescription] = useState(publication?.description || "");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(publication?.image || null);
  const [dragging, setDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { user } = useContext(AppContext)

  const { loading, error, success, handleEditPublication } = useUpdatePublication();

  // Colores (igual que CreatePublication)
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

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];

      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Por favor, sube solo archivos de imagen");
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
    // Enviar id, descripción e imagen (base64 o url)
    handleEditPublication({ id: publication._id, description, image: preview });
    if (onClose) onClose();
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
          {/* Header */}
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
                  Editar Publicación
                </Text>
                <Text color={textSecondary} fontSize="lg" fontWeight="500">
                  Modifica tu publicación y comparte novedades
                </Text>
              </VStack>
            </VStack>
          </Box>

          {/* Formulario */}
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
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              height="2px"
              bgGradient={gradientBg}
              opacity="0.8"
            />

            <VStack spacing={6} align="stretch">
              {/* Usuario */}
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
                    Editando publicación
                  </Badge>
                </VStack>
              </HStack>

              {/* Textarea */}
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
                    fontSize: "md",
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

              {/* Drag & Drop */}
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
                    dragging ? dragActiveBorder : isHovering ? accentColor : cardBorder
                  }
                  borderRadius="3xl"
                  bg={dragging ? dragActiveBg : isHovering ? `${accentColor}08` : "transparent"}
                  cursor="pointer"
                  position="relative"
                  overflow="hidden"
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  transform={dragging ? "scale(1.02)" : "scale(1)"}
                  _hover={{
                    borderColor: accentColor,
                    bg: `${accentColor}05`,
                    transform: "scale(1.01)",
                  }}
                  onClick={() => document.getElementById("file-input").click()}
                >
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />

                  {preview ? (
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
                              {getFileSize(file.size)} • {file.type.split("/")[1].toUpperCase()}
                            </Text>
                          )}
                        </VStack>
                      </Box>
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
                    <Flex direction="column" align="center" justify="center" h="full" p={8}>
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
                              transform: "scale(1.05)",
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

              {/* Barra de progreso */}
              {loading && (
                <Box>
                  <Progress
                    size="lg"
                    colorScheme="red"
                    isIndeterminate
                    borderRadius="full"
                    bg={useColorModeValue("red.100", "red.900")}
                  />
                  <Text mt={2} textAlign="center" color={textSecondary} fontSize="sm">
                    Actualizando tu publicación...
                  </Text>
                </Box>
              )}

              {/* Mensajes de estado */}
              {success && (
                <Alert
                  status="success"
                  borderRadius="xl"
                  bg={useColorModeValue("gray.50", "gray.700")}
                  border="1px solid"
                  borderColor="green.200"
                  animation={`${bounceIn} 0.5s ease-out`}
                >
                  <AlertIcon />
                  <Box>
                    <AlertTitle>¡Publicación actualizada!</AlertTitle>
                    <AlertDescription>
                      Tu contenido se ha modificado exitosamente.
                    </AlertDescription>
                  </Box>
                </Alert>
              )}

              {error && (
                <Alert
                  status="error"
                  borderRadius="xl"
                  bg="red.50"
                  border="1px solid"
                  borderColor="red.200"
                  animation={`${bounceIn} 0.5s ease-out`}
                >
                  <AlertIcon />
                  <Box>
                    <AlertTitle>Error al actualizar</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Box>
                </Alert>
              )}

              {/* Botón enviar */}
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
                loadingText="Actualizando..."
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
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transition: "left 0.5s",
                }}
              >
                {loading ? "Actualizando magia..." : "Actualizar publicación"}
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditPublication;
