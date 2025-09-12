import { ComponentRegister } from "../components/ComponentRegister"
import { Box } from "@chakra-ui/react"
import { Navbar } from "../components/navbar/Navbar"
export const Register = () => {
  return (
    <>
      <Navbar />
      <Box pt="5px">   {/* Ajusta según la altura real del Navbar */}
        <ComponentRegister />
      </Box>
    </>
  )
}