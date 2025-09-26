import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Topo com Logo */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.logoBlue}>Fin</Text>market
        </Text>
      </View>

      {/* Conteúdo */}
      <View style={styles.form}>
        <Text style={styles.title}>Entrar</Text>

        {/* Email */}
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Digite seu email"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            style={styles.input}
          />
        </View>

        {/* Senha */}
        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color="#fff" style={styles.icon} />
          <TextInput
            placeholder="Digite a senha"
            placeholderTextColor="#ccc"
            secureTextEntry
            style={styles.input}
          />
        </View>

        {/* Botão Acessar */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("MainTabs")}
        >
          <Text style={styles.primaryText}>Acessar</Text>
        </TouchableOpacity>

        {/* Esqueceu a senha */}
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>

        {/* Separador */}
        <Text style={styles.orText}>ou</Text>

        {/* Botão Google */}
        <TouchableOpacity style={styles.googleButton}>
          <AntDesign name="google" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.googleText}>Entrar com Google</Text>
        </TouchableOpacity>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Ainda não possui conta?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Cadastro")}
          >
            Cadastre-se
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A1033",
    alignItems: "center",
  },
  header: {
    width: "110%",
    height: 270,
    backgroundColor: "#D9D9D9",
    borderBottomRightRadius: 200,
    borderBottomStartRadius: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
  },
  logoBlue: {
    color: "#1A73E8", // azul do "Fin"
  },
  form: {
    marginTop: 30,
    width: "80%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    marginBottom: 15,
    paddingBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotText: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  primaryButton: {
    backgroundColor: "#1A73E8",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#fff",
    textAlign: "center",
    marginVertical: 15,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3A3A3A",
    paddingVertical: 12,
    borderRadius: 12,
  },
  googleText: {
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#1A73E8",
  },
});