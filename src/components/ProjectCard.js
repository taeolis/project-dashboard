import Chip from "@mui/material/Chip";
import { Paper, Typography, Box } from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { APP_COLORS } from "../constants/colors";

export default function ProjectCard({ isSelected, project, searchQuery }) {
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
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        textAlign: "left",
        height: "100%",
        backgroundColor: isSelected
          ? APP_COLORS.card_selected
          : APP_COLORS.card,
        outline: isSelected ? "2px solid #1976d2" : undefined,
        outlineOffset: isSelected ? "-2px" : undefined,
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
            WebkitLineClamp: 2,
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
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            mb: 1,
          }}
        >
          {highlightText(project.description)}
        </Typography>
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

      {/* Tasks Section */}
      {matchedTasks.length > 0 && searchQuery.trim() !== "" && (
        <Box sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 0.5 }}>
          {matchedTasks.map((task, i) => (
            <Box
              key={i}
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: 0.5,
              }}
            >
              <Typography
                flex="2"
                variant="body2"
                sx={{
                  width: "50px",
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                  overflowY: "hidden",
                }}
              >
                {highlightText(task.name)}
              </Typography>

              <Chip
                size="small"
                flex="1"
                variant="outlined"
                label={highlightText(task.assignedTo)}
                style={{
                  fontSize: 11,
                  fontWeight: "bold",
                  justifyContent: "left",
                }}
              />

              <Chip
                size="small"
                flex="1"
                variant="outlined"
                label={task.status}
                style={{
                  fontSize: 11,
                  color:
                    task.status === "Completed"
                      ? APP_COLORS.completed
                      : task.status === "Pending"
                        ? APP_COLORS.pending
                        : APP_COLORS.in_progress,
                  fontWeight: "bold",
                  justifyContent: "left",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Paper>
  );
}
