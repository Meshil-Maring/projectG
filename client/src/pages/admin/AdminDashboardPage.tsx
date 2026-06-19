import AdminDashboard from "../../components/admin/AdminDashboard";
import { GroupActivitiesProvider } from "../../context/GroupActivitiesContext";

export default function AdminDashboardPage() {
  return (
    <GroupActivitiesProvider>
      <AdminDashboard />
    </GroupActivitiesProvider>
  );
}
