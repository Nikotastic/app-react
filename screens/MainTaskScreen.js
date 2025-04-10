import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Modal, Text, TouchableOpacity, Image  } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

// Componentes
import Header from "../components/MainTask/Header";
import CategoryTabs from "../components/MainTask/CategoryTabs";
import TaskCard from "../components/MainTask/TaskCard";
import TaskFormModal from "../components/MainTask/TaskFormModal";
import CalendarView from "../components/MainTask/CalendarView";
import { useTheme } from "../theme/MainTask/styles";


/**
 * Pantalla principal que muestra las tareas organizadas por categorías
 * @param {Object} navigation - Objeto de navegación
 * @param {Object} route - Objeto de ruta
 */
const MainTaskScreen = ({ navigation, route }) => {
  const { styles,colors } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [activeTab, setActiveTab] = useState("pendiente");
  const [markedDates, setMarkedDates] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  // Carga el avatar del usuario
  useFocusEffect(
    useCallback(() => {
      const loadAvatar = async () => {
        try {
          const storedAvatar = await AsyncStorage.getItem("userAvatar");
          if (storedAvatar) setAvatar(storedAvatar);
        } catch (error) {
          console.error("Error al cargar el avatar:", error);
        }
      };
      loadAvatar();
    }, [])
  );

  // Carga las tareas desde AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) setTasks(JSON.parse(storedTasks));
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };
    loadTasks();
  }, []);

  // Guarda las tareas en AsyncStorage cuando cambian
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error al guardar las tareas:", error);
      }
    };
    if (tasks.length > 0) saveTasks();
  }, [tasks]);

  // Actualiza las fechas marcadas en el calendario
  useEffect(() => {
    const updateMarkedDates = () => {
      const newMarkedDates = {};
      
      tasks.forEach((task) => {
        if (!task.dueDate) return;
        
        const formattedDate = convertDateFormat(task.dueDate);
        if (!formattedDate) return;
        
        if (!newMarkedDates[formattedDate]) {
          newMarkedDates[formattedDate] = { dots: [], marked: true };
        }
        
        const statusExists = newMarkedDates[formattedDate].dots.some(
          dot => dot.color === getCategoryColor(task.status)
        );
        
        if (!statusExists) {
          newMarkedDates[formattedDate].dots.push({
            key: task.status,
            color: getCategoryColor(task.status)
          });
        }
      });
      
      setMarkedDates(newMarkedDates);
    };

    updateMarkedDates();
  }, [tasks]);

  // Convierte el formato de fecha DD/MM/YYYY a YYYY-MM-DD
  const convertDateFormat = (dateString) => {
    if (!dateString) return null;
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;
    
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    
    return `${year}-${month}-${day}`;
  };

  // Obtiene el color según el estado de la tarea
  const getCategoryColor = (status) => {
    switch (status) {
      case "pendiente": return colors.highPriority;
      case "proceso": return colors.mediumPriority;
      case "terminado": return colors.lowPriority;
      default: return colors.primary;
    }
  };

  // Maneja el guardado de una tarea
  const handleSaveTask = (task) => {
    setTasks(prevTasks =>
      prevTasks.some(t => t.id === task.id)
        ? prevTasks.map(t => (t.id === task.id ? task : t))
        : [...prevTasks, task]
    );
    setModalVisible(false);
  };

  // Maneja el movimiento de tareas entre categorías
  const handleMoveTask = (taskId, direction) => {
    const categories = ["pendiente", "proceso", "terminado"];
    setTasks(prevTasks =>
      prevTasks.map(task => {
        if (task.id === taskId) {
          const currentIndex = categories.indexOf(task.status);
          let newIndex;
  
          if (direction === "right" && currentIndex < categories.length - 1) {
            newIndex = currentIndex + 1;
          } else if (direction === "left" && currentIndex > 0) {
            newIndex = currentIndex - 1;
          } else {
            newIndex = currentIndex;
          }
  
          return { ...task, status: categories[newIndex] };
        }
        return task;
      })
    );
  };

  // Renderiza las tareas de una categoría específica
  const renderTasksByCategory = (category) => {
    const categoryTasks = tasks.filter(task => task.status === category);
    const uniqueTasks = Array.from(new Set(categoryTasks.map(t => t.id)))
      .map(id => categoryTasks.find(t => t.id === id));

    return (
      <View key={category} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <TouchableOpacity onPress={() => setCalendarVisible(true)}>
            <Image
              source={require("../assets/calendar-icon.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>

        {uniqueTasks.length > 0 ? (
          uniqueTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onMove={handleMoveTask}
              onEdit={() => {
                setCurrentTask(task);
                setModalVisible(true);
              }}
              onDelete={(taskId) =>
                setTasks(tasks.filter(t => t.id !== taskId))
              }
            />
          ))
        ) : (
          <Text style={styles.emptyListText}>No hay tareas en esta categoría</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        navigation={navigation} 
        setModalVisible={setModalVisible} 
        avatar={avatar} 
      />

      <CategoryTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setCalendarVisible={setCalendarVisible}
      />

      {activeTab !== "calendario" ? (
        <ScrollView
          style={styles.taskListContainer}
          contentContainerStyle={styles.taskListContent}
        >
          {renderTasksByCategory(activeTab)}
        </ScrollView>
      ) : (
        <CalendarView 
          markedDates={markedDates} 
          onDayPress={(day) => {
            const selectedTasks = tasks.filter(task => {
              const formattedDate = convertDateFormat(task.dueDate);
              return formattedDate === day.dateString;
            });
            if (selectedTasks.length > 0) {
              console.log("Tareas para esta fecha:", selectedTasks);
              // Aquí podrías mostrar un modal con las tareas
            }
          }}
        />
      )}

      {/* Modal de calendario para cuando no está en la pestaña de calendario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarVisible && activeTab !== "calendario"}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.calendarModal}>
            <CalendarView 
              markedDates={markedDates} 
              onDayPress={(day) => {
                console.log("Fecha seleccionada:", day.dateString);
                setCalendarVisible(false);
              }}
              onClose={() => setCalendarVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <TaskFormModal
        visible={modalVisible}
        task={currentTask}
        onSave={handleSaveTask}
        onClose={() => {
          setModalVisible(false);
          setCurrentTask(null);
        }}
      />
    </View>
  );
};

export default MainTaskScreen;