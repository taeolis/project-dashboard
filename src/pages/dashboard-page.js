// src/App.js
import { useState, useEffect } from "react";
import "../App.css";
import {
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import NewProjectDialog from "../components/project-dialog";
import ProjectCard from "../components/project-card";
import ProjectDetails from "../components/project-details";
import { APP_COLORS } from "../constants/colors";

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load projects and selected project index from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem("projects");
    const savedIndex = localStorage.getItem("selectedProjectIndex");

    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      setProjects(parsedProjects);

      if (savedIndex !== null) {
        const idx = Number(savedIndex);
        if (!isNaN(idx) && parsedProjects[idx]) {
          setSelectedProject(parsedProjects[idx]);
        }
      }
    }
  }, []);

  // Save projects whenever they change
  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  // Save selected project index whenever selectedProject changes
  useEffect(() => {
    if (selectedProject) {
      const idx = projects.indexOf(selectedProject);
      if (idx !== -1) {
        localStorage.setItem("selectedProjectIndex", idx);
      }
    } else {
      // If no project selected, clear index
      localStorage.removeItem("selectedProjectIndex");
    }
  }, [selectedProject, projects]);

  // new project dialog open/close handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // project creation
  const handleCreateProject = (project) => {
    setProjects((prev) => [...prev, project]);
    setSelectedProject(project);
  };

  // project update
  const handleUpdateProject = (updatedProject) => {
    setProjects((prev) =>
      prev.map((p) => (p === selectedProject ? updatedProject : p))
    );
    setSelectedProject(updatedProject);
  };

  // project deletion
  const handleDeleteProject = (projectToDelete) => {
    setProjects((prev) => prev.filter((p) => p !== projectToDelete));
    setSelectedProject(null);
  };

  // filtering projects and tasks by search query
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();

    // matching projects
    const matchesProject =
      project.projectName?.toLowerCase().includes(query) ||
      project.description?.toLowerCase().includes(query);

    // matching tasks
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
            Project Management Dashboard
          </Typography>
          <Typography variant="body1">
            Manage your projects and tasks
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <TextField
            placeholder="Search projects or tasks"
            size="medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: 500,
              "& .MuiOutlinedInput-root": {
                height: 50,
                "& input": {
                  color: APP_COLORS.button,
                  padding: "0 14px",
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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              alignContent: "end",
              height: "50px",
              backgroundColor: APP_COLORS.button,
              color: "#fff",
              "&:hover": {
                backgroundColor: APP_COLORS.button_hovered,
              },
            }}
            onClick={handleOpen}
          >
            New Project
          </Button>
        </Box>

        <NewProjectDialog
          open={open}
          handleClose={handleClose}
          onCreate={handleCreateProject}
        />
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Left column: Projects list */}
        <Box
          sx={{
            flex: 1,
            py: 2,
            pr: 2,
            maxWidth: 350,
            minHeight: 200,
            maxHeight: 680,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
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
              {filteredProjects.length}
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", textAlign: "left" }}
            >
              {filteredProjects.length === 1 ? "Project" : "Projects"}
            </Typography>
          </Box>

          {filteredProjects.length === 0 ? (
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                pt: 1,
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                fontSize: 16,
                color: "#626262ff",
                borderRadius: 3,
                border: "3px dashed #a1a0a0ff",
              }}
            >
              No Projects
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  pt: 1,
                  width: "100%",
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
                    }}
                  >
                    <ProjectCard
                      isSelected={selectedProject === project}
                      project={project}
                      searchQuery={searchQuery}
                    />
                  </Box>
                ))}
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 50,
                  background: `linear-gradient(to bottom, transparent, ${APP_COLORS.background})`,
                }}
              />
            </>
          )}
        </Box>

        {/* Right column: Project detail */}
        {selectedProject ? (
          <Box
            sx={{
              flex: 2,
              p: 3,
              textAlign: "center",
              minHeight: 650,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: APP_COLORS.card,
            }}
          >
            <ProjectDetails
              project={selectedProject}
              onUpdate={handleUpdateProject}
              onDelete={handleDeleteProject}
            />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 2,
              p: 3,
              textAlign: "center",
              minHeight: 650,
              display: "flex",
              flexDirection: "column",
              borderRadius: 2,
              border: "3px dashed #a1a0a0ff",
              color: "#626262ff",
              justifyContent: "center",
            }}
          >
            Select a project to edit
          </Box>
        )}
      </Box>
    </Box>
  );
}
