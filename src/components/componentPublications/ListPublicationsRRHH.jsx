import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  Avatar,
  Spinner,
  Button,
  Divider,
  IconButton,
  Flex,
  useColorModeValue,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Collapse,
  Badge,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from "@chakra-ui/react";

import { FiPlus, FiX } from "react-icons/fi";

import { keyframes } from "@emotion/react";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { FaRegCommentDots, FaPaperPlane, FaEllipsisH } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import React, { useState, useEffect, useContext } from "react";
import { usePublicationsRRHH } from "../../shared/hooks/Publications/useListPublicationsRRHH";
import { useToggleLike } from "../../shared/hooks/Publications/useLikePublications";
import { toast } from "react-toastify";
import { CreatePublication } from "./AddPublications";
import EditPublication from "./UpdatePublications";
import { CommentsSection } from "../Comments/AddCommets";
import { AppContext } from "../AppContext/AppContext";

// Animaciones
const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slowGlow = keyframes`
  0%, 100% { text-shadow: 0 0 3px rgba(255,255,255,0.3); transform: scale(1); }
  50% { text-shadow: 0 0 12px rgba(255,255,255,0.5); transform: scale(1.05); }
`;

export const ListPublicationsRRHH = () => {
  const { publications, loading, error, refresh } = usePublicationsRRHH();
  const [expandedComments, setExpandedComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [likedPosts, setLikedPosts] = useState({});
  const [loadingActions, setLoadingActions] = useState({});
  const [selectedPub, setSelectedPub] = useState(null);

  // Estados para el manejo completo de comentarios
  const {
    isOpen: isCommentsOpen,
    onOpen: onCommentsOpen,
    onClose: onCommentsClose,
  } = useDisclosure();
  const [selectedCommentsPub, setSelectedCommentsPub] = useState(null);

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const gradientColors = useColorModeValue(
    "linear(to-r, #000000ff, #141414ff, #e2e2e2ff)", // modo claro
    "linear(to-r, #e7e7e7ff, #bdbdbdff, #9b9b9bff)" // modo oscuro
  );

  const {
    handleToggleLike,
    loading: likeLoading,
    error: likeError,
  } = useToggleLike();

  // Estados para manejo completo de likes
  const [likesCountByPub, setLikesCountByPub] = useState({});
  const [likesByPub, setLikesByPub] = useState({});
  const { user } = useContext(AppContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!user || !publications) return;
    const liked = {};
    publications.forEach((pub) => {
      if (pub.likes && Array.isArray(pub.likes)) {
        liked[pub._id] = pub.likes.some((likeUser) => likeUser.uid === user._id);
      }
    });
    setLikedPosts(liked);
  }, [user, publications]);

  // Armonía de colores basada en tu login
  const bgPrimary = useColorModeValue("alphaWhite", "gray.900");
  const bgBox = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardBorder = useColorModeValue("gray.100", "gray.700");
  const textPrimary = useColorModeValue("gray.800", "white");
  const textSecondary = useColorModeValue("gray.600", "gray.400");
  const textMuted = useColorModeValue("gray.500", "gray.500");
  const accentColor = useColorModeValue("#E53E3E", "#E53E3E"); // Rojo de tu branding
  const accentHover = useColorModeValue("#C53030", "#C53030");
  const buttonHover = useColorModeValue("gray.50", "gray.700");
  const commentBg = useColorModeValue("gray.50", "gray.700");
  const likeColor = useColorModeValue("#3182CE", "#63B3ED");
  const shadowColor = useColorModeValue("rgba(0,0,0,0.1)", "rgba(0,0,0,0.3)");

  const openCommentsModal = (pub) => {
    setSelectedCommentsPub(pub);
    onCommentsOpen();
  };

  const handleLike = async (pubId) => {
    if (!user?._id) {
      console.error("Usuario no autenticado", user);
      return;
    }

    setLoadingActions((prev) => ({ ...prev, [`like_${pubId}`]: true }));

    try {
      const res = await handleToggleLike(pubId);
      console.log("Respuesta del handleToggleLike:", res);

      if (res?.success) {
        // Actualizar el estado de like del usuario actual
        const newLikedState = !likedPosts[pubId];
        setLikedPosts((prev) => ({
          ...prev,
          [pubId]: newLikedState,
        }));

        // Acceder a res.likes (no res.data.likes) porque tu hook ya lo extrae
        if (res.likes && Array.isArray(res.likes)) {
          setLikesByPub((prev) => ({
            ...prev,
            [pubId]: res.likes,
          }));
          setLikesCountByPub((prev) => ({
            ...prev,
            [pubId]: res.likes.length,
          }));

          // También actualizar el objeto publication en memoria
          publications.forEach((pub) => {
            if (pub._id === pubId) {
              pub.likes = res.likes;
            }
          });
        } else if (res.likesCount !== undefined) {
          // Fallback: usar likesCount si viene
          setLikesCountByPub((prev) => ({
            ...prev,
            [pubId]: res.likesCount,
          }));
        }
      } else {
        console.error("Error en la respuesta del servidor:", res);
        // Opcional: mostrar mensaje de error al usuario
        toast.error(res.msg || "Error al procesar like");
      }
    } catch (error) {
      console.error("Error al procesar like:", error);
      toast.error("Error inesperado al procesar like");
    } finally {
      setLoadingActions((prev) => ({ ...prev, [`like_${pubId}`]: false }));
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Ahora";
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInDays < 7) return `${diffInDays}d`;
    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  if (loading) {
    return (
      <Box bg={bgPrimary} minH="100vh" py={8}>
        <Flex justify="center" align="center" minH="300px">
          <VStack spacing={4}>
            <Box position="relative">
              <Spinner
                size="xl"
                color={accentColor}
                thickness="4px"
                animation={`${pulseAnimation} 2s infinite`}
              />
            </Box>
            <Text color={textSecondary} fontSize="lg" fontWeight="500">
              Cargando publicaciones...
            </Text>
          </VStack>
        </Flex>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg={bgPrimary} minH="100vh" py={8}>
        <Box
          bg={cardBg}
          border="2px"
          borderColor="red.200"
          p={8}
          rounded="2xl"
          maxW="500px"
          mx="auto"
          shadow="xl"
        >
          <VStack spacing={4}>
            <Text
              color="red.500"
              textAlign="center"
              fontSize="lg"
              fontWeight="600"
            >
              {error}
            </Text>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={refresh}
              size="lg"
              rounded="xl"
              _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
              transition="all 0.2s"
            >
              Reintentar
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box bg={bgPrimary} minH="100vh" py={6}>
      {/* Modal con CreatePublication */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="3xl" p={4} bg={bgBox}>
          <ModalCloseButton />
          <ModalBody p={0}>
            <CreatePublication onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal para editar publicación */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => {
          setSelectedPub(null);
          onEditClose();
        }}
        size="xl"
        scrollBehavior="inside"
        isCentered
      >
        <ModalOverlay />
        <ModalContent borderRadius="3xl" p={4} bg={bgBox}>
          <ModalCloseButton />
          <ModalBody p={0}>
            {selectedPub && (
              <EditPublication
                publication={selectedPub}
                onClose={() => {
                  setSelectedPub(null);
                  onEditClose();
                }}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Box mb={6} textAlign="center">
        <Text
          fontSize={{ base: "2xl", md: "2xl" }}
          fontWeight="extrabold"
          animation={`${slowGlow} 3s ease-in-out infinite`} // animación más lenta
          bgGradient={gradientColors}
          bgClip="text"
          letterSpacing="wide"
        >
          RRHH
        </Text>
      </Box>
      <Box maxW="650px" mx="auto" px={4}>
        <VStack spacing={6} align="stretch">
          {publications.map((pub, index) => {
            const likesForPub = likesByPub[pub._id] || pub.likes || [];
            return (
              <Box
                key={pub._id}
                bg={cardBg}
                shadow={`0 4px 20px ${shadowColor}`}
                borderWidth="1px"
                borderColor={cardBorder}
                borderRadius="2xl"
                overflow="hidden"
                transition="all 0.3s ease"
                _hover={{
                  shadow: `0 8px 30px ${shadowColor}`,
                  transform: "translateY(-2px)",
                }}
                animation={`${slideIn} 0.6s ease-out ${index * 0.1}s both`}
              >
                {/* Header elegante */}
                <Box p={5} pb={4}>
                  <HStack spacing={4}>
                    <Box position="relative">
                      <Avatar
                        size="lg"
                        src={pub.author?.profilePhoto || "/img/logosamboro.png"}
                        ring="3px"
                        ringColor={accentColor}
                        ringOffset="2px"
                        transition="all 0.2s"
                        _hover={{ transform: "scale(1.05)" }}
                      />
                      <Box
                        position="absolute"
                        bottom="0"
                        right="0"
                        w="4"
                        h="4"
                        bg="green.400"
                        rounded="full"
                        border="2px solid"
                        borderColor={cardBg}
                      />
                    </Box>
                    <VStack align="start" spacing={1} flex={1}>
                      <Text
                        fontWeight="700"
                        fontSize="lg"
                        color={textPrimary}
                        _hover={{ color: accentColor }}
                        cursor="pointer"
                        transition="color 0.2s"
                      >
                        {pub.author?.username}
                      </Text>
                      <HStack spacing={2} align="center">
                        <Text fontSize="sm" color={textMuted} fontWeight="500">
                          {formatDate(pub.createdAt || pub.postedAt)}
                        </Text>
                        <Box w="3px" h="3px" bg={textMuted} rounded="full" />
                        <HStack spacing={1}>
                          <BiWorld size="14px" color="gray" />
                          <Text
                            fontSize="sm"
                            color={textMuted}
                            fontWeight="500"
                          >
                            Público
                          </Text>
                        </HStack>
                      </HStack>
                    </VStack>

                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="opciones"
                        icon={<FaEllipsisH />}
                        size="sm"
                        variant="ghost"
                        rounded="full"
                        color={textSecondary}
                        _hover={{ bg: buttonHover, color: textPrimary }}
                        transition="all 0.2s"
                      />
                      <MenuList>
                        {user?.role === "DEVELOPER_ROLE" ||
                        user?.username === pub.author?.username ? (
                          <>
                            <MenuItem
                              onClick={() => {
                                setSelectedPub(pub);
                                onEditOpen();
                              }}
                            >
                              Editar
                            </MenuItem>
                            <MenuItem
                              onClick={() => {
                                console.log("Eliminar publicación:", pub._id);
                                // aquí luego armamos delete
                              }}
                              color="red.500"
                            >
                              Eliminar
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem isDisabled>No tienes permisos</MenuItem>
                        )}
                      </MenuList>
                    </Menu>
                  </HStack>
                </Box>

                {/* Contenido */}
                {pub.description && (
                  <Box px={5} pb={4}>
                    <Text
                      fontSize="md"
                      lineHeight="1.6"
                      color={textPrimary}
                      fontWeight="400"
                    >
                      {pub.description}
                    </Text>
                  </Box>
                )}

                {/* Imagen con overlay suave */}
                {pub.image && (
                  <Box position="relative" overflow="hidden">
                    <Image
                      src={pub.image}
                      alt="Publicación"
                      w="full"
                      maxH="500px"
                      objectFit="cover"
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.02)" }}
                      fallback={
                        <Box
                          h="300px"
                          bg="gray.100"
                          display="flex"
                          align="center"
                          justify="center"
                          color="gray.500"
                        >
                          <Text fontSize="lg">Imagen no disponible</Text>
                        </Box>
                      }
                    />
                  </Box>
                )}

                {/* Estadísticas elegantes */}
                <Box px={5} py={3} borderBottom="1px" borderColor={cardBorder}>
                  <HStack justify="space-between">
                    <HStack spacing={3}>
                      <HStack spacing={1}>
                        <Box bg={likeColor} rounded="full" p="6px" shadow="sm">
                          <AiFillLike color="white" size="14px" />
                        </Box>
                      </HStack>
                      <HStack spacing={1}>
                        <Popover trigger="hover" placement="top">
                          <PopoverTrigger>
                            <Text
                              fontSize="sm"
                              color={textSecondary}
                              fontWeight="500"
                              cursor="pointer"
                              _hover={{
                                color: accentColor,
                                textDecoration: "underline",
                              }}
                            >
                              {likesForPub.length || 0} personas
                            </Text>
                          </PopoverTrigger>
                          <PopoverContent
                            w="200px"
                            bg={cardBg}
                            shadow="md"
                            borderColor={cardBorder}
                          >
                            <PopoverArrow />
                            <PopoverBody>
                              <VStack align="start" spacing={2}>
                                {likesForPub.length > 0 ? (
                                  likesForPub.map((user) => (
                                    <HStack key={user._id || user.uid} spacing={2}>
                                      <Avatar
                                        size="xs"
                                        src={
                                          user.profilePhoto ||
                                          "/img/logosamboro.png"
                                        }
                                      />
                                      <Text fontSize="sm" fontWeight="500">
                                        {user.username}
                                      </Text>
                                    </HStack>
                                  ))
                                ) : (
                                  <Text fontSize="sm" color={textMuted}>
                                    Ningún like aún
                                  </Text>
                                )}
                              </VStack>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </HStack>
                    </HStack>

                    <Text
                      fontSize="sm"
                      color={textSecondary}
                      cursor="pointer"
                      fontWeight="500"
                      _hover={{
                        color: accentColor,
                        textDecoration: "underline",
                      }}
                      transition="all 0.2s"
                      onClick={() => openCommentsModal(pub)}
                    >
                      {pub.comments?.length || 0} comentarios
                    </Text>
                  </HStack>
                </Box>

                {/* Botones de acción modernos */}
                <HStack spacing={0} p={2}>
                  <Button
                    leftIcon={
                      likedPosts[pub._id] ? (
                        <AiFillLike size="18px" />
                      ) : (
                        <AiOutlineLike size="18px" />
                      )
                    }
                    variant="ghost"
                    size="lg"
                    flex={1}
                    color={likedPosts[pub._id] ? likeColor : textSecondary}
                    fontWeight={likedPosts[pub._id] ? "700" : "600"}
                    _hover={{
                      bg: buttonHover,
                      color: likedPosts[pub._id] ? likeColor : textPrimary,
                      transform: "scale(1.02)",
                    }}
                    onClick={() => handleLike(pub._id)}
                    rounded="xl"
                    isLoading={loadingActions[`like_${pub._id}`]}
                    transition="all 0.2s"
                  >
                    Me gusta
                  </Button>

                  <Button
                    leftIcon={<FaRegCommentDots size="16px" />}
                    variant="ghost"
                    size="lg"
                    flex={1}
                    color={textSecondary}
                    fontWeight="600"
                    _hover={{
                      bg: buttonHover,
                      color: textPrimary,
                      transform: "scale(1.02)",
                    }}
                    onClick={() => openCommentsModal(pub)}
                    rounded="xl"
                    transition="all 0.2s"
                  >
                    Comentar
                  </Button>
                </HStack>

                {/* Modal para mostrar sección de comentarios */}
                <Modal
                  isOpen={isCommentsOpen}
                  onClose={() => {
                    setSelectedCommentsPub(null);
                    onCommentsClose();
                  }}
                  size="xl"
                  scrollBehavior="inside"
                  isCentered
                >
                  <ModalOverlay />
                  <ModalContent borderRadius="3xl" p={4} bg={cardBg}>
                    <ModalCloseButton />
                    <ModalBody p={0}>
                      {selectedCommentsPub && (
                        <CommentsSection
                          comments={selectedCommentsPub.comments || []}
                          user={user}
                          isOpen={true} // ya está en modal, se puede ignorar si isOpen controla collapse internamente
                          publicationId={selectedCommentsPub._id}
                        />
                      )}
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            );
          })}
        </VStack>
      </Box>
    </Box>
  );
};