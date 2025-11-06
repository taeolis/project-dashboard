// ProjectCard.js
import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { AccessTime } from "@mui/icons-material";

export default function ProjectCard({ project, searchQuery }) {
  const query = searchQuery.toLowerCase();

  const highlightText = (text) => {
    if (!query || !text) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === query ? (
        <span key={i} style={{ backgroundColor: "yellow", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const matchedTasks =
    project.tasks?.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.assignedTo.toLowerCase().includes(query)
    ) || [];

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 3,
        boxShadow: 4,
        width: 300,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        textAlign: "left",
        height: "100%",
      }}
    >
      {/* Project Title */}
      <Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#000000ff",
            wordBreak: "break-word",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2, // limits to roughly 3 lines
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 0.5,
          }}
        >
          {highlightText(project.projectName)}
        </Typography>
      </Box>

      {/* Description */}
      <Box>
        <Typography
          variant="body2"
          sx={{
            color: "#444",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3, // limits to roughly 3 lines
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
          }}
        >
          {highlightText(project.description)}
        </Typography>

        {/* Gradient fade overlay */}
        {/* <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            background:
              "linear-gradient(to bottom, rgba(249,249,249,0), #f9f9f9)",
          }}
        /> */}
      </Box>

      {/* Deadline */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AccessTime sx={{ fontSize: "15px" }} />
        <Typography variant="body2" sx={{ color: "#6b6b6b" }}>
          {project.deadline
            ? new Date(project.deadline).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "N/A"}
        </Typography>
      </Box>

      {/* Matched Tasks Section
      {matchedTasks.length > 0 && (
        <Box
          sx={{
            backgroundColor: "#f1f5ff",
            borderRadius: 2,
            p: 1.5,
            borderLeft: "4px solid #1976d2",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: "bold",
              color: "#1976d2",
              mb: 0.5,
            }}
          >
            Matched Tasks
          </Typography>

          {matchedTasks.map((task, i) => (
            <Box
              key={i}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 1,
                p: 1,
                mb: 0.8,
                boxShadow: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {highlightText(task.name)}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  color: "text.secondary",
                  mt: 0.3,
                }}
              >
                Assigned to: {highlightText(task.assignedTo)} <br />
                Status:{" "}
                <span
                  style={{
                    color:
                      task.status === "Completed"
                        ? "#2e7d32"
                        : task.status === "Pending"
                          ? "#ed6c02"
                          : "#1565c0",
                    fontWeight: "bold",
                  }}
                >
                  {task.status}
                </span>
              </Typography>
            </Box>
          ))}
        </Box>
      )} */}
    </Paper>
  );
}
