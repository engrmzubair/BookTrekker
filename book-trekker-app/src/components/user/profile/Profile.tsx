import React from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { currentUser, getUpdatedUser, updateUser, getProfile } from '../userSlice';
import { Container } from 'react-bootstrap';
import Layout from '../../core/Layout';
import Menu from '../../core/Menu';
import { toast, ToastContainer } from 'react-toastify';
import CardComponent from '../../common/CardComponent';
import SignupForm from '../signup/SignupForm';
import { useNavigate } from 'react-router-dom';
import { ProfileFormikConfig, FormValues, FormikProfile } from "./ProfileFormikConfig"
import ProfileForm from './ProfileForm';


type Props = {}

const Profile = (props: Props) => {
  const user = useAppSelector(currentUser);
  const updatedUser = useAppSelector(getUpdatedUser)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()


  const updateProfile = (values: FormValues) => {

    dispatch(updateUser(values))
    console.log("updatedUser", updatedUser);

    if (updatedUser) {
      dispatch(getProfile())
      toast.success("Profile updated successfully!")

      setTimeout(() => {

        navigate('../../user/dashboard')
      }, 5000);

      console.log(values)
    }
  }

  //formik configuration for signup form
  const formik: FormikProfile = ProfileFormikConfig(updateProfile);


  return (
    <React.Fragment>
      <ToastContainer />
      <Menu />
      <Layout
        title="Profile"
        description={ `Mr. ${user?.name}, You can update your profile here!` }
      />

      <ToastContainer />


      <CardComponent
        title="Update"
        subtitle="Update your profile"
        className='w-50 m-auto mt-5'
        primary={ true }
      >
        <ProfileForm
          formik={ formik }
        />
      </CardComponent>
    </React.Fragment>
  )
}

export default Profile