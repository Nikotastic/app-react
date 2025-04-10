import React, { useRef } from "react";
import { Animated, PanResponder, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../theme/MainTask/styles";

/**
 * Componente que representa una tarjeta de tarea individual con funcionalidad de arrastre
 * @param {Object} task - Objeto que contiene los datos de la tarea
 * @param {Function} onMove - Función para manejar el movimiento entre categorías
 * @param {Function} onEdit - Función para editar la tarea
 * @param {Function} onDelete - Función para eliminar la tarea
 */
const TaskCard = ({ task, onMove, onEdit, onDelete }) => {
  const { styles, colors } = useTheme();
  const pan = useRef(new Animated.ValueXY()).current;

  // Determina el color según la prioridad
  const getPriorityColor = () => {
    switch (task.priority) {
      case "alta": return colors.highPriority;
      case "media": return colors.mediumPriority;
      case "baja": return colors.lowPriority;
      default: return colors.primary;
    }
  };

  // Configuración del gesto de arrastre
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 30) {
        Animated.event([null, { dx: pan.x }], { useNativeDriver: false })(evt, gestureState);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (Math.abs(gestureState.dx) > 100) {
        const direction = gestureState.dx > 0 ? "right" : "left";
        Animated.timing(pan, {
          toValue: { x: direction === "right" ? 300 : -300, y: 0 },
          duration: 300,
          useNativeDriver: false,
        }).start(() => {
          onMove(task.id, direction);
          pan.setValue({ x: 0, y: 0 });
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
          transform: [{ translateX: pan.x }],
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
      <Text style={[styles.priorityTag, { backgroundColor: getPriorityColor() }]}>
        {task.priority.toUpperCase()}
      </Text>
      <View style={styles.taskActions}>
        <TouchableOpacity onPress={() => onEdit(task)} style={styles.actionButton}>
          <Text>✏️ Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.actionButton}>
          <Text>🗑️ Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default TaskCard;