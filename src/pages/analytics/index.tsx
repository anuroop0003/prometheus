import ChartArea from "./components/chart-area";
import LogsTable from "./components/logs-tables";

const Analytics = () => {
  return (
    <div className="space-y-6">
      <ChartArea />
      <LogsTable />
    </div>
  );
};

export default Analytics;
