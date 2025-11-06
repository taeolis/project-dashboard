import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import Task from "./Task";
import ProgressChart from "./ProgressChart";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import { Divider } from "@mui/material";

export default function ProjectDetails({ project, onUpdate, onDelete }) {
  const [name, setName] = useState(project.projectName);
  const [deadline, setDeadline] = useState(project.deadline);
  const [description, setDescription] = useState(project.description);
  const [tasks, setTasks] = useState(project.tasks || []);
  const [newTask, setNewTask] = useState({
    name: "",
    assignedTo: "",
    status: "Pending",
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);

  useEffect(() => {
    setName(project.projectName);
    setDeadline(project.deadline);
    setDescription(project.description);
    setTasks(project.tasks || []);
  }, [project]);

  const handleUpdate = () => {
    onUpdate({ ...project, projectName: name, deadline, description, tasks });
  };

  const handleDelete = () => {
    onDelete(project);
  };

  const handleAddTask = () => {
    if (!newTask.name || !newTask.assignedTo) return;
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setNewTask({ name: "", assignedTo: "", status: "Pending" });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleUpdateTask = (index, updatedTask) => {
    const updatedTasks = tasks.map((t, i) => (i === index ? updatedTask : t));
    setTasks(updatedTasks);
  };

  const displayedTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  const handleEditClick = () => setIsEditing(true);
  const handleCancel = () => {
    setTempName(name);
    setIsEditing(false);
  };

  const handleSave = () => {
    setName(tempName);
    setIsEditing(false);
  };

  return (
    <Box sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: "flex" }}>
        {/* Editing Project (Left Column) */}
        <Box sx={{ flex: 2, textAlign: "start" }}>
          {isEditing ? (
            <Box sx={{ mb: 2 }}>
              <TextField
                variant="standard"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                size="normal"
                sx={{
                  my: 1,
                  width: 400,
                }}
              />
              <IconButton onClick={handleSave} color="success">
                <CheckIcon />
              </IconButton>

              <IconButton onClick={handleCancel} color="error">
                <CloseIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {name}{" "}
                <IconButton onClick={handleEditClick}>
                  <EditIcon sx={{ fontSize: 23 }} />
                </IconButton>
              </Typography>
            </Box>
          )}

          <TextField
            variant="outlined"
            label="Deadline"
            type="date"
            size="small"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ my: 2, textAlign: "left" }}
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            sx={{ my: 1, width: 600 }}
          />
        </Box>

        {/* Progress Chart Section */}
        <Box sx={{ flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              mt: 8,
              borderRadius: 3,
            }}
          >
            <Chip
              label={`Completed: ${tasks.filter((t) => t.status === "Completed").length} / ${tasks.length}`}
              color="primary"
              variant="filled"
              sx={{ mb: 2, ml: 1 }}
            />
            <ProgressChart tasks={tasks} />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }}>
        <Typography sx={{ fontWeight: "bold" }}>Tasks</Typography>
      </Divider>

      {/* Task Sections */}

      {/* Add New Task */}
      <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
        <TextField
          placeholder="Task Name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          size="small"
        />
        <TextField
          placeholder="Assigned To"
          value={newTask.assignedTo}
          onChange={(e) =>
            setNewTask({ ...newTask, assignedTo: e.target.value })
          }
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            variant="outlined"
            value={newTask.status}
            label="Status"
            onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          >
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" onClick={handleAddTask}>
          Add Task
        </Button>

        {/* Filter Tasks */}
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Typography>Filter Tasks:</Typography>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Task List */}
      <Box sx={{ mt: 1 }}>
        {displayedTasks.map((task, index) => (
          <Task
            key={index}
            task={task}
            onDelete={() => handleDeleteTask(index)}
            onUpdate={(updatedTask) => handleUpdateTask(index, updatedTask)}
          />
        ))}
      </Box>

      {/* Update and Delete Button */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={handleUpdate}>
          Update Project
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Project
        </Button>
      </Box>
    </Box>
  );
}
