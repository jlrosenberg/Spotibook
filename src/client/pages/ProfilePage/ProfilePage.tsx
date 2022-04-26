import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Profile } from '../../../shared/models/profile';
import { ProfileService } from '../../services/ProfileService';
import { ProfilePageContent } from './ProfilePageContent';


export const ProfilePage = () => {
    const { profileId } = useParams();
    const [ profileData, setProfileData ] = useState<Profile>();

    const loadProfile = async() => {
        const data = await ProfileService.getProfile(profileId)
        setProfileData(data)
    }

    useEffect(() => {
        loadProfile()
    }, [profileId])


    if(!profileData) {
        return <div>Loading...</div>
    }

    return <ProfilePageContent profile={profileData} />
}