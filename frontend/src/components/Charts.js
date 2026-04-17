import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Charts({ data }) {

  // 🔥 Group data by category
  const categoryData = Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = { category: item.category, amount: 0 };
      }
      acc[item.category].amount += item.amount;
      return acc;
    }, {})
  );
const groupedData = {
  Tech: 0,
  Food: 0,
  Clothing: 0
};

data.forEach(item => {
  if (groupedData[item.category] !== undefined) {
    groupedData[item.category] += item.amount;
  }
});
  const COLORS = ["#dfce4e", "#041042", "#7f0c40"];

  if (categoryData.length === 0) {
    return <p>No chart data available</p>;
  }

  return (
    <div className="row">

      {/* BAR CHART */}
      <div className="col-md-6">
        <h6>Bar Chart</h6>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4e73df" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="col-md-6">
        <h6>Pie Chart</h6>
        <div style={{ width: "100%", height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                outerRadius={80}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}

export default Charts;