import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserPayload } from '../../../shared/payloads';
import { ProfileService } from '../../services/ProfileService';
import { ProfilePageContent } from './ProfilePageContent';


export const ProfilePage = () => {
    const { profileId } = useParams();
    const [ profileData, setProfileData ] = useState<UserPayload>();

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