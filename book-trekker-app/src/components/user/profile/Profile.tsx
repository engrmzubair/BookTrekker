import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { currentUser, getUpdatedUser, updateUser, getProfile } from '../userSlice';
import Layout from '../../core/Layout';
import Menu from '../../core/Menu';
import { toast, ToastContainer } from 'react-toastify';
import CardComponent from '../../common/CardComponent';
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

    console.log("updatedUser", updatedUser);

    let param: { userId: string, data: FormValues } | undefined =
      user && { userId: user._id, data: values }

    console.log("parma: ", param)

    param && dispatch(updateUser(param))
    toast.success("Profile updated successfully!")


    setTimeout(() => {

      dispatch(getProfile());
      navigate('../../user/dashboard')
    }, 5000);

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