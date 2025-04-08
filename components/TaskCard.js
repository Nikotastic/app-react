import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getPriorityColor } from "../utils/priorityColors";
import { AntDesign } from "@expo/vector-icons";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <View
      className="bg-white rounded-2xl shadow p-4 mx-4 mb-2 border-l-8"
      style={{
        borderLeftColor: getPriorityColor(task.priority),
      }}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-base font-semibold">{task.title}</Text>
        <View className="flex-row space-x-4">
          {onEdit && (
            <TouchableOpacity onPress={() => onEdit(task)}>
              <AntDesign name="edit" size={20} color="black" />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={() => onDelete(task)}>
              <AntDesign name="delete" size={20} color="red" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {task.date && (
        <Text className="text-sm text-gray-500 mt-1">{task.date}</Text>
      )}
    </View>
  );
};

export default TaskCard;
