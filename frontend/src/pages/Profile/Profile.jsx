import { useAuth } from "../../context/AuthContext";
import PersonalInfoCard from "../../components/PersonalInfoCard/PersonalInfoCard";
import { Link } from "react-router-dom";
import "./Profile.css";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
<div className="amazon-breadcrumb">
  <Link to="/account">Your Account</Link>
  <span>›</span>
  <span>Personal Information</span>
</div>
        <div className="profile-title-section">
          <h1>Personal Information</h1>
          <p>
            Manage your personal information and account details.
          </p>
        </div>

        <PersonalInfoCard user={user} />

      </div>
    </div>
  );
}