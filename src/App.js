import "./App.css";
import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NewProjectDialog from "./components/NewProjectDialog";
import ProjectCard from "./components/ProjectCard";
import ProjectDetails from "./components/ProjectDetails";

function App() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateProject = (project) => {
    console.log("New project data:", project); // for testing
    setProjects((prev) => [...prev, project]);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p === selectedProject ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  const handleDeleteProject = (projectToDelete) => {
    setProjects((prev) => prev.filter((p) => p !== projectToDelete));
    setSelectedProject(null);
  };

  // ✅ Filter logic — search both project + tasks
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();

    const matchesProject =
      project.projectName?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query);

    const matchesTask = project.tasks?.some(
      (task) =>
        task.name?.toLowerCase().includes(query) ||
        task.assignedTo?.toLowerCase().includes(query)
    );

    return matchesProject || matchesTask;
  });

  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Project Dashboard
          </Typography>

          <Typography variant="body1">
            Manage and track your projects
          </Typography>
        </Box>

        {/* Search Box */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Search projects or tasks"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 500,
              "& .MuiOutlinedInput-root": {
                // borderRadius: "25px", // round corners
                height: 50, // total height
                "& input": {
                  padding: "0 14px", // adjust text padding vertically
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Add New Project Button */}

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              // borderRadius: 10,
              alignContent: "end",
              height: "50px",
              backgroundColor: "#352a6aff", // custom blue
              color: "#fff",
              "&:hover": {
                backgroundColor: "#21184aff", // darker shade on hover
              },
            }}
            onClick={handleOpen}
          >
            New Project
          </Button>
        </Box>

        {/* Adding new project dialog */}

        <NewProjectDialog
          open={open}
          handleClose={handleClose}
          onCreate={handleCreateProject}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        {/* Project List */}
        <Box
          sx={{
            flex: 1,
            py: 2,
            pr: 2,
            maxWidth: 350,
            minHeight: 300, // minimum height
            display: "flex",
            flexDirection: "column",
            // backgroundColor: "#e09a9aff",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                backgroundColor: "#352a6a", // your theme color
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 14,
                mr: 1.2,
              }}
            >
              {filteredProjects.length}
            </Box>

            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              {filteredProjects.length === 1 ? "Project" : "Projects"}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {filteredProjects.map((project, index) => (
              <Box
                key={index}
                onClick={() => setSelectedProject(project)}
                sx={{
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "0.3s",
                  backgroundColor:
                    selectedProject === project ? "#cec8ffff" : "#ffaaaaff", // highlight color
                }}
              >
                <ProjectCard
                  project={project}
                  key={index}
                  searchQuery={searchQuery}
                />
              </Box>
            ))}
          </Box>
        </Box>

        {/* Project Detail*/}

        <Box
          sx={{
            flex: 2,
            p: 3,
            textAlign: "center",
            minHeight: 300, // minimum height
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            boxShadow: 5,
            backgroundColor: "#ffff",
          }}
        >
          {selectedProject && (
            <ProjectDetails
              project={selectedProject}
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
