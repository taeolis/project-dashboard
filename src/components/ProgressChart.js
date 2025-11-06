import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography } from "@mui/material";

const COLORS = ["#4caf50", "#ffa03bff", "#2196f3"]; // Green=Completed, Yellow=In Progress, Blue=Pending

export default function ProgressChart({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const inProgressTasks = tasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const pendingTasks = tasks.filter((t) => t.status === "Pending").length;

  const data =
    totalTasks > 0
      ? [
          { name: "Completed", value: completedTasks },
          { name: "In Progress", value: inProgressTasks },
          { name: "Pending", value: pendingTasks },
        ]
      : [{ name: "Pending", value: 1 }]; // fallback

  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Box
      sx={{
        width: "100%",
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 2,
      }}
    >
      {/* ✅ Percentage on top */}
      {/* <Typography variant="h6" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {percentage}% Completed
      </Typography> */}

      <Box
        sx={{
          width: "100%",
          maxWidth: 350,
          height: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              cx="50%" // shifted slightly left to make room for legend
              cy="50%"
              innerRadius={0}
              outerRadius={70}
              cornerRadius={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            {/* ✅ Legend on right side, vertically centered */}
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              iconType="circle"
              wrapperStyle={{
                fontSize: 16,
                fontWeight: 500,
                paddingLeft: 30,
                paddingRight: 40,
                lineHeight: "2em",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
