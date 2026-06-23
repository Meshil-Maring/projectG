import AdminDashboard from "../../components/admin/AdminDashboard";
import { GroupActivitiesProvider } from "../../context/GroupActivitiesContext";
import { TeamProvider } from "../../context/TeamContext";

export default function AdminDashboardPage() {
  return (
    <GroupActivitiesProvider>
      <TeamProvider>
        <AdminDashboard />
      </TeamProvider>
    </GroupActivitiesProvider>
  );
}
