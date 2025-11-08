import { useState, useEffect } from "react";
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
  Menu,
} from "@mui/material";
import Task from "./Task";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProgressChart from "./ProgressChart";
import { APP_COLORS } from "../constants/colors";

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
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChipClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterSelect = (filterValue) => {
    setFilterStatus(filterValue);
    handleMenuClose();
  };

  const displayedTasks =
    filterStatus === "All"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

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
      <Box sx={{ display: "flex", mb: 2 }}>
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
            sx={{ my: 1, textAlign: "left", width: 280 }}
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
        <Box sx={{ flex: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 5,
              borderRadius: 3,
            }}
          >
            <Chip
              label={`Completed: ${tasks.filter((t) => t.status === "Completed").length} / ${tasks.length}`}
              variant="filled"
              sx={{
                width: 200,
                mb: 3,
                backgroundColor: APP_COLORS.button,
                color: "#f0f3f7",
              }}
            />
            <ProgressChart tasks={tasks} />
          </Box>
        </Box>
      </Box>

      {/* Task Count */}

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Box
          sx={{
            width: 25,
            height: 25,
            borderRadius: "50%",
            backgroundColor: APP_COLORS.button,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: 14,
            mr: 1.2,
          }}
        >
          {tasks.length}
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "left" }}>
          {tasks.length === 1 ? "Task" : "Tasks"}
        </Typography>
      </Box>

      {/* Add New Task */}
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <TextField
            placeholder="Task Name"
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
            size="small"
            sx={{ width: 250 }}
          />
          <TextField
            placeholder="Assigned To"
            value={newTask.assignedTo}
            onChange={(e) =>
              setNewTask({ ...newTask, assignedTo: e.target.value })
            }
            size="small"
            sx={{ width: 250 }}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              variant="outlined"
              value={newTask.status}
              label="Status"
              onChange={(e) =>
                setNewTask({ ...newTask, status: e.target.value })
              }
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleAddTask}
            sx={{
              backgroundColor: APP_COLORS.button,
              "&:hover": {
                backgroundColor: APP_COLORS.button_hovered,
              },
            }}
          >
            Add Task
          </Button>
        </Box>

        {/* Filter Tasks Chip */}
        <Box sx={{ flex: 1, textAlign: "right" }}>
          <Chip
            label={`${filterStatus}`}
            onClick={handleChipClick}
            icon={<FilterListIcon />}
            size="medium"
            variant="outlined"
            aria-controls={open ? "filter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            aria-label="Filter Tasks"
            sx={{ borderRadius: 1, py: 2.5, px: 0.5 }}
          />

          {/* Menu Component - Dropdown box */}
          <Menu
            id="filter-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            MenuListProps={{
              "aria-labelledby": "filter-chip",
            }}
            sx={{ borderRadius: 5 }}
          >
            {/* The Options (Menu Items) */}
            <MenuItem onClick={() => handleFilterSelect("All")}>
              All Tasks
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Pending")}>
              Pending
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("In Progress")}>
              In Progress
            </MenuItem>
            <MenuItem onClick={() => handleFilterSelect("Completed")}>
              Completed
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* Task List */}
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          py: 1.5,
          mt: 2,
          backgroundColor: APP_COLORS.background,
          border: "1px solid #c5c5c5ff",
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
        }}
      >
        {/* Column Titles */}
        <Box sx={{ display: "flex", flexGrow: 1, alignItems: "center" }}>
          <Typography variant="body2" sx={{ width: "30%", fontWeight: "bold" }}>
            TASK NAME
          </Typography>
          <Typography variant="body2" sx={{ width: "30%", fontWeight: "bold" }}>
            ASSIGNED TO
          </Typography>
          <Typography variant="body2" sx={{ width: "30%", fontWeight: "bold" }}>
            STATUS
          </Typography>
        </Box>
        <Box sx={{ minWidth: "70px" }}></Box>
      </Box>

      {displayedTasks.length === 0 ? (
        <Box
          sx={{
            height: 150,
            borderLeft: "2px dashed #979797ff",
            borderRight: "2px dashed #979797ff",
            borderBottom: "2px dashed #979797ff",
            alignContent: "center",
          }}
        >
          <Typography sx={{ color: "#979797ff" }}>No Tasks</Typography>
        </Box>
      ) : (
        <Box
          sx={{
            height: 150,
            overflowY: "auto",
            borderLeft: "1px solid #c5c5c5ff",
            borderRight: "1px solid #c5c5c5ff",
            borderBottom: "1px solid #c5c5c5ff",
          }}
        >
          {displayedTasks.map((task, index) => (
            <Task
              key={index}
              task={task}
              onDelete={() => handleDeleteTask(index)}
              onUpdate={(updatedTask) => handleUpdateTask(index, updatedTask)}
            />
          ))}
        </Box>
      )}

      {/* Update and Delete Button */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mt: 3,
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          onClick={handleUpdate}
          sx={{
            backgroundColor: APP_COLORS.button,
            "&:hover": {
              backgroundColor: APP_COLORS.button_hovered,
            },
          }}
        >
          Update Project
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete Project
        </Button>
      </Box>
    </Box>
  );
}
