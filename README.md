# 📱 DevList - Gestor de Tareas

<div align="center">


**Una aplicación móvil moderna y elegante para gestionar tus tareas diarias**

[![Expo](https://img.shields.io/badge/Expo-~52.0.42-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.76.9-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactnative.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-11.6.0-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)

</div>

---

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características](#-características)
- [Capturas de Pantalla](#-capturas-de-pantalla)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Ejecución](#-ejecución)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Funcionalidades Principales](#-funcionalidades-principales)
- [Configuración de Firebase](#-configuración-de-firebase)
- [Scripts Disponibles](#-scripts-disponibles)
- [Contribución](#-contribución)
- [Licencia](#-licencia)
- [Autor](#-autor)

---

## 📖 Descripción

**DevList** es una aplicación móvil multiplataforma desarrollada con React Native y Expo que permite a los usuarios gestionar sus tareas de manera eficiente y organizada. Con una interfaz moderna y animaciones fluidas, DevList ofrece una experiencia de usuario excepcional para la gestión de tareas personales y profesionales.

La aplicación incluye autenticación de usuarios mediante Firebase, perfiles personalizables, y una interfaz intuitiva con drag & drop para reorganizar tareas fácilmente.

---

## ✨ Características

- 🔐 **Autenticación Segura**: Sistema de inicio de sesión con Firebase Authentication
- 📝 **Gestión de Tareas**: Crea, edita, elimina y organiza tus tareas
- 🎨 **Interfaz Moderna**: Diseño limpio y atractivo con animaciones suaves
- 👤 **Perfil de Usuario**: Personaliza tu perfil con foto y datos personales
- 📅 **Calendario Integrado**: Visualiza y organiza tus tareas por fecha
- 🎭 **Animaciones Fluidas**: Experiencia de usuario mejorada con Lottie y React Native Animatable
- 📱 **Multiplataforma**: Compatible con iOS, Android y Web
- 🌙 **Splash Screen Personalizado**: Pantalla de bienvenida animada
- 🎯 **Drag & Drop**: Reorganiza tus tareas arrastrándolas
- 💾 **Persistencia de Datos**: Almacenamiento local con AsyncStorage

---

## 📸 Capturas de Pantalla

> _Próximamente: Agrega capturas de pantalla de tu aplicación aquí_

---

## 🛠 Tecnologías

### Core

- **React Native** `0.76.9` - Framework para desarrollo móvil
- **Expo** `~52.0.42` - Plataforma de desarrollo y despliegue
- **React** `18.3.1` - Biblioteca de UI

### Navegación

- **React Navigation** `7.x` - Sistema de navegación
  - Stack Navigator
  - Material Top Tabs

### UI/UX

- **React Native Paper** `5.13.1` - Componentes Material Design
- **Lottie React Native** `7.1.0` - Animaciones vectoriales
- **React Native Animatable** `1.4.0` - Animaciones predefinidas
- **Expo Linear Gradient** `14.0.2` - Gradientes lineales
- **React Native SVG** `15.8.0` - Soporte para SVG

### Backend & Autenticación

- **Firebase** `11.6.0` - Backend as a Service
  - Authentication
  - Firestore Database
  - Storage

### Funcionalidades Adicionales

- **React Native Calendars** `1.1310.0` - Componente de calendario
- **Expo Image Picker** `16.0.6` - Selección de imágenes
- **AsyncStorage** `1.23.1` - Almacenamiento local
- **React Native Gesture Handler** `2.20.2` - Gestos táctiles
- **React Native Reanimated** `3.16.1` - Animaciones de alto rendimiento
- **React Native Draggable FlatList** `4.0.1` - Listas arrastrables
- **Expo Haptics** `14.0.1` - Feedback háptico

---

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Expo CLI** (se instalará automáticamente)
- **Git**
- **Android Studio** (para desarrollo Android) o **Xcode** (para desarrollo iOS)
- Cuenta de **Firebase** (para autenticación y base de datos)

### Para desarrollo móvil:

- **Expo Go** app en tu dispositivo móvil ([iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Nikotastic/app-react.git
cd app-react
```

### 2. Instalar dependencias

```bash
npm install
```

o si prefieres yarn:

```bash
yarn install
```

### 3. Configurar Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita **Authentication** (Email/Password)
3. Crea una base de datos **Firestore**
4. Obtén las credenciales de configuración
5. Actualiza el archivo `firebaseConfig.js` con tus credenciales:

```javascript
// firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

const app = initializeApp(firebaseConfig);
export default app;
```

---

## ▶️ Ejecución

### Modo Desarrollo

```bash
npm start
```

Esto abrirá Expo DevTools en tu navegador. Desde ahí puedes:

- Escanear el código QR con **Expo Go** en tu dispositivo móvil
- Presionar `a` para abrir en emulador Android
- Presionar `i` para abrir en simulador iOS
- Presionar `w` para abrir en navegador web

### Ejecutar en Android

```bash
npm run android
```

### Ejecutar en iOS

```bash
npm run ios
```

### Ejecutar en Web

```bash
npm run web
```

---

## 📁 Estructura del Proyecto

```
app-react/
├── assets/                      # Recursos estáticos (imágenes, iconos)
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
├── components/                  # Componentes reutilizables
│   ├── MainTask/               # Componentes de la pantalla principal
│   ├── Signing/                # Componentes de autenticación
│   └── UserProfile/            # Componentes del perfil de usuario
├── screens/                     # Pantallas de la aplicación
│   ├── MainTaskScreen.js       # Pantalla principal de tareas
│   ├── SignInScreen.js         # Pantalla de inicio de sesión
│   ├── SplashScreen.js         # Pantalla de bienvenida
│   └── UserProfileScreen.js    # Pantalla de perfil de usuario
├── theme/                       # Configuración de tema y estilos
├── android/                     # Configuración específica de Android
├── App.js                       # Componente raíz de la aplicación
├── index.js                     # Punto de entrada
├── firebaseConfig.js            # Configuración de Firebase
├── app.json                     # Configuración de Expo
├── eas.json                     # Configuración de EAS Build
├── package.json                 # Dependencias y scripts
└── README.md                    # Este archivo
```

---

## 🎯 Funcionalidades Principales

### 1. Autenticación de Usuarios

- Registro de nuevos usuarios
- Inicio de sesión con email y contraseña
- Cierre de sesión
- Persistencia de sesión

### 2. Gestión de Tareas

- **Crear** nuevas tareas con título, descripción y fecha
- **Editar** tareas existentes
- **Eliminar** tareas completadas o no deseadas
- **Reorganizar** tareas mediante drag & drop
- **Marcar** tareas como completadas

### 3. Perfil de Usuario

- Visualizar información del usuario
- Editar datos personales
- Cambiar foto de perfil
- Ver estadísticas de tareas

### 4. Calendario

- Visualizar tareas por fecha
- Navegación por días, semanas y meses
- Indicadores visuales de días con tareas

---

## 🔥 Configuración de Firebase

### Estructura de Firestore

```
users/
  └── {userId}/
      ├── email: string
      ├── displayName: string
      ├── photoURL: string
      └── createdAt: timestamp

tasks/
  └── {taskId}/
      ├── userId: string
      ├── title: string
      ├── description: string
      ├── completed: boolean
      ├── date: timestamp
      ├── createdAt: timestamp
      └── updatedAt: timestamp
```

### Reglas de Seguridad Recomendadas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    match /tasks/{taskId} {
      allow read, write: if request.auth != null &&
                           request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

---

## 📜 Scripts Disponibles

| Script            | Descripción                                        |
| ----------------- | -------------------------------------------------- |
| `npm start`       | Inicia el servidor de desarrollo de Expo           |
| `npm run android` | Ejecuta la app en Android (emulador o dispositivo) |
| `npm run ios`     | Ejecuta la app en iOS (simulador o dispositivo)    |
| `npm run web`     | Ejecuta la app en el navegador web                 |

---

## 🤝 Contribución

Las contribuciones son bienvenidas. Si deseas contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y está bajo licencia propietaria.

---

## 👨‍💻 Autor

**Nikotastic**

- GitHub: [@Nikotastic](https://github.com/Nikotastic)
- Expo: [@nikotastic12](https://expo.dev/@nikotastic12)

---

## 📞 Soporte

Si tienes alguna pregunta o problema, por favor abre un [issue](https://github.com/Nikotastic/app-react/issues) en GitHub.

---

<div align="center">

**Hecho con ❤️ usando React Native y Expo**

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

</div>
