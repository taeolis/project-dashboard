import "./App.css";
import { useState } from "react";
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
import NewProjectDialog from "./components/NewProjectDialog";
import ProjectCard from "./components/ProjectCard";
import ProjectDetails from "./components/ProjectDetails";
import { APP_COLORS } from "./constants/colors";

function App() {
  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateProject = (project) => {
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

  // Filter logic — search both project + tasks
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

          {/* Add New Project Button */}

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
            minHeight: 200,
            maxHeight: 680,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Header Section (Unchanged) */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            {/* Project Count and Title */}
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

          {/* Projects list container (scrollable area) */}
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

              {/* Gradient Overlay */}
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

        {/* Project Detail*/}

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
            {selectedProject && (
              <ProjectDetails
                project={selectedProject}
                onUpdate={handleUpdateProject}
                onDelete={handleDeleteProject}
              />
            )}
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

export default App;
