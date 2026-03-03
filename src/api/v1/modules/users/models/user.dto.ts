import { IUserEntity } from "./user.entity";
export interface IUpdateUser {
    fullName: string;
    avatar: string | null;
    bio: string;
}
export interface IUserProfile
    extends Omit<IUserEntity, "followers" | "following"> {
    username: string;
    email: string;
    isVerified: boolean;
    followersCount: number;
    followingCount: number;
    postsCount: number;
}

export interface IFollowCount {
    followerCount: number;
    followingCount: number;
}

export interface IFollowUser {
    id: string;
    fullName: string;
    avatar: string | null;
}

export interface IUserDashboard {
    id: string;
    fullName: string;
    avatar: string | null;
    bio: string;
    socialLinks: ISocialLinks;
    preferences: IUserPreferences;
    createdAt: Date;
    updatedAt: Date;
}
