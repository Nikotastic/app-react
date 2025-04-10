import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  topRightWave: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 0,
    width: "100%",
    height: 200,
  },
  formContainer: {
    zIndex: 1,
    paddingHorizontal: 30,
    paddingTop: 80,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  showPasswordButton: {
    paddingHorizontal: 10,
  },
  showPasswordText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  actionButton: {
    backgroundColor: "#4285F4",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  switchButton: {
    marginTop: 20,
  },
  switchButtonText: {
    color: "#4285F4",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
