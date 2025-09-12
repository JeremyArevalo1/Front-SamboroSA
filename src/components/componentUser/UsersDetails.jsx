import React, { useState, useEffect } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Icon,
  useColorModeValue,
  Spinner,
  Center,
  Divider,
  Badge,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import {
  FaEnvelope,
  FaUser,
  FaCalendarAlt,
  FaShieldAlt,
  FaIdCard,
  FaCode,
  FaBullhorn,
  FaUserCog,
  FaUsers,
  FaDesktop,
  FaChartLine,
  FaLaptopCode,
  FaSignature,
  FaUserCircle,
  FaStar,
  FaCrown,
} from "react-icons/fa";
import { useSearchUser } from "../../shared/hooks/User/useSearchUsers";

// Animaciones mejoradas
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const UserDetail = ({ userId }) => {
  const [animationDelay, setAnimationDelay] = useState(0);

  if (!userId) return null;

  const { userData, loading, error } = useSearchUser(userId);

  // Colores mejorados
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("#e2e8f0", "#334155");
  const textPrimary = useColorModeValue("#1e293b", "#f1f5f9");
  const textSecondary = useColorModeValue("#64748b", "#94a3b8");
  const shadowColor = useColorModeValue(
    "rgba(0, 0, 0, 0.1)",
    "rgba(0, 0, 0, 0.3)"
  );

  // Configuración de iconos por rol con más personalidad
  const getRoleConfig = (role) => {
    const roleConfigs = {
      DEVELOPER_ROLE: {
        bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        icon: FaLaptopCode,
        accent: "#667eea",
      },
      ADMIN_IT_ROLE: {
        bg: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        icon: FaCode,
        accent: "#f5576c",
      },
      ADMIN_MARKETING_ROLE: {
        bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        icon: FaBullhorn,
        accent: "#fcb69f",
      },
      ADMIN_RRHH_ROLE: {
        bg: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        icon: FaUserCog,
        accent: "#a8edea",
      },
      RRHH_ROLE: {
        bg: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
        icon: FaUsers,
        accent: "#74b9ff",
      },
      IT_ROLE: {
        bg: "linear-gradient(135deg, #00cec9 0%, #55a3ff 100%)",
        icon: FaDesktop,
        accent: "#00cec9",
      },
      MARKETING_ROLE: {
        bg: "linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)",
        icon: FaChartLine,
        accent: "#fd79a8",
      },
      OPERADOR_ROLE: {
        bg: "linear-gradient(135deg, #636e72 0%, #2d3436 100%)",
        icon: FaUser,
        accent: "#636e72",
      },
    };

    return (
      roleConfigs[role] || {
        bg: "linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)",
        icon: FaUser,
        label: "Usuario",
        accent: "#74b9ff",
      }
    );
  };

  const InfoCard = ({
    icon,
    label,
    value,
    bgColor,
    delay = 0,
    isSpecial = false,
  }) => (
    <Box animation={`${slideInLeft} 0.6s ease-out ${delay}s both`} w="full">
      <HStack
        spacing={4}
        p={5}
        bg={cardBg}
        borderRadius="2xl"
        border="2px solid transparent"
        transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        w="full"
        position="relative"
        overflow="hidden"
        _hover={{
          transform: "translateY(-8px) scale(1.02)",
          boxShadow: `0 20px 40px ${shadowColor}, 0 0 0 1px ${bgColor}`,
          borderColor: bgColor,
        }}
        _before={
          isSpecial
            ? {
                content: '""',
                position: "absolute",
                top: 0,
                left: "-100%",
                width: "100%",
                height: "100%",
                background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)`,
                animation: `${shimmer} 2s infinite`,
              }
            : {}
        }
      >
        <Box
          p={3}
          borderRadius="xl"
          bg={bgColor}
          position="relative"
          _hover={{
            animation: `${pulse} 0.6s ease-in-out`,
          }}
        >
          <Icon as={icon} boxSize={5} color="white" />
          {isSpecial && (
            <Box
              position="absolute"
              top="-2px"
              right="-2px"
              animation={`${float} 3s ease-in-out infinite`}
            >
              <Icon as={FaStar} boxSize={3} color="gold" />
            </Box>
          )}
        </Box>

        <VStack align="start" spacing={1} flex={1}>
          <HStack>
            <Text
              fontSize="xs"
              color={textSecondary}
              fontWeight="600"
              textTransform="uppercase"
              letterSpacing="1px"
            >
              {label}
            </Text>
            {isSpecial && (
              <Badge
                colorScheme="orange"
                size="sm"
                variant="subtle"
                animation={`${pulse} 2s infinite`}
              >
                VIP
              </Badge>
            )}
          </HStack>
          <Text
            fontSize="md"
            color={textPrimary}
            fontWeight="700"
            lineHeight="1.2"
          >
            {value}
          </Text>
        </VStack>

        {/* Efecto de brillo en hover */}
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)"
          transform="translateX(-100%)"
          transition="transform 0.6s"
          _groupHover={{
            transform: "translateX(100%)",
          }}
        />
      </HStack>
    </Box>
  );

  if (loading) {
    return (
      <Center py={12}>
        <VStack spacing={6}>
          <Box position="relative">
            <Spinner size="xl" color="#FF5E4D" thickness="4px" speed="0.8s" />
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              animation={`${pulse} 2s infinite`}
            >
              <Icon as={FaUserCircle} boxSize={8} color="#FF5E4D" />
            </Box>
          </Box>
          <VStack spacing={2}>
            <Text color="#FF5E4D" fontWeight="bold" fontSize="lg">
              Cargando información del usuario...
            </Text>
            <Text color={textSecondary} fontSize="sm">
              Preparando el perfil
            </Text>
          </VStack>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Box animation={`${fadeInUp} 0.6s ease-out`}>
            <Text
              color="red.500"
              fontSize="xl"
              textAlign="center"
              fontWeight="bold"
            >
              ¡Oops! Algo salió mal
            </Text>
            <Text color="red.400" fontSize="md" textAlign="center" mt={2}>
              {error}
            </Text>
          </Box>
        </VStack>
      </Center>
    );
  }

  if (!userData || userData.length === 0) {
    return (
      <Center py={12}>
        <VStack spacing={4} animation={`${fadeInUp} 0.6s ease-out`}>
          <Icon as={FaUserCircle} boxSize={16} color={textSecondary} />
          <Text color={textSecondary} fontSize="xl" fontWeight="semibold">
            Usuario no encontrado
          </Text>
          <Text color={textSecondary} fontSize="md">
            No se pudo cargar la información solicitada
          </Text>
        </VStack>
      </Center>
    );
  }

  const user = userData[0];
  const roleConfig = getRoleConfig(user.role);

  return (
    <Box bg={bgColor} p={8} minH="100vh">
      <VStack spacing={8} maxW="600px" mx="auto">
        {/* Header del perfil con avatar mejorado */}
        <Box animation={`${fadeInUp} 0.8s ease-out`}>
          <VStack spacing={6}>
            <Box position="relative">
              {/* Avatar con efectos */}
              <Box
                position="relative"
                _hover={{
                  transform: "translateY(-2px)",
                }}
              >
                <Avatar
                  src={user.profilePhoto || "/img/logosamboro.png"}
                  name={user.username || user.name}
                  size="2xl"
                  border="4px solid"
                  borderColor={roleConfig.accent}
                  boxShadow="0 20px 40px rgba(0, 0, 0, 0.15)"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: "scale(1.1) rotate(5deg)",
                  }}
                />


              </Box>
            </Box>
          </VStack>
        </Box>

        <Divider
          opacity={0.3}
          borderColor={roleConfig.accent}
          borderWidth="1px"
        />

        <VStack spacing={5} w="full">
          <InfoCard
            icon={FaUserCircle}
            label="Nombre"
            value={user.name}
            bgColor="rgba(125, 211, 252, 0.8)"
            delay={0.1}
          />

          <InfoCard
            icon={FaSignature}
            label="Apellido"
            value={user.surname}
            bgColor="rgba(252, 211, 77, 0.8)"
            delay={0.2}
          />

          <InfoCard
            icon={FaIdCard}
            label="Username"
            value={`@${user.username || "usuario"}`}
            bgColor="rgba(99, 102, 241, 0.8)"
            delay={0.3}
          />

          <InfoCard
            icon={FaEnvelope}
            label="Email"
            value={user.email}
            bgColor="rgba(255, 94, 77, 0.8)"
            delay={0.4}
          />

          <InfoCard
            icon={roleConfig.icon}
            label="Rol"
            value={user.role}  // Mostrar el rol original
            bgColor={roleConfig.accent}
            delay={0.5}
            isSpecial={user.role.startsWith("ADMIN_")}
         />

          <InfoCard
            icon={FaCalendarAlt}
            label="Fecha de Nacimiento"
            value={
              user.birthday
                ? new Date(user.birthday).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-- / -- / ----"
            }
            bgColor="rgba(59, 130, 246, 0.8)"
            delay={0.6}
          />

          {user.permissions && (
            <InfoCard
              icon={FaShieldAlt}
              label="Permisos"
              value={
                user.permissions && user.permissions.length > 0
                  ? user.permissions.join(", ")
                  : "Sin permisos"
              }
              bgColor="rgba(16, 185, 129, 0.8)"
              delay={0.7}
              isSpecial={user.permissions?.length > 0}
            />
          )}
        </VStack>
      </VStack>
    </Box>
  );
};
