
import { useContext, useState } from "react";
import { SafeAreaView,  View, StyleSheet, Button, Platform } from "react-native"
import FormTextField from "../components/FormTextField"
import AuthContext from "../contexts/AuthContext"
import { register, loadUser } from "../services/AuthService"




export default function({ navigation }) {
   
    const { setUser } = useContext(AuthContext)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errors, setErrors] = useState({});

   async function handleRegister() {
      setErrors({})
       try {
     await register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            device_name: `${Platform.OS} ${Platform.Version}`
          })
         const user =  await loadUser()
         setUser(user)
         navigation.replace("Home")
        } catch (e) {
           if(e.response?.status === 422) {
            setErrors(e.response.data.errors)
           } else {
            console.log(e)
           }
        }
    }

    return (
        <SafeAreaView style={styles.wrapper}>
            <View style={styles.container}>
            <FormTextField 
             label="Your name:"  
             value={name} 
             onChangeText={(text) => setName(text)} 
           
             errors={errors.name}
             />   
             <FormTextField 
             label="Email address:"  
             value={email} 
             onChangeText={(text) => setEmail(text)} 
             keyBoardType="email-address"
             errors={errors.email}
             />
             <FormTextField label="Password:" 
             secureTextEntry={true}
             value={password} 
             onChangeText={(text) => setPassword(text)} 
             errors={errors.password}
             
             />
            <FormTextField label="Password confirmation:" 
             secureTextEntry={true}
             value={passwordConfirmation} 
             onChangeText={(text) => setPasswordConfirmation(text)} 
             errors={errors.password_confirmation}
             
             />
             <Button title="Register now" onPress={handleRegister} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    wrapper: {backgroundColor: "#fff", flex: 1},
    container: {padding: 20, rowGap: 16}
})