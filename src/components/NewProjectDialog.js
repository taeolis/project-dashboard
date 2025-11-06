import React, { useState } from "react";
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

export default function NewProjectDialog({ open, handleClose, onCreate }) {
  const [projectName, setProjectName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    // Simple validation
    if (!projectName || !deadline) {
      alert("Project Name and Deadline are required!");
      return;
    }

    if (onCreate) {
      // always check if the function exists
      onCreate({ projectName, deadline, description });
    }

    // Reset fields
    setProjectName("");
    setDeadline("");
    setDescription("");

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            width: "400px",
          }}
        >
          <Typography
            sx={{
              alignContent: "center",
            }}
          >
            Title
          </Typography>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Typography
            sx={{
              alignContent: "center",
            }}
          >
            Deadline
          </Typography>
          <TextField
            margin="dense"
            required
            type="date"
            fullWidth
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", // rounded corners
                height: 50, // total height
                "& input": {
                  fontSize: "16px", // font size
                  color: "#333", // text color
                },
              },
              "& .MuiInputLabel-root": {
                fontSize: "14px", // label font size
                fontWeight: 500, // label weight
              },
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
