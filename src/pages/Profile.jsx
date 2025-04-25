import { useForm } from "react-hook-form";
import { useState } from "react";
import ProfileForm from "/src/components/Dashboard/Profile/ProfileForm";
import ProfileButton from "/src/components/Dashboard/Profile/ProfileButton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm();

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Profile Info</h2>

        <form action="">
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <ProfileButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </form>
      </div>
    </div>
  );
};

export default Profile;
