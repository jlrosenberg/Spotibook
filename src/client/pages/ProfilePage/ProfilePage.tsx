import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserPayload } from '../../../shared/payloads';
import { FeedService } from '../../services/FeedService';
import { ProfileService } from '../../services/ProfileService';
import { ProfilePageContent } from './ProfilePageContent';


export const ProfilePage = () => {
    const { profileId } = useParams();
    const [ profileData, setProfileData ] = useState<UserPayload>();
    const [posts, setPosts] = useState<Array<any>>([])

    const loadProfile = async() => {
        const data = await ProfileService.getProfile(profileId)
        setProfileData(data)
    }

    const loadPosts = async() => {
        const data = await FeedService.getPostsForUser(profileId)
        setPosts(data)
    }

    useEffect(() => {
        loadProfile()
        loadPosts()
    }, [profileId])


    if(!profileData) {
        return <div>Loading...</div>
    }

    return <ProfilePageContent profile={profileData} posts={posts}/>
}