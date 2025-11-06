import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";

export default function Task({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        border: "1px solid #ddd",
      }}
    >
      {isEditing ? (
        <>
          {/* Editable Fields */}
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", flex: 1 }}>
            <TextField
              size="small"
              label="Task Name"
              value={editedTask.name}
              onChange={(e) =>
                setEditedTask({ ...editedTask, name: e.target.value })
              }
            />
            <TextField
              size="small"
              label="Assigned To"
              value={editedTask.assignedTo}
              onChange={(e) =>
                setEditedTask({ ...editedTask, assignedTo: e.target.value })
              }
            />
            <Select
              size="small"
              value={editedTask.status}
              onChange={(e) =>
                setEditedTask({ ...editedTask, status: e.target.value })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton onClick={handleSave} color="primary">
              <Save />
            </IconButton>
            <IconButton onClick={() => setIsEditing(false)} color="error">
              <Cancel />
            </IconButton>
          </Box>
        </>
      ) : (
        <>
          {/* Read-only Fields */}
          <Box sx={{ display: "flex", gap: 1, flex: 1 }}>
            <Typography sx={{ width: "30%" }}>
              <strong>Task:</strong> {task.name}
            </Typography>
            <Typography sx={{ width: "30%" }}>
              <strong>Assigned To:</strong> {task.assignedTo}
            </Typography>
            <Typography sx={{ width: "30%" }}>
              <strong>Status:</strong> {task.status}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 0.5 }}>
            <IconButton onClick={() => setIsEditing(true)} color="primary">
              <Edit />
            </IconButton>
            <IconButton onClick={onDelete} color="error">
              <Delete />
            </IconButton>
          </Box>
        </>
      )}
    </Box>
  );
}
