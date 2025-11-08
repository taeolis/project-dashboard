import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { APP_COLORS } from "../constants/colors";

export default function Task({ task, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleSave = () => {
    onUpdate(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask(task);
    setIsEditing(false);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: isEditing ? "action.hover" : APP_COLORS.card,
          transition: "background-color 0.2s",
          "&:hover": {
            backgroundColor: !isEditing ? "grey.50" : undefined,
          },
        }}
      >
        {isEditing ? (
          <>
            {/* Editable Fields */}
            <Box
              sx={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Task Name"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value })
                }
                size="small"
                sx={{ ml: 5, alignItems: "center" }}
                InputProps={{
                  sx: {
                    height: 30,
                  },
                }}
              />
              <TextField
                size="small"
                value={editedTask.assignedTo}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignedTo: e.target.value })
                }
                sx={{ minWidth: 120 }}
                InputProps={{
                  sx: {
                    height: 30,
                  },
                }}
              />
              <Select
                size="small"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
                sx={{
                  minWidth: 120,
                  "& .MuiSelect-select": {
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    padding: "4px 14px",
                  },
                }}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </Select>
            </Box>

            <Box sx={{ display: "flex", gap: 0.5 }}>
              <IconButton
                onClick={handleSave}
                size="small"
                sx={{ color: APP_COLORS.button }}
              >
                <Save />
              </IconButton>
              <IconButton
                onClick={handleCancel}
                size="small"
                sx={{ color: APP_COLORS.pending }}
              >
                <Cancel />
              </IconButton>
            </Box>
          </>
        ) : (
          <>
            {/* Read-only Fields */}
            <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
              <Typography
                variant="body1"
                sx={{
                  width: "30%",
                }}
              >
                {task.name}
              </Typography>
              <Typography variant="body2" sx={{ width: "30%" }}>
                {task.assignedTo}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  width: "30%",
                  fontWeight: "bold",
                  color:
                    task.status === "Completed"
                      ? APP_COLORS.completed
                      : task.status === "In Progress"
                        ? APP_COLORS.in_progress
                        : APP_COLORS.pending,
                }}
              >
                {task.status}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "left",
              }}
            >
              <IconButton
                onClick={() => setIsEditing(true)}
                size="small"
                sx={{ color: APP_COLORS.button }}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={onDelete}
                size="small"
                sx={{ color: APP_COLORS.pending }}
              >
                <Delete />
              </IconButton>
            </Box>
          </>
        )}
      </Box>

      <Divider variant="fullWidth" />
    </>
  );
}
