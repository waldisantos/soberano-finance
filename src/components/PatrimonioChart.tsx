import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#0B57D0",
  "#2563EB",
  "#3B82F6",
  "#60A5FA",
  "#93C5FD",
];

export default function PatrimonioChart({
  data,
}: Props) {
  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,.08)",
        marginTop: "20px",
      }}
    >
      <h2>
        Distribuição Patrimonial
      </h2>

      <PieChart
        width={500}
        height={350}
      >
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map(
            (_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index %
                      COLORS.length
                  ]
                }
              />
            )
          )}
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}