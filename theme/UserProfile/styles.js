import { StyleSheet } from "react-native";

export default StyleSheet.create({

  // Contenedor principal de toda la pantalla
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB", // Fondo gris claro 
  },

  // Encabezado con botón de regreso y título
  header: {
    flexDirection: "row", 
    alignItems: "center", 
    paddingTop: 50, 
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#EEE", // Color de fondo gris claro
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Línea inferior sutil
  },

  // Título centrado del encabezado
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    flex: 1, 
    textAlign: "center",
    marginRight: 40, 
  },

  // Botón de retroceso
  backButton: {
    padding: 5, 
  },

  backButtonText: {
    fontSize: 16,
    color: "#007bff", // Azul 
  },

  // Contenedor de todo el contenido debajo del encabezado
  content: {
    flex: 1,
    padding: 20, 
  },

  // Contenedor del avatar y nombre del usuario
  profileHeader: {
    alignItems: "center", 
    marginBottom: 30, 
  },

  // Estilo para la imagen del avatar
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60, 
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#007bff", // Borde azul 
  },

  // Nombre del usuario
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  // Contenedor de la información personal del perfil
  profileInfo: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // Sombra en Android
  },

  // Título de la sección de información
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },

  // Fila para mostrar etiqueta y valor 
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0", // Línea gris 
  },

  // Etiqueta Email:
  infoLabel: {
    flex: 1,
    fontSize: 16,
    color: "#666",
  },

  // Valor correspondiente correo@email.com
  infoValue: {
    flex: 2,
    fontSize: 16,
    color: "#333",
  },

  // Etiqueta encima de cada input
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },

  // Input de texto editable 
  input: {
    borderWidth: 1,
    borderColor: "#DDD", 
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
  },

  // Botón "Cerrar sesión"
  close: {
    backgroundColor: "#E05247", // Rojo suave
  },

  // Contenedor para los botones de edición
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },

  // Estilo base para todos los botones
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
  },

  // Botón azul para "Editar perfil"
  editButton: {
    backgroundColor: "#007bff",
  },

  // Botón verde para "Guardar cambios"
  saveButton: {
    backgroundColor: "#28a745",
  },

  // Botón gris para "Cancelar edición"
  cancelButton: {
    backgroundColor: "#6c757d",
  },

  // Texto de todos los botones
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
});
