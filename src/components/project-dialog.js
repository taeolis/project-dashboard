// src/components/NewProjectDialog.js
import { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { APP_COLORS } from "../constants/colors";

export default function NewProjectDialog({ open, handleClose, onCreate }) {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({
    projectName: false,
    deadline: false,
  });

  // Create the project
  const handleCreate = () => {
    const newErrors = {
      projectName: !projectName,
      deadline: !deadline,
    };

    setErrors(newErrors);
    if (newErrors.projectName || newErrors.deadline) return;

    if (onCreate) {
      onCreate({
        projectName,
        deadline,
        description,
        tasks: [],
      });
    }

    // Reset fields
    setProjectName("");
    setDeadline("");
    setDescription("");

    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: 500, maxWidth: "90%", borderRadius: 3, padding: 2 },
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          Create New Project
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {/* Left labels */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 5,
              mt: 3,
            }}
          >
            <Typography>Name</Typography>
            <Typography>Deadline</Typography>
          </Box>

          {/* Right input fields */}
          <Box sx={{ flex: 4 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Project Name"
              fullWidth
              value={projectName}
              onChange={(e) => {
                setProjectName(e.target.value);
                setErrors({ ...errors, projectName: false });
              }}
              error={errors.projectName}
              helperText={errors.projectName ? "Project name is required" : ""}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
            />

            <TextField
              margin="dense"
              type="date"
              required
              fullWidth
              value={deadline}
              onChange={(e) => {
                setDeadline(e.target.value);
                setErrors({ ...errors, deadline: false });
              }}
              error={errors.deadline}
              helperText={errors.deadline ? "Deadline is required" : ""}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  height: 50,
                },
              }}
            />
          </Box>
        </Box>

        {/* Description */}
        <TextField
          margin="dense"
          label="Description"
          multiline
          rows={4}
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} sx={{ color: APP_COLORS.button }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            backgroundColor: APP_COLORS.button,
            "&:hover": { backgroundColor: APP_COLORS.button_hovered },
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
