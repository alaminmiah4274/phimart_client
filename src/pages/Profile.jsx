import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ProfileForm from "/src/components/Dashboard/Profile/ProfileForm";
import ProfileButton from "/src/components/Dashboard/Profile/ProfileButton";
import PasswordChangeForm from "/src/components/Dashboard/Profile/PasswordChangeForm";
import useAuthContext from "/src/hooks/useAuthContext";
import ErrorAlert from "/src/components/ErrorAlert";
import SuccessAlert from "/src/components/SuccessAlert";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile, changePassword, errorMsg, successMsg } =
    useAuthContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // to show user info in react form to update
  useEffect(() => {
    Object.keys(user).forEach((key) => setValue(key, user[key]));
  }, [user, setValue]);

  const handleProfileForm = async (data) => {
    try {
      // profile update
      const profilePayload = {
        first_name: data.first_name,
        last_name: data.last_name,
        address: data.address,
        phone_number: data.phone_number,
      };

      await updateUserProfile(profilePayload);

      // password change
      if (data.new_password && data.current_password) {
        await changePassword({
          new_password: data.new_password,
          current_password: data.current_password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto bg-base-100 shadow-xl">
      <div className="card-body">
        {errorMsg && <ErrorAlert error={errorMsg} />}
        {successMsg && <SuccessAlert success={successMsg} />}

        <h2 className="card-title text-2xl mb-4">Profile Info</h2>

        <form onSubmit={handleSubmit(handleProfileForm)}>
          <ProfileForm
            register={register}
            errors={errors}
            isEditing={isEditing}
          />

          <PasswordChangeForm
            register={register}
            errors={errors}
            isEditing={isEditing}
            watch={watch}
          />

          <ProfileButton
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            isSubmitting={isSubmitting}
          />
        </form>
      </div>
    </div>
  );
};

export default Profile;
