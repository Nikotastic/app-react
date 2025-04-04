import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Animated,
  StyleSheet,
  PanResponder,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Componente individual de Tarea
const TaskCard = ({ task, onMove, onEdit, onDelete }) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case "alta":
        return "#FF4B4B";
      case "media":
        return "#FFB946";
      case "baja":
        return "#4CAF50";
      default:
        return "#007bff";
    }
  };

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (Math.abs(gestureState.dy) > 30) {
        Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(
          evt,
          gestureState
        );
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dy) > 100) {
        const direction = gestureState.dy > 0 ? "down" : "up";

        Animated.timing(pan, {
          toValue: { x: 0, y: direction === "down" ? 300 : -300 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          onMove(task.id, direction); // Llama a la función para mover la tarea
          pan.setValue({ x: 0, y: 0 }); // Reinicia la posición
        });
      } else {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.taskCard,
        {
          transform: [{ translateY: pan.y }], // Cambia a translateY para movimiento vertical
          borderLeftColor: getPriorityColor(),
          borderLeftWidth: 5,
        },
      ]}
    >
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <View style={styles.taskDates}>
        <Text style={styles.dateText}>Creado: {task.creationDate}</Text>
        <Text style={styles.dateText}>Entrega: {task.dueDate}</Text>
      </View>
      <Text
        style={[styles.priorityTag, { backgroundColor: getPriorityColor() }]}
      >
        {task.priority.toUpperCase()}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity
          onPress={() => onEdit(task)}
          style={styles.actionButton}
        >
          <Text>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={styles.actionButton}
        >
          <Text>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Modal para crear/editar tareas
const TaskFormModal = ({ visible, task, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("media");
  const [dueDate, setDueDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "media");
      setDueDate(task.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("media");
      setDueDate("");
    }
  }, [task, visible]);

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  const handleSave = () => {
    const today = formatDate(new Date());
    const updatedTask = {
      id: task ? task.id : Date.now().toString(), 
      title,
      description,
      priority,
      dueDate: dueDate || today,
      creationDate: task ? task.creationDate : today,
      status: task ? task.status : "pendiente",
    };
    onSave(updatedTask);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {task ? "Editar Tarea" : "Nueva Tarea"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Título"
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.inputLabel}>Prioridad:</Text>
          <View style={styles.prioritySelector}>
            {["baja", "media", "alta"].map((p) => (
              <TouchableOpacity
                key={p}
                style={[
                  styles.priorityButton,
                  priority === p && styles.priorityButtonSelected,
                  {
                    backgroundColor:
                      p === "alta"
                        ? "#ffeeee"
                        : p === "media"
                        ? "#fff8ee"
                        : "#eeffee",
                  },
                ]}
                onPress={() => setPriority(p)}
              >
                <Text style={styles.priorityButtonText}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowCalendar(!showCalendar)}
          >
            <Text style={styles.dateButtonText}>
              {dueDate
                ? `Fecha de entrega: ${dueDate}`
                : "Seleccionar fecha de entrega"}
            </Text>
          </TouchableOpacity>

          {showCalendar && (
            <Calendar
              onDayPress={(day) => {
                setDueDate(formatDate(new Date(day.dateString)));
                setShowCalendar(false);
              }}
              markedDates={{
                [dueDate]: { selected: true, selectedColor: "#007bff" },
              }}
              minDate={new Date().toISOString().split("T")[0]} // Bloquea fechas pasadas para evitar selección
              style={styles.calendar}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                (!title || !description) && styles.disabledButton,
              ]}
              onPress={handleSave}
              disabled={!title || !description}
            >
              <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function MainTaskScreen({ navigation }) {
  const categories = ["pendiente", "proceso", "terminado"];
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [currentCategory, setCurrentCategory] = useState("pendiente");
  const [markedDates, setMarkedDates] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);
  const scrollViewRef = useRef(null);

  // Cargar tareas desde AsyncStorage al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks");
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    loadTasks();
  }, []);

  // Guardar tareas en AsyncStorage cuando cambien
  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error al guardar las tareas:", error);
      }
    };

    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);

  // Actualizar fechas marcadas en el calendario
  useEffect(() => {
    const updateMarkedDates = () => {
      const newMarkedDates = {};
      tasks.forEach((task) => {
        if (task.dueDate) {
          const formattedDate = task.dueDate.split("/").reverse().join("-");
          const color =
            task.priority === "alta"
              ? "#FF4B4B"
              : task.priority === "media"
              ? "#FFB946"
              : "#4CAF50";
          newMarkedDates[formattedDate] = {
            selected: true,
            marked: true,
            selectedColor: color,
          };
        }
      });
      setMarkedDates(newMarkedDates);
    };

    updateMarkedDates();
  }, [tasks]);

  // Nueva función para manejar el guardado de tareas
  const handleSaveTask = (task) => {
    setTasks(
      (prevTasks) =>
        prevTasks.some((t) => t.id === task.id)
          ? prevTasks.map((t) => (t.id === task.id ? task : t)) // Actualiza la tarea existente
          : [...prevTasks, task] // Agrega una nueva tarea
    );
    setModalVisible(false); // Cierra el modal después de guardar
  };

  // Nueva función para manejar el movimiento de tareas
  const handleMoveTask = (taskId, direction) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newStatus =
            direction === "down"
              ? categories[categories.indexOf(task.status) + 1]
              : categories[categories.indexOf(task.status) - 1];
          return { ...task, status: newStatus || task.status };
        }
        return task;
      })
    );
  };

  const renderTasksByCategory = (category) => {
    const categoryTasks = tasks.filter((task) => task.status === category);
  
    // Elimina duplicados basados en el id
    const uniqueTasks = Array.from(new Set(categoryTasks.map((t) => t.id))).map(
      (id) => categoryTasks.find((t) => t.id === id)
    );
  
    return (
      <View key={category} style={styles.categorySection}>
        <View style={styles.categoryHeader}>
          <Text style={styles.categoryTitle}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <TouchableOpacity
            onPress={() => setCalendarVisible(true)}
          >
            <Image
              source={require("../assets/calendar-icon.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>
        </View>
  
        {/* Renderiza las tareas únicas */}
        {uniqueTasks.map((task, index) => (
          <TaskCard
            key={task.id || `task-${index}`}
            task={task}
            onMove={handleMoveTask}
            onEdit={() => {
              setCurrentTask(task);
              setModalVisible(true);
            }}
            onDelete={(taskId) =>
              setTasks(tasks.filter((t) => t.id !== taskId))
            }
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{"<DevList>"}</Text>

        <View style={styles.headerActions}>
          {/* Botón para añadir tarea */}
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setCurrentTask(null); // Limpia la tarea actual
              setModalVisible(true); // Abre el modal para añadir tarea
            }}
          >
            <Text style={styles.addButtonText}>+ Añadir</Text>
          </TouchableOpacity>

          {/* Ícono de usuario */}
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.taskListContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.taskListContent}
      >
        {categories.map((category) => (
          <React.Fragment key={category}>
            {renderTasksByCategory(category)}
          </React.Fragment>
        ))}
      </ScrollView>

      {/* Modal para mostrar el calendario */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={calendarVisible}
        onRequestClose={() => setCalendarVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.calendarModal}>
            <Calendar
              markedDates={markedDates}
              onDayPress={(day) => {
                console.log("Fecha seleccionada:", day.dateString);
              }}
              style={styles.calendar}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setCalendarVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para crear/editar tareas */}
      <TaskFormModal
        visible={modalVisible}
        task={currentTask}
        onSave={handleSaveTask} // Pasamos la función aquí
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Estilos para la pantalla principal
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
  },
  addButtonText: {
    color: "#FFF",
    fontWeight: "600",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEE",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#007bff",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  // Estilos para pestañas de categoría
  categoryTabs: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  categoryTab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  categoryTabActive: {
    borderBottomColor: "#007bff",
  },
  categoryTabText: {
    fontSize: 16,
    color: "#666",
  },
  categoryTabTextActive: {
    fontWeight: "600",
    color: "#007bff",
  },

  // Estilos para listas de tareas
  taskListContainer: {
    flex: 1,
  },
  taskListContent: {
    padding: 15,
  },
  categorySection: {
    marginBottom: 15,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  taskCount: {
    backgroundColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    color: "#666",
  },

  // Estilos para tarjetas de tareas
  taskCard: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  taskDates: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
  },
  priorityTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    color: "#FFF",
    fontSize: 10,
    fontWeight: "600",
    marginBottom: 10,
  },
  taskActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    paddingTop: 10,
  },
  actionButton: {
    padding: 5,
  },

  // Estilos para el modal
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  prioritySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  priorityButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  priorityButtonSelected: {
    borderColor: "#007bff",
    borderWidth: 2,
  },
  priorityButtonText: {
    fontWeight: "500",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  dateButtonText: {
    color: "#333",
  },
  calendar: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: "#007bff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#6c757d",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    flex: 1,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  calendar: {
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  calendarModal: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 16,
  },
  
});
