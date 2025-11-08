import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Box } from "@mui/material";
import { APP_COLORS } from "../constants/colors";

const COLORS = [
  APP_COLORS.completed,
  APP_COLORS.in_progress,
  APP_COLORS.pending,
];

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
      : [{ name: "None", value: 1 }];

  const chartColors = totalTasks > 0 ? COLORS : ["#a9a9a9ff"];

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
        <div style={{ width: 250, height: 200 }}>
          <PieChart width={300} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={70}
              cornerRadius={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              iconType="circle"
              wrapperStyle={{
                fontSize: 16,
                fontWeight: 500,
                lineHeight: "2em",
              }}
            />
          </PieChart>
        </div>
      </Box>
    </Box>
  );
}
