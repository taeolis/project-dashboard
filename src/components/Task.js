// src/components/Task.js
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
                gap: 5,
                flexWrap: "wrap",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              {/* editable task name field */}
              <TextField
                placeholder="Task Name"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value })
                }
                size="small"
                sx={{ ml: 15, alignItems: "center" }}
                InputProps={{
                  sx: {
                    width: 300,
                    height: 30,
                  },
                }}
              />

              {/* editable task assigned to field */}
              <TextField
                size="small"
                value={editedTask.assignedTo}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignedTo: e.target.value })
                }
                sx={{ ml: 12 }}
                InputProps={{
                  sx: {
                    width: 150,
                    height: 30,
                  },
                }}
              />

              {/* editable task status dropbox */}
              <Select
                size="small"
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
                sx={{
                  minWidth: 100,
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
              {/* save task editing */}
              <IconButton
                onClick={handleSave}
                size="small"
                sx={{ color: APP_COLORS.button }}
              >
                <Save />
              </IconButton>

              {/* cancel task editing */}
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
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                alignItems: "center",
              }}
            >
              {/* task name display */}
              <Typography
                variant="body1"
                sx={{
                  ml: 2,
                  width: 500, // fixed width in px
                  whiteSpace: "nowrap", // keep text on a single line
                  overflow: "hidden", // hide overflow
                  textOverflow: "ellipsis", // show "..." for overflowed text
                }}
              >
                {task.name}
              </Typography>

              {/* task assigned to display */}
              <Typography
                variant="body2"
                sx={{
                  width: 200, // fixed width
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  ml: 2,
                }}
              >
                {task.assignedTo}
              </Typography>

              {/* task status display */}
              <Typography
                variant="body2"
                sx={{
                  width: 120, // fixed width
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  ml: 2,
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

            {/* Buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                justifyContent: "left",
                mt: 1, // optional spacing
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

      {/* separation between each task for table-like visual */}
      <Divider variant="fullWidth" />
    </>
  );
}
