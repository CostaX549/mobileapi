import { Button, SafeAreaView, Text } from "react-native"
import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import { logout } from "../services/AuthService"

export default function() {
    const { user, setUser } = useContext(AuthContext)

    async function handleLogout() {
        await logout();
        setUser(null)
    }

    return (
        <SafeAreaView>
            <Text>Welcome home, {user.name}</Text>
            <Button title="Logout" onPress={handleLogout} />
        </SafeAreaView>
    )
}