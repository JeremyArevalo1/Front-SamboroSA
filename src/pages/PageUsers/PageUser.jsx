import { ListUsers } from "../../components/componentUser/ListUsers"
import { Navbar } from "../../components/navbar/Navbar"

export const PageUser = () => {
    return (
        <>
        <Navbar/>
        <div style={{ marginTop: '30px' }}/>
        <ListUsers/>
        </>
    )
}