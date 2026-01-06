import Layout from "../layout/Layout";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { currentUser } = useAuth();

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <p className="text-gray-300">Email: {currentUser?.email}</p>
    </Layout>
  );
}
